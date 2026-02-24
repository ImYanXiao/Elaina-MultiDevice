let timeout = 120000
let poin = 1000
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
    let id = m.chat
     if (id in conn.tebakgambar) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakgambar[id][0]);
        throw false;
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')).json();
    let json = src[Math.floor(Math.random() * src.length)]; // Pilih soal acak dari JSON
    let imgr = await json.img
    // if (!json.status) throw json
    let caption = `
    ${json.deskripsi}
    
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}tega untuk bantuan
Ketik menyerah untuk mengakhiri permainan
Bonus: ${poin} XP
    `.trim()
    conn.tebakgambar[id] = [
        await conn.sendFile(m.chat, imgr, '', caption, m), // Kirim gambar soal ke chat
        json, // Simpan soal untuk referensi nanti
        poin, // Simpan poin yang ditawarkan
        setTimeout(() => {
            if (conn.tebakgambar[id]) {
                conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakgambar[id][0]);
                delete conn.tebakgambar[id]; // Hapus soal dari objek tebakgambar setelah waktu habis
            }
        }, timeout) // Timer untuk batas waktu
    ];
}
handler.help = ['tebakgambar']
handler.tags = ['game']
handler.command = /^tebakgambar/i

export default handler