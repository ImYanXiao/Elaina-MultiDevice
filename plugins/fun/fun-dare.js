import { dare } from '@bochilteam/scraper'

let handler = async (m, { conn, usedPrefix }) => {
    m.reply(await dare())
}
handler.help = ['dare']
handler.tags = ['fun']
handler.command = /^(dare)$/i

export default handler
