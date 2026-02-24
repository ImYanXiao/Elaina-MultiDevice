import uploadFile from '../lib/uploadFile.js'
import { uploadToPomf2 } from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m) => {
let who = m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())

  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'No media found'
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadToPomf2 : uploadFile)(media)
  let caption = `📮 *L I N K :*
${link}
📊 *S I Z E :* ${media.length} Byte
📛 *E x p i r e d :* ${isTele ? 'No Expiry Date' : 'Unknown'}`
conn.reply(m.chat, caption, m, { contextInfo: {
          externalAdReply :{
    mediaUrl: sgh,
    mediaType: 2,
    title: 'P o m f 2 L A',
    body: botdate,
    thumbnailUrl: link,
    sourceUrl: link
     }}
  })
}
handler.help = ['tourl']
handler.tags = ['tools']
handler.command = /^(tourl|upload)$/i
export default handler