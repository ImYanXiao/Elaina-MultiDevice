let limit = 5

let handler = async (m, { conn, usedPrefix, command, text }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
    if (!who) return m.reply(`Reply atau tag orangnya! \n\nContoh : \n${usedPrefix + command} @${sender.split('@')[0]}`, false, { mentions : [sender] })

    let chat = global.db.data.chats[chatId]
    let user = chat.member[who]

    switch (command) {
        case 'addwarn':
        case 'warn':
            user.warn += 1
            if (user.warn >= limit) {
                await conn.reply(chatId, `Warning user tersebut sudah lebih dari ${limit} maka akan dikick`, m)
                await conn.groupParticipantsUpdate(chatId, [who], 'remove')
                user.warn = 0
            } else {
                await conn.reply(chatId, `Sukses memberi warning kepada user \nWarning user ${user.warn}/${limit}`, m)
            }
            break
        case 'delwarn':
            if (user.warn == 0) {
                await m.reply(`User tersebut tidak memiliki warn`)
            } else {
                user.warn -= 1
                await m.reply(`Sukses menghapus warning user \nWarning user ${user.warn}/${limit}`)
            }
            break

        default:
                   
    }
}
handler.help = ['addwarn', 'delwarn']
handler.tags = ['group']
handler.command = /((add|del(ete)?)warn|warn)$/i
handler.admin = true
handler.group = true
export default handler
