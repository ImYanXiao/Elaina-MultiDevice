import jimp from 'jimp';

let handler = async (m, { conn, text }) => {
    let img = await jimp.read('https://i.imgur.com/nav6WWX.png');
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;

    // jika ada yang diTAG
    if (who) {
        let avatar = await jimp.read(await conn.profilePictureUrl(who, 'image'));
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
handler.tags = ['internet']
handler.command = /^(bonk)$/i

export default handler;
