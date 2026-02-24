const { default: { Image }} = await import('node-webpmux')
import { Sticker } from 'wa-sticker-formatter'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, text }) => {
	
	let stiker = false
	var p = m.quoted ? m.quoted : m
    var q = await p.download() 
    var mime = p.mimetype || p.msg|| p.mediaType || ''
	let img;
	try { 
	if (/webp/g.test(mime)) {
		img = await m.quoted.download()
		 } else if (/image/g.test(mime)) {
	    img = await createSticker(q, false, packname || '', author || '')
	     } else if (/jpeg/g.test(mime)) {
	    img = await createSticker(q, false, packname || '', author || '')
	    } else throw 'kirim/reply gmbar/sticker!'
        } finally {}
	try {
		let [packname, ...author] = text.split('|')
		author = (author || []).join('|')
		stiker = await addExif(img, packname || '', author || '' )
	} catch (e) {
		console.error(e)
		if (Buffer.isBuffer(e)) stiker = e
	} finally {
		if (stiker) conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m })
		else throw 'Conversion failed'
	}
}
handler.help = ['smeta']
handler.tags = ['sticker']
handler.command = /^(smeta)$/i

export default handler

async function addExif(buffer, packname, author, categories = [''], extra = {}) {
	const img = new Image()
	const json = { 'sticker-pack-id': 'Stc By Elaina', 'sticker-pack-name': packname, 'sticker-pack-publisher': author, 'emojis': categories, 'is-avatar-sticker': 1, ...extra }
	let exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
	let jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8')
	let exif = Buffer.concat([exifAttr, jsonBuffer])
	exif.writeUIntLE(jsonBuffer.length, 14, 4)
	await img.load(buffer)
	img.exif = exif
	return await img.save(null)
}

async function createSticker(img, url, packName, authorName, quality) {
	let stickerMetadata = {
		type: 'full',
		pack: packName,
		author: authorName,
		quality
	}
	return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}