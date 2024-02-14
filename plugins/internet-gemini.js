import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    const text = args?.join(' ');
    if (!text) {
      return conn.reply(m.chat, `Silakan coba lagi, teks jangan kosong.\n*Ex: ${usedPrefix + command} berikan saya kodingan python kalkulator!*`, m);
    }
      
    conn.reply(m.chat, "Mohon tunggu sebentar\n"+wait, m);

    const response = await fetch(`https://aemt.me/gemini?text=${encodeURIComponent(text)}`);
    if (!response.ok) {
      return conn.reply(m.chat, 'Tidak dapat memproses permintaan Anda saat ini.', m);
    }

    const data = await response.json();
    const result = data?.result;

    if (!result) {
      return conn.reply(m.chat, 'Tidak dapat memproses permintaan Anda saat ini.', m);
    }

    conn.reply(m.chat, result, m);
  } catch (error) {
    console.error('Error:', error);
    conn.reply(m.chat, 'Terjadi kesalahan saat memproses permintaan Anda.', m);
  }
};

handler.help = ['gemini <Query>'];
handler.tags = ['tools','internet'];
handler.limit = 2;
handler.register = true;

handler.command = /^(bard|gemini?)$/i;

export default handler;
