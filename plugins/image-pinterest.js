import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Example use ${usedPrefix + command} Kanao Tsuyuri`;

  const maxImages = 15; // Jumlah maksimum gambar yang dikirim
  const apiUrl = `https://tr.deployers.repl.co/pinhd?q=${encodeURIComponent(text)}`;

  try {
    const response = await axios.get(apiUrl);
    const imgUrls = response.data.pins;

    for (let i = 0; i < Math.min(maxImages, imgUrls.length); i++) {
      const imageUrl = imgUrls[i];

      conn.sendFile(m.chat, imageUrl, 'pinterest.jpg', `
      *Search result*
->    ${text}
      `.trim(), m);
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    conn.reply(m.chat, 'Error fetching images', m);
  }
};

handler.help = ['pinterest <keyword>'];
handler.tags = ['internet'];
handler.command = /^(pinterest|pin)$/i;

export default handler;
