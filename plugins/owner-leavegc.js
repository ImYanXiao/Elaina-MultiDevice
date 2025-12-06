let handler = async (m, { conn, args, command, text }) => {
  // LID helpers usage
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

  // LID injection removed (now using global helpers)

	let group = text ? text : chatId
        await conn.reply(group, 'Byee Bot akan pergi , , ! (≧ω≦)ゞ', null) 
        await  conn.groupLeave(group)
        m.reply('S u k s e s')
}
handler.help = ['leavegc']
handler.tags = ['owner']
handler.command = /^(out|leavegc)$/i
handler.owner = true
export default handler