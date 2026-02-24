let toM = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata }) {
    let ps = groupMetadata.participants.map(v => v.id)
    let a = ps.getRandom()
    let b
    do b = ps.getRandom()
    while (b === a)
   return conn.reply(m.chat, `${toM(a)} ❤️ ${toM(b)}`, m, {
        contextInfo : { mentionedJid: [a, b]}
    })
}
handler.help = ['jadian']
handler.tags = ['main', 'fun']
handler.command = ['jadian']

handler.group = true

export default handler