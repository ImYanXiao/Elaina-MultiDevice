let handler = async (m, { conn }) => { 
    conn.tebakgambar = conn.tebakgambar || {};

    let id = m.chat;

    // Cek apakah ada permainan tebak gambar yang sedang berlangsung
    if (!(id in conn.tebakgambar)) throw false;

    let json = conn.tebakgambar[id][1];

    // Mengganti huruf vokal dengan underscore (_) untuk memberikan bantuan
    conn.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m);
}

handler.command = /^tega$/i;
handler.limit = true;

export default handler;