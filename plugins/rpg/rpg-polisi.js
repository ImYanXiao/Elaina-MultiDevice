let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let __timers = (new Date - user.lastmisi)
    let _timers = (3600000 - __timers)
    let order = isNaN(user.polisi) ? user.polisi = 0 : user.polisi
    let timers = clockString(_timers)
    let name = conn.getName(m.sender)
    let id = m.sender
    let kerja = 'polisi'
    conn.misi = conn.misi ? conn.misi: {}
    if (id in conn.misi) return conn.reply(m.chat, `Selesaikan misi ${conn.misi[id][0]} terlebih dahulu`, m)
    if (new Date - user.lastmisi > 3600000) {
        let randomaku1 = Math.floor(Math.random() * 10)
        let randomaku2 = Math.floor(Math.random() * 10)

        let rbrb1 = (randomaku1 * 100000)
        let rbrb2 = (randomaku2 * 1000)

        var hsl = `
*—[ Hasil Polisi ${name} ]—*
➕ 💹 Uang = [ ${toRupiah(rbrb1)} ]
➕ ✨ Exp = [ ${toRupiah(rbrb2)} ]
➕ 😍 Order Selesai = +1
➕ 📥Total Order Sebelumnya : ${toRupiah(order)}
`.trim()

        user.money += rbrb1
        user.exp += rbrb2
        user.polisi += 1

        setTimeout(() => {
            m.reply('🔍 Sedang berpatroli mencari maling...')
        }, 0)

        conn.misi[id] = [
            kerja,
            setTimeout(() => {
                delete conn.misi[id]
            }, 27000)
        ]

        setTimeout(() => {
            m.reply(hsl)
        }, 27000)

        user.lastmisi = new Date * 1
    } else m.reply(`Silahkan menunggu selama ${timers}, untuk bisa ${kerja} kembali`)
}
handler.help = ["polisi"]
handler.tags = ['rpg']
handler.command = /^(polisi)$/i
handler.register = true
handler.group = true
handler.level = 10
handler.rpg = true
handler.energy = 5
export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/gi, ".")