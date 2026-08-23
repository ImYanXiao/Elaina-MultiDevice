let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let __timers = (new Date - user.lastmisi)
    let _timers = (3600000 - __timers)
    let order = user.bunuh
    let timers = clockString(_timers)
    let name = conn.getName(m.sender)
    let id = m.sender
    let kerja = 'bunuh'
    conn.misi = conn.misi ? conn.misi: {}
    if (id in conn.misi) return conn.reply(m.chat, `Selesaikan misi ${conn.misi[id][0]} terlebih dahulu`, m)
    if (new Date - user.lastmisi > 3600000) {
        let randomaku4 = Math.floor(Math.random() * 10)
        let randomaku5 = Math.floor(Math.random() * 10)

        let rbrb4 = (randomaku4 * 100000)
        let rbrb5 = (randomaku5 * 1000)

        var hsl = `
*—[ Hasil ${name} ]—*
➕ 💹 Uang = [ ${toRupiah(rbrb4)} ]
➕ ✨ Exp = [ ${toRupiah(rbrb5)} ]
➕ 👮 Pelanggaran +1
➕ ☑️ Misi Berhasil = +1
➕ 📥Total Misi Sebelumnya : ${toRupiah(order)}
`.trim()

        user.money += rbrb4
        user.exp += rbrb5
        user.bunuh += 1
        user.warn += 1

        setTimeout(() => {
            m.reply('🔍 Mencari target pembunuhan...')
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
handler.help = ['hitman']
handler.tags = ['rpg']
handler.command = /^(bunuh|hitman)$/i
handler.register = true
handler.group = true
handler.rpg = true
handler.level = 10
handler.energy = 5
export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/g, ".")
