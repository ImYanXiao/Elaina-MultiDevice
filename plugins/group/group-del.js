import { jidNormalizedUser } from '@rexxhayanasi/elaina-baileys'

let handler = async (m, { conn, isOwner, isAdmin, participants }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

  if (!m.quoted) return m.reply('Reply pesan yang ingin dihapus!')

                                         
  const chat = jidNormalizedUser(chatId)
  const qChat = jidNormalizedUser(m.quoted.chat)
  const qSender = jidNormalizedUser(m.quoted.sender)

  let charm = global.db.data.chats[chat] || {}
  let { fromMe } = m.quoted

  if (!fromMe) {
    if (!isAdmin && !isOwner) return m.reply(`Command ini hanya dapat digunakan oleh *Admin* !!`)
    if (charm.nsfw && m.isGroup && !isOwner) return m.reply(`Tidak dapat hapus pesan saat *nsfw* aktif!`)

    try {
      await conn.sendMessage(qChat, {
        delete: {
          remoteJid: chat,
          fromMe: false,
          id: m.quoted.id,
          participant: qSender
        }
      })
    } catch (e) {
      console.error(e)
      m.reply('❌ Gagal menghapus pesan!')
    }

  } else {
    if (charm.nsfw && m.isGroup && !isOwner) return m.reply(`Tidak dapat hapus pesan saat *nsfw* aktif!`)
    try {
      await conn.sendMessage(qChat, {
        delete: m.quoted.vM.key
      })
    } catch (e) {
      console.error(e)
      m.reply('❌ Gagal menghapus pesan!')
    }
  }
}

handler.command = /^(d|delete|del)$/i
handler.group = true
handler.admin = true
handler.tags = ['group']
handler.help = ['delete']

export default handler
