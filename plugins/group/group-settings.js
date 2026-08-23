let handler = async (m, { conn, args, usedPrefix, command }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    let isClose = { 
        'open': 'not_announcement',
        'close': 'announcement',
    }[(args[0] || '')]
    if (isClose === undefined)
        return m.reply(`
*Format Salah! Contoh :*
  *${usedPrefix + command} close*
  *${usedPrefix + command} open*
`.trim())
    await conn.groupSettingUpdate(chatId, isClose)
}
handler.help = ['group']
handler.tags = ['group']
handler.command = /^(g|group)$/i

handler.admin = true
handler.botAdmin = true

export default handler
