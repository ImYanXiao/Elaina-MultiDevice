import fetch from 'node-fetch';

const handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) {
    throw `Masukkan URL yang ingin Anda cek!\n_*perintah: ${usedPrefix + command} https://tr.deployers.repl.co\natau\n${usedPrefix + command} tr.deployers.repl.co*_`;
  }

  const url = `https://tr.deployers.repl.co/cj?u=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw 'Failed to fetch data.';
    }

    const data = await response.json();
    const mySecret = process.env['nomer']

    // Reply to the user with all the fetched data
    const replyText = `
Server Scanning at: ${data.current_time}
URL: ${data.url}
IP Address: ${data.ip_address}
Real IP Address: ${data.real_ip_address}
Result Message: *_${data.result_message}_*
Donasi: https://tr.deployers.repl.co/images or Dana ${mySecret}
\n
===================
${data.how_to_protect}
    `;
//     const replyText = `
// Server Scanning at: ${data.current_time}
// URL: ${data.url}
// IP Address: ${data.ip_address}
// Is Vulnerable: *_${data.is_vulnerable}_*
// Real IP Address: ${data.real_ip_address}
// Result Message: ${data.result_message}
// Donasi: https://tr.deployers.repl.co/images or Dana ${mySecret}
// \n\n
// ===========================================
// ${data.how_to_protect}
//     `;

    await conn.reply(m.chat, replyText, m);
  } catch (error) {
    console.error('Error:', error);
    // Reply to the user with an error message (optional):
    await conn.reply(m.chat, 'Failed to fetch data.', m);
  }
};

handler.command = /^(cj)?$/i;
handler.tags = ['internet'];
handler.help = ['cj <URL>'];

export default handler;
