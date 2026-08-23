import { sticker } from '../../lib/sticker.js'
import fs from 'fs'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text || !text.includes('+')) return m.reply(`Masukan emoji \n\nContoh: \n${usedPrefix + command} 😅+🤔`)
        let [l, r] = text.split`+`
        if (!l) return m.reply('emoji1 tidak boleh kosong')
        if (!r) return m.reply('emoji2 tidak boleh kosong')
        await global.loading(m, conn)
        const url = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(l)}_${encodeURIComponent(r)}`)
        if (!url.ok) throw await url.text()
        let json = await url.json()
        if (!json.results) throw 'Error!'
        let ztick = fs.readFileSync(`./media/thumbnail.jpg`)
        try {
            let res = json.results[0].url
            let stiker = await sticker(false, res, global.config.stickpack, global.config.stickauth)
            await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        } catch (e) {
            await conn.sendFile(m.chat, ztick, 'sticker.webp', '', m)
        }
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}

handler.help = ['emojimix']
handler.tags = ['tools']
handler.command = /^(emojimix)$/i

export default handler