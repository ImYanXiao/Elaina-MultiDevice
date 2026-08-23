let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let __timers = (new Date - user.lastmisi)
    let _timers = (3600000 - __timers)
    let timers = clockString(_timers)
    let id = m.sender
    let kerja = 'rob'
    conn.misi = conn.misi ? conn.misi: {}
    if (id in conn.misi) return conn.reply(m.chat, `Selesaikan misi ${conn.misi[id][0]} terlebih dahulu`, m)
    if (user.health < 80) return m.reply('Anda harus memiliki minimal 80 health')
    if (new Date - user.lastmisi > 3600000) {
        let rndm1 = Math.floor(Math.random() * 10)
        let rndm2 = Math.floor(Math.random() * 10)

        let ran1 = (rndm1 * 100000)
        let ran2 = (rndm2 * 1000)

        let hsl = `
*—[ Hasil rob ]—*

➕ 💹 Uang = [ ${toRupiah(ran1)} ]
➕ ✨ Exp = [ ${toRupiah(ran2)} ]
➕ 📦 Rob Selesai = +1

Dan health anda berkurang -80
`.trim()
        user.money += ran1
        user.exp += ran2
        user.health -= 80

        setTimeout(() => {
            m.reply('🔍 Mencari rumah yang ingin dirampok...')
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
handler.help = ['rob']
handler.tags = ['rpg']
handler.command = /^(rob|robery)$/i
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

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/gi, ".")