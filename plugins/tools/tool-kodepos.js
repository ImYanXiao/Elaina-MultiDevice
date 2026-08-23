import { kodepos } from '../../lib/scrape.js'
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukan Kota Kamu!\n\nContoh:\n${usedPrefix + command} palembang`)
    let res = await kodepos(text)
    if (!res.length) return m.reply(`Kota ${text} Tidak Ditemukan!`)
    let cap = res.map((v, i) => {
        return `
*${i + 1}.* ${v.province}
  > Kota: _${v.city}_
  > Wilayah: _${v.subdistrict}_
  > Perkotaan: _${v.urban}_
  > Kode Pos: _${v.postalcode}_
`.trim()
    }).join('\n\n')
    m.reply(cap)
}
handler.help = ['kodepos']
handler.tags = ['tools']
handler.command = /^kodepos$/i
handler.limit = true
export default handler