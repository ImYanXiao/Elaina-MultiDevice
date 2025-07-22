import fetch from 'node-fetch';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { addExif } from '../lib/sticker.js'
import { Sticker } from 'wa-sticker-formatter'
//import { bioskop, bioskopNow } from '@bochilteam/scraper-others';
async function buwatgambar(prompt) {
  try {
    let { data } = await axios.post("https://api-preview.chatgot.io/api/v1/deepimg/flux-1-dev", {
      prompt,
      size: "1024x1024",
      device_id: `dev-${Math.floor(Math.random() * 1000000)}`
    }, {
      headers: {
        "Content-Type": "application/json",
        Origin: "https://deepimg.ai",
        Referer: "https://deepimg.ai/"
      }
    })
    return data?.data?.images?.[0]?.url || null
  } catch (err) {
    console.error(err.response ? err.response.data : err.message)
    return null
  }
}

const apiKeys = ['C9eLLoQZvX', 'euhsDaUPzl'];

const stickersearch = (text) => {
  return new Promise((resolve, reject) => {
      const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'id,en-US;q=0.7,en;q=0.3',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'TE': 'trailers'
    };
    axios.get(`https://getstickerpack.com/stickers?query=${text}`, { headers })
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const source = [];
        const link = [];

        var ya = $('#stickerPacks > div > div:nth-child(3) > div > a').text();
        if (!ya) return resolve();

        $('#stickerPacks > div > div:nth-child(3) > div > a').each(function (a, b) {
          source.push($(b).attr('href'));
        });

        axios.get(source[Math.floor(Math.random() * source.length)])
          .then(({ data }) => {
            const $$ = cheerio.load(data);
            $$('img').each(function (c, d) {
              link.push($$(d).attr('src').replace(/&d=200x200/g, ''));
            });

            const result = {
              title: $$('#intro > div > div > h1').text(),
              sticker_url: link,
            };

            resolve(result);
          })
          .catch(reject);
      })
      .catch(reject);
  });
};

let handler = async (m, { args, usedPrefix, text, command, conn }) => {
  const sender = m.sender.split(`@`)[0];
  const filteredWords = ['seksi', 's3x', 'konten dewasa', 'hentai', 'mesum', 'ahegao', 'fuck', 'sex', 'porn', 'porno', 'ngewe', 'pussy', 'memek', 'meki', 'mmk', 'kontol', 'butt', 'buttocks', 'bra', 'stepmom', 'stepfather', 'BAB1', 'PEL1', 'AASU', 'PEJU', 'P3JU', 'A5UU', 'AA5U', 'MBUT', 'AWUK', 'FUCK', 'JEMB', 'KNTL', 'CRUT', 'NTUT', 'MAT1', 'PCUN', 'G1LA', 'BUTA', 'JLEK', 'CEWE', 'EEWE', 'ANUS', 'SH1T', 'B1CH', 'KL1T', 'CL1T', 'CNTZ', 'CUMS', 'CUNT', 'D1CK', 'DYKE', 'FAGS', 'FAGZ', 'FART', 'F4RT', 'FUKR', 'FUKK', 'GAYS', 'GAYZ', 'HELL', 'JIZZ', 'JISS', 'KNOB', 'KUNT', 'N1GR', 'PUS1', 'SHYT', 'SLUT', 'T1TS', 'VAGS', 'CAWK', 'FCUK', 'LEEC', 'PUSS', 'BUBS', 'TITT', 'WANK', 'DAMN', 'D4MN', 'BUTT', 'NAZ1', 'P1SS', 'PUPS', 'TWAT', 'KENT', 'NTHU', 'NT1L', 'GAWK', 'GAUK', 'GAWU', 'NCUK', 'WDUS', 'TAEK', 'MEK1', 'KERE', 'UP1L', 'ELEK', 'UTEK', 'BJAT', 'ALAY', 'NDAS', 'STFU', 'TEMP', 'KETE', 'ASEM', 'kontl', 'ppk', 'pepek', 'tai', 'ngentod', 'ngentot', 'fucker', 'ngntd', 'ngntot', 'kntol', 'goblok', 'gblk', 'goblog', 'stupid', 'kenthu', 'kentu', 'tits', 'boobs', 'blowjob', 'naked', 'naughty', 'kampret', 'bangsat', 'bangsad', 'bngst', 'asu', 'bujang', 'kimak', 'kimbek', 'lacur', 'pelacur', 'lonte', 'lont', 'bitch', 'fuckyou', 'fucked', 'bokep', 'penis', 'vagina', 'undress', 'undressed', 'pantat', 'pantad','breasts','breast','payudara','telanjang','ngewe','sepong','nyepong','ny3p0ng','nyep0ng','ny3pong','sange','horny'];

  if (command === 'convertuang' || command === 'kurs' || command === 'kursuang' || command === 'matauang' || command === 'konversiuang') {
    if (args.length < 1) {
      throw `Usage: ${usedPrefix}${command} <amount>|<fromCurrency>|<toCurrency>\n\nEx: *${usedPrefix}${command} 13|USD|IDR*\n\nList Currency for example =\n
USD: Dolar Amerika Serikat (Amerika Serikat)
EUR: Euro (Eurozone - sejumlah negara Eropa)
GBP: Pound Sterling (Inggris)
JPY: Yen Jepang (Jepang)
CAD: Dolar Kanada (Kanada)
AUD: Dolar Australia (Australia)
CHF: Franc Swiss (Swiss)
MYR: Ringgit Malaysia (Malaysia)
CNY: Yuan Tiongkok (Tiongkok)
IDR: Rupiah Indonesia (Indonesia)

dan lain lain (etc.), for more ? check google or https://www.bola.com/ragam/read/5334821/daftar-nama-mata-uang-berbagai-negara-di-dunia-beserta-kodenya
`;
    }

    try {
      const [amount, fromCurrency, toCurrency] = args[0].split('|');

      if (!amount || !fromCurrency || !toCurrency) {
        throw 'Invalid input format. Please use: <amount>|<fromCurrency>|<toCurrency>';
      }

      const apiUrl = `https://tr.deployers.repl.co/convertuang?uang=${amount}&dari=${fromCurrency}&ke=${toCurrency}`;

      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        const author = data.Author;
        const from = data.Dari;
        const to = data.Ke;
        const result = data.Hasil;
        const formattedData = `Author: ${author}\n\nDari: ${from}  Ke: ${to}\nHasil: ${result}`;
        m.reply(formattedData);
      } else {
        m.reply('Failed to retrieve currency conversion data. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      throw 'An error occurred. Please try again later.\n\nInvalid input format. Please use: <amount>|<fromCurrency>|<toCurrency>';
    }
  } else if (command.match(/^(short|singkatin|singkat|bitly|tinyurl|vgd|ouo|isgd|shortlink|linkshort)$/i)) {
    if (!args[0]) throw `${usedPrefix}${command} https://mykingbee.blogspot.com/`;

    try {
      const response = await fetch(`https://bioskop-six.vercel.app/short?url=${args[0]}`);

      if (response.ok) {
        const data = await response.json();
        const author = data.author;
        const bitly = data.bitly;
        const isgd = data.isgd;
        const ouo = data.ouo;
        const tinyurl = data.tinyurl;
        const vgd = data.vgd;
        const shorterme = data.shorterme
        const formattedData = `Author: ${author}\n\nLink Asli ${args[0]}\n=====SHORT LINK=====\nBitly: ${bitly}\nIsgd: ${isgd}\nOuo: ${ouo}\nTinyURL: ${tinyurl}\nVgd: ${vgd}\nShorterme: ${shorterme}`;
        m.reply(formattedData);
      } else {
        m.reply('Failed to retrieve data. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      throw 'An error occurred. Please try again later.';
    }
  } else if (command === "text2img" || command === "txt2img" || command === "t2i" || command === "tekskegambar") {
    if (!text) return m.reply("Masukkan prompt gambar.")

  m.reply("Sedang memproses gambar, mohon tunggu...")

  let gambarnyah = await buwatgambar(text)
  if (!gambarnyah) return m.reply("gagal membuat gambarnya coba ganti prompt nya")

  await conn.sendMessage(m.chat, { 
    image: { url: gambarnyah }, 
    caption: `Gambar berhasil dibuat!\n Dengan Prompt: ${text}` 
  }, { quoted: m });
  } else if (command === "caristicker" || command === "caristiker" || command === "getsticker" || command === "getstiker") {
    if (!text) {
      throw `Silakan masukkan query pencarian sticker.\n${usedPrefix}${command} Naruto`;
    }

    try {
      const result = await stickersearch(text);
      if (!result) {
        return m.reply('Tidak ditemukan sticker dengan query tersebut.');
      }

      m.reply(`*Title:* ${result.title}`);
      for (let stickerUrl of result.sticker_url) {
      //   conn.sendFile(m.chat, stickerUrl, 'sticker.jpg', '');
      // }
        // conn.sendFile(m.chat, stickerUrl, 'sticker.webp', '');
        try {
          let img = await fetch(stickerUrl).then(response => response.buffer());
          let stiker = await addExif(img, '', '');
          conn.sendFile(m.chat, stiker, 'sticker.webp', { quoted: m });
        } catch (e) {
            console.error(e);
          }
        }
    } catch (error) {
      console.error(error);
      // m.reply('Terjadi kesalahan dalam pencarian sticker.');
      //m.reply(error);
      m.reply(`Terjadi kesalahan dalam pencarian sticker: ${error}`);
    }
  }
  else if (command === "instagramstory" || command === "igstory" || command === "igstorydl" || command === "igs" || command === "ighighlights" || command === "igh" || command === "ighighlight") {
    if (!text) {
      conn.reply(m.chat, `_Masukkan Link Video IG (BISA HIGHLIGHT DAN CERITA, tapi publik account) Yang Ingin Kamu Cari!_\nperintah:\n${usedPrefix + command} https://www.instagram.com/stories/highlights/17860230305961018/\n${usedPrefix + command} https://www.instagram.com/stories/instagram/\nHanya bisa Video, kalo Foto kalian bisa ss -__-`, m);
      return;
    }

    const baseUrl = `https://tr.deployers.repl.co/igstory?url=${encodeURIComponent(text)}`;

    try {
      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      } else {
        conn.reply(m.chat, "sedang di download...", m);
      }

      const data = await response.json();

      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('No video URLs found in the provided Instagram story.');
      }

      if (data.length === 1) {
        const videoURL = data[0].url;
        const caption = `Video URL: ${videoURL}`;
        await conn.sendFile(m.chat, videoURL, 'video.mp4', caption);
        console.log(`Sent file: ${videoURL}`);
      } else {
        let start = 0;
        for (const story of data) {
          if (!story || !story.url) {
            console.error('Invalid video format for story:', story);
            continue;
          }

          const videoURL = story.url;
          const caption = `Video ${start + 1} URL: ${videoURL}`;
          await conn.sendFile(m.chat, videoURL, 'video.mp4', caption);
          console.log(`Sent file: ${videoURL}`);
          start++;
        }
      }
    } catch (error) {
      console.error(error);
      conn.reply(m.chat, `Terjadi kesalahan dalam mengunduh`, m);
    }
  } else if (command === "capcut" || command === "capcutdownloader") {
    if (!args[0]) throw `Ex:\n${usedPrefix}${command} https://www.capcut.com/t/Zs82ASjAk/`;

    try {
      let url = `https://bioskop-six.vercel.app/capcut?url=${args[0]}`;
      let response = await fetch(url);
      let result = await response.json();

      let judul = result.title;
      let deskripsi = result.description;
      let pemakai = result.usage;
      let videourl = result.video_url;

      let capcut = `
  *Title:* ${judul}
  *Description:* ${deskripsi}
  *Usage:* ${pemakai}

  _Capcut Downloader By Xnuvers007_
  `;

      conn.sendFile(m.chat, videourl, judul + '.mp4', capcut, m);

    } catch (error) {
      console.error(error);
      conn.reply(m.chat, error.message || 'Failed to download Capcut video', m);
    }
  }
  else if (command === 'bioskop') {
      if (!text) {
        conn.reply(m.chat, `Mohon berikan nomor halaman. Contoh penggunaan:\n${usedPrefix}${command} 1`, m);
        return;
      }
      const page = text; // || 1;
      const results = await bochil.bioskop(page);

      const formattedResults = results.map(res => {
        return `Title: ${res.title}\nImage: ${res.img}\nURL: ${res.url}\nGenre: ${res.genre}\nDuration: ${res.duration}\nRelease: ${res.release}\nDirector: ${res.director}\nCast: ${res.cast}\n\n`;
      }).join('\n');

      await conn.reply(m.chat, formattedResults, m);
    } else if (command === 'bioskopNow','bioskopnow','bioskopsekarang') {
      const results = await bochil.bioskopNow();

      const formattedResults = results.map(res => {
        return `Title: ${res.title}\nImage: ${res.img}\nURL: ${res.url}\nGenre: ${res.genre}\nDuration: ${res.duration}\nPlaying At: ${res.playingAt}\n\n`;
      }).join('\n');

      await conn.reply(m.chat, formattedResults, m);
    }

  await conn.reply(m.chat, `==========================\n\nJika bot AI tidak dapat menjawab, silahkan donasi minimal 1k untuk menghidupkannya kembali.\n\nDana: ${global.nomorown}\nGopay: ${global.nomorown}`, m);
};

handler.help = [
  'text2img <teks>',
  'convertuang <amount>|<fromCurrency>|<toCurrency>',
  'short <url>',
  'caristiker <Query>',
  'igs <link Story/Highlight>',
  'capcut <Link Capcut>',
  'bioskop [halaman ke-]',
  'bioskopnow'
];
handler.tags = ['tools', 'currency', 'internet', 'sticker', 'downloader','downloader','internet','internet'];
handler.command = /^(convertuang|kurs|kursuang|matauang|konversiuang|short|singkatin|singkat|bitly|tinyurl|vgd|ouo|isgd|shortlink|linkshort|text2img|txt2img|t2i|tekskegambar|caristicker|caristiker|getstiker|getsticker|igs|instagramstory|igstory|igstorydl|igh|ighighlights|ighighlight|capcut|capcutdownloader|bioskop|bioskopNow|bioskopnow|bioskopsekarang)$/i;

export default handler;
