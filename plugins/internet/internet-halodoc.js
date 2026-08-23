import { halodoc } from "../../lib/scrape.js"

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`Masukan query atau url halodoc \n\nContoh : \n${usedPrefix + command} kangker \n${usedPrefix + command} https://www.halodoc.com/artikel/ini-tindakan-pengobatan-kanker-lambung-yang-bisa-dilakukan`)
    if (/http(s)?(:)\/\/www.halodoc.com/i.test(text)) {
        let data = await halodoc.detail(text)
        let caption = `
*${data.title.trim()}*

${data.content.trim()}
`.trim()
    conn.adReply(m.chat, caption, data.title.trim(), data.content.trim(), data.image, data.link, m)
    } else {
        let data = await halodoc.search(text)
        let caption = data.map(v => {
            return `
*${v.title.trim()}*
_${v.description.trim()}_
${v.articleLink.trim()}
`.trim()
        }).join('\n\n')
        conn.adReply(m.chat, caption, data[0].title.trim(), data[0].description.trim(), data[0].imageSrc, data[0].articleLink, m)
    }
}
handler.help = ['halodoc']
handler.tags = ['internet']
handler.command = /halodoc$/i

export default handler