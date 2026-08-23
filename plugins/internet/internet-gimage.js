import { googleImage } from '@bochilteam/scraper'
let isHent = /18?|sepon(g|k)?|desah|xnxx|mia|khalifah|sexy|bikini|bugil|r34|xx(x)?|sex|porno|tete|payudara|penis|montok|ngocok|oppai|naked|bikini|sex?(y|i)|boha?(y|i)|tete?k|titi?t|hent(ai|ao)?|animeh|pussy|dick|xnxx|kontol|col?mek|co?li|cum|hot|me?me?(k|g)|neocoil?l|yame?te|kimochi|boke?p|nsfw|rule?34|telanjang|crot|peju/i

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan Query!\n\nContoh:\n${usedPrefix + command} Elaina`)
        let isHentai = isHent.exec(text)
        if (isHentai) return m.reply('Jangan Mencari Hal Aneh!, Ketahuan Owner Bakal Di Banned')
        await global.loading(m, conn)
        let res = await googleImage(text)
        let image = res.getRandom()
        conn.sendFile(m.chat, 'https://external-content.duckduckgo.com/iu/?u=' + image, text + '.jpeg', `🔎 *Result:* ${text}\n🌎 *Source:* Google`, m, false)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['gimage']
handler.tags = ['internet']
handler.command = /^(gimage)$/i
handler.limit = true

export default handler