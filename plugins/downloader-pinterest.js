import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { lookup } from 'mime-types'
import { URL_REGEX } from '@adiwajshing/baileys'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	text = text.endsWith('SMH') ? text.replace('SMH', '') : text 
	if (!text) throw 'Input Query / Pinterest Url'
	let res = await pinterest(text)
	// if (!res) throw res
	let mime = await lookup(res)
	text.match(URL_REGEX) ?
		await conn.sendMessage(m.chat, { [mime.split('/')[0]]: { url: res }, caption: `Succes Download: ${await shortUrl(res)}` }, { quoted: m }) :
	await conn.sendButton(m.chat, `Result From: ${text.capitalize()}`, await shortUrl(res), res, [['Next', `${usedPrefix + command} ${text}`]], m)
}
handler.help = handler.alias = ['pinterest']
handler.tags = ['downloader']
handler.command = /^(pinterest)$/i

export default handler

async function pinterest(query) {
	if (query.match(URL_REGEX)) {
		let res = await fetch('https://www.expertsphp.com/facebook-video-downloader.php', {
			method: 'post',
			body: new URLSearchParams(Object.entries({ url: query }))
		})
		let $ = cheerio.load(await res.text())
		let data = $('table[class="table table-condensed table-striped table-bordered"]').find('a').attr('href')
		if (!data) throw 'Can\'t download post :/'
		return data
	} else {
		let res = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`)
		let json = await res.json()
		let data = json.resource_response.data.results
		if (!data.length) throw `Query "${query}" not found :/`
		return data[~~(Math.random() * (data.length))].images.orig.url
	}
}

async function shortUrl(url) {
	return await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text()
}
