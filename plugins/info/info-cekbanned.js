let handler = async (m, { conn, args, usedPrefix, command }) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[who]
    let isSender = who == m.sender
    if (!user.banned) return m.reply(`${isSender ? 'Kamu' : `@${who.split('@')[0]}`} tidak di banned!`, false, { mentions: [who] })
    var now = new Date() * 1
    let caption = `
${isSender ? 'Kamu' : `@${who.split('@')[0]}`} Telah Di Banned ${user.bannedTime == 17 ? 'Permanen' : `
Selama : 
${msToDate(user.bannedTime - now)}`}
`.trim()
    m.reply(caption, false, { mentions: [who] })
}
handler.help = ['cekbanned']
handler.tags = ['info']
handler.command = /^(cek(banned|ban))$/i

export default handler

function msToDate(ms) {
    let temp = ms
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = ms % (60 * 1000);
    let sec = Math.floor((minutesms) / (1000));
    return days + " Days ☀️\n" + hours + " Hours 🕐\n" + minutes + " Minute ⏰";
                        
}
