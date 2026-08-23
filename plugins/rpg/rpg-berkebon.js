const timeout = 1800000

let handler = async (m, { conn, usedPrefix, text }) => {
    let user = global.db.data.users[m.sender]
    let lastTime = user.lastberkebon || 0
    let timeDiff = new Date() - lastTime
    let timeLeft = timeout - timeDiff

    if (timeDiff < timeout) {
        return conn.reply(m.chat, `Mohon Menunggu Selama ${clockString(timeLeft)} Untuk Berkebun Kembali...`, m)
    }

    if (user.bibitpisang < 100 || user.bibitanggur < 100 || user.bibitmangga < 100 || user.bibitjeruk < 100 || user.bibitapel < 100) {
        let neededSeeds = `
📮 Kamu Membutuhkan Bibit:
${user.bibitpisang < 100 ? `${global.rpg.emoticon("bibitpisang")} BibitPisang: ${100 - user.bibitpisang}` : ''}
${user.bibitanggur < 100 ? `${global.rpg.emoticon("bibitanggur")} BibitAnggur: ${100 - user.bibitanggur}` : ''}
${user.bibitmangga < 100 ? `${global.rpg.emoticon("bibitmangga")} BibitMangga: ${100 - user.bibitmangga}` : ''}
${user.bibitjeruk < 100 ? `${global.rpg.emoticon("bibitjeruk")} BibitJeruk: ${100 - user.bibitjeruk}` : ''}
${user.bibitapel < 100 ? `${global.rpg.emoticon("bibitapel")} BibitApel: ${100 - user.bibitapel}` : ''}`.trim()

        return conn.reply(m.chat, neededSeeds, m)
    }

    let hasilPanen = {
        pisang: Math.floor(Math.random() * 100),
        anggur: Math.floor(Math.random() * 100),
        mangga: Math.floor(Math.random() * 100),
        jeruk: Math.floor(Math.random() * 100),
        apel: Math.floor(Math.random() * 100)
    }

    let hasilPanenMessage = `⌛ Hasil Panen Kamu
${global.rpg.emoticon("pisang")} Pisang: ${hasilPanen.pisang}
${global.rpg.emoticon("anggur")} Anggur: ${hasilPanen.anggur}
${global.rpg.emoticon("mangga")} Mangga: ${hasilPanen.mangga}
${global.rpg.emoticon("jeruk")} Jeruk: ${hasilPanen.jeruk}
${global.rpg.emoticon("apel")} Apel: ${hasilPanen.apel}`

    Object.keys(hasilPanen).forEach(key => {
        user[key] += hasilPanen[key]
        user[`bibit${key}`] -= 100
        global.db.data.bots.stock[`bibit${key}`] += 100
    })

    user.lastberkebon = new Date() * 1

    conn.reply(m.chat, 'Sedang Menanam Bibit...', m)
    setTimeout(() => {
        conn.reply(m.chat, hasilPanenMessage.trim(), m)
    }, 20000)
}

handler.help = ['berkebun']
handler.tags = ['rpg']
handler.command = /^(berkebun|berkebon)/i
handler.register = true
handler.group = true
handler.rpg = true
handler.energy = 5
export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}