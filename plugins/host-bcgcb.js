import fs from 'fs'
import fetch from 'node-fetch'
let handler = async (m, { conn, text } ) => {
 let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])

conn.reply(m.chat, `_Mengirim pesan broadcast ke ${groups.length} grup_`, m)
 for (let id of groups) {
 let member = (await conn.groupMetadata(id)).participants.map(v => v.jid)
conn.send2ButtonDoc(id, '────━┅ *𝙱𝚁𝙾𝙰𝙳𝙲𝙰𝚂𝚃* ┅━────\n' + text, wm, thumbbc, [['ᴏᴡɴᴇʀ 🎐', '.owner'],['ᴅᴏɴᴀsɪ ✨', '.donasi']], ftroli, { contextInfo: {
        externalAdReply: {
            title: `${htjava} ʙʀᴏᴀᴅᴄᴀsᴛ`,
            body: titlebot,
            description: titlebot,
            mediaType: 2,
          thumbnail: await(await fetch(thumbbc)).buffer(),
         mediaUrl: sig
        }
     }
    })
  }
  m.reply('sᴜᴅᴀʜ ᴛᴇʀᴋɪʀɪᴍ ᴋᴇ sᴇᴍᴜᴀ ɢʀᴜᴘ ᴋᴀᴋ')
}
handler.command = ['bcgcb']
handler.tags = ['host']
handler.help = ['bcgcb']

handler.rowner = true

export default handler
