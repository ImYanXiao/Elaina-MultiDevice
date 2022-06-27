import fetch from 'node-fetch'
import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let [emoji1, emoji2] = text.split`+`
	if (emoji1 && emoji2) {
		let url = API('violetics', '/api/media/emojimix', { emoji1, emoji2 }, 'apikey')
		let res = await fetch(url)
		if (res.status !== 200) throw res.statusText
		let stiker = await (new Sticker(url)).toMessage()
		conn.sendMessage(m.chat, stiker, { quoted: m })
	} else throw `Ex: ${usedPrefix+command} ${decodeURI('%F0%9F%92%80')}+${decodeURI('%F0%9F%92%80')}`
}
handler.help = ['emojimix']
handler.tags = ['tools']
handler.command = /^(emojimix)$/i

export default handler
