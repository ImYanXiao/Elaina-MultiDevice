let handler = async (m, { conn, text, usedPrefix, command }) => {
  // LID helpers usage
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

  // LID injection removed (now using global helpers)

    let chat = global.db.data.chats[chatId]
    if (m.isGroup) {
        switch (text) {
            case 'off':
            case 'mute':
                if (chat.mute) return m.reply('_Bot Sudah Offline_')
                chat.mute = true
                conn.reply(chatId, 'S u k s e s', m)
                break
            case 'on':
            case 'unmute':
                if (!chat.mute) return m.reply('_Bot Sudah Online_')
                chat.mute = false
                conn.reply(chatId, 'S u k s e s', m)
                break
            default: {
                m.reply(`Format Salah!\n\nContoh:\n${usedPrefix + command} on\n${usedPrefix + command} off`)
            }
        }
    } 
}
handler.help = ['botmodeowner']
handler.tags = ['owner']
handler.command = /^(sans(mahiru)?)$/i
handler.owner = true
export default handler