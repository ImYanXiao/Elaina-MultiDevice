// import fetch from 'node-fetch';

// const handler = async (m, { conn, args, usedPrefix, command }) => {
//     try {
//         const response = await fetch('https://meme-api.com/gimme');
//         if (!response.ok) throw `${response.status} ${response.statusText}`;
        
//         const data = await response.json();
        
//         if (!data.url) throw "No meme found";
        
//         const titleText = `${data.title}`;
      
//         const titleUrl = `https://tr-xnuvers007.vercel.app/translate?from=en&to=id&text=${encodeURIComponent(titleText)}`;
//         const responseTitle = await fetch(titleUrl);
//         const titleResult = await responseTitle.json();

//         const { "code/status": statusTitle, credits: creditsTitle, from: fromTitle, translated_text: translatedTitle, to: toTitle } = titleResult;
        
//         const translatedCaption = `☂️Subreddit: ${data.subreddit}\n😂Title: ${translatedTitle} (${data.title})\n✍️Author: ${data.author}\n🔥Post: ${data.postLink}\n💀NFSW: ${data.nsfw}\n👻Spoiler: ${data.spoiler}`;
        
//         conn.sendFile(m.chat, data.url, 'redditngab.jpg', translatedCaption, m);
        
//         // m.reply(`*Terdeteksi Bahasa Title:* ${fromTitle}\n*Ke Bahasa Title:* ${toTitle}\n\n*Original Text Title:* ${titleText}\n*Terjemahan Title:* ${translatedTitle}\n\n*Kredit Title:* ${creditsTitle}`);
//     } catch (error) {
//         console.error(error);
//         conn.reply(m.chat, 'An error occurred while fetching the meme.', m);
//     }
// };

// handler.help = ['subreddit'];
// handler.tags = ['internet'];
// handler.command = /^(sr|subreddit|subredit|redditmeme|reditmeme|memeredit|memesredit|memereddit|memesreddit)$/i;

// export default handler;

import fetch from 'node-fetch';
import { generateWAMessageFromContent } from '@adiwajshing/baileys';
import fs from 'fs';

const handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        const response = await fetch('https://meme-api.com/gimme');
        if (!response.ok) throw `${response.status} ${response.statusText}`;

        const data = await response.json();

        if (!data.url) throw "No meme found";

        const titleText = `${data.title}`;

        const titleUrl = `https://tr-xnuvers007.vercel.app/translate?from=en&to=id&text=${encodeURIComponent(titleText)}`;
        const responseTitle = await fetch(titleUrl);
        const titleResult = await responseTitle.json();

        const { "code/status": statusTitle, credits: creditsTitle, from: fromTitle, translated_text: translatedTitle, to: toTitle } = titleResult;

        const translatedCaption = `☂️Subreddit: ${data.subreddit}\n😂Title: ${translatedTitle} (${data.title})\n✍️Author: ${data.author}\n🔥Post: ${data.postLink}\n💀NFSW: ${data.nsfw}\n👻Spoiler: ${data.spoiler}`;

        function kyun(seconds){
            function pad(s){
                return (s < 10 ? '0' : '') + s;
            }
            var days = Math.floor(seconds / (60 * 60 * 24));
            var hours = Math.floor(seconds / (60*60));
            var minutes = Math.floor(seconds % (60*60) / 60);
            var seconds = Math.floor(seconds % 60);

            return `\n*_⏰ Runtime: ${pad(days)}D ${pad(hours)}H ${pad(minutes)}M ${pad(seconds)}S_*\n`;
        }
        const runtime = process.uptime();
        const runtimeMessage = kyun(runtime);

        const sentGambar = await conn.sendFile(m.chat, data.url, 'meme.jpg', "", m);

        const orderMessage = {
            itemCount: -10062007,
            status: 500,
            surface: 999,
            message: translatedCaption + runtimeMessage,
            description: '^^',
            orderTitle: 'Haii Kak',
            token: '9',
            curreyCode: 'IDR',
            totalCurrencyCode: '>〰<',
            totalAmount1000: '1000000',
            sellerJid: '6285736178354@s.whatsapp.net',
            thumbnail: fs.readFileSync('./thumbnail.jpg')
        };

        const contextInfo = {
            participant: '0@s.whatsapp.net',
            quotedMessage: {
                extendedTextMessage: {
                    text: 'uwu >//<',
                },
            },
        };

        const prep = await generateWAMessageFromContent(m.chat, { orderMessage }, { contextInfo, quoted: sentGambar });

        conn.relayWAMessage(prep);
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'An error occurred while fetching the meme or generating the message.', m);
    }
};

handler.help = ['subreddit'];
handler.tags = ['internet'];
handler.command = /^(sr|subreddit|subredit|redditmeme|reditmeme|memeredit|memesredit|memereddit|memesreddit)$/i;

export default handler;
