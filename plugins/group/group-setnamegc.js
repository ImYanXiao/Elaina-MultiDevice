let handler = async (m, { conn, args, usedPrefix, command }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

if (!args) return m.reply(`Mau Diganti Pakai Nama Apa?\n\nContoh ${usedPrefix + command} Elaina Official`)
  await conn.groupUpdateSubject(chatId, `${args.join(" ")}`);
  m.reply('📮Sukses mengganti nama group')
}

handler.help = ['setnamegc']
handler.tags = ['group']
handler.command = /^setnamegc$/i

handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
