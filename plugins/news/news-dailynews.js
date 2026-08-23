import { DailyNews } from '../../lib/scrape.js'

let handler = async (m, { conn }) => {
    let api = await DailyNews()
    let res = api.slice(0, 10)
    let caption = res.map(v => {
    return `
*${v.berita.trim()}*
_silahkan baca di ${v.berita_url}_
`.trim()
}).join('\n\n')
    conn.adReply(m.chat, caption, res[0].berita, '', res[0].berita_thumb, res[0].berita_url, m)
}
handler.help = ['dailynews']
handler.tags = ['news']
handler.command = /dailynews/i
export default handler