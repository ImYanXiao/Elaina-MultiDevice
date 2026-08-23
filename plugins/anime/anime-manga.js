import { manga } from '../../lib/scrape.js'

let handler = async(m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan Nama Manga! \n\nContoh : \n${usedPrefix + command} Majo No Tabitabi`)
        await global.loading(m, conn)
        let data = await manga(text)
        let caption = `
Title : ${data.title}

Synopsis : ${data.synopsis}

${data.info.filter(v => v.type != 'Genres').map(v => {
    return `${v.type} : ${v.result}`.trim()
}).join('\n')}

Related :
${data.related.map(v => {
    return `• ${v.name} ( ${v.type.replace(':', '')} )`.trim()
}).join('\n')}
`.trim()
        conn.sendFile(m.chat, data.image, false, caption, m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['mangainfo']
handler.tags = ['anime']
handler.command = /^(manga(info)?)$/i
handler.limit = true
export default handler