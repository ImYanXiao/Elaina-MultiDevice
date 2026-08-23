import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (m.isBaileys || m.fromMe) return
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/Ketik.*hgame|ᴋᴇᴛɪᴋ.*ʜɢᴀᴍᴇ/i.test(m.quoted.text) || /.*hgame|.*ʜɢᴀᴍᴇ/i.test(m.text))
        return !0
    this.tebakgame = this.tebakgame ? this.tebakgame : {}
    let setting = global.db.data.settings[conn.user.jid]
    if (setting.composing)
        await this.sendPresenceUpdate('composing', m.chat)
    if (setting.autoread)
        await this.readMessages([m.key])
    if (!(id in this.tebakgame))
        return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.tebakgame[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebakgame[id][4])
            delete this.tebakgame[id]
            return m.reply('*Yah Menyerah :( !*')
        }
        let json = JSON.parse(JSON.stringify(this.tebakgame[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakgame[id][2]
            m.reply(`*Benar!*\n+${this.tebakgame[id][2]} XP`)
            clearTimeout(this.tebakgame[id][4])
            delete this.tebakgame[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
            m.reply(`*Dikit Lagi!*`)
        } else if (--this.tebakgame[id][3] == 0) {
            clearTimeout(this.tebakgame[id][4])
            delete this.tebakgame[id]
            conn.reply(m.chat, `*Kesempatan habis!*\nJawaban: *${json.jawaban}*`, m)
        } else m.reply(`*Jawaban Salah!*\nMasih ada ${this.tebakgame[id][3]} kesempatan`)
    }
    return !0
}
export const exp = 0