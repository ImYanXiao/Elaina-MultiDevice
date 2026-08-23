import { wikipedia } from '../../lib/scrape.js'
let handler = async(m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, 'Masukan Query Yang Ingin Dicari!', m)
    let res = await wikipedia(text)
    res[0].thumb ? conn.sendFile(m.chat, res[0].thumb, text + '.jpeg', res[0].wiki, m, false) :
    conn.reply(m.chat, res[0].wiki, m)
}
handler.help = ['wikipedia']
handler.tags = ['internet']
handler.command = /^(wikipedia)$/i
export default handler