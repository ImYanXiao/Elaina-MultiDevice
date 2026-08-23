import similarity from 'similarity'
const threshold = 0.72                                       
export async function before(m) {
    this.family = this.family ? this.family : {}
    let id = m.chat
    if (m.isBaileys || m.fromMe) return
    if (!(id in this.family))
        return !0
    let room = this.family[id]
    let text = m.text.toLowerCase().replace(/[^\w\s\-]+/, '')
    let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
    if (!isSurrender) {
        let index = room.jawaban.indexOf(text)
        if (index < 0) {
            if (Math.max(...room.jawaban.filter((_, index) => !room.terjawab[index]).map(jawaban => similarity(jawaban, text))) >= threshold)
                m.reply('Dikit lagi!')
            return !0
        }
        if (room.terjawab[index])
            return !0
        let users = global.db.data.users[m.sender]
        room.terjawab[index] = m.sender
        users.exp += room.winScore
    }
    let setting = global.db.data.settings[conn.user.jid]
    if (setting.composing)
        await this.sendPresenceUpdate('composing', m.chat)
    if (setting.autoread)
        await this.readMessages([m.key])

    let isWin = room.terjawab.length === room.terjawab.filter(v => v).length
    let caption = `
*Soal:* ${room.soal}
Terdapat *${room.jawaban.length}* jawaban${room.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
` : ''}
${isWin ? `*SEMUA JAWABAN TERJAWAB*` : isSurrender ? '*MENYERAH!*' : ''}
${Array.from(room.jawaban, (jawaban, index) => {
        return isSurrender || room.terjawab[index] ? `(${index + 1}) ${jawaban} ${room.terjawab[index] ? '@' + room.terjawab[index].split('@')[0] : ''}`.trim() : false
    }).filter(v => v).join('\n')}
${isSurrender ? '' : `+${room.winScore} XP tiap jawaban benar`}
    `.trim()
    const msg = await this.reply(m.chat, caption, null, { mentions: this.parseMention(caption) })
    room.msg = msg
    if (isWin || isSurrender)
        delete this.family[id]
    return !0
}
