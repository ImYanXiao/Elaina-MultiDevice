const { makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = (await import('@adiwajshing/baileys')).default
import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
let handler = async (m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let user = global.db.data.users[who]
let tqto = `*▸ - - - —「 BIG THANKS TO 」— - - - ◂*

*❉ Adiwajshing:*
https://github.com/adiwajshing

*❉ Nurutomo:*
https://github.com/Nurutomo

*❉ Istikmal:* 
https://github.com/BochilGaming

*❉ Ariffb:*
https://github.com/Ariffb25

*❉ Ilman:*
https://github.com/ilmanhdyt

*❉ Amirul:*
https://github.com/amiruldev20

*❉ Rasel:*
https://github.com/raselcomel

*❉ Fatur:*
https://github.com/Ftwrr

*❉ Rominaru:*
https://github.com/Rominaru

*❉ Kannachann:*
https://github.com/Kannachann

*❉ The.sad.boy01:*
https://github.com/kangsad01

*❉ Ameliascrf:*
https://github.com/Ameliascrf

*❉ Fokus ID:*
https://github.com/Fokusdotid

*❉ Fahri Adison:*
https://github.com/FahriAdison

*❉ Xiao Yan:*
https://github.com/ImYanXiao
`
conn.reply(m.chat, tqto, m, { contextInfo: { externalAdReply: {
            title: `${htjava} ${namebot}`,
            body: titlebot,
            description: titlebot,
            mediaType: 2,
          thumbnail: await(await fetch(thumb2)).buffer(),
         mediaUrl: sgh
        }
     }
    })
}
handler.help = ['tqto']
handler.tags = ['main','info']
handler.command = /^(credits|credit|thanks|thanksto|tqto)$/i
export default handler
