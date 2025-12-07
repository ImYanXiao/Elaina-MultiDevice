import { areJidsSameUser } from '@rexxhayanasi/elaina-baileys'

let handler = async (m, { conn, participants, isOwner, isAdmin, args }) => {
    if (!(isOwner || isAdmin)) return m.reply('Hanya admin atau owner yang dapat menggunakan perintah ini.');

    let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.jid));

    if (users.length === 0) return m.reply('Tag user yang ingin di-unban.');

    let currentTime = Date.now();

    for (let user of users) {
        if (user.endsWith('@s.whatsapp.net')) {
            let userRecord = global.db.data.users[user];

            if (userRecord) {
                if (userRecord.banned) {
                    userRecord.banned = false;
                    userRecord.bannedTime = 0; 
                    m.reply(`Sukses di-unban @${user.split('@')[0]}`, false, { mentions: [user] });
                    conn.reply(user, 'Kamu telah di-unban!', null);
                } else {
                    m.reply('Pengguna ini tidak dalam keadaan banned.');
                }
            } else {
                m.reply('Pengguna tidak ditemukan dalam database.');
            }
        } else {
            m.reply('User yang ditargetkan tidak ditemukan di grup.');
        }
    }
}

handler.help = ['unban']
handler.tags = ['group']
handler.command = /^(unban)$/i

handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
