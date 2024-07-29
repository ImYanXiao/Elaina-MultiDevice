// by Xnuvers007

import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, args }) => {
    try {
        const sender = m.sender.split('@')[0];

        let userInput = args[0];
        if (!userInput) {
            return m.reply(`Usage:\n${usedPrefix + command} https://www.instagram.com/p/C7gz-Q3tW3J/\n${usedPrefix + command} www.instagram.com/p/C7gz-Q3tW3J/\n${usedPrefix + command} http://www.instagram.com/p/C7gz-Q3tW3J/`);
        }

        if (userInput.startsWith('http://')) {
            userInput = 'https://' + userInput.slice(7);
        } else if (!userInput.startsWith('https://')) {
            userInput = 'https://' + userInput;
        }

        if (!userInput.startsWith('https://www.instagram.com')) {
            throw `URL tidak valid. Harap berikan URL postingan Instagram yang valid.`;
        }

        m.reply(`Tunggu sebentar...\nMengunduh gambar dari ${userInput}\n\n${wait}`);

        let url = `https://bioskop-six.vercel.app/igp?u=${encodeURIComponent(userInput)}`;
        
        let response = await fetch(url);
        if (!response.ok) throw `Error mengambil data dari server: ${response.statusText}`;
        
        let data = await response.json();

        if (data && data.image_urls && data.image_urls.length > 0) {
            for (let i = 0; i < data.image_urls.length; i++) {
                let imgUrl = data.image_urls[i];
                let imageResponse = await fetch(imgUrl);
                if (!imageResponse.ok) throw `Error mengunduh gambar dari URL: ${imgUrl}`;
                
                let imageBuffer = await imageResponse.buffer();
                
                await conn.sendFile(m.chat, imageBuffer, `image${i + 1}.jpg`, ``, m);
            }

            await conn.reply(m.chat, `Selesai, ini semua gambarnya kak @${sender}`, m);

        } else {
            m.reply('Tidak ada gambar ditemukan');
        }
    } catch (error) {
        console.error(error);
        m.reply('Kesalahan server internal: ' + error.message);
    }
};

handler.help = ['igp'].map(v => v + ' <url>');
handler.tags = ['internet', 'downloader', 'tools'];
handler.command = /^(igp|igphotos|igphoto|igfoto|igf|igfdl|igfdownloader)$/i;

// handler.limit = 2;

export default handler;
