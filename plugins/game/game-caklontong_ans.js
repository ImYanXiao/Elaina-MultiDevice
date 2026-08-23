import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (m.isBaileys || m.fromMe) return
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/Ketik.*calo|ᴋᴇᴛɪᴋ.*ᴄᴀʟᴏ/i.test(m.quoted.text) || /.*(calo|bantuan)|.*(ᴄᴀʟᴏ|ʙᴀɴᴛᴜᴀɴ)/i.test(m.text))
        return !0
    this.caklontong = this.caklontong ? this.caklontong : {}
    let setting = global.db.data.settings[conn.user.jid]
    if (setting.composing)
        await this.sendPresenceUpdate('composing', m.chat)
    if (setting.autoread)
        await this.readMessages([m.key])
    if (!(id in this.caklontong))
        return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.caklontong[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.caklontong[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.caklontong[id][2]
            await this.reply(m.chat, `*Benar!* +${this.caklontong[id][2]} XP\n${json.deskripsi}`, m)
            clearTimeout(this.caklontong[id][4])
            delete this.caklontong[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
            m.reply(`*Dikit Lagi!*`)
        } else if (--this.caklontong[id][3] == 0) {
            clearTimeout(this.caklontong[id][4])
            delete this.caklontong[id]
            conn.reply(m.chat, `*Kesempatan habis!*\nJawaban: *${json.jawaban}*`, m)
        } else m.reply(`*Jawaban Salah!*\nMasih ada ${this.caklontong[id][3]} kesempatan`)
    }
    return !0
}
export const exp = 0