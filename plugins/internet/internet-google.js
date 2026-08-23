import { googleIt } from '@bochilteam/scraper'
let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return conn.reply(m.chat, `Masukan Text Yang Ingin Dicari\n\nContoh :\n${usedPrefix + command} Kapan Google Dibuat`, m)
    let url = 'https://google.com/search?q=' + encodeURIComponent(text)
    m.reply(wait)
    let search = await googleIt(text)
    let msg = search.articles.map(({ title, url, description }) => {
        return `*${title}*\n_${url}_\n_${description}_`
    }).join('\n\n')
    try {
        let ss = `https://saipulanuar.cf/api/download/ssweb2?url=https://google.com/search?q=${text}`
        conn.sendFile(m.chat, ss, 'screenshot.png', msg, m)
    } catch (e) {
        m.reply(msg)
    }
}
handler.help = ['google'].map(v => v + ' <query>')
handler.tags = ['internet']
handler.command = /^google$/i
handler.limit = true
export default handler