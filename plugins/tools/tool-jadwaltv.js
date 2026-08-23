import { jadwalTV } from '../../lib/scrape.js'

let handler = async (m, { text }) => {
	if (!text) return m.reply('Input Query')
	let res = await jadwalTV(text)
	let txt = res.result.map((v) => `[${v.jam.replace('WIB', ' WIB')}] ${v.acara}`).join`\n`
	m.reply(`Jadwal TV ${res.channel}\n\n${txt}`)
}
handler.help = ['jadwaltv']
handler.tags = ['tools']
handler.command = /^jadwaltv$/i

export default handler