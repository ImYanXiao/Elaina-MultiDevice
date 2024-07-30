import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`Masukkan koordinat dengan format: ${usedPrefix + command} latitude|longitude\n\nUntuk mengetahui kiblat, izinkan lokasi pada website ini https://gps-coordinates.org/`);
  }

  text = text.replace(/,/g, '.');

  let [latitude, longitude] = text.split('|').map(coord => coord.trim());

  if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
    return m.reply(`Koordinat tidak valid. Gunakan format: ${usedPrefix + command} latitude|longitude`);
  }

  let apiUrl = `https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`;
  let response = await fetch(apiUrl);
  if (!response.ok) {
    return m.reply('Gagal mendapatkan data dari API.');
  }

  let data = await response.json();
  if (data.code !== 200) {
    return m.reply('Gagal mendapatkan arah kiblat.');
  }

  let direction = data.data.direction;
  let mapsLink = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving&dir_action=navigate`;

  let message = `Arah kiblat dari koordinat (${latitude}, ${longitude}) adalah ${direction}°.\n\nPanduan arah: ${mapsLink}\n\nGunakan Aplikasi kompas untuk menentukan arah mata angin dari koordinat diatas`;

  await conn.reply(m.chat, message, m);
};

handler.help = ['kiblat'];
handler.tags = ['tools'];
handler.command = /^(kiblat|qiblat)$/i;

export default handler;
