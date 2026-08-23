import { tts } from '../../lib/scrape.js'
const defaultLang = 'id'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    let lang = args[0]
    let text = args.slice(1).join(' ')

    if ((args[0] || '').length !== 2) {
        lang = defaultLang
        text = args.join(' ')
    }

    if (!text && m.quoted?.text) text = m.quoted.text
    let res

    try {
        res = await tts(text, lang)
    } catch (e) {
        m.reply(e + '')
        text = args.join(' ')
        if (!text) return m.reply(`Use example ${usedPrefix + command} en hello world`)
        res = await tts(text, defaultLang)
    } finally {
        if (res) conn.sendFile(m.chat, res, 'tts.opus', false, m, true)
    }
}
handler.help = ['vn']
handler.tags = ['tools']
handler.command = /^vn|tts$/i
handler.limit = true

export default handler