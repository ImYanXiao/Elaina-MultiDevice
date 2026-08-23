import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan Url!\n\nContoh:\n${usedPrefix + command} https://www.smule.com/recording/lewis-capaldi-someone-you-loved/2027750707_2937753991`)
        await global.loading(m, conn)
        let response = await fetch(global.API('lol', '/api/smule', { url: text }, 'apikey'))
        let { result } = await response.json()
        let video = await conn.sendFile(m.chat, result.video, false, result.title, m)
        conn.sendFile(m.chat, result.audio, false, false, video, false, { mimetype: 'audio/mpeg' })
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['smule']
handler.tags = ['downloader']
handler.command = /^smule$/i
handler.limit = true
export default handler