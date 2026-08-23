let handler = async (m, { conn, usedPrefix, command, text }) => {
    let user = global.db.data.users[m.sender]
    let bot = global.db.data.bots.users
    if (/iya/i.test(text)) {
        m.reply("Berhasil logout!")
        bot[user.email] = user
        delete global.db.data.users[m.sender]
    } else if (/tidak/i.test(text)) {
        m.reply("Tidak jadi logout!")
    } else {
        if (!user.verif) {
            return m.reply("Email kamu belum terverifikasi! tidak bisa logout")
        }
        await conn.textOptions(m.chat, `Apa kamu yakin ingin logout?`, false, [[".logout iya", "iya"], [".logout tidak", "tidak"]], m)
    }
}
handler.help = ["logout"]
handler.tags = ["xp"]
handler.command = /^(logout)$/i
export default handler