let handler = async (m, { conn, text, isROwner }) => {
    if (!text) throw 'Siapa yang mau di banned?🗿';
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

    users[who].banned = true;
    conn.reply(m.chat, `Pengguna dengan nomor ${who} telah dibanned!`, m);
}

handler.help = ['ban <nomor>']
handler.tags = ['owner']
handler.command = /^ban$/i

export default handler;