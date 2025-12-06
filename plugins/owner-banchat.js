let handler = async (m, { args }) => {
  let chat = global.db.data.chats[m.chat]

  if (args[0]) {
    if (isNaN(args[0])) return m.reply('Hanya Angka!')

    let jumlahHari = 86400000 * args[0] // konversi hari ke ms
    let now = new Date() * 1

    if (now < chat.isBannedTime) chat.isBannedTime += jumlahHari
    else chat.isBannedTime = now + jumlahHari

    chat.isBanned = true
    m.reply(`Sukses Membanned Group Ini Selama:\n${args[0]} Hari`)
  } else {
    chat.isBannedTime = 17
    chat.isBanned = true
    m.reply('Sukses Membanned Group Ini')
  }
}

handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^(ban(chat|gc))$/i
handler.owner = true

export default handler