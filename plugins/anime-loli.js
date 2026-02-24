/*import Booru from 'booru'
import fetch from 'node-fetch'
let sites = ['sb', 'kn', 'kc']

let handler = async (m, { conn, usedPrefix, command }) => {
	let res = await Booru.search(sites.getRandom(), ['loli'], { random: true })
	let url = res[0].fileUrl
	conn.sendButton(m.chat, 'Random Image Loli', await shortUrl(url), url, [['Next', usedPrefix + command]], m)
}
handler.help = ['loli']
handler.tags = ['weebs']
handler.command = /^(loli)$/i

export default handler

async function shortUrl(url) {
	return await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text()
}*/