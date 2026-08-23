let handler = async (m, { conn, usedPrefix }) => {
    let __timers = (new Date - global.db.data.users[m.sender].lastmisi)
    let _timers = (3600000 - __timers)
    let timers = clockString(_timers)
    let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    let id = m.sender
    let kerja = 'memancing'
    conn.misi = conn.misi ? conn.misi: {}
    if (id in conn.misi) return conn.reply(m.chat, `Selesaikan misi ${conn.misi[id][0]} terlebih dahulu`, m)
    if (user.umpan == 0) return m.reply('Kamu membutuhkan umpan 🪱 untuk uemancing!')
    if (user.fishingrod == 0) return m.reply('Kamu harus mempunyai Fishingrod 🎣 terlebih dahulu jika ingin memancing')
    if (new Date - user.lastmisi > 3600000) {
        let ikan1 = Math.floor(Math.random() * 5)
        let ikan2 = Math.floor(Math.random() * 5)
        let ikan3 = Math.floor(Math.random() * 5)
        let ikan4 = Math.floor(Math.random() * 5)
        let ikan5 = Math.floor(Math.random() * 5)
        let ikan6 = Math.floor(Math.random() * 5)
        let ikan7 = Math.floor(Math.random() * 5)
        let ikan8 = Math.floor(Math.random() * 5)
        let ikan9 = Math.floor(Math.random() * 5)
        let ikan10 = Math.floor(Math.random() * 5)
        let ikan11 = Math.floor(Math.random() * 5)

        let hsl = `
*📮 Hasil tangkapan Mu*
${ikan1 ? `
🦀 Kepiting: ${ikan1}`: ''} ${ikan2 ? `
🦞 Lobster: ${ikan2}`: ''} ${ikan3 ? `
🦐 Udang: ${ikan3}`: ''} ${ikan4 ? `
🦑 Cumi: ${ikan4}`: ''} ${ikan5 ? `
🐙 Gurita: ${ikan5}`: ''} ${ikan6 ? `
🐡 Buntal: ${ikan6}`: ''} ${ikan7 ? `
🐠 Dory: ${ikan7}`: ''} ${ikan8 ? `
🐳 Orca: ${ikan8}`: ''} ${ikan9 ? `
🐬 Lumba: ${ikan9}`: ''} ${ikan10 ? `
🐋 Paus: ${ikan10}`: ''} ${ikan11 ? `
🦈 Hiu: ${ikan11}`: ''}
`.trim()

        user.kepiting += ikan1
        user.lobster += ikan2
        user.udang += ikan3
        user.cumi += ikan4
        user.gurita += ikan5
        user.buntal += ikan6
        user.dory += ikan7
        user.orca += ikan8
        user.lumba += ikan9
        user.paus += ikan10
        user.hiu += ikan11
        user.fishingroddurability -= 10
        user.umpan -= 1

        setTimeout(() => {
            m.reply('🎣 Mulai memancing...')
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
handler.help = ['mancing']
handler.tags = ['rpg']
handler.command = /^(mancing|fishing|memancing)$/i
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