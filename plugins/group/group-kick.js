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

                            
  let target = null
  if (m.mentionedJid?.length) {
    target = m.mentionedJid[0]
  } else if (m.quoted?.sender) {
    target = m.quoted.sender
  } else if (text) {
    const number = text.replace(/\D/g, '')
    if (number.length >= 5) target = number + '@s.whatsapp.net'
  }

  if (!target) {
    return m.reply(
      `Reply, tag, atau ketik nomornya!\n\nContoh:\n${usedPrefix + command} @${sender.split('@')[0]}\n${usedPrefix + command} 628xxx`
    )
  }

  if (target === sender) return m.reply("Tidak bisa kick diri sendiri")

                                  
  let targetPart = participants.find(p => p.jid === target)
  if (!targetPart) return m.reply("Orang tersebut bukan anggota grup!")

                                
  try {
    await conn.groupParticipantsUpdate(chatId, [targetPart.id], 'remove')
    await delay(1200)
    await m.reply(
      `Sukses mengeluarkan @${target.split("@")[0]} dari grup!`,
      false,
      { mentions: [target] }
    )
  } catch (e) {
    await m.reply(`Gagal mengeluarkan anggota: ${e?.message || e}`)
  }
}

handler.help = ['kick @tag / nomor']
handler.tags = ['group']
handler.command = /^kick$/i
handler.group = true
                                                           

export default handler
