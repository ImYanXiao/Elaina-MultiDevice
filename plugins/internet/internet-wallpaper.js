import { googleImage } from '@bochilteam/scraper'
import { pinterest, wallpaper } from '../../lib/scrape.js'
const isHent = /boob(s)?|18|sepon(g|k)?|desah|mia|khalifah|sexy|bikini|bugil|r34|xx(x)?|sex|porno|tete|payudara|penis|montok|ngocok|oppai|naked|bikini|sex(y|i)?|boha(y|i)?|tetek|tt|titi(t|d)?|hent(ai|ao)?|animeh|pussy|dick|xnxx|kontol|colmek|coli|cum|hot|meme(k|g)?|neocoil(l)?|yamete|kimochi|bkp|bokep|nsfw|rule(34)?|telanjang|crot|peju/i

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan Query!\n\nContoh:\n${usedPrefix + command} Anime`)
        let isHentai = isHent.exec(text)
        if (isHentai) return m.reply('Jangan Mencari Hal Aneh!, Ketahuan Owner Bakal Di Banned')
        await global.loading(m, conn)
        try {
            let res = await wallpaper(text, Math.floor(Math.random() * 10))
            let img = res.getRandom()
            await conn.sendMessage(m.chat, { image: { url: img.image[0] }, fileName: 'wallpaper.jpeg', mimetype: 'image/jpeg', caption: `Result from: *${capitalize(text)}*` }, { quoted: m })
        } catch {
            try {
                let res = await pinterest('wallpaper ' + text)
                conn.sendFile(m.chat, res, null, `Result from: *${capitalize(text)}*`, m)
            } catch {
                try {
                    let res = await googleImage('wallpaper ' + text)
                    conn.sendFile(m.chat, res.getRandom(), null, `Result from: *${capitalize(text)}*`, m)
                } catch (e) {
                    return m.reply(`Query ${text} Tidak Ditemukan :(\nMau Coba Lagi? :)`)
                }
            }
        }
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['wallpaper']
handler.tags = ['internet']
handler.command = /^wallpaper$/i
handler.limit = true
export default handler

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substr(1)
}