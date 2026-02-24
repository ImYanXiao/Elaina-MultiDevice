import { extractImageThumb } from '@adiwajshing/baileys'
import fs from 'fs'
import fetch from 'node-fetch' // Pastikan node-fetch diimport jika belum

const { buffer } = await extractImageThumb(fs.readFileSync('./Thumb.jpg'), 150) 

// Fungsi untuk mendapatkan video download URL dengan kualitas yang tersedia
async function getVideoDownloadUrl(res) {
  if (!res.video || !Array.isArray(res.video)) {
    throw new Error('No video array found in response.');
  }

  const qualities = ['720p (HD)', '360p (SD)']; // Urutan kualitas yang ingin dicoba

  for (const quality of qualities) {
    const video = res.video.find(v => v.quality === quality);

    if (video) {
      try {
        // Coba ambil hasil download
        if (typeof video.download === 'function') {
          return await video.download(); // Kembalikan URL download
        } else {
          console.error(`'download' is not a function for quality ${quality}`);
        }
      } catch (error) {
        console.error(`Failed to download ${quality}:`, error);
      }
    } else {
      console.error(`No video found for quality ${quality}`);
    }
  }

  return null; // Jika tidak ada kualitas yang tersedia
}

let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Input URL';
  
  let res;
  try {
    res = await facebookdl(args[0]);
  } catch (error) {
    throw `Failed to fetch video data: ${error.message}`;
  }
  
  if (!res) throw 'Can\'t download the post';

  // Dapatkan URL download video
  const hasilUrl = await getVideoDownloadUrl(res);
  if (!hasilUrl) throw 'No available video downloads.';

  conn.reply(m.chat, `ᴅ ᴏ ᴡ ɴ ʟ ᴏ ᴀ ᴅ ɪ ɴ ɢ. . .`, 0, {
    contextInfo: { 
      externalAdReply: {
        mediaUrl: 'https://facebook.com',
        mediaType: 2,
        description: wm, 
        title: '               「🇫」 ғ ᴀ ᴄ ᴇ ʙ ᴏ ᴏ ᴋ',
        body: wm,
        thumbnail: await getBuffer('https://telegra.ph/file/5253b50e04237110de8ae.jpg'),
        sourceUrl: sgc
      }
    }
  });

  // Kirim video dengan URL download yang didapat
  try {
    const videoBuffer = await (await fetch(hasilUrl)).buffer();
    return await conn.sendMessage(m.chat, { video: videoBuffer, caption: '', seconds: -404, jpegThumbnail: buffer });
  } catch (error) {
    throw `Failed to fetch or send video: ${error.message}`;
  }
}

handler.help = ['facebook'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloader|dl)?)$/i

export default handler


import got from 'got'
import * as cheerio from 'cheerio'
import { z } from 'zod'

const DEFAULT_HEADERS = {
    'accept': '*/*',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
    'sec-ch-ua-mobile': '?0',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
};

const FacebookDlArgsSchema = z.object({
    0: z.string().url()
});

const FacebookDlMediaSchema = z.array(z.object({
    quality: z.string(),
    download: z.function(z.tuple([])).returns(z.promise(z.string().url()))
}));

const FacebookDlSchema = z.object({
    thumbnail: z.string().url(),
    duration: z.string().optional(),
    video: FacebookDlMediaSchema,
    audio: FacebookDlMediaSchema
});

async function facebookdl(url) {
    FacebookDlArgsSchema.parse(arguments);

    const html = await got('https://fdownloader.net/en', {
        headers: {
            ...DEFAULT_HEADERS
        }
    }).text();

    const k_url_search = /k_url_search="(.*?)"/.exec(html)[1];
    const k_exp = /k_exp="(.*?)"/.exec(html)[1];
    const k_token = /k_token="(.*?)"/.exec(html)[1];
    const k_prefix_name = /k_prefix_name="(.*?)"/.exec(html)[1];

    const form = {
        k_exp,
        k_token,
        q: url,
        lang: 'en',
        web: 'fdownloader.net',
        v: 'v2',
        w: ''
    };

    const data = await got.post(k_url_search, {
        headers: {
            ...DEFAULT_HEADERS,
            referer: 'https://fdownloader.net/'
        },
        form
    }).json();

    const $ = cheerio.load(data.data);

    const k_url_convert = /k_url_convert = "(.*?)"/.exec($.html())[1];
    const c_exp = /k_exp = "(.*?)"/.exec($.html())[1];
    const c_token = /c_token = "(.*?)"/.exec($.html())[1];

    const thumbnail = $('.thumbnail > .image-fb > img').attr('src');
    const duration = $('.content > .clearfix > p').text() || undefined;

    const video = $('table.table').eq(0).find('tbody > tr').map((_, el) => {
        const $el = $(el);
        const $td = $el.find('td');
        const quality = $td.eq(0).text();
        const url = $td.eq(2).find('a').attr('href');

        if (url) {
            return {
                quality,
                download: () => Promise.resolve(url)
            };
        }

        return false;
    }).toArray().filter(Boolean);

    const audio = [];
    const audioUrl = $('#audioUrl').attr('value');

    if (audioUrl) {
        audio.push({
            quality: '7kbps',
            download: () => Promise.resolve(audioUrl)
        });
    }

    const result = {
        thumbnail,
        duration,
        video,
        audio
    };

    console.log(result);
    return FacebookDlSchema.parse(result);
}

async function convert(url, v_id, ftype, videoUrl, videoType, videoCodec, audioUrl, audioType, fquality, fname, exp, token) {
    const data = await got.post(url, {
        form: {
            ftype,
            v_id,
            videoUrl,
            videoType,
            videoCodec,
            audioUrl,
            audioType,
            fquality,
            fname,
            exp,
            token,
            cv: 'v2'
        }
    });
}
