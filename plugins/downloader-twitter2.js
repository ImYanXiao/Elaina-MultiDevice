// https://saweria.co/xnuvers007
// Credit: Xnuvers007

import fetch from 'node-fetch';
import cheerio from 'cheerio-without-node-native';

let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text) {
        return conn.reply(m.chat, `Masukkan Link:\n${usedPrefix + command} https://twitter.com/kegblgnunfaedh/status/1747862212725862428/`, m);
    }

    const sender = m.sender.split(`@`)[0];

    let url = `https://twitsave.com/info?url=${text}`;
    
        let headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Connection': 'keep-alive'
    };


    try {
        let res = await fetch(url, {
            method: 'GET',
            headers: headers,
            follow: 5
        });

        if (res.status !== 200) {
            throw new Error(`HTTP status ${res.status}`);
        }

        let body = await res.text();
        const $ = cheerio.load(body);

        if ($('div.bg-white.dark\\:bg-slate-800.shadow-md.rounded.border-slate-200.p-5 div.flex.w-full.justify-center.items-start div.flex div.text-xl.text-center:contains("Sorry, we could not find any video on this tweet. It may also be a tweet from a private account.")').length > 0) {
            conn.reply(m.chat, "Sorry, we could not find any video on this tweet. It may also be a tweet from a private account.\nfrom https://twitsave.com *WAITING FOR SERVER 2* using https://ssstwitter.com", m);
            return handleSecondServer(m, conn, text, sender);
        }

        await m.reply("Maaf kalau spam, karena memungkinkan user mendownload dari semua server, karena ada server yang bisa saja mati.");

        const filteredHrefs = $('a[href^="https://twitsave.com/download?file="]').map((index, element) => {
            return $(element).attr('href');
        }).get();

        const finalURLs = await Promise.all(filteredHrefs.map(async (href) => {
            const response = await fetch(href);
            return response.redirected ? response.url : href;
        }));

        let server = 0;

        for (const finalURL of finalURLs) {
            server++;
            await conn.sendMessage(m.chat, {
                    video: {
                        url: finalURL
                    },
                    caption: `ini kak videonya @${sender} Menggunakan server ${server}`,
                    mentions: [m.sender],
                },
                m,
            );
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};

async function handleSecondServer(m, conn, text, sender) {

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
        'Accept': '*/*',
        'Accept-Language': 'id,en-US;q=0.7,en;q=0.3',
        'HX-Request': 'true',
        'HX-Target': 'target',
        'HX-Current-URL': 'https://ssstwitter.com/',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://ssstwitter.com',
        'Alt-Used': 'ssstwitter.com',
        'Connection': 'keep-alive',
        'Referer': 'https://ssstwitter.com/',
    };

    const data = {
        'id': text,
        'locale': 'en',
        'tt': generateRandomAlphanumericString(32),
        'ts': generateRandomNumericString(10),
        'source': 'form',
    };

    try {
        const response = await fetch('https://ssstwitter.com/', {
            method: 'POST',
            headers: {
                ...headers,
                //'Cookie': Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')
            },
            body: new URLSearchParams(data),
        });

        const html = await response.text();
        const $ = cheerio.load(html);
        const getDownload = $('div.result_overlay a.pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.without_watermark.vignette_active');

        getDownload.each((index, element) => {
            const encodedUrl = $(element).attr('href').split('ssstwitter/')[1];
            const decodedUrl = Buffer.from(encodedUrl, 'base64').toString('utf-8');

            conn.sendFile(m.chat, decodedUrl, 'twitter.mp4', `By: @${sender}`, m, false, {
                asDocument: true
            });

            conn.sendMessage(m.chat, {
                video: {
                    url: decodedUrl
                },
                caption: `Ini kak videonya @${sender}`,
                mentions: [m.sender],
            });
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function generateRandomAlphanumericString(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateRandomNumericString(length = 10) {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

handler.help = ['twitsave', 'xdl', 'x', 'twitdl', 'twitterdownloader', 'txdl'].map(v => v + ' <url>');
handler.tags = ['downloader', 'twitter', 'internet'];
handler.command = /^(twitsave|x|twitdl|xdl|twitterdownloader|txdl)$/i;

export default handler;
