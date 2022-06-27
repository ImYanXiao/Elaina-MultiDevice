import fs from 'fs'
import fetch from 'node-fetch'
let handler = async (m, { conn, text } ) => {
 let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])

conn.reply(m.chat, `_Mengirim pesan broadcast ke ${groups.length} grup_`, m)
 for (let id of groups) {
 let member = (await conn.groupMetadata(id)).participants.map(v => v.jid)
conn.sendButton(id, '────━┅ *BROADCAST* ┅━────\n' + text, wm, thumbbc, [['OWNER 🎐', '.owner'],['DONASI ✨', '.donasi']], false, { contextInfo: {
        externalAdReply: {
            title: `${htjava} BROADCAST`,
            body: titlebot,
            description: titlebot,
            mediaType: 2,
          thumbnail: await(await fetch(thumbbc)).buffer(),
         mediaUrl: sig
        }
     }
    })
  }
  m.reply('*D O N E !*')
}
handler.command = ['bcgcb']
handler.tags = ['host']
handler.help = ['bcgcb']

handler.rowner = true

export default handler
