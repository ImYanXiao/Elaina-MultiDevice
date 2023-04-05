// Code By Xnuvers007
// https://github.com/Xnuvers007
/////////////////////////////////

let handler = async (m, { conn, text, participants }) => {
  let users = participants.map(u => u.jid).filter(Boolean) // filter element yang tidak valid
  m.reply(text + '\n' + users.map(v => '@' + v.replace(/@.+/, '')).join`\n`, null, {
    contextInfo: { mentionedJid: users }
  })
}

handler.help = ['tagall']
handler.tags = ['group']
handler.command = ['tagall']
handler.admin = true
handler.group = true

export default handler
