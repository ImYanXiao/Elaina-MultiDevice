/*const gis = (await import('async-g-i-s')).default

var handler = async (m, { conn, text, usedPrefix, command }) => {
	// text = text.endsWith('SMH') ? text.replace('SMH', '') : text 
	if (!text) throw 'Input Query'
	let res = await gis(text)
	let data = res.filter(v => /jpg|png|jpeg/.test(v.url)).getRandom()
	if (!data?.url) throw `Query "${text}" Not Found :/`
	conn.sendFile(m.chat, data.url, 'file.jpg', `Result From: ${text.capitalize()}\n` + await shortUrl(data.url), m)
}
handler.help = ['gimage <query>', 'image <query>']
handler.tags = ['internet', 'tools']
handler.command = /^(gimage|image)$/i

export default handler

async function shortUrl(url) {
	return await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text()
}*/