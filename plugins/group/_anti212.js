let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.isGroup) return m.reply("❌ Perintah ini hanya dapat digunakan di grup.")
  
  let participants = await conn.groupMetadataPn(m.chat).then(res => res.participants)
  let botNumber = conn.user.jid
  let isBotAdmin = participants.find(p => p.id === botNumber)?.admin
  let senderAdmin = participants.find(p => p.id === m.sender)?.admin

  if (!senderAdmin) return m.reply("❌ Hanya admin yang bisa menggunakan perintah ini.")
  if (!isBotAdmin) return m.reply("❌ Bot harus menjadi admin untuk dapat mengeluarkan anggota.")

                               
  let targets = participants.filter(p => p.id.startsWith("212") && !p.admin)

  if (targets.length === 0) {
    return m.reply("✅ Tidak ada anggota dengan nomor +212 ditemukan.")
  }

  for (let target of targets) {
    await conn.groupParticipantsUpdate(m.chat, [target.id], "remove")
    await delay(1000)

    const arabic = "عذرًا، Elaina - MultiDevice لم تعد تعمل خارج إندونيسيا، لذلك قررنا إخراجك في الوقت الحالي"
    await conn.sendMessage(target.id, { text: arabic })
  }

  await m.reply(`✅ Selesai mengeluarkan ${targets.length} nomor +212 dari grup.`)
}

handler.help = ['limit212']
handler.tags = ['group']
handler.command = /^limit212$/i
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler

let delay = ms => new Promise(resolve => setTimeout(resolve, ms))
