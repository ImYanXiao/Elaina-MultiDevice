import fetch from 'node-fetch';
import { sticker } from '../../lib/sticker.js';

const handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `uhm.. url nya mana?\n\ncontoh:\n${usedPrefix + command} https://t.me/addstickers/namapack`;
    if (!args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) throw `url salah`;
    let packName = args[0].replace("https://t.me/addstickers/", "");

    let gas = await fetch(`https://api.telegram.org/bot6353863558:AAEW_w2WMGlRzkRjXwJFaxoCPkMUdV30dkc/getStickerSet?name=${encodeURIComponent(packName)}`, { 
        method: "GET", 
        headers: { "User-Agent": "GoogleBot" } 
    });
    if (!gas.ok) throw new Error(`Error getStickerSet: ${gas.statusText}`);

    let json = await gas.json();
    m.reply(`*Total stiker:* ${json.result.stickers.length}
*Estimasi selesai:* ${json.result.stickers.length * 1.5} detik`.trim());

    for (let i = 0; i < json.result.stickers.length; i++) {
        if (!json.result.stickers[i].thumb) {
            console.log(`Sticker ke-${i + 1} tidak memiliki thumbnail.`);
            continue;
        }

        let fileId = json.result.stickers[i].thumb.file_id;

        let gasIn = await fetch(`https://api.telegram.org/bot6353863558:AAEW_w2WMGlRzkRjXwJFaxoCPkMUdV30dkc/getFile?file_id=${fileId}`);
        if (!gasIn.ok) throw new Error(`Error getFile: ${gasIn.statusText}`);

        let jisin = await gasIn.json();

        let stiker = await sticker(false, "https://api.telegram.org/file/bot6353863558:AAEW_w2WMGlRzkRjXwJFaxoCPkMUdV30dkc/" + jisin.result.file_path, global.packname, global.author);
        await conn.sendMessage(m.chat, { sticker: stiker });
        await delay(4000);                        
    }
    m.reply('_*Selesai*_');
};

handler.help = ['stikertelegram <url>'];
handler.tags = ['sticker'];
handler.command = /^(stickertele|stickertelegram|telestick|telesticker)$/i;

handler.limit = true;
handler.premium = true;

export default handler;

               
const delay = time => new Promise(res => setTimeout(res, time));
