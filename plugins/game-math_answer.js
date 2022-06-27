let handler = m => m
handler.before = async function (m) {
    if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/^Berapa hasil dari/i.test(m.quoted.text)) return !0
    this.math = this.math ? this.math : {}
    if (!(id in this.math)) return conn.sendButton(m.chat, 'Soal itu telah berakhir', author, null, [['math', '/math']], m)
    if (m.quoted.id == this.math[id][0].id) {
        let math = JSON.parse(JSON.stringify(this.math[id][1]))
        if (m.text == math.result) {
            global.db.data.users[m.sender].exp += math.bonus
            clearTimeout(this.math[id][3])
            delete this.math[id]
            conn.sendButton(m.chat, `*Jawaban Benar!*\n+${math.bonus} XP`, author, null, [['again', `/math ${math.mode}`]], m)
        } else {
            if (--this.math[id][2] == 0) {
                clearTimeout(this.math[id][3])
                delete this.math[id]
                conn.sendButton(m.chat, `*Kesempatan habis!*\nJawaban: *${math.result}*`, author, null, [['again', `/math ${math.mode}`]], m)
            } else m.reply(`*Jawaban Salah!*\nMasih ada ${this.math[id][2]} kesempatan`)
        }
    }
    return !0
}

export default handler