import fetch from 'node-fetch';

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
        
        conn.sendFile(m.chat, data.url, 'redditngab.jpg', translatedCaption, m);
        
        // m.reply(`*Terdeteksi Bahasa Title:* ${fromTitle}\n*Ke Bahasa Title:* ${toTitle}\n\n*Original Text Title:* ${titleText}\n*Terjemahan Title:* ${translatedTitle}\n\n*Kredit Title:* ${creditsTitle}`);
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'An error occurred while fetching the meme.', m);
    }
};

handler.help = ['subreddit'];
handler.tags = ['internet'];
handler.command = /^(sr|subreddit|subredit|redditmeme|reditmeme|memeredit|memesredit|memereddit|memesreddit)$/i;

export default handler;
