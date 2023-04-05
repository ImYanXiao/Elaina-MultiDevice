import { 
    youtubedl,
    youtubedlv2 
} from '@bochilteam/scraper'

var handler = async (m, { conn, args }) => {

if (!args[0]) throw 'Urlnya Mana Banh?'
  let q = '128kbps'
  let v = args[0]

// Kocak
const yt = await youtubedl(v).catch(async () => await  youtubedlv2(v))
const dl_url = await yt.audio[q].download()
  const ttl = await yt.title
const size = await yt.audio[q].fileSizeH
  
 await m.reply(`▢ Tɪᴛᴛʟᴇ: ${ttl}
▢  Sɪᴢᴇ: ${size}

▢ Ｌｏａｄｉｎｇ. . .`)
await conn.sendMessage(m.chat, { document: { url: dl_url}, mimetype: 'audio/mpeg', fileName: `${ttl}.mp3`}, {quoted: m})
}
// If u want a not document you can change mimetype 'audio/mp4' n remove .mp3 on fileName
handler.command = /^getaud|ytmp3$/i
export default handler
