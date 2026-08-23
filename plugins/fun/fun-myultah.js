let handler = async (m, { conn, usedPrefix, command }) => {
    global.db.data.bots.ultah[m.chat] = global.db.data.bots.ultah[m.chat] || {}
    if (typeof global.db.data.bots.ultah[m.chat][m.sender] === "undefined") return m.reply(`Kamu belum menambahkan hari ulang tahun kamu, silahkan tambahkan dahulu menggunakan command *${usedPrefix}setultah*`)
    let { tanggal, bulan, tahun } = global.db.data.bots.ultah[m.chat][m.sender]
    let date = await calculateBirthdayInfo(tanggal, bulan, tahun)
    m.reply(`
Tanggal Lahir Kamu : ${tanggal}/${bulan}/${tahun}
Next Ultah : ${tanggal}/${bulan}/${new Date().getFullYear()}
Umur : ${date.age}

Kamu akan berulang tahun di tanggal ${tanggal}/${bulan}/${new Date().getFullYear()}, Dan tersisa ${date.daysUntilBirthday} hari lagi.
`.trim())
}
handler.help = ["myultah"]
handler.tags = ["fun"]
handler.command = /^(myulta(h)?)$/i
export default handler

function calculateBirthdayInfo(birthDate, birthMonth, birthYear) {
    const today = new Date()
    const birthDay = new Date(birthYear, birthMonth - 1, birthDate)
    let age = today.getFullYear() - birthYear
    const thisYearBirthDay = new Date(today.getFullYear(), birthMonth - 1, birthDate)
    if (today < thisYearBirthDay) {
        age--
    }
    const nextBirthDay = new Date(today.getFullYear(), birthMonth - 1, birthDate)
    if (today > thisYearBirthDay) {
        nextBirthDay.setFullYear(today.getFullYear() + 1)
    }
    const daysUntilBirthday = Math.round((nextBirthDay - today) / (1000 * 3600 * 24))
    return {
        daysUntilBirthday,
        age
    }
}