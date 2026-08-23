import { komiku } from '../../lib/scrape.js'
import { extractImageThumb } from "@rexxhayanasi/elaina-baileys"
import { toPDF } from '../../lib/converter.js'
let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        switch (command) {
            case 'komiku': {
                if (!text) return m.reply(`Masukan nama komik yang kamu cari! \n\nContoh: \n${usedPrefix + command} solo leveling`)
                await global.loading(m, conn)
                let result = await komiku.search(text)
                if (result.length == 0) return m.reply(`Tidak dapat menemukan *${text}*`)
                let list = result.map((v, i) => {
                    return [`${usedPrefix}komiku-detail ${v.link}`, (i + 1).toString(), `${v.title} \n${v.description}`]
                })
                await conn.textList(m.chat, `Terdapat *${result.length} Komik*`, false, list, m)
            }
                break
            case "komiku-detail": {
                await global.loading(m, conn)
                let result = await komiku.getDetails(text)
                let caption = `
${Object.entries(result.info).map(v => {
    return `${v[0]} : ${v[1]}`
}).join("\n")}

Description :
${result.mainDescription}

Synopsis :
${result.synopsis}
`.trim()
                let list = result.chapters.map((v, i) => {
                    return [`${usedPrefix}komiku-chapter ${v.chapterLink}|${result.mainTitle} ${v.chapterNumber}`, (i + 1).toString(), `${v.chapterNumber} \nDi Upload Pada ${v.date}`]
                })
                await conn.textList(m.chat, caption, result.imageUrl, list, m)
            }
                break
            case "komiku-chapter": {
                let [link, title] = text.split("|")
                await global.loading(m, conn)
                let result = await komiku.getChapterImages(link)
                let { data } = await conn.getFile(result[0])
                let jpegThumbnail = await extractImageThumb(data)
                let imagepdf = await toPDF(result)
                await conn.sendFile(m.chat, imagepdf, title, "", m)
            }
                break
            default:
        }
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ["komiku"]
handler.tags = ["anime"]
handler.command = /^(komiku(-detail|-chapter)?)$/i
handler.limit = true
export default handler

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))