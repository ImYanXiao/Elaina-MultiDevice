let handler = async (m, { conn, usedPrefix, command, text }) => {
	if (!text) return m.reply(`Masukan angka! \n\nContoh: \n${usedPrefix + command} 5`)
	if (!isNumber(text)) return m.reply("Hanya angka!")
	if (global.db.data.users[m.sender]?.rate) return m.reply("Anda sudah rating!")
	if (text < 1 || text > 5) return m.reply("Pilih angka yang valid dari 1 - 5")
	m.reply("Rate anda telah berhasil! \nTerimakasih atas pendapat anda.")
	global.db.data.bots.rating[m.sender] = {
		rate: +text,
		ulasan: ""
	}
	global.db.data.users[m.sender].rate = true
}
handler.help = ["rate"]
handler.tags = ["main"]
handler.command = /^(rate|rating)$/i
export default handler

function isNumber(value) {
    value = parseInt(value)
    return typeof value === 'number' && !isNaN(value)
}