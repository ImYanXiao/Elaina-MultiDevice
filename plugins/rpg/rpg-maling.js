
const timeout = 604800000

let handler = async (m, { conn, usedPrefix, text }) => {
    let user = db.data.users[m.sender]
    let time = user.lastmaling + 604800000
    if (new Date - user.lastmaling< 604800000) return m.reply(`📮Anda sudah merampok bank\nTunggu selama ⏲️ ${msToTime(time - new Date())} lagi`)
	let money = `${Math.floor(Math.random() * 30000)}`.trim()
	let exp = `${Math.floor(Math.random() * 999)}`.trim()
	let kardus = `${Math.floor(Math.random() * 1000)}`.trim()
	user.money += money * 1
	user.exp += exp * 1
	user.kardus += kardus * 1
	user.lastmaling = new Date * 1
    m.reply(`Selamat kamu mendapatkan : \n💰+${toRupiah(money)} Money\📦+${toRupiah(kardus)} Kardus\n✨+${toRupiah(exp)} Exp`)
    setTimeout(() => {
        conn.reply(m.chat, `Yuk waktunya Maling lagi 👋…`, m)
    }, timeout)
}
handler.help = ['maling']
handler.tags = ['rpg']
handler.command = /^(maling)/i
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