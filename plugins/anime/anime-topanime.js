import { topAnime } from '../../lib/scrape.js'
let handler = async(m, { conn }) => {
    let anime = await topAnime()
    let caption = anime.map(v => {
        return `
_*${v.rank}. ${v.title}*_
• Rating : ${v.rating}
• ${v.info}
`.trim()
    }).join('\n\n')
    m.reply('_*Top Anime Menurut MyAnimeList*_\n\n' + caption)
}
handler.help = ['topanime']
handler.tags = ['anime']
handler.command = /^(topanime)$/i

export default handler