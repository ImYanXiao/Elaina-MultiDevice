let handler = async (m, { conn, text, command }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

  try {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    else who = m.quoted.sender ? m.quoted.sender : sender
    let bio = await conn.fetchStatus(who)
    m.reply(bio.status)
  } catch {
    if (text) return m.reply(`bio is private!`)
    else try {
      let who = m.quoted ? m.quoted.sender : sender
      let bio = await conn.fetchStatus(who)
      m.reply(bio.status)
    } catch {
      return m.reply(`bio is private!`)
    }
  }
}
handler.help = ['getbio']
handler.tags = ['group']
handler.command = /^(getb?io)$/i
handler.limit = true
export default handler
