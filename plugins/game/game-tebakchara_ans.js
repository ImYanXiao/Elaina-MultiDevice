import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (m.isBaileys || m.fromMe) return
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/Ketik.*hcha|ᴋᴇᴛɪᴋ.*ʜᴄʜᴀ/i.test(m.quoted.text) || /.*hcha|.*ʜᴄʜᴀ/i.test(m.text))
        return !0
    this.tebakchara = this.tebakchara ? this.tebakchara : {}
    let setting = global.db.data.settings[conn.user.jid]
    if (setting.composing)
        await this.sendPresenceUpdate('composing', m.chat)
    if (setting.autoread)
        await this.readMessages([m.key])
    if (!(id in this.tebakchara))
        return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.tebakchara[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebakchara[id][4])
            delete this.tebakchara[id]
            return m.reply('*Yah Menyerah :( !*')
        }
        let json = JSON.parse(JSON.stringify(this.tebakchara[id][1]))
        if (m.text.toLowerCase() == json.name.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakchara[id][2]
            m.reply(`*Benar!*\n+${this.tebakchara[id][2]} XP`)
            clearTimeout(this.tebakchara[id][4])
            delete this.tebakchara[id]
        } else if (similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold) {
            m.reply(`*Dikit Lagi!*`)
        } else if (--this.tebakchara[id][3] == 0) {
            clearTimeout(this.tebakchara[id][4])
            delete this.tebakchara[id]
            conn.reply(m.chat, `*Kesempatan habis!*\nJawaban: *${json.jawaban}*`, m)
        } else m.reply(`*Jawaban Salah!*\nMasih ada ${this.tebakchara[id][3]} kesempatan`)
    }
    return !0
}
export const exp = 0