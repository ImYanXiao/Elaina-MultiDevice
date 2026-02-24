let handler = async (m, { conn, text, isROwner}) => {
    if (!text) throw 'Who wants to be unbanned?'
    if (!isROwner) return conn.reply(m.chat, 'Lu Tuh Bukan Owner Jan So A6 ', m) 
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

export default handler