let handler = async (m, { conn, command }) => {
    let user = global.db.data.users[m.sender]
    let randomaku = Math.floor(Math.random() * 101)
    let randomkamu = Math.floor(Math.random() * 101)
    let __timers = (new Date - user.lastbansos)
    let _timers = (3600000 - __timers)
    let timers = clockString(_timers)
    if (user.money < 3000000) return m.reply(`Kamu harus mempunyai *${toRupiah(3000000)} Money* ${global.rpg.emoticon("money")} untuk menggunakan fitur ini!`)
    if (new Date - user.lastbansos > 3600000) {
        if (randomaku > randomkamu) {
            conn.sendFile(m.chat, 'https://telegra.ph/file/afcf9a7f4e713591080b5.jpg', 'korupsi.jpg', `Kamu Tertangkap Setelah Kamu korupsi dana bansos🕴️💰,  Dan Kamu harus membayar denda *${toRupiah(3000000)} Money* ${global.rpg.emoticon("money")}`, m)
            user.money -= 3000000
            user.lastbansos = new Date * 1
        } else if (randomaku < randomkamu) {
            user.money += 3000000
            conn.sendFile(m.chat, 'https://telegra.ph/file/d31fcc46b09ce7bf236a7.jpg', 'korupsi.jpg', `Kamu berhasil  korupsi dana bansos🕴️💰,  Dan Kamu mendapatkan *${toRupiah(3000000)} Money* ${global.rpg.emoticon("money")}`, m)
            user.lastbansos = new Date * 1
        } else {
            m.reply(`Sorry Gan Lu g Berhasil Korupsi bansos Dan Tidak masuk penjara karna Kamu *melarikan diri🏃*`)
            user.lastbansos = new Date * 1
        }
    } else m.reply(`Silahkan Menunggu ${timers} Untuk ${command} Lagi`)
}

handler.help = ['korupsi']
handler.tags = ['rpg']
handler.command = /^(bansos|korupsi)$/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substr(1)
}

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/gi, ".")