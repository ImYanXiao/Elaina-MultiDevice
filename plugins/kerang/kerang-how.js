let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) return m.reply('Masukan Text!')
    let caption = `
${command} *${text}*
*${text}* is *${(101).getRandom()}*% ${command.replace('how', '').toUpperCase()}
`.trim()
    conn.reply(m.chat, caption, m, { mentions: await conn.parseMention(caption) })
}
handler.help = ['gay', 'pintar', 'cantik', 'ganteng', 'gabut', 'gila', 'lesbi', 'stress', 'bucin', 'jones', 'sadboy'].map(v => 'how' + v)
handler.tags = ['kerang']
handler.command = /^how(gay|pintar|cantik|ganteng|gabut|gila|lesbi|stress?|bucin|jones|sadboy)/i

export default handler