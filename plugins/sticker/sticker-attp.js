import { sticker } from '../../lib/sticker.js'

let handler = async (m, { conn, command, usedPrefix, text }) => {
    try {
        if (!text) return m.reply(`Masukan Text!\n\nContoh :\n${usedPrefix + command} Saya Pki`)
        let teks = text ? text: m.quoted && m.quoted.text ? m.quoted.text: m.text
        await global.loading(m, conn)
        let res = global.API('lol', '/api/attp', { text: RyAPI }, 'apikey')
        let stiker = await sticker(false, res, global.config.stickpack, global.config.stickauth)
        await conn.sendFile(m.chat, stiker, false, false, m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['attp']
handler.tags = ['sticker']
handler.command = /^(attp)$/i
handler.limit = true
export default handler