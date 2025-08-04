import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs/promises';
import path from 'path';

const instagramCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

async function getCsrfToken() {
  const res = await fetch('https://snapinsta.biz/wp-json/token/v1/csrf-token', {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      Referer: 'https://snapinsta.biz/',
      Origin: 'https://snapinsta.biz',
      'X-Requested-With': 'XMLHttpRequest'
    }
  });
  const json = await res.json();
  if (!json.token) throw new Error('CSRF token not found');
  console.log('Got CSRF token:', json.token);
  return json.token;
}

async function fetchInstagramHtml(instagramUrl) {
  const csrfToken = await getCsrfToken();

  const postUrl = 'https://snapinsta.biz/ajax-handler.php';
  const params = new URLSearchParams({
    action: 'fetch_instagram',
    url: instagramUrl,
    csrf_token: csrfToken
  });

  const res = await fetch(postUrl, {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      Referer: 'https://snapinsta.biz/',
      Origin: 'https://snapinsta.biz',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: params
  });

  const json = await res.json();

  if (!json.success) {
    console.error('Response error:', json);
    throw new Error('Request failed or no data found');
  }

  const $ = cheerio.load(json.data.html);
  const results = [];

  $('.result-item').each((i, el) => {
    const media = $(el).find('.result-media img').attr('src') || null;
    const isVideo = $(el).find('.result-type i').hasClass('fa-video');
    const fullscreenUrl = $(el).find('.result-fullscreen').attr('data-url') || null;
    let downloadUrl = $(el).find('.download-button').attr('href') || null;
    if (downloadUrl && !downloadUrl.startsWith('http')) {
      downloadUrl = 'https://snapinsta.biz' + downloadUrl;
    }

    results.push({
      media_src: media,
      media_type: isVideo ? 'video' : 'image',
      fullscreen_url: fullscreenUrl,
      download_url: downloadUrl
    });
  });

  return results;
}

function getCachedData(url) {
  const cached = instagramCache.get(url);
  if (!cached) return null;
  const now = Date.now();
  if (now - cached.timestamp > CACHE_DURATION) {
    instagramCache.delete(url);
    return null;
  }
  return cached.data;
}

function setCachedData(url, data) {
  instagramCache.set(url, {
    data,
    timestamp: Date.now()
  });
}

async function convertVideoToMp3(videoUrl, outputFileName) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoUrl)
      .noVideo()
      .toFormat("mp3")
      .on("end", () => resolve())
      .on("error", (err) => reject(err))
      .save(outputFileName);
  });
}

/*
async function upscaleVideoToHD(inputUrl, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputUrl)
      //.videoFilters('scale=1920:1080') // 1080p // scale=1920:1080 // scale=1280:720 // 720p
      .videoFilters('scale=1920:1080')
      .outputOptions('-preset fast')
      .on('end', () => resolve())
      .on('error', err => reject(err))
      .save(outputPath);
  });
}
*/

// bisaaaaaaaa

/*
async function upscaleVideoToHD(inputUrl, outputPath) {
  return new Promise((resolve, reject) => {
    // Filter Cerdas:
    // Mengecek rasio aspek video (iw = input width, ih = input height).
    // 'if(gt(a,1), 1280, -2)': Jika video landscape (aspect ratio > 1), set lebarnya 1280.
    // 'if(gt(a,1), -2, 1280)': Jika video portrait/persegi (aspect ratio <= 1), set tingginya 1280.
    // Ini memastikan dimensi terpanjang video mendekati 1280px.
    const complexFilter = "scale='if(gt(a,1),1280,-2)':'if(gt(a,1),-2,1280)'";

    ffmpeg(inputUrl)
      .videoFilters(complexFilter)
      .outputOptions('-preset fast')
      .on('end', () => {
        console.log('Video upscaling finished successfully.');
        resolve();
      })
      .on('error', err => {
        console.error('Error during video upscaling:', err);
        reject(err);
      })
      .save(outputPath);
  });
}
*/

async function upscaleVideoToHD(inputUrl, outputPath) {
  return new Promise((resolve, reject) => {
    // --- PENGATURAN UNTUK KUALITAS HD SEBENARNYA ---

    // 1. Target Resolusi 1080p
    // Dimensi terpanjang video akan dibuat menjadi 1920px.
    const resolutionFilter = "scale='if(gt(a,1),1920,-2)':'if(gt(a,1),-2,1920)'";

    // 2. Video Bitrate (SANGAT PENTING)
    // Menentukan kualitas gambar. '5M' artinya 5 Megabits per second.
    // Cukup baik untuk video 1080p. Anda bisa naikkan ke '8M' jika hasilnya masih kurang.
    const videoBitrate = '5M';

    // 3. Preset Encoding
    // 'medium' adalah default FFmpeg, keseimbangan baik antara kecepatan dan kualitas.
    // 'fast' (yang Anda gunakan sebelumnya) lebih cepat tapi kualitas lebih rendah.
    // 'slow' akan lebih baik lagi kualitasnya tapi prosesnya jauh lebih lama.
    const encodingPreset = 'veryslow'; // medium

    console.log('Starting HD upscaling with high quality settings...');

    ffmpeg(inputUrl)
      .videoFilters(resolutionFilter) // Terapkan filter resolusi 1080p
      .outputOptions([
        '-preset', encodingPreset, // Gunakan preset kualitas medium
        '-b:v', videoBitrate,     // Set video bitrate ke 5M
        '-maxrate', '5M',         // Batas atas bitrate
        '-bufsize', '10M'         // Ukuran buffer untuk bitrate
      ])
      .on('end', () => {
        console.log('High-quality video upscaling finished successfully.');
        resolve();
      })
      .on('error', err => {
        console.error('Error during high-quality video upscaling:', err);
        reject(err);
      })
      .save(outputPath);
  });
}

let handler = async (m, { args, conn }) => {
  const url = args[0];
  const sender = m.sender.split(`@`)[0];

  if (!url) {
    return conn.reply(m.chat, '⚠️ Kamu belum memasukkan URL. Contoh: *.ig https://www.instagram.com/p/DJ_zzh_SQM-/ ' + `@${sender}`, m);
  }

  if (!/^https?:\/\/(www\.)?instagram\.com/.test(url)) {
    return conn.reply(m.chat, '❌ URL tidak valid. Harap masukkan URL dari *Instagram* saja. ' + `@${sender}`, m);
  }

  try {
    let data = getCachedData(url);

    if (data) {
      conn.reply(m.chat, '📁 Menggunakan data tersimpan...', m);
    } else {
      data = await fetchInstagramHtml(url);
      if (!data.length) return conn.reply(m.chat, `Media tidak ditemukan kak @${sender}.`, m);
      setCachedData(url, data);
      conn.reply(m.chat, `Mengirimkan media Instagram... kak @${sender}`, m);
    }

    for (const [index, item] of data.entries()) {
      const mediaList = [item.download_url, item.fullscreen_url, item.media_src];
      
      for (const mediaUrl of mediaList) {
        if (!mediaUrl) continue;
        try {
          await conn.sendFile(m.chat, mediaUrl, 'instagram_media', '', m);
        const now = new Date();
        const formattedDate = now.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '');
        const formattedTime = now.toTimeString().slice(0,5).replace(':', '');
        const dynamicFileName = `instagramDL-Xnuvers007-${formattedDate}${formattedTime}.mp4`;

        await conn.sendMessage(m.chat, {
          document: { url: mediaUrl },
          mimetype: "video/mp4",
          fileName: dynamicFileName,
          caption: `🎥 Ini videonya kak @${sender}!\n\n📥 Powered by Xnuvers007`,
          mentions: [m.sender],
        }, m);

          if (item.media_type === 'video') {
            const mp3FileName = path.resolve(`./tmp_audio_${Date.now()}_${index}.mp3`);
            await convertVideoToMp3(mediaUrl, mp3FileName);
              
            const hdVideoPath = path.resolve(`./tmp_hd_${Date.now()}_${index}.mp4`);
            await upscaleVideoToHD(mediaUrl, hdVideoPath);
              
            await conn.sendFile(m.chat, hdVideoPath, 'video_hd.mp4', 'Berikut adalah versi HD dari video.', m);
             
            await conn.sendMessage(m.chat, {
          document: { url: hdVideoPath },
          mimetype: "video/mp4",
          fileName: `HD_${dynamicFileName}`,
          caption: `🎥 Ini video HD-nya kak @${sender}!\n\n📥 Powered by Xnuvers007`,
          mentions: [m.sender],
        }, m);
              
            await conn.sendFile(m.chat, mp3FileName, 'audio.mp3', 'Berikut adalah audio dari video.', m);
              
            await fs.unlink(mp3FileName);
            await fs.unlink(hdVideoPath);
          }
          
          break;
        } catch (e) {
          console.error(`Gagal mengirim file: ${mediaUrl}`, e);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching Instagram data:', error);
    conn.reply(m.chat, 'Terjadi kesalahan saat mengambil data Instagram.', m);
  }

  return m.reply(`Selesai! kak @${sender}`);
};

handler.help = ['instagram'];
handler.tags = ['downloader'];
handler.command = /^(ig(dl)?|instagram)$/i;

export default handler;
