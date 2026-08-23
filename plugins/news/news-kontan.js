import { Kontan } from '../../lib/scrape.js'

let handler = async (m, { conn }) => {
    let api = await Kontan()
    let res = api.slice(0, 10)
    let caption = res.map(v => {
    return `
*${v.berita} ( ${v.berita_jenis} )*
di upload ${v.berita_diupload}
_silahkan baca di ${v.berita_url}_
`.trim()
}).join('\n\n')
    conn.adReply(m.chat, caption, res[0].berita, `di upload ${res[0].berita_diupload}`, res[0].berita_thumb, res[0].berita_url, m)
}
handler.help = ['kontan']
handler.tags = ['news']
handler.command = /kontan$/i
export default handler