import { checkWeb } from '../../lib/scrape.js'

let handler = async (m, { args, usedPrefix, command }) => {
    try {
	    if (!args[0]) return m.reply(`Ex: ${usedPrefix + command} nhentai.net`)
	    await global.loading(m, conn)
	    let res = await checkWeb(args)
	    m.reply(res.map(v => `*• Domain:* ${v.Domain}\n*• Status:* ${v.Status}`).join('\n\n'))
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['webcheck']
handler.tags = ['tools']
handler.command = /^web(check|cek)|(check|cek)web$/i

export default handler

