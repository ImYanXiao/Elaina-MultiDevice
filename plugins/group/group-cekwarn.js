let limit = 5

let handler = async (m, { conn, usedPrefix, command, text }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : sender

    let chat = global.db.data.chats[chatId]
    let user = chat.member[who]

    let caption = `
Hai, ${conn.getName(who)}
${user.warn == 0 ? `
${who == sender ? 'Kamu' : 'Dia'} tidak memiliki warn` : `
${who == sender ? 'Kamu' : 'Dia'} memiliki ${user.warn} \n\n_Note : Jika warn telah mencapai 5 maka kamu akan dikick_`}
`.trim()
    conn.adReply(chatId, caption, 'W A R N I N G', "", 'https://pomf2.lain.la/f/xnf9kiak.jpg', '', m)
}
handler.help = ['cekwarn']
handler.tags = ['group']
handler.command = /^(cekwarn)$/i
handler.group = true
export default handler
