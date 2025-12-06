var handler = async (m, { conn, participants, botAdmin}) => {
    if (!botAdmin) {
        return m.reply('Bot Bukan Admin T-T')
    }
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : text ? (text.replace(/\D/g, '') + '@s.whatsapp.net') : ''
		if (!who || who == m.sender) throw 'Reply / tag yang ingin di kick'
		if (participants.filter(v => v.id == who).length == 0) throw `Target tidak berada dalam Grup !`
		await conn.groupParticipantsUpdate(m.chat, [who], 'remove') 
    m.reply(`Success`)
}
handler.help = ['kick', '-'].map(v => 'o' + v + ' @user')
handler.tags = ['owner']
handler.command = /^(okick|o-)$/i

handler.owner = true
handler.group = true
handler.botAdmin = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
