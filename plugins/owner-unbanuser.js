let handler = async (m, { conn, text }) => {
    if (!text) throw 'Who wants to be unbanned?'
    let who;
    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0];
        } else {
            let cleanedNumber = text.replace(/\D/g, ''); 
            who = `${cleanedNumber}@s.whatsapp.net`;
        }
    } else {
        let cleanedNumber = text.replace(/\D/g, '');
        who = `${cleanedNumber}@s.whatsapp.net`;
    }

    let users = db.data.users;
    if (!users[who]) throw 'Pengguna tidak ditemukan';

    users[who].banned = false;
    conn.reply(m.chat, `Pengguna dengan nomor ${who} telah diunban!`, m);
}

handler.help = ['unban <nomor>']
handler.tags = ['owner']
handler.command = /^unban(user)?$/i
handler.rowner = true

export default handler
