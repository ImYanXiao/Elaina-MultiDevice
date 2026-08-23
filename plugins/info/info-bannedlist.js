let handler = async (m, { jid, conn, usedPrefix }) => {
    let chats = Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned)
    let users = Object.entries(global.db.data.users).filter(user => user[1].banned)
    let now = new Date() * 1
    m.reply(`
┌ *Daftar Chat Terbanned*
│ Total : ${chats.length} Chat${chats ? '\n' + chats.map(([jid], i) => `
│ ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
│ ${jid}
│ ${now - global.db.data.chats[jid].isBannedTime < 0 ? msToDate(global.db.data.chats[jid].isBannedTime - now) : 'Banned Permanen'}
`.trim()).join('\n│\n') : ''}
└────

┌ *Daftar User Terbanned*
│ Total : ${users.length} User ${users ? '\n' + users.map(([jid], i) => `
│ ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
│ ${jid}
│ ${now - global.db.data.users[jid].bannedTime < 0 ? msToDate(global.db.data.users[jid].bannedTime - now) : 'Banned Permanen'}
`.trim()).join('\n│\n') : ''}
└────
`.trim())
}
handler.help = ['bannedlist']
handler.tags = ['info']
handler.command = /^listban(ned)?|ban(ned)?list|daftarban(ned)?$/i
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
    return days + " Days " + hours + " Hours "  + minutes + " Minute"
}