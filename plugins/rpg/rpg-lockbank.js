let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    if (new Date - user.lockBankCD < 36000000) return m.reply(`Bank kamu sudah terkunci selama ${getTime(36000000, user.lockBankCD)}`)
    user.lockBankCD = new Date() * 1
    m.reply('Berhasil mengkunci bank untuk 10jam kedepan')
}
handler.help = ['lockbank']
handler.tags = ['rpg', 'premium']
handler.command = ['lockbank']
handler.rpg = true
handler.group = true
handler.premium = true
export default handler

function getTime(cooldown, date) {
    let __timers = (new Date - date)
    let _timers = (cooldown - __timers)
    let timers = clockString(_timers)
    return timers
}

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}