import { sticker } from '../lib/sticker.js'
import { webp2mp4 } '../lib/webp2mp4.js'
import { stickerTelegram } from '@bochilteam/scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    // TODO: add stickerly
    const isTele = /tele/i.test(command)
    if (!args[0]) throw `*ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴛᴏ ʀᴇᴛʀɪᴇᴠᴇ sᴛɪᴄᴋᴇʀs ғʀᴏᴍ ${isTele ? 'Tele.' : 'sᴇᴀʀᴄʜ.*'}
Note: ʀᴇsᴜʟᴛ ɴᴏᴛ ᴀᴄᴄᴜʀᴀᴛᴇ.

===========================
★ ᴜsᴀɢᴇ:
${usedPrefix + command} <name>

★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix + command} naruto`
    const json = await (isTele ? stickerTelegram : stickerLine)(args[0])
    m.reply(`
*ᴛᴏᴛᴀʟ sᴛɪᴄᴋᴇʀ:* ${(json[0]?.stickers || json).length}
`.trim())
    for (let data of (json[0]?.stickers || json)) {
        const stiker = await sticker(false, data.sticker || data, global.packname, global.author)
        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m).catch(console.error)
        await delay(1500)
    }
}
handler.help = [''stickertele <url>']
handler.tags = ['sticker']
handler.command = /^(stic?ker(tele(gram)?))$/i

handler.limit = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))