let handler = async (m, { conn, usedPrefix, command, text }) => {
    let user = global.db.data.users
    if (user[m.sender].pacar == "") return m.reply("Kamu tidak memiliki pacar")
    let date = await dateTime(user[m.sender].pacaranTime)
    let caption = `Kamu sudah perpacaran dengan @${user[m.sender].pacar.split("@")[0]} sejak *${date}*`
    conn.adReply(m.chat, caption, "P a c a r a n", "", "https://akcdn.detik.net.id/visual/2016/09/20/34ce7ca9-7652-4631-a37e-459e465d824c_169.jpg?w=400&q=90", false, m)
}
handler.help = ["pacar"]
handler.tags = ["fun"]
handler.command = /^(pacar)$/i
export default handler

function dateTime(timestamp) {
	const dateReg = new Date(timestamp)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateReg.toLocaleDateString('id-ID', options);
    return formattedDate
}