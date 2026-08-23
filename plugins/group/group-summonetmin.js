let handler = async (m, { conn, participants, groupMetadata }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    const { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, delete: del } = global.db.data.chats[chatId]
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || chatId.split`-`[0] + '@s.whatsapp.net'
    let text = `etmin 😭 dimanaaa etmin member butuh etmin😭

*Group Admins:*
${listAdmin}
`.trim()
    conn.sendMessage(chatId, { text, mentions: [...groupAdmins.map(v => v.id), owner] }, { quoted: m })
}

handler.help = ['summonetmin']
handler.tags = ['group']
handler.command = /^(summonetmin)$/i

handler.group = true

export default handler
