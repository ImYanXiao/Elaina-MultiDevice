import fs from 'fs'
import axios from 'axios'
import cheerio from 'cheerio'
import BodyForm from 'form-data'

let handler = async (m, { conn }) => {
    try {
        let q = m.quoted ? m.quoted : m
        let mime = q.mediaType || ''
        if (!/sticker|stickerMessage/.test(mime)) return m.reply('Its not a sticker!')
        if (!q.isAnimated) return m.reply("Its not animation sticker!")
        await global.loading(m, conn)
		let img = await q.download(true)
		let { result } = await webp2mp4File(img)
		let { data } = await conn.getFile(result)
        await conn.sendFile(m.chat, data, '', '', m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['tovideo']
handler.tags = ['sticker']
handler.command = /^(tovideo)$/i
handler.limit = true

export default handler

function webp2mp4File(path) {
	return new Promise((resolve, reject) => {
		 const form = new BodyForm()
		 form.append('new-image-url', '')
		 form.append('new-image', fs.createReadStream(path))
		 axios({
			  method: 'post',
			  url: 'https://ezgif.com/webp-to-mp4',
			  data: form,
			  headers: {
				   'Content-Type': `multipart/form-data; boundary=${form._boundary}`
			  }
		 }).then(({ data }) => {
			  const bodyFormThen = new BodyForm()
			  const $ = cheerio.load(data)
			  const file = $('input[name="file"]').attr('value')
			  bodyFormThen.append('file', file)
			  bodyFormThen.append('convert', "Convert WebP to MP4!")
			  axios({
				   method: 'post',
				   url: 'https://ezgif.com/webp-to-mp4/' + file,
				   data: bodyFormThen,
				   headers: {
						'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
				   }
			  }).then(({ data }) => {
				   const $ = cheerio.load(data)
				   const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
				   resolve({
						status: true,
						message: "Created By Satzz",
						result: result
				   })
			  }).catch(reject)
		 }).catch(reject)
	})
}