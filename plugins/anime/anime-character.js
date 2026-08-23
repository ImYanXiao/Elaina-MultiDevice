import { character } from '../../lib/scrape.js'

const handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan Nama Character! \n\nContoh : \n${usedPrefix + command} Elaina`)
        await global.loading(m, conn)
        const { name, image, detail, voice_actor, animeography, mangaography } = await character(text)
        const caption = `
Name : ${name}

${detail.replace('>', '').trim()}

Anime :
${animeography.map(v => `• ${v.name} ( ${v.status} )`).join('\n')}

Manga :
${mangaography.map(v => `• ${v.name} ( ${v.status} )`).join('\n')}

Voice Actor : 
${voice_actor.map(v => `• ${v.name} ( ${v.origin} )`).join('\n')}
`.trim()

        await conn.sendFile(m.chat, image, false, caption, m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['character']
handler.tags = ['anime']
handler.command = /^(chara(cter)?)$/i
handler.limit = true

export default handler
