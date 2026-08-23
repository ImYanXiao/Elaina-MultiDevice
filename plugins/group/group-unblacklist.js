let handler = async (m, { conn, usedPrefix, command, text }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
    if (!who) return m.reply(`Reply atau tag orangnya! \n\nContoh : \n${usedPrefix + command} @${sender.split('@')[0]}`, false, { mentions : [who] })

    let chat = global.db.data.chats[chatId]

    let user = chat.member[who]
    if (!user.blacklist) return m.reply("User tersebut tidak di Blacklist!")

    user.blacklist = false
    user.blacklistTime = 0
    m.reply(`Sukses mengeluarkan @${who.split("@")[0]} dari daftar Blacklist! Sekarang dia sudah dapat menggunakan bot di group ini!`, false, { mentions: [who] })
}
handler.help = ["unblacklist"]
handler.tags = ["group"]
handler.command = /^(unblacklist(user)?)$/i
handler.group = true
handler.admin = true
export default handler
