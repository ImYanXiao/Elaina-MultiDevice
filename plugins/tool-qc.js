import { sticker } from '../lib/sticker.js'
import axios from 'axios'

const handler = async (m, { conn, args, usedPrefix, command }) => {
    let text;
    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    const pengirim = m.sender.split('@')[0];
    
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw `Mana teksnya?\nEx: \n${usedPrefix + command} Hallo Guys\n${usedPrefix + command} @${pengirim} acumalaka`;

    if (!text) return m.reply(`Mana teksnya?\nEx: \n${usedPrefix + command} Hallo Guys\n${usedPrefix + command} @${pengirim} acumalaka`);

    const mentionRegex = new RegExp(`@${who.split('@')[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'g');
    let orang = text.replace(mentionRegex, '');

    const phoneRegex = /@(\d{10,15})/g;
    let match;
    
    while ((match = phoneRegex.exec(text)) !== null) {
        const phoneNumber = match[1];
        try {
            const name = await conn.getName(`${phoneNumber}@s.whatsapp.net`);
            if (name) {
                orang = orang.replace(match[0], `@${name}`);
            }
        } catch (err) {
            console.error("Error fetching contact name for number:", phoneNumber);
        }
    }

    let pp = await conn.profilePictureUrl(who).catch((_) => null);

    if (!pp) {
        pp = 'https://telegra.ph/file/24fa902ead26340f3df2c.png';
    }
    
    if (!pp) {
        pp = 'https://i.pinimg.com/736x/1f/18/6f/1f186fef0e60fbd6449b1eb05f552408.jpg';
    }

    let name = await conn.getName(who);

    const backgroundColor = "#000000";

    const obj = {
        "type": "quote",
        "format": "png",
        "backgroundColor": backgroundColor,
        "width": 1024,
        "height": 1024,
        "scale": 2,
        "messages": [{
            "entities": [],
            "avatar": true,
            "from": {
                "id": 1,
                "name": `${name}`,
                "photo": { url: `${pp}` }
            },
            "text": orang,
            "replyMessage": {}
        }]
    };

    try {
        const json = await axios.post('https://bot.lyo.su/quote/generate', obj, { headers: { 'Content-Type': 'application/json' } });
        const buffer = Buffer.from(json.data.result.image, 'base64');
        
        let stiker = await sticker(buffer, false, global.stickpack, global.stickauth);
        if (stiker) {
            return conn.sendFile(m.chat, stiker, 'qc.webp', 'Sticker generated successfully!', m);
        } else {
            return m.reply('Gagal membuat stiker.');
        }
    } catch (error) {
        console.error('Error generating quote:', error);
        return m.reply('Ada masalah dalam membuat stiker. Coba lagi nanti.');
    }
}

handler.help = ['qc']
handler.tags = ['sticker']
handler.command = /^(qc|quickchat|qice|quotly|quotely|quotechat)$/i

export default handler;
