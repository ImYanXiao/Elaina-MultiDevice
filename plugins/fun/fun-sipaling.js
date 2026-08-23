let handler = async (m, { conn, text, groupMetadata, usedPrefix, command }) => {
    if (!text) return m.reply(`Contoh Penggunaan :\n${usedPrefix + command} Alay`)
    let em = ['🥶','🤨','🗿','🤔','😫','🤫','🥴','🤣','😊','😍']
    let toM = a => '@' + a.split('@')[0]
    let ps = groupMetadata.participants.map(v => v.id)
    let a = ps.getRandom()
    let am = em.getRandom()
    conn.reply(m.chat, `Sii Paling *${text}* Adalah ${toM(a)} ${am}`, m, { mentions: [a] })
}
handler.help = ['sipaling']
handler.tags = ['fun']
handler.command = /^sipaling$/i
handler.group = true
export default handler