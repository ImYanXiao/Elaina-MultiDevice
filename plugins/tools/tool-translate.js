import { translate } from "bing-translate-api"

let handler = async (m, { conn, usedPrefix, command, args }) => {
    try {
        let err = `
Contoh:
${usedPrefix + command} <lang> <your message>
${usedPrefix + command} id Hello How Are You

Daftar bahasa yang didukung: https://cloud.google.com/translate/docs/languages
`.trim()
        if (!args[0]) return m.reply(err)
        await global.loading(m, conn)
        let txt = args.length > 1 ? args.slice(1).join(' ') : ''
        let msg = m.quoted ? m.quoted.text : txt
        if (!msg) return m.reply(err)
        let result = await translate(msg, null, args[0])
        await m.reply(result.translation, false, false, { smlcap: false })
    } finally {
        await global.loading(m, conn, true)
    }
}

handler.help = ['translate']
handler.tags = ['tools']
handler.command = /^(tr|translate)$/i
handler.limit = true
export default handler