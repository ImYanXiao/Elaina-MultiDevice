let handler = async (m, { text }) => {
  let mentionedJid = [m.sender]
  let user = global.db.data.users[m.sender]
  user.afk = + new Date
  user.afkReason = text
  conn.reply(m.chat, '@' + m.sender.split('@')[0] + 
` is now AFK${text ? ': ' + text : ''}
`, m, { contextInfo : { mentionedJid}}) 
}
handler.help = ['afk [alasan]']
handler.tags = ['main']
handler.command = /^afk$/i

export default handler