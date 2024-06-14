let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {
    let teks = `
︵‿︵‿︵‿︵ *DONASI BOT* ︵‿︵‿︵‿︵
┌─「 Donasi • Pulsa 」
│ • *Indosat:* [${global.ppulsa}]
❏────

┌─「 Donasi • Non Pulsa 」
│ • *Dana:* [${global.pdana}]
│ • *Saweria:* [${global.psaweria}]
❏────

*ʙᴀᴄᴋ ᴛᴏ ᴀʟʟ ᴍᴇɴᴜ*: .?
*ᴘɪɴɢ*: .ping
*ᴄʀᴇᴀᴛᴏʀ*: .creator
︵‿︵‿︵‿︵︵‿︵‿︵‿︵︵‿︵‿︵‿
Created by ${global.namebot} 
`

    await conn.sendFile(m.chat, flaaa + 'Donasi', 'donasi.jpg', m); 
};

handler.help = ['donasi'];
handler.tags = ['info'];
handler.command = /^dona(te|si)$/i;

export default handler;
