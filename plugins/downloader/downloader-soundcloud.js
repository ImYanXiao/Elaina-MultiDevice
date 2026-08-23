import { soundcloud } from '../../lib/scrape.js'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukan Link Soundcloud!\n\nContoh:\n${usedPrefix + command} https://on.soundcloud.com/GA59k`)
    let res = await soundcloud(text)
    let cap = `
❏ *Title:* ${res.judul}
▧ *Download:* ${res.download_count}
▧ *Link:* ${text}
`.trim()
    let msg = await conn.adReply(m.chat, cap, res.judul, '', 'https://external-content.duckduckgo.com/iu/?u=' + res.thumb, text, m)
    conn.sendFile(m.chat, res.link, res.judul + '.mp3', '', msg, false, { mimetype: 'audio/mpeg' })
}
handler.help = ['soundcloud']
handler.tags = ['downloader']
handler.command = /^soundcloud$/i
handler.limit = true
export default handler