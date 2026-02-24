import fetch from 'node-fetch'
const { MessageType } = (await import('@adiwajshing/baileys')).default
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {

    if (!args[0]) throw `*Perintah ini untuk mengambil stiker dari Line*\n\nContoh penggunaan:\n${usedPrefix + command} https://store.line.me/stickershop/product/8149770`
    if (!args[0].match(/(https:\/\/store.line.me\/stickershop\/product\/.*)/gi)) throw `*Perintah ini untuk mengambil stiker dari Line*\n\nContoh penggunaan:\n${usedPrefix + command} https://store.line.me/stickershop/product/8149770`

    let res = await fetch(global.API('lol', '/api/linestick', { url: args[0] }, 'apikey'))
    if (res.status !== 200) throw await res.text()
    let json = await res.json()
    if (!json.status) throw json
    m.reply(`
*Title:* ${json.result.title} 
        `.trim())

    for (let i of json.result.stickers) {
        let stiker = await sticker(false, i, global.packname, global.author)
        await conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
        await delay(1500)
    }

}
handler.help = ['stikerline <url>']
handler.tags = ['sticker']
handler.command = /^(stic?kerline)$/i

handler.limit = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))
