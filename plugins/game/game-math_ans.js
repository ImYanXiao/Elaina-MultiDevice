export async function before(m) {
    if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0
    let id = m.chat
    if (m.isBaileys || m.fromMe) return
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/^Berapa hasil dari|ʙᴇʀᴀᴘᴀ ʜᴀꜱɪʟ ᴅᴀʀɪ/i.test(m.quoted.text)) return !0
    this.math = this.math ? this.math : {}
    let setting = global.db.data.settings[conn.user.jid]
    if (setting.composing)
        await this.sendPresenceUpdate('composing', m.chat)
    if (setting.autoread)
        await this.readMessages([m.key])
    if (!(id in this.math)) return conn.reply(m.chat, 'Soal itu telah berakhir', m)
    if (m.quoted.id == this.math[id][0].id) {
        let math = JSON.parse(JSON.stringify(this.math[id][1]))
        if (m.text == math.result) {
            global.db.data.users[m.sender].exp += math.bonus
            clearTimeout(this.math[id][3])
            delete this.math[id]
            conn.reply(m.chat, `*Jawaban Benar!*\n+${math.bonus} XP`, m)
        } else {
            if (--this.math[id][2] == 0) {
                clearTimeout(this.math[id][3])
                delete this.math[id]
                conn.reply(m.chat, `*Kesempatan habis!*\nJawaban: *${math.result}*`, m)
            } else m.reply(`*Jawaban Salah!*\nMasih ada ${this.math[id][2]} kesempatan`)
        }
    }
    return !0
}