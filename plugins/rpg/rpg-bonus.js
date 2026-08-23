let handler = async (m) => {
    let user = global.db.data.users[m.sender]
    let time = user.lastbonus + 86400000

    if (new Date - user.lastbonus < 86400000) return m.reply(`Kamu Sudah Ambil Bonus Hari Ini\nTunggu selama ${msToTime(time - new Date())} lagi`)

    let money = Math.floor(Math.random() * 50000000)
    user.money += money * 1
    user.lastbonus = new Date * 1

    m.reply(`Selamat Kamu Mendapatkan Bonus : \n*+${toRupiah(money)} Money* ${global.rpg.emoticon("money")}`)
}
handler.help = ['bonus']
handler.tags = ['rpg', 'premium']
handler.command = /^(bonus)$/i

handler.register = true
handler.group = true
handler.premium = true
handler.rpg = true

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

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substr(1)
}

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/g, ".")
