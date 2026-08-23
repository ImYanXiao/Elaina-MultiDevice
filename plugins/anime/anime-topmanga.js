import { topManga } from '../../lib/scrape.js'
const type = [ 'manga', 'oneshots', 'doujin', 'lightnovels', 'novels', 'manhwa', 'manhua', 'bypopularity', 'favorite' ]
let handler = async(m, { conn, text }) => {
    let input = (text || '').toLowerCase()
    if (input && !type.includes(input)) return m.reply(`Jenis Jenis Komik : \n ${type.map(v => { return `• ${v}` }).join('\n')}`)
    let manga = await topManga(input)
    let caption = manga.map(v => {
        return `
_*${v.rank}. ${v.title}*_
• Rating : ${v.rating}
• ${v.info}
`.trim()
    }).join('\n\n')
    m.reply('_*Top Manga Menurut MyAnimeList*_\n\n' + caption)
}
handler.help = ['topmanga']
handler.tags = ['anime']
handler.command = /^(topmanga)$/i

export default handler