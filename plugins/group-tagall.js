let handler = async (m, { conn, text, participants }) => {
	let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    conn.reply(m.chat, `${text ? `${text}\n\n` : ''}` + users.map(v => '│◦❒ @' + v.replace(/@.+/, '')).join`\n`, null, { contextInfo : { mentionedJid:users}})
}

handler.help = ['tagall']
handler.tags = ['group']
handler.command = /^(tagall)$/i
handler.admin = handler.group = true

export default handler
