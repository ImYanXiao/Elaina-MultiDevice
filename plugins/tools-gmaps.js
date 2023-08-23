var handler = async (m, { conn, text, usedPrefix, command }) => {
	let [dari, ke] = text.split('|') 
	if (!dari || !ke) throw `Ex: ${usedPrefix + command} pekalongan|sukabumi`
	let result = await jarak(from, to)
	if (result.img) return conn.sendMessage(m.chat, { image: result.img, caption: result.desc }, { quoted: m })
	else m.reply(result.desc)
}

handler.help = ['jarak', 'gmaps'].map(v => v + ' dari|ke')
handler.tags = ['tools']
handler.command = /^(jarak|gmaps)$/i

export default handler

import axios from 'axios'
import cheerio from 'cheerio'

async function jarak(dari, ke) {
	let html = (await axios(`https://www.google.com/search?q=${encodeURIComponent('jarak ' + dari + ' ke ' + ke)}&hl=id`)).data
	let $ = cheerio.load(html), obj = {}
	let img = html.split("var s=\'")?.[1]?.split("\'")?.[0]
	obj.img = /^data:.*?\/.*?;base64,/i.test(img) ? Buffer.from(img.split`,` [1], 'base64') : ''
	obj.desc = $('div.BNeawe.deIvCb.AP7Wnd').text()?.trim()
	return obj
}
