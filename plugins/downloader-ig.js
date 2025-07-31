import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

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
    data: data,
    timestamp: Date.now()
  });
}

let handler = async (m, { args, conn }) => {
    const url = args[0];

    if (!url) {
      return conn.reply(m.chat, '⚠️ Kamu belum memasukkan URL. Contoh: *.ig https://www.instagram.com/p/DJ_zzh_SQM-/', m);
    }

    if (!/^https?:\/\/(www\.)?instagram\.com/.test(url)) {
      return conn.reply(m.chat, '❌ URL tidak valid. Harap masukkan URL dari *Instagram* saja.', m);
    }

  try {
    let data = getCachedData(url);
    
    if (data) {
      console.log('Menggunakan data dari cache untuk URL:', url);
      conn.reply(m.chat, '📁 Menggunakan data tersimpan...', m);
    } else {
      console.log('Mengambil data baru untuk URL:', url);
      data = await fetchInstagramHtml(url);
      
      if (!data.length) return conn.reply(m.chat, 'Media tidak ditemukan.', m);
      
      setCachedData(url, data);
      conn.reply(m.chat, 'Mengirimkan media Instagram...', m);
    }

    for (const item of data) {
      const mediaList = [item.download_url, item.fullscreen_url, item.media_src];
      for (const mediaUrl of mediaList) {
        if (!mediaUrl) continue;
        try {
          await conn.sendFile(m.chat, mediaUrl, 'instagram_media', '', m);
          break;
        } catch (e) {
          console.error(`Gagal mengirim file: ${mediaUrl}`, e);
        }
      }
    }
  }
  catch (error) {
    console.error('Error fetching Instagram data:', error);
    conn.reply(m.chat, 'Terjadi kesalahan saat mengambil data Instagram.', m);
  }
  return m.reply('Selesai!');
};

handler.help = ['instagram'];
handler.tags = ['downloader'];
handler.command = /^(ig(dl)?|instagram)$/i;

export default handler;
