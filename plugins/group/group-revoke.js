let handler = async (m, { conn }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    let res = await conn.groupRevokeInvite(chatId)
    conn.reply(sender, 'https://chat.whatsapp.com/' + await conn.groupInviteCode(chatId), m)
}
handler.help = ['revoke']
handler.tags = ['group']
handler.command = /^re(voke|new)(invite|link)?$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
