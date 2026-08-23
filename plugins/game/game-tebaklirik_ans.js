import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (m.isBaileys || m.fromMe) return
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/Ketik.*terik|ᴋᴇᴛɪᴋ.*ᴛᴇʀɪᴋ/i.test(m.quoted.text) || /.*terik|.*ᴛᴇʀɪᴋ/i.test(m.text))
        return !0
    this.tebaklirik = this.tebaklirik ? this.tebaklirik : {}
    let setting = global.db.data.settings[conn.user.jid]
    if (setting.composing)
        await this.sendPresenceUpdate('composing', m.chat)
    if (setting.autoread)
        await this.readMessages([m.key])
    if (!(id in this.tebaklirik))
        return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.tebaklirik[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebaklirik[id][4])
            delete this.tebaklirik[id]
            return m.reply('*Yah Menyerah :( !*')
        }
        let json = JSON.parse(JSON.stringify(this.tebaklirik[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebaklirik[id][2]
            m.reply(`*Benar!*\n+${this.tebaklirik[id][2]} XP`)
            clearTimeout(this.tebaklirik[id][4])
            delete this.tebaklirik[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
            m.reply(`*Dikit Lagi!*`)
        } else if (--this.tebaklirik[id][3] == 0) {
            clearTimeout(this.tebaklirik[id][4])
            delete this.tebaklirik[id]
            conn.reply(m.chat, `*Kesempatan habis!*\nJawaban: *${json.jawaban}*`, m)
        } else m.reply(`*Jawaban Salah!*\nMasih ada ${this.tebaklirik[id][3]} kesempatan`)
    }
    return !0
}
export const exp = 0