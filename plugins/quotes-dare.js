import { dare } from '@bochilteam/scraper'

let handler = async (m, { conn, usedPrefix }) => conn.sendButton(m.chat, await dare(), author, [
    ['Dare', `${usedPrefix}dare`], 
    ['Truth', `${usedPrefix}truth`]
], m)

handler.help = ['dare']
handler.tags = ['quotes', 'fun']
handler.command = /^(dare)$/i

export default handler
