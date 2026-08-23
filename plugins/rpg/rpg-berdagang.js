let handler = async (m, { conn, text }) => {
    let amount = Math.floor(Math.random() * 50000)
    let who = m.isGroup ? m.mentionedJid[0] : m.chat

    if (!who) return m.reply('Tag salah satu lah, yang kamu ingin berdagang bareng')
    if (typeof db.data.users[who] == 'undefined') return m.reply('Pengguna tidak ada didalam data base')

    let users = global.db.data.users
    let user = users[m.sender]
    let target = users[who]
    let lastDagang = user.lastdagang || 0
    let timeDiff = new Date() - lastDagang
    let timeLeft = 28800000 - timeDiff

    if (timeDiff < 28800000) {
        return m.reply(`Anda Sudah Berdagang , tunggu ${clockString(timeLeft)} lagi..`)
    }

    if (target.money < 50000 || user.money < 50000) {
        return m.reply('Modal tidak mencukupi. Harap masukkan modal 5000')
    }

    user.money -= amount
    target.money -= amount
    user.lastdagang = new Date().getTime()

    m.reply(`Mohon tunggu kak..\nKamu dan @${who.replace(/@.+/, '')} sedang berdagang.. \n\nKamu dan @${who.replace(/@.+/, '')} meletakkan modal -${amount}`, false, {
        contextInfo: {
            mentionedJid: [m.sender, who]
        }
    })

    let sendResult = () => {
        let profit = amount * 5
        user.money += profit
        target.money += profit

        conn.reply(m.chat, `Selamat kamu dan @${who.replace(/@.+/, '')} mendapatkan money..
Penghasilan dagang kamu didapatkan *+${toRupiah(profit)} Money* ${global.rpg.emoticon("money")}
*${toRupiah(user.money)} Money* ${global.rpg.emoticon("money")} kamu

Penghasilan dagang @${who.replace(/@.+/, '')} didapatkan *+${toRupiah(profit)} Money* ${global.rpg.emoticon("money")}
*${toRupiah(target.money)} Money* ${global.rpg.emoticon("money")} @${who.replace(/@.+/, '')}`, m, {
            contextInfo: {
                mentionedJid: [m.sender, who]
            }
        })
    }

    let intervals = [3600000, 7200000, 10800000, 14400000, 18000000, 21600000, 25200000, 28800000]
    intervals.forEach(interval => setTimeout(sendResult, interval))
}

handler.help = ['berdagang']
handler.tags = ['rpg']
handler.command = /^(berdagang)$/
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

let toRupiah = number => parseInt(number).toLocaleString().replace(/,/g, ".")