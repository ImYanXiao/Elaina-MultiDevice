var handler = async (m, { conn, participants, isAdmin }) => {
    if (!isAdmin) {
        return m.reply('Perintah ini hanya dapat digunakan oleh admin grup')
    }
    
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : text ? (text.replace(/\D/g, '') + '@s.whatsapp.net') : ''
		if (!who || who == m.sender) throw 'Reply / tag yang ingin di kick'
		if (participants.filter(v => v.id == who).length == 0) throw `Target tidak berada dalam Grup !`
		await conn.groupParticipantsUpdate(m.chat, [who], 'remove') 
    m.reply(`Success`)
}

handler.help = ['kick'].map(v => v + ' @user')
handler.tags = ['group']
handler.command = /^(kick)$/i

handler.owner = false
handler.group = true
handler.botAdmin = true
handler.admin = true // hanya admin grup yang dapat menggunakan perintah ini

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
export default handler
