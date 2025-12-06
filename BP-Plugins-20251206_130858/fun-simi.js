import fetch from 'node-fetch';

const handler = async (m, { text, args, usedPrefix, command }) => {
  try {
    if (!text) {
      throw `Gunakan contoh *${usedPrefix}simi halo*\nJika Simi tidak merespon, coba *${usedPrefix + command}2 halo Simi*`;
    }

    const url = `https://api.simsimi.net/v2/?text=${text}&lc=id`;
    const response = await fetch(url);

    if (!response.ok) {
      throw 'Gagal mengambil data.';
    }

    const data = await response.json();
    m.reply(data.success);
  } catch (error) {
    console.error('Error:', error);
    m.reply(text ? 'Gagal mengambil data.' : error);
  }
};

handler.command = ['simi'];
handler.tags = ['fun'];
handler.help = ['simi'];

export default handler;
