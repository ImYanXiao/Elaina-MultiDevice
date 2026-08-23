let handler = async (m, { conn, participants, groupMetadata }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    const pp = await conn.profilePictureUrl(chatId, 'image').catch(_ => null) || './src/avatar_contact.png'
    const { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, delete: del } = global.db.data.chats[chatId]
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || chatId.split`-`[0] + '@s.whatsapp.net'
    let text = `*「 *ELAINA - AI* 」*\n

*Group Admins:*
${listAdmin}
`.trim()
    conn.sendFile(chatId, pp, 'pp.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}

handler.help = ['tagadmin', 'listadmin']
handler.tags = ['group']
handler.command = /^(tagadmin|listadmin)$/i

handler.group = true

export default handler
