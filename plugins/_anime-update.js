import axios from 'axios'
import cheerio from 'cheerio'
import { lookup } from 'mime-types'
import { extract } from 'zs-extract'

export async function before(m) {
	let chat = db.data.chats[m.chat] || {}
	if (!chat.lastAnime) chat.lastAnime = []
	if (chat && chat.updateAnime) {
		let lastAnime = chat.lastAnime
		setInterval(async () => {
			conn.logger.info(`Checking anime for "${m.chat}"`)
			let { title, cover, url } = (await getLatestAnime())[0]
			if (lastAnime.includes(title)) return conn.logger.info(`${title} already sent to "${m.chat}"`)
			let length = lastAnime[lastAnime.length - 1]
			lastAnime.push(title)
			if (lastAnime.indexOf(length) !== -1) lastAnime.splice(lastAnime.indexOf(length), 1)
			conn.logger.info(`Sending anime ${title} to "${m.chat}"`)
			let detailAnime = await getDetailAnime(url), download = detailAnime.download
			let txt = parseResult(detailAnime, { title: '*ANIME UPDATE*', ignoreKey: ['update', 'cover', 'download'] })
			let list = Object.keys(download).map(v => parseResult(download[v], { headers: `*• ${v}:*`, body: ' - Quality: %key\n - Url: %value' }))
			let zippy = download['Zippy']
			let templateButtons = [{ urlButton: { displayText: 'Source', url }}]
			let quoted = await conn.sendMessage(m.chat, { image: { url: cover }, caption: `${txt}\n*• Download:*\n${list.join('\n')}`, footer: detailAnime.update, templateButtons })
			if (/Movie/.test(detailAnime.episode)) return conn.reply(m.chat, 'Bot tidak dapat mengirim file video karena terlalu besar...', quoted)
			let res = await downloadAnime(zippy?.['480p'] || zippy?.['720p'] || zippy?.['360p']).catch(() => null)
			if (!res) return conn.reply(m.chat, 'Link download belum tersedia...', quoted)
			await conn.sendMessage(m.chat, { document: { url: res?.download }, fileName: res?.filename, mimetype: res?.mimetype }, { quoted })
		}, 5*60*1000) // 10 minutes 10*60*1000
	}
}

function parseResult(json, options) {
    // github: https://github.com/Zobin33/Anu-Wabot/blob/master/lib/functions.js#L81
	let opts = {
		unicode: true,
		ignoreVal: [null, undefined],
		ignoreKey: [],
		title: ' ',
		headers: `%title\n`,
		body: `*• %key:* %value`,
		footer: '\n',
		...options
	}
	let { unicode, ignoreKey, title, headers, ignoreVal, body, footer } = opts
	let obj = Object.entries(json), tmp = []
	for (let [_key, val] of obj) {
		if (ignoreVal.indexOf(val) !== -1) continue
		let key = _key.capitalize(), type = typeof val
		if (ignoreKey && ignoreKey.includes(_key)) continue
		switch (type) {
			case 'boolean':
				tmp.push([key, val ? true : false])
			break
			case 'object':
				if (Array.isArray(val)) tmp.push([key, val.join(', ')])
				else tmp.push([key, parseResult(val, { ignoreKey, unicode: false })])
			break
			default:
				tmp.push([key, val])
			break
		}
	}
	if (unicode) {
		let text = [
			headers.replace(/%title/g, title), tmp.map((v) => {
				return body.replace(/%key/g, v[0]).replace(/%value/g, v[1])
			}).join('\n'), footer
		]
		return text.join('\n').trim()
	}
	return tmp
}

async function downloadAnime(url) {
	// url = url?.['Zippy']?.['480p'] || url?.['Zippy']?.['360p']
	let res = await extract(url)
	let mimetype = await lookup(res.download)
	return { ...res, mimetype }
}

async function getLatestAnime() {
	let html = (await axios.get('https://62.182.83.93/')).data
	let $ = cheerio.load(html), arr = []
	$('div.home_index > a').each((idx, el) => {
		arr.push({
			title: $(el).attr('title'),
			cover: $(el).find('div.amv > amp-img').attr('src'),
			url: $(el).attr('href')
		})
	})
	return arr
}

async function getDetailAnime(url) {
	let html = (await axios.get(url)).data
	let $ = cheerio.load(html), obj = {}
	obj.title = $('div.pagetitle > h1').text().trim().replace(/Subtitle Indonesia/, '')
	obj.episode = /Episode/.test(obj.title) ? obj.title.split(' Episode ')[1] : 'Movie'
	obj.update = $('div.breadcrumb > span > time').attr('datetime')
	$('div.contenttable > table > tbody > tr').each((idx, el) => {
		let text = $(el).find('th').text().toLowerCase()
		if (/semua/.test(text)) return
		obj[text] = $(el).find('td').text()
	})
	obj.sinopsis = $('div.contentdeks').text().trim() || $('div.unduhan').eq(0).text().trim()
	obj.cover = $('div.sisi > amp-img').attr('src')
	obj.download = {}
	$('#colomb > p > span').each((idx, el) => {
		let site = $(el).find('span').text()
		obj.download[site] = {}
		$(el).find('a').each((idx2, el2) => {
			let quality = $(el2).text().replace('SD', '').toLowerCase()
			obj.download[site][quality] = $(el2).attr('href')
		})
	})
	return obj
}