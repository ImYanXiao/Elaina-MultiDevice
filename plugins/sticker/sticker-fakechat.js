import uploadImage from '../../lib/uploadImage.js'
import axios from 'axios'
import { sticker } from '../../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
    try {
        let q = m.quoted && !text ? m.quoted: m
        let mime = (q.msg || q).mimetype || ''
        let txt = text ? text: typeof q.text == 'string' ? q.text: ''
        if (!txt) return m.reply(`Masukan text \n\nContoh: \n${usedPrefix + command} halo`)
        await global.loading(m, conn)
        let avatar = await conn.profilePictureUrl(q.sender, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg')
        if (!/image\/(jpe?g|png)|opus|webp/i.test(mime)) {
            let req = await fakechat(txt, q.name, avatar)
            let stiker = await sticker(false, req, global.config.stickpack, global.config.stickauth)
            await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        } else {
            let img = await q.download()
            let { files } = await uploadImage(img)
            let req = await fakechat(txt, q.name, avatar, files[0].url)
            let stiker = await sticker(false, req, global.config.stickpack, global.config.stickauth)
            await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        }
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['fakechat']
handler.tags = ['sticker']
handler.command = /^(fc|qc|fakechat)$/i
handler.limit = true
handler.onlyprem = true
export default handler

async function fakechat(text, name, avatar, url = false) {
    let body1 = {
        "type": "quote",
        "format": "png",
        "backgroundColor": "#FFFFFF",
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
            "entities": [],
            "media": {
                "url": url
            },
            "avatar": true,
            "from": {
                "id": 1,
                "name": name,
                "photo": {
                    "url": avatar
                }
            },
            "text": text,
            "replyMessage": {}
        }]
    }

    let body2 = {
        "type": "quote",
        "format": "webp",
        "backgroundColor": "#FFFFFF",
        "width": 512,
        "height": 512,
        "scale": 2,
        "messages": [{
            "avatar": true,
            "from": {
                "first_name": name,
                "language_code": "en",
                "name": name,
                "photo": {
                    "url": avatar
                }
            },
            "text": text,
            "replyMessage": {}
        }]
    }

    let { data } = await axios.post('https://bot.lyo.su/quote/generate', url ? body1: body2)
    return Buffer.from(data.result.image, "base64")
}