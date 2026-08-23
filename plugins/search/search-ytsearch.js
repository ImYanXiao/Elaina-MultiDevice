import { ytSearch } from "../../lib/scrape.js"
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukan query! \n\nContoh: \n${usedPrefix + command} Alan walker faded`)
    try {
        await global.loading(m, conn)
        let result = await ytSearch(text)
        let list = result.map((v, i) => {
            return [`${usedPrefix}play ${v.title}`, (i + 1).toString(), `${v.title} \nDuration : ${v.duration} \nUploaded : ${v.uploaded}`]
        })
        await conn.textList(m.chat, `Terdapat *${result.length} Result* \nSilahkan pilih mana Video/Audio yang Kamu cari`, false, list, m, {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    mediaType: 1,
                    title: result[0].title,
                    body: "",
                    thumbnail: (await conn.getFile(result[0].thumbnail)).data,
                    renderLargerThumbnail: true,
                    mediaUrl: result[0].url,
                    sourceUrl: result[0].url
                }
            }
        })
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['ytsearch']
handler.tags = ['search']
handler.command = /^(yt(s|search)|youtubesearch)$/i
handler.limit = true
export default handler