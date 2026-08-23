import { pinterest } from '../../lib/scrape.js'

let handler = async (m, { conn, command, usedPrefix, text }) => {
    try {
        await global.loading(m, conn)
        let image = await pinterest('cosplaystyle anime')
        conn.sendFile(m.chat, 'https://external-content.duckduckgo.com/iu/?u=' + image, false, 'Ini Dia Kak', m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['cosplay']
handler.tags = ['anime']
handler.command = /^(cosplay)$/i

export default handler