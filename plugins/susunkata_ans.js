import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*suka/i.test(m.quoted.text) || /.*suka/i.test(m.text))
        return !0
    this.susunkata = this.susunkata ? this.susunkata : {}
    if (!(id in this.susunkata))
        return conn.sendButton(m.chat, 'Soal itu telah berakhir', author, null, buttonsusunkata, m)
    if (m.quoted.id == this.susunkata[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.susunkata[id][3])
            delete this.susunkata[id]
            return conn.sendButton(m.chat, '*Yah Menyerah :( !*', author, null, buttonsusunkata, m)
        }
        let json = JSON.parse(JSON.stringify(this.susunkata[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.susunkata[id][2]
            conn.sendButton(m.chat, `*Benar!*\n+${this.susunkata[id][2]} XP`, author, null, buttonsusunkata, m)
            clearTimeout(this.susunkata[id][3])
            delete this.susunkata[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            conn.sendButton(m.chat, `*Salah!*`, author, null, [
                ['Hint', '/suka'],
                ['Nyerah', 'menyerah']
            ], m)
    }
    return !0
}
export const exp = 0

const buttonsusunkata = [
    ['susunkata', '/susunkata']
]
