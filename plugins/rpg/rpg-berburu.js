let handler = async (m, { conn }) => {
    let __timers = (new Date - global.db.data.users[m.sender].lastmisi)
    let _timers = (3600000 - __timers)
    let timers = clockString(_timers)
    let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    let id = m.sender
    let kerja = 'berburu'
    conn.misi = conn.misi ? conn.misi: {}
    if (id in conn.misi) return conn.reply(m.chat, `Selesaikan misi ${conn.misi[id][0]} terlebih dahulu`, m)
    if (new Date - user.lastmisi > 3600000) {
        let hewan1 = Math.floor(Math.random() * 10)
        let hewan2 = Math.floor(Math.random() * 10)
        let hewan3 = Math.floor(Math.random() * 10)
        let hewan4 = Math.floor(Math.random() * 10)
        let hewan5 = Math.floor(Math.random() * 10)
        let hewan6 = Math.floor(Math.random() * 10)
        let hewan7 = Math.floor(Math.random() * 10)
        let hewan8 = Math.floor(Math.random() * 10)
        let hewan9 = Math.floor(Math.random() * 10)
        let hewan10 = Math.floor(Math.random() * 10)
        let hewan11 = Math.floor(Math.random() * 10)
        let hewan12 = Math.floor(Math.random() * 10)

        let hsl = `🕸 *Hasil buruan ${user.registered ? user.name: conn.getName(m.sender)}*
        ${hewan1 ? `
🐂 Banteng: ${hewan1}`: ''} ${hewan2 ? `
🐅 Harimau: ${hewan2}`: ''} ${hewan3 ? `
🐘 Gajah: ${hewan3}`: ''} ${hewan4 ? `
🐐 Kambing: ${hewan4}`: ''} ${hewan5 ? `
🐼 Panda: ${hewan5}`: ''} ${hewan6 ? `
🐊 Buaya: ${hewan6}`: ''} ${hewan7 ? `
🐃 Kerbau: ${hewan7}`: ''} ${hewan8 ? `
🐮 Sapi: ${hewan8}`: ''} ${hewan9 ? `
🐒 Monyet: ${hewan9}`: ''} ${hewan10 ? `
🐗 Babi Hutan: ${hewan10}`: ''} ${hewan11 ? `
🐖 Babi: ${hewan11}`: ''} ${hewan12 ? `
🐓 Ayam: ${hewan12}`: ''}
`.trim()

        user.banteng += hewan1
        user.harimau += hewan2
        user.gajah += hewan3
        user.kambing += hewan4
        user.panda += hewan5
        user.buaya += hewan6
        user.kerbau += hewan7
        user.sapi += hewan8
        user.monyet += hewan9
        user.babihutan += hewan10
        user.babi += hewan11
        user.ayam += hewan12

        setTimeout(() => {
            m.reply('Mulai berburu...')
        }, 0)

        conn.misi[id] = [
            kerja,
            setTimeout(() => {
                delete conn.misi[id]
            }, 20000)
        ]

        setTimeout(() => {
            m.reply(hsl)
        }, 20000)

        user.lastmisi = new Date * 1
    } else m.reply(`Silahkan menunggu selama ${timers}, untuk bisa ${kerja} kembali`)
}
handler.help = ['berburu']
handler.tags = ['rpg']
handler.command = /^(berburu)$/i
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