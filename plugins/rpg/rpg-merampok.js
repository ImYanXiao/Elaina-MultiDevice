let handler = async (m, { conn, text, usedPrefix, command }) => {
    let dapat = (Math.floor(Math.random() * 100000))
    let users = global.db.data.users
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    if (!who) return m.reply('Tag orang yang mau kamu Rampok!')
    if (typeof global.db.data.users[who] == 'undefined') return m.reply('Pengguna tidak ada didalam database')
    if (users[who].level > users[m.sender].level) return m.reply(`Level kamu harus lebih tinggi dari @${who.split('@')[0]} Untuk bisa merampoknya!`, false, { mentions: [who] })
    let __timers = (new Date - global.db.data.users[m.sender].lastrampok)
    let _timers = (3600000 - __timers)
    let timers = clockString(_timers)
    if (new Date - global.db.data.users[m.sender].lastrampok > 3600000) {
        if (10000 > users[who].money) return m.reply('target gaada 💰uang bodoh, kismin dia')
        users[who].money -= dapat * 1
        users[m.sender].money += dapat * 1
        global.db.data.users[m.sender].lastrampok = new Date * 1
        conn.reply(m.chat, `Berhasil merampok money target sebesar 💰${toRupiah(dapat)}`, m)
    } else conn.reply(m.chat, `Anda Sudah merampok dan berhasil sembunyi , tunggu ${timers} untuk merampok lagi`, m)
}
handler.help = ['merampok']
handler.tags = ['rpg']
handler.command = /^(merampok)$/i
handler.register = true
handler.group = true
handler.rpg = true
handler.energy = 5
export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/gi, ".")