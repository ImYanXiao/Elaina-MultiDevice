const { default: { Image }} = await import('node-webpmux')
import fs from 'fs'
import fetch from 'node-fetch'

export async function all(m) {

let pp = await this.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
let stc = await fs.readFileSync('./sticker/tag.webp')
let bot = await fs.readFileSync('./sticker/tagbot.webp')
let a = pickRandom(['1', '2', '3', '4', '5', '7']) 
let b = await fs.readFileSync('./sticker/ress' + a + '.webp') 
let c = pickRandom(['1', '2']) 
let ppe = await fs.readFileSync('./sticker/own/' + c + '.jpg') 
let pp2 = await this.profilePictureUrl(m.sender, 'image').catch(_ => c) 
let gw = '6285736178354@s.whatsapp.net'
var me = ('6285736178354@s.whatsapp.net').includes(m.sender)

var stik = await addExif(bot, 'I Hope U Okay', 'Elainaa?')
var own = await addExif(stc, 'I Hope U Okay', 'Elainaa?')
var my = await addExif(b, 'I Hope U Okay', 'Elainaa?')


    if (m.isBaileys) return
    if (m.chat.endsWith('broadcast')) return

// Owner Ngetag
try {
    if (
        m.mentionedJid.includes(this.user.jid) &&
        m.isGroup &&
        m.sender == '6285736178354@s.whatsapp.net'
    ) {
        await this.sendMessage(m.chat, { 
            sticker : b, 
            thumbnail: await (await fetch(pp2)).buffer(),
            contextInfo: {  
                externalAdReply: { 
                    showAdAttribution: false,
                    mediaType: 1,
                    mediaUrl: sig,
                    title: 'What`s up Own?', 
                    body: '',
                    sourceUrl: sig,
                    thumbnail: await (await fetch(pp2)).buffer() 
                }
            }
        }, { quoted: m })
        return // Penting! Supaya tidak lanjut ke bawah
    }
} catch (e) { return }

// Bot
try {
    if (
        m.mentionedJid.includes(this.user.jid) &&
        m.isGroup
    ) {
        await this.sendMessage(m.chat, { 
            sticker : stik, 
            thumbnail: await (await fetch(pp)).buffer(),
            contextInfo: {  
                externalAdReply: { 
                    showAdAttribution: false,
                    mediaType: 1,
                    mediaUrl: sig,
                    title: 'ᴀᴘsɪ ᴛᴀɢ ᴛᴀɢ',
                    body: '',
                    sourceUrl: sneko,
                    thumbnail: await (await fetch(pp)).buffer() 
                }
            }
        }, { quoted: m })
        return // Supaya tidak lanjut ke bawah
    }
} catch (e) { return }

// Owner (jika owner ditag tapi bukan bot yg ditag)
try {
    if (
        m.mentionedJid.includes('6285736178354@s.whatsapp.net') &&
        m.isGroup
    ) {
        await this.sendMessage(m.chat, { 
            sticker : own, 
            thumbnail: await (await fetch(pp)).buffer(),
            contextInfo: {  
                externalAdReply: { 
                    showAdAttribution: false,
                    mediaType: 1,
                    mediaUrl: sig,
                    title: 'So A6 Tag Tag',
                    body: '',
                    sourceUrl: sneko,
                    thumbnail: await (await fetch(pp)).buffer() 
                }
            }
        }, { quoted: m })
        return
    }
} catch (e) { return }

}

async function addExif(buffer, packname, author, categories = [''], extra = {}) {
	const img = new Image()
	const json = { 'sticker-pack-id': 'Elainaa?¿', 'sticker-pack-name': packname, 'sticker-pack-publisher': author, 'emojis': categories, 'is-avatar-sticker': 1, ...extra }
	let exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
	let jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8')
	let exif = Buffer.concat([exifAttr, jsonBuffer])
	exif.writeUIntLE(jsonBuffer.length, 14, 4)
	await img.load(buffer)
	img.exif = exif
	return await img.save(null)
}