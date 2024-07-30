let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {
    let teks = `
︵‿︵‿︵‿︵ *DONASI BOT* ︵‿︵‿︵‿︵
┌─「 Donasi • Pulsa 」
│ • *Three:* [${global.ppulsa}]
❏────

┌─「 Donasi • Non Pulsa 」
│ • *Dana:* [${global.pdana}]
│ • *Saweria:* [${global.psaweria}]
│ • *QR:* [https://bioskop-six.vercel.app/images]
❏────

*ʙᴀᴄᴋ ᴛᴏ ᴀʟʟ ᴍᴇɴᴜ*: .?
*ᴘɪɴɢ*: .ping
*ᴄʀᴇᴀᴛᴏʀ*: .creator
︵‿︵‿︵‿︵︵‿︵‿︵‿︵︵‿︵‿︵‿
Created by ${global.namebot} 
`
        await conn.sendFile(m.chat, ` ${flaaa} Donasi ke ${namebot}`, 'donasi.jpg', `${teks}`, m); 
};

handler.help = ['donasi'];
handler.tags = ['info'];
handler.command = /^dona(te|si)$/i;

export default handler;
