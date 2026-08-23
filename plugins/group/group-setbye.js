let handler = async (m, {
    conn, text, isROwner, isOwner, isAdmin, usedPrefix, command
}) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    if (text) {
        global.db.data.chats[chatId].sBye = text
        m.reply('Bye Berhasil Diatur...\n@user [mention]')
    } else return m.reply(`Teksnya Mana..\nContoh:\nSelamat Tinggal Beban @user`)
}
handler.help = ['setbye']
handler.tags = ['group']
handler.command = /^(setbye)$/i
handler.group = true
handler.admin = true

export default handler
