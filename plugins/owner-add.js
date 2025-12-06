let delay = ms => new Promise(resolve => setTimeout(resolve, ms))

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const sender = global.decodeSender
    ? global.decodeSender(m, conn)
    : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender)

  const chatId = m.chat
  const group = await conn.groupMetadata(chatId)
  const participants = group.participants || []

  // --- Target nomor wajib ada ---
  if (!text) {
    return m.reply(
      `Ketik nomornya!\n\nContoh:\n${usedPrefix + command} 628xxx`
    )
  }

  const number = text.replace(/\D/g, '')
  if (number.length < 5) return m.reply("Nomor tidak valid.")

  const target = number + '@s.whatsapp.net'

  // --- Cek apakah sudah ada di grup ---
  let exists = participants.find(p => p.jid === target)
  if (exists) {
    return m.reply("Orang tersebut sudah ada di grup.")
  }

  // --- Eksekusi add ---
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

handler.help = ['oadd <nomor>']
handler.tags = ['owner']
handler.command = /^oadd$/i
handler.group = true
handler.owner = true   // 🔥 Hanya owner yang bisa pakai

export default handler