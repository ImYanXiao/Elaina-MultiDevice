import fs from 'fs'

var handler = async (m, { conn, args, command }) => {
    let totalf = Object.values(global.plugins).filter(
        (v) => v.help && v.tags
    ).length;

    let replyMessage = `Total Fitur Bot Saat ini: ${totalf}\n`;

    await conn.reply(m.chat, replyMessage, m, {
        contextInfo: {
            externalAdReply: {
                mediaUrl: '',
                mediaType: 2,
                description: 'anu',
                title: bottime,
                body: 'Total Cintaku Padamu',
                previewType: 0,
                thumbnail: fs.readFileSync("./thumbnail.jpg"),
                sourceUrl: sig
            }
        }
    });
}

handler.help = ['totalfitur']
handler.tags = ['info']
handler.command = ['totalfitur']
export default handler
