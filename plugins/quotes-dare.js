//import { dare } from '@bochilteam/scraper'

let handler = async (m, { conn }) => conn.reply(m.chat, await bochil.dare(), m)

handler.help = ['dare']
handler.tags = ['quotes', 'fun']
handler.command = /^(dare)$/i

export default handler
