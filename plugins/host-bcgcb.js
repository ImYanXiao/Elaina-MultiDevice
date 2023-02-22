var handler = async (m, { conn, text } ) => {
 let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])

conn.reply(m.chat, `_Mengirim pesan broadcast ke ${groups.length} grup_`, m)
 for (let id of groups) {
 let member = (await conn.groupMetadata(id)).participants.map(v => v.jid)
conn.send2ButtonDoc(id, '────━┅ *BROADCAST* ┅━────\n' + text, wm, 'ғʀᴏᴍ ᴏᴡɴᴇʀ', thumbbc, [['ᴏᴡɴᴇʀ 🎐', '.owner'],['ᴅᴏɴᴀsɪ ✨', '.donasi']], flocation, { contextInfo: {
        externalAdReply: { showAdAttribution: true,
            title: `${htjava} BROADCAST`,
            body: titlebot,
            description: wm2,
            mediaType: 2,
          thumbnail: await getBuffer(thumbbc),
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
