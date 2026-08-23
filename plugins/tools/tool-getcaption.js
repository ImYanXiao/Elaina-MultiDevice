let handler = async (m, { conn }) => {
	let caption = null
	if (!m.quoted) return m.reply('Reply a message!')
	if (/template/.test(m.quoted.mtype)) caption = m.quoted.mediaMessage[Object.keys(m.quoted.mediaMessage)[0]].caption 
	else if (/product/.test(m.quoted.mtype)) caption = m.quoted.product.title + '\n' + m.quoted.product.description
	else if (/order/.test(m.quoted.mtype)) caption = m.quoted.message
	else caption = m.quoted.text
	m.reply(caption, m.chat, { mentions: conn.parseMention(caption) })
}
handler.help = ['getcaption']
handler.tags = ['tools']
handler.command = /^(getcaption)$/i

export default handler