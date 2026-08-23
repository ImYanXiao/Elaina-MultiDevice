let handler = async (m, { conn, usedPrefix, command, text }) => {
    let user = global.db.data.users
    let pacar = user[m.sender].pacar

    if (user[m.sender].pacar == "") return m.reply("Kamu tidak memiliki pacar")

    user[m.sender].pacar = ""
    user[pacar].pacar = ""
    user[m.sender].pacaranTime = ""
    user[pacar].pacaranTime = ""

    await m.reply(`Kamu telah putus dengan @${pacar.split("@")[0]}`, false, { mentions: [pacar] })
}
handler.help = ["putus"]
handler.tags = ["fun"]
handler.command = /^(putus)$/i
handler.group = true
export default handler

const delay = time => new Promise(res => setTimeout(res, time))