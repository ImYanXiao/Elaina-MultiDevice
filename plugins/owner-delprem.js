let handler = async (m, { usedPrefix, command, text }) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
    let user = global.db.data.users[who]
    if (!who) return m.reply(`Tag Atau Masukan Nomornya!\n\nContoh :\n${usedPrefix + command} @${sender.split`@`[0]}`, false, { mentions: who })
    user.premium = false
    user.premiumTime = 0
    m.reply(`✔️ successfully removed *${user.name}* from premium user`)
}
handler.help = ['delprem']
handler.tags = ['owner']
handler.command = /^(-|del)p(rem)?$/i
handler.owner = true
export default handler