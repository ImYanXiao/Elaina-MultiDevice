let handler = async (m, { conn, usedPrefix, text }) => {
	let user = global.db.data.users[m.sender]
    let time = user.lastparming + 1800000
    if (new Date - user.lastparming < 1800000) return m.reply(`Anda sudah lelah untuk bekerja\nTunggu selama ${msToTime(time - new Date())} lagi`)
	let wood = `${Math.floor(Math.random() * 50)}`.trim()
	let money = `${Math.floor(Math.random() * 50000)}`.trim()
	user.wood += wood * 1
	user.money += money * 1
	user.lastparming = new Date * 1
    m.reply(`Selamat kamu mendapatkan : \n+${toRupiah(wood)} Kayu\n+${toRupiah(money)} Money`)
}
handler.help = ['nebang']
handler.tags = ['rpg']
handler.command = /^(nebang)/i
handler.register = true
handler.group = true
handler.rpg = true
handler.energy = 5
export default handler 

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return hours + " jam " + minutes + " menit " + seconds + " detik"
}

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/gi, ".")