import { primbon } from '../../lib/primbon.js'
let handler = async(m, { conn, text, args, usedPrefix, command }) => {
  let response = args.join(' ').split('|')
  if (!(response[0] || response[1])) return m.reply(`Masukan Nama Dengan Benar!\n\nContoh:\n${usedPrefix + command} Nabila|Wahyu`)
  let res = await primbon.kecocokan(response[0], response[1])
  if (!res.status) return m.reply(res.message)
  let cap = `
*Nama Anda:* ${res.message.nama_anda}
*Nama Pasangan:* ${res.message.nama_pasangan}

*Sisi Positif:* ${res.message.sisi_positif}
*Sisi Negatif:* ${res.message.sisi_negatif}
`.trim()
    m.reply(cap)
}
handler.help = ['kecocokan']
handler.tags = ['primbon']
handler.command = /^kecocokan$/i
handler.limit = true
export default handler