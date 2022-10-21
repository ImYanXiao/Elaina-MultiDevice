import { 
    youtubedl,
    youtubedlv2,
    youtubedlv3
} from '@bochilteam/scraper'
import fs from 'fs'
const trol = {
	key : {
                          participant : '0@s.whatsapp.net'
                        },
       message: {
                    orderMessage: {
                            itemCount : 2525,
                            itemCoun : 2525,
                            surface :2525,
                            message: author,
                            orderTitle: 'B',
                            thumbnail: fs.readFileSync("./thumbnail.jpg"),
                            sellerJid: '0@s.whatsapp.net'
          
                          }
                        }
                      }

let handler = async (m, { conn, args, isPrems, isOwner }) => {

let qu = args[1] || '360'
  let q = qu + 'p'
  let v = args[0]

  let _thumb = {}
    try { _thumb = { jpegThumbnail: thumb2 } }
    catch (e) { }

// Kocak
const yt = await youtubedlv2(v).catch(async _ => await youtubedl(v)).catch(async _ => await youtubedlv3(v))
const dl_url = await yt.video[q].download()
  const ttl = await yt.title
const size = await yt.video[q].fileSizeH
  
 await m.reply(wait)
  await conn.sendMessage(m.chat, { [/^(?:-|--)doc$/i.test(args[1]) || null ? 'document' : 'video']: { url: dl_url }, fileName: `${author}.mp4`, mimetype: 'video/mp4', ..._thumb }, { quoted: trol })
}

handler.command = /^(getvid|ytmp4|ytv)$/i
handler.limit = true
export default handler
