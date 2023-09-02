import jimp from 'jimp';

let handler = async (m, { conn, text }) => {
    let img = await jimp.read('https://i.imgur.com/nav6WWX.png');
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;

    // apakah ada yang diTAG
    if (who) {
        let avatar;
        try {
            avatar = await jimp.read(await conn.profilePictureUrl(who, 'image'));
        } catch (error) {
            // Gunakan gambar default jika tidak dapat mengakses gambar profil
            avatar = await jimp.read('https://i.imgur.com/IwR8ShH.png');
        }

        let bonk = await img.composite(avatar.resize(128, 128), 120, 90, {
            mode: 'dstOver',
            opacitySource: 1,
            opacityDest: 1
        }).getBufferAsync('image/png');
        conn.sendMessage(m.chat, { image: bonk }, { quoted: m, contextInfo: { mentionedJid: [who] } });
    } else {
        // Jika tidak ada yang diTAG
        let avatar = await jimp.read(await conn.getProfilePicture(m.sender));
        let bonk = await img.composite(avatar.resize(128, 128), 120, 90, {
            mode: 'dstOver',
            opacitySource: 1,
            opacityDest: 1
        }).getBufferAsync('image/png');
        conn.sendMessage(m.chat, { image: bonk }, { quoted: m });
    }
}

handler.help = ['bonk @user','bonk']
handler.tags = ['internet', 'prank', 'sticker']
handler.command = /^(bonk)$/i

export default handler;
