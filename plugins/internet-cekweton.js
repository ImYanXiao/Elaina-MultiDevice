import axios from "axios";

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (args.length < 1) {
      throw `> Usage: ${usedPrefix + command} tg|bl|th\nHarap berikan tg, bl, dan th (Tanggal, Bulan, Tahun)\nEx: 1|1|2000`;
    }

    const [tg, bl, th] = args[0].split("|");

    if (!tg || !bl || !th) {
      throw "Harap berikan tg, bl, dan th (Tanggal, Bulan, Tahun)";
    }

    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const monthName = months[parseInt(bl) - 1];

    const date = new Date(`${th}-${bl}-${tg}`);
    const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const dayOfWeek = daysOfWeek[date.getDay()];

    await conn.reply(
      m.chat,
      "Tunggu sebentar kak, sedang mengambil data weton...",
      m
    );

    const response = await axios.get(
      `https://bioskop-six.vercel.app/cekweton?tg=${tg}&bl=${bl}&th=${th}`
    );

    const data = response.data;

    if (data.error) {
      throw data.error;
    }

    let message = `*CEK WETON*\n\nTanggal: ${tg} ${monthName} ${th} (${dayOfWeek})\n\n`;

    message += `Wuku: ${data[0].wuku}\n\nKarakteristik:\n`;
    data[0].details.forEach((detail) => {
      message += `- ${detail}\n`;
    });

    message += `\nPasaran: ${data[0].pasaran || 'Tidak ada informasi pasaran'}\n`;

    if (data[1]) {
      message += `\nWuku: ${data[1].wuku}\nArtinya:\n`;
      data[1].daftar.forEach((item) => {
        message += `- ${item}\n`;
      });

      // Don't remove the watermark/my copyright, respect for me who create this
      message += `\n> Created by Xnuvers007|Luckysora007\n> https://github.com/Xnuvers007`

      await conn.sendFile(m.chat, data[1].image, "weton_image.jpg", message, m);
      return;
    }

    await conn.reply(m.chat, message, m);
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, error, m);
  }
};

handler.help = ["cekweton"];
handler.tags = ["primbon"];
handler.command = /^(cekweton|weton|primbon|primbonjawa|tanggalanjawa|tanggaljawa)$/i;

export default handler;
