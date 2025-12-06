let handler = async (m, { args }) => {

  let chat = global.db.data.chats[m.chat]

  // reset banned status

  chat.isBannedTime = 0

  chat.isBanned = false

  m.reply('Berhasil!')

}

handler.help = ['unbanchat']

handler.tags = ['owner']

handler.command = /^(unbanchat|ubnc)$/i

handler.owner = true

export default handler