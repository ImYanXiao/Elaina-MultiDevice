import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*suka/i.test(m.quoted.contentText)) 
      return !0
    this.susunkata = this.susunkata ? this.susunkata : {}
    if (!(id in this.susunkata)) 
        return conn.sendButton(m.chat, 'Soal itu telah berakhir', author, buttonSusunkata1, m) 
                let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
        	clearTimeout(this.susunkata[id][3])
            delete this.susunkata[id]
            return conn.sendButton(m.chat, '*Yah Menyerah :( !*', author, null, buttonSusunkata1, m)
        }
    if (m.quoted.id == this.susunkata[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.susunkata[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.susunkata[id][2]
            await this.sendButton(m.chat, `*Benar!* +${this.susunkata[id][2]} XP`, author, buttonSusunkata1,m)
            clearTimeout(this.susunkata[id][3])
            delete this.susunkata[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) 
             m.reply(`*Dikit Lagi!*`)
        else
            conn.sendButton(m.chat, `*Salah!*`, author, null, [
                ['hint', '/suka'],
                ['nyerah', 'menyerah']
            ], m)
    }
    return !0
}
export const exp = 0

const buttonSusunkata1 = [
    ['susunkata', '/susunkata']
]