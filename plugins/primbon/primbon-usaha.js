import { primbon } from '../../lib/primbon.js'
let handler = async(m, { conn, args, usedPrefix, command }) => {
    let response = args.join(' ').split('-')
    if (!(response[0] || response[1] || response[2])) return m.reply(`Masukan Tanggal Lahir Kamu!\n\nContoh:\n${usedPrefix + command} 12-12-2000`)
    let res = await primbon.sifatbisnis(response[0], response[1], response[2])
    if (!res.status) return m.reply(res.message)
    let cap = `
*Tanggal Lahir:* ${res.message.hari_lahir}
*Usaha:* ${res.message.usaha}
`.trim()
    m.reply(cap)
}
handler.help = ['usaha']
handler.tags = ['primbon']
handler.command = /^usaha/i
export default handler