import fs from 'fs'
import fetch from 'node-fetch'
let handler = async (m, { text }) => {
let name = m.pushName || conn.getName(m.sender)

let user = global.db.data.users[m.sender]
let wibu = `https://api.dhamzxploit.my.id/api/neko`    
let thumb = await(await fetch(wibu)).buffer()
user.afk = + new Date
user.afkReason = text
 conn.sendButtonDoc(m.chat, `${conn.getName(m.sender)} is now AFK${text ? ': ' + text : ''}`, wm, 'ᴊᴀɴɢᴀɴ ᴅɪɢᴀɴɢɢᴜ ʏᴀ ᴋᴀᴋ', 'Bilek', m,  { contextInfo: { externalAdReply: { showAdAttribution: true,
        mediaUrl: "https://Instagram.com/Xiao_yan_21",
        mediaType: "VIDEO",
        description: "https://Instagram.com/Xiao_yan_21", 
        title: 'Elaina-MultiDevice',
        body: wm,
        thumbnail: thumb,
        sourceUrl: sig
    }
    } })
            }
handler.help = ['afk [alasan]']
handler.tags = ['main']
handler.command = /^afk$/i

export default handler
