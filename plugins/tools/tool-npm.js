import fetch from 'node-fetch'

let handler = async (m, { text }) => {
	if (!text) return m.reply('Input Query')
	let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
	let { objects } = await res.json()
	if (!objects.length) return m.reply(`Query "${text}" not found :/`)
	let txt = objects.map(({ package: pkg }) => {
		return `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`
	}).join`\n\n`
	m.reply(txt)
}
handler.help = ['npmsearch']
handler.tags = ['tools']
handler.command = /^npm(js|search)?$/i

export default handler
