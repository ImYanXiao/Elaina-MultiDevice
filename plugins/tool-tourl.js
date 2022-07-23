import fs from 'fs'
import fetch from 'node-fetch'
import FormData from 'form-data'

let handler = async (m) => {
	let q = m.quoted ? m.quoted : m
	let mime = q.mediaType || ''
	if (/image|video|audio|sticker|document/.test(mime)) {
		let media = await q.download(true)
		let data = await uploadFile(media)
		m.reply(data.files[0].url)
	} else throw 'No media found'
}
handler.help = ['tourl']
// handler.tags = ['tools']
handler.command = /^(tourl)$/i

export default handler

async function uploadFile(path) {
	let form = new FormData()
	form.append('files[]', fs.createReadStream(path))
	let res = await (await fetch('https://uguu.se/upload.php', {
		method: 'post',
		headers: {
			...form.getHeaders()
		},
		body: form
	})).json()
	await fs.promises.unlink(path)
	return res
}
