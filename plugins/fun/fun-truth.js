import { truth } from '@bochilteam/scraper'

let handler = async (m, { conn, usedPrefix }) => {
    m.reply(await truth())
}

handler.help = ['truth']
handler.tags = ['fun']
handler.command = /^(truth)$/i

export default handler