let handler = async (m, { conn, text, participants }) => {
	let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    m.reply(`${text ? `${text}\n\n` : ''}` + users.map(v => '│◦❒ @' + v.replace(/@.+/, '')).join`\n`, null, { mentions: users })
}

handler.help = ['tagall']
handler.tags = ['owner']
handler.command = /^(otagall)$/i
handler.owner = true
handler.group = true

export default handler