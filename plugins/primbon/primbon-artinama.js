import { primbon } from '../../lib/primbon.js'
let handler = async(m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukan Nama Kamu!\n\nContoh:\n${usedPrefix + command} Wahyu`)
    let res = await primbon.artinama(text)
    if (!res.status) return m.reply(res.message)
    let cap = `
*Nama:* ${res.message.nama}
*Arti:* ${res.message.arti}
`.trim()
    m.reply(cap)
}
handler.help = ['artinama']
handler.tags = ['primbon']
handler.command = /^(artinama)$/i

export default handler