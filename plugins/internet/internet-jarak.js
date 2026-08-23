import { distance } from '../../lib/scrape.js'
let handler = async (m, { conn, usedPrefix ,command, text }) => {
    let jarak = text.split('|')
    if (!jarak[0] || !jarak[1]) return m.reply(`Masukan Nama Lokasi\n\nContoh :\n${usedPrefix + command} jakarta|jepang`)
    let { img, desc } = await distance(jarak[0].toLowerCase(), jarak[1].toLowerCase())
    await conn.sendFile(m.chat, img, false, desc, m)
}
handler.help = ['jarak']
handler.tags = ['internet']
handler.command = /^jarak|distance$/i

export default handler