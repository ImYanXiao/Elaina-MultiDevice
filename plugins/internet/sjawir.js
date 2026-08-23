import {sticker} from '../../lib/sticker.js'
import fetch from 'node-fetch';
let handler = async (m, { conn, args, usedPrefix, command }) => {
     let tio = await fetch(`https://api.lolhuman.xyz/api/pinterest2?apikey=RyAPI&query=meme+jawir`)
let p = await tio.json()
let url = p.result[Math.floor(Math.random()  *p.result.length)]
  let stiker = await sticker(url, false, global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m)
}
handler.help = ['sjawir']
handler.tags = ['internet']
handler.command = /^(sjawir)$/i
handler.limit = true;

export default handler