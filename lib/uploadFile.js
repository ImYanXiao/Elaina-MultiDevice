import fs from 'fs'
import axios from 'axios'
import cheerio from 'cheerio'
import FormData from 'form-data'
import { fileTypeFromBuffer } from 'file-type'

export default async (conn, buffer, type) => {
	let { filename } = await conn.getFile(buffer, true)
	let form = new FormData
	if (/^tele(graph)?$/i.test(type)) {
		form.append('file', fs.createReadStream(filename))
		let data = await req('https://telegra.ph/upload', form, { headers: form.getHeaders() })
		if (data.error) throw data.error
		return `https://telegra.ph/${data[0].src}`
	} else if (/^uguu$/i.test(type)) {
		form.append('files[]', fs.createReadStream(filename))
		let data = await req('https://uguu.se/upload.php', form, { headers: form.getHeaders() })
		return data.files[0].url
	} else if (/^anon(files)?$/i.test(type)) {
		form.append('file', fs.createReadStream(filename))
		let data = await req('https://api.anonfiles.com/upload', form, { headers: form.getHeaders() })
		if (!data.status) throw data.error.message
		let result = await anonget(data.data.file.url.short)
		return result
	} else if (/^pom(f2)?$/i.test(type)) {
	    form.append('file[]', fs.createReadStream(filename))
	    let { data } = await req('https://pomf2.lain.la/upload.php', form, { headers: form.getHeaders() })
	    return data
	} else {
		form.append('files[]', fs.createReadStream(filename))
		let data = await req('https://up1.fileditch.com/upload.php', form, { headers: form.getHeaders() })
		return data.files[0].url
	}
}

async function home() {
	let { data } = await axios.get('https://www.zippyshare.com')
	return 'https://' + data.replace(/\n/g, '').replace(/.+\/\/(www[0-9]+\.zippyshare\.com\/upload).+/g, '$1')
}

async function req(url, body, opt = {}) {
	let { data } = await axios(url, {
		method: 'post', data: body,
		headers: opt.headers,
		maxContentLength: Infinity,
		maxBodyLength: Infinity
	})
	return data
}

async function anonget(link) {
    let result = axios.get(link).then(v => {
        let $ = cheerio.load(v.data)
        let img = $("img#download-preview-image").attr('src')
        return img
    })
    return result
}