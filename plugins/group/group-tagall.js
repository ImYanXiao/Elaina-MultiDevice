let handler = async(m, { conn, usedPrefix, text, participants }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    let teks = `${text ? text: '*––––––『 TAG All 』––––––*'}\n\n${readMore}`
    for (let mem of participants) {
        teks += `\n@${mem.id.split('@')[0]}`
    }
    await conn.sendMessage(chatId, { text: teks, mentions: participants.map(a => a.id) })
}
handler.help = ['tagall']
handler.tags = ['group']
handler.command = /^(tagall|all)$/i

handler.group = true
handler.admin = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
