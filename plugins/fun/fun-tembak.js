let handler = async (m, { conn, usedPrefix, command, text }) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
    if (!who) return m.reply(`Reply atau tag orangnya! \n\nContoh : \n${usedPrefix + command} @${m.sender.split('@')[0]}`, false, { mentions : [m.sender] })

    let user = global.db.data.users
    if (typeof user[who] == "undefined") return m.reply("Orang ini tidak ada di database")
    if (user[who].pacar == m.sender) return m.reply("Orang ini sudah menjadi pacar kamu")
    if (user[who].pacar != "") return m.reply("Orang ini sudah memiliki pacar")
    if (user[who].tembak == m.sender) return m.reply("Kamu sudah menembak orang ini, silahkan tunggu jawaban darinya!")
    if (user[who].tembak != "") return m.reply(`Orang ini sudah di tembak!`, false, { mentions: [user[who].tembak] })
    if (user[m.sender].pacar != "") return m.reply("Kamu sudah memiliki pacar! jangan selingkuh!")
    if (user[m.sender].tembak != "") return m.reply(`Kamu sudah menembak @${user[m.sender].tembak.split("@")[0]}, jangan menembak orang lain dulu!`, false, { mentions: [user[m.sender].tembak] })
    if (who == m.sender) return m.reply("Tidak bisa menembak diri sendiri")

    user[who].tembak = m.sender
    user[who].ditembak = true
    user[m.sender].tembak = who
    user[m.sender].ditembak = false

    await m.reply(`Kamu sudah menembak @${who.split("@")[0]} untuk menjadi pacar kamu! Silahkan tunggu jawaban darinya... \n\nKetik: \n${usedPrefix}terima - Untuk menerima \n${usedPrefix}tolak - Untuk menolak`, false, { mentions: [who] })
}
handler.help = ["tembak"]
handler.tags = ["fun"]
handler.command = /^(tembak)$/i
handler.group = true
export default handler