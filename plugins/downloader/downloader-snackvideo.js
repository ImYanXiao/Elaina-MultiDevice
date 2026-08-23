import axios from 'axios'
let handler = async(m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan URL!\n\nContoh:\n${usedPrefix + command} https://sck.io/p/jiv-dwZX`)
        await global.loading(m, conn)
        let res = await axios.get(API('lol', '/api/snackvideo', { url: text }, 'apikey'))
        await conn.sendFile(m.chat, res.data.result.url, null, res.data.result.caption ? res.data.result.caption : '', m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['snackvideo']
handler.tags = ['downloader']
handler.command = /^(snackvid(io|eo)?)$/i
handler.limit = true
export default handler