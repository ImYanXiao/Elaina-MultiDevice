let delay = ms => new Promise(resolve => setTimeout(resolve, ms))

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const sender = global.decodeSender
    ? global.decodeSender(m, conn)
    : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender)

  const chatId = m.chat
  const group = await conn.groupMetadataPn(chatId)
  const participants = group.participants || []

                                              
  let admins = participants.filter(p => p.admin).map(p => p.jid)

                          
  let botJid = conn.decodeJid(conn.user.id)
  if (!admins.includes(botJid)) {
    return m.reply("Jadikan bot sebagai *Admin* untuk menggunakan command ini")
  }

                               
  if (!admins.includes(sender)) {
    return m.reply("Command ini hanya dapat digunakan oleh *Admin* !!")
  }

                                   
  if (!text) {
    return m.reply(
      `Ketik nomornya!\n\nContoh:\n${usedPrefix + command} 628xxx`
    )
  }

  const number = text.replace(/\D/g, '')
  if (number.length < 5) return m.reply("Nomor tidak valid.")

  const target = number + '@s.whatsapp.net'

                                         
  let exists = participants.find(p => p.jid === target)
  if (exists) {
    return m.reply("Orang tersebut sudah ada di grup.")
  }

                         
  try {
    await conn.groupParticipantsUpdate(chatId, [target], 'add')
    await delay(1200)
    await m.reply(`Sukses menambahkan @${number} ke grup!`, false, {
      mentions: [target]
    })
  } catch (e) {
    await m.reply(`Gagal menambahkan anggota: ${e?.message || e}`)
  }
}

handler.help = ['add <nomor>']
handler.tags = ['group']
handler.command = /^add$/i
handler.group = true
                                                                        

export default handler
