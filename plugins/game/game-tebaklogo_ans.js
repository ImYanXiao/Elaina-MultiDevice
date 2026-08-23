import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (m.isBaileys || m.fromMe) return
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/Ketik.*hlogo|ᴋᴇᴛɪᴋ.*ʜʟᴏɢᴏ/i.test(m.quoted.text) || /.*hlogo|.*ʜʟᴏɢᴏ/i.test(m.text))
        return !0
    this.tebaklogo = this.tebaklogo ? this.tebaklogo : {}
    let setting = global.db.data.settings[conn.user.jid]
    if (setting.composing)
        await this.sendPresenceUpdate('composing', m.chat)
    if (setting.autoread)
        await this.readMessages([m.key])
    if (!(id in this.tebaklogo))
        return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.tebaklogo[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebaklogo[id][4])
            delete this.tebaklogo[id]
            return m.reply('*Yah Menyerah :( !*')
        }
        let json = JSON.parse(JSON.stringify(this.tebaklogo[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebaklogo[id][2]
            m.reply(`*Benar!*\n+${this.tebaklogo[id][2]} XP`)
            clearTimeout(this.tebaklogo[id][4])
            delete this.tebaklogo[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
            m.reply(`*Dikit Lagi!*`)
        } else if (--this.tebaklogo[id][3] == 0) {
            clearTimeout(this.tebaklogo[id][4])
            delete this.tebaklogo[id]
            conn.reply(m.chat, `*Kesempatan habis!*\nJawaban: *${json.jawaban}*`, m)
        } else m.reply(`*Jawaban Salah!*\nMasih ada ${this.tebaklogo[id][3]} kesempatan`)
    }
    return !0
}
export const exp = 0