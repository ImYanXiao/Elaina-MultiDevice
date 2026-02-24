import { randomBytes } from 'crypto'

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Teksnya mana sayang?'
  let chats = Object.entries(conn.chats).filter(([_, chat]) => chat.isChats).map(v => v[0])
  let fakegif = { key: {participant: `0@s.whatsapp.net`, ...("6285736178354-1613049930@g.us" ? { remoteJid: "6285736178354-1613049930@g.us" } : {})},message: {"videoMessage": { "title": 'ᴇʟᴀɪɴᴀ-ʙᴏᴛᴢ', "h": `Hmm`,'seconds': '99999', 'gifPlayback': 'true', 'caption': 'Broadcast 🐈', 'jpegThumbnail': false }}}
  let teks = `\t\t\t\t*ғʀᴏᴍ | ᴏᴡɴᴇʀ*\n\n${text}`
  for (let id of chats) {
  await conn.sendMessage(id, { text: teks }, { quoted: fakegif })
  }
  conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m)
}

handler.help = ['bc']
handler.tags = ['owner']
handler.command = /^(broadcast|bc)$/i

handler.owner = true

export default handler


const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)