import { primbon } from '../../lib/primbon.js'
let handler = async(m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukan Mimpi Yang Ingin Dicari!\n\nContoh:\n${usedPrefix + command} buaya`)
    let res = await primbon.mimpi(text)
    if (!res.status) return m.reply(res.message)
    let cap = `
*Mimpi:* ${res.message.mimpi}
*Arti:* ${res.message.arti}
`.trim()
    m.reply(cap)
}
handler.help = ['artimimpi']
handler.tags = ['primbon']
handler.command = /^artimimpi$/i
export default handler
