// Code by Xnuvers007
// https://github.com/Xnuvers007/

import { areJidsSameUser } from '@adiwajshing/baileys'

let handler = async (m, { conn, participants, isAdmin }) => {
    if (!isAdmin) {
        return m.reply('Perintah ini hanya dapat digunakan oleh admin grup')
    }

    let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
    let kickedUser = []
    for (let user of users)
        if (user.endsWith('@s.whatsapp.net') && !(participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin) {
            const res = await conn.groupParticipantsUpdate(m.chat, [user], "remove")
            kickedUser.concat(res)
            await delay(1 * 1000)
        }
    m.reply(`Mampos Dikick Kau ${kickedUser.map(v => '@' + v.split('@')[0])}`, null, { mentions: kickedUser })
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
