import { spawn } from 'child_process'
let handler = async (m, { conn, isROwner, text }) => {
  // LID helpers usage
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

  // LID injection removed (now using global helpers)

    if (!process.send) return m.reply('Dont: node main.js\nDo: node index.js')
    if (global.conn.user.jid == conn.user.jid) {
        await m.reply('```R E S T A R T . . .```')
        process.send('reset')
    } else m.reply('_eeeeeiiittsssss..._')
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = /^(res(tart)?)$/i
handler.mods = true
export default handler