import fetch from 'node-fetch';

const handler = async (m, { conn, args, command, usedPrefix }) => {
  if (!args[0]) {
    throw `_*Masukkan URL yang ingin Anda cek!*_\n_*Perintah:*_ ${usedPrefix + command} <URL>`;
  }

  const url = `https://tr.deployers.repl.co/cj?u=${encodeURIComponent(args[0])}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw 'Gagal mengambil data.';
    }

    const data = await response.json();
    const mySecret = process.env['nomer']; // ganti dengan nomor kalian

    // Construct the reply message with improved formatting
    const replyText = `
*Hasil Pemindaian Server:*
- Waktu Pemindaian: ${data.current_time}
- URL: ${data.url}
- Alamat IP: ${data.ip_address}
- Alamat IP Asli: ${data.real_ip_address}
- Pesan Hasil: _${data.result_message}_
- Donasi: [Klik di sini](https://tr.deployers.repl.co/images) atau melalui Dana ke ${mySecret}

*Langkah Perlindungan:*
${data.how_to_protect}
    `;

    await conn.reply(m.chat, replyText, m);
  } catch (error) {
    console.error('Error:', error);
    await conn.reply(m.chat, 'Gagal mengambil data.', m);
  }
};

handler.command = /^(cj|clickjacking|clickjack)$/i;
handler.tags = ['internet'];
handler.help = ['cj <URL>'];

export default handler;
