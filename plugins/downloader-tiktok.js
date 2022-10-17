//Source : https://github.com/carlxjoe/Rain-BotV2/blob/main/scraper/savefrom.js
import { savefrom } from "../lib/savefrom.js"
import { tiktokdlv3 } from "@bochilteam/scraper"
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`
//
    let res = ( await savefrom(args[0])).url[0]
    let result = await savefrom(args[0])
   
   let { title, source, duration } = result.meta
   let { url } = res
   if (!url) throw 'Can\'t download video!'
   await conn.reply(m.chat, wait, m)
   await  conn.sendFile(m.chat, url, 'tiktok.mp4', `*${command} Downloader*
   
${title ? "*Title:* "+ title : "Untitled"}
${source ? "*Source:* " + source : "unsource"}
${duration ? "*Duration:* " + duration : "null"}`.trim(), m)
}
handler.help = ['tiktok', 'tiktok2', 'tiktokdl', "savefrom"].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tik(tok2)?(tok)?(dl)?(nowm)?|save(from)?)$/i
export default handler
