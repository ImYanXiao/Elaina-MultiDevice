import axios from 'axios';

let handler = async (m, { conn }) => {
  try {
    await m.reply(wait);

    const { data } = await axios.get("https://api.siputzx.my.id/api/info/liburnasional");

    if (!data.status) {
      return conn.reply(m.chat, "Gagal mengambil data hari libur.", m);
    }

    let teks = `*Source Information dari Archave Community | MEDIA*\n\n${readMore}`;
    
               
    if (data.data.hari_ini.events.length > 0) {
      teks += `*Hari Ini (${data.data.hari_ini.tanggal}):*\n`;
      for (let event of data.data.hari_ini.events) {
        teks += `- ${event.event} (Sumber: ${event.source})\n`;
      }
      teks += `\n`;
    }

                      
    if (data.data.mendatang.event_nasional.length > 0) {
      teks += `*Event Nasional Mendatang:*\n`;
      for (let event of data.data.mendatang.event_nasional) {
        teks += `- ${event.event} (${event.date}) - ${event.daysUntil} hari lagi\n`;
      }
      teks += `\n`;
    }

    if (data.data.mendatang.hari_libur.length > 0) {
      teks += `*Hari Libur Mendatang:*\n`;
      for (let event of data.data.mendatang.hari_libur) {
        teks += `- ${event.event} (${event.date}) - ${event.daysUntil} hari lagi\n`;
      }
      teks += `\n`;
    }

    conn.reply(m.chat, teks, m);
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, "Terjadi kesalahan saat mengambil data.", m);
  }
};

                                   
handler.help = ['harilibur', 'nextlibur'];
handler.tags = ['internet'];
handler.command = /^(harilibur|nextlibur)$/i;

export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
