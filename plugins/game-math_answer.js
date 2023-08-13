let handler = m => m

handler.before = async function (m) {
    if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/^Berapa hasil dari/i.test(m.quoted.text)) return !0
    this.math = this.math ? this.math : {}
    if (!(id in this.math)) return conn.reply(m.chat, 'Soal itu telah berakhir', m)
    if (m.quoted.id == this.math[id][0].id) {
        let math = JSON.parse(JSON.stringify(this.math[id][1]))
        if (m.text == math.result) {
            global.db.data.users[m.sender].exp += math.bonus
            clearTimeout(this.math[id][3])
            delete this.math[id]
            conn.reply(m.chat, `*Jawaban Benar!*\n+${math.bonus} XP`, m)
            conn.sendFile(m.chat, 'https://cdn.pnghd.pics/data/904/simbol-ceklis-png-22.jpg', 'jawaban_benar.jpg', 'Selamat, jawaban kamu benar!', m)
        } else {
            if (--this.math[id][2] == 0) {
                clearTimeout(this.math[id][3])
                delete this.math[id]
                conn.reply(m.chat, `*Kesempatan habis!*\nJawaban: *${math.result}*`, m)
            } else conn.reply(m.chat, `*Jawaban Salah!*\nMasih ada ${this.math[id][2]} kesempatan`, m)
          conn.sendFile(m.chat, 'https://cdn.pnghd.pics/data/559/gambar-tanda-silang-0.jpg', 'jawaban_salah.jpg', 'Sayang sekali, jawaban kamu salah!', m)
        }
    }
    return !0
}

export default handler
