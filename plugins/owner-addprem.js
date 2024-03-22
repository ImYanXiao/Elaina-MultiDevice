let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = db.data.users[who]
    if (!user) throw `User not found!`
    if (!who) throw `Tag or mention someone!`
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw `Where is the number of days?`
    if (isNaN(txt)) return m.reply(`Only numbers are allowed!\n\nExample:\n${usedPrefix + command} @${m.sender.split`@`[0]} 7`)
    var jumlahHari = 86400000 * txt
    var now = new Date() * 1
    if (!user.premiumTime || now < user.premiumTime) user.premiumTime = now + jumlahHari
    else user.premiumTime += jumlahHari
    user.premium = true
    m.reply(`✔️ Success
📛 *Name:* ${user.name}
📆 *Days:* ${txt} days
📉 *Countdown:* ${user.premiumTime - now}`)
}
handler.help = ['addprem [@user] <days>']
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)p(rem)?$/i

handler.group = true
handler.rowner = true

export default handler
