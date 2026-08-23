import { sfile } from '../../lib/scrape.js'

let handler = async (m, { conn, args, usedPrefix: _p, command: cmd }) => {
	if (args[0] && args[0].match(/(https:\/\/sfile.mobi\/)/gi)) {
		let res = await sfile.download(args[0])
		await m.reply(Object.keys(res).map(v => `*• ${v.capitalize()}:* ${res[v]}`).join('\n') + '\n\n_Sending file..._')
		await conn.sendFile(m.chat, res.download, res.filename, '', m, false, { mimetype: res.mimetype, asDocument: true })
	} else if (args[0]) {
		let query = args.join` `.split`|`[0], page = parseInt(args.join` `.split`|`[1]) || 1,
			res = await sfile.search(query, page)
		if (!res.length) return m.reply(`Query "${query}" not found`)
		res = res.map(v => `*Title:* ${v.title}\n*Size:* ${v.size}\n*Link:* ${v.link}`).join`\n\n`
		await conn.reply(m.chat, res + `\nPage: ${page}`, m)
	} else return m.reply(`Masukan Query Atau Link!\n\nContoh:\n${_p + cmd} growtopia\n${_p + cmd} https://sfile.mobi/1BnLYfsHEcO7`)
}
handler.help = ['sfile']
handler.tags = ['downloader']
handler.command = /^(sfile)$/i
handler.limit = true
export default handler

