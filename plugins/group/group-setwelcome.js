let handler = async (m, { conn, text, isROwner, isOwner, isAdmin, usedPrefix, command }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

  if (text) {
    global.db.data.chats[chatId].sWelcome = text
    m.reply('Welcome berhasil diatur\n@user (Mention)\n@subject (Judul Grup)\n@desc (Deskripsi Grup)')
  } else return m.reply(`Teksnya mana?\n\ncontoh:\n${usedPrefix + command} hai, @user!\nSelamat datang di grup @subject\n\n@desc`)
}
handler.help = ['setwelcome']
handler.tags = ['group']
handler.command = /^(setwelcome|setw)$/i
handler.group = true
handler.admin = true

export default handler 
