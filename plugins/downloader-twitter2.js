// https://saweria.co/xnuvers007

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
        'Accept-Language': 'id,en-US;q=0.7,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'TE': 'trailers'
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
            // If the first server returns a specific error, switch to the second server
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

// Function to handle the second server
async function handleSecondServer(m, conn, text, sender) {
    const cookies = {
        'PHPSESSID': 'u4t24ud7hqvdtmgfthu8g77ig2',
        '__cflb': '04dToTykDEJ51J1cp6RBBEjtYw7AgvGNzqxzkXL9eM',
        '_ga_RCQKEYPTD1': 'GS1.1.1706907874.1.0.1706907979.60.0.0',
        '_ga': 'GA1.1.78712569.1706907872',
        '__gads': 'ID=0a734b31f1b5fe80:T=1706907866:RT=1706907866:S=ALNI_MZK8FDYhpNBXlXRg7op7hfjC9LF-w',
        '__gpi': 'UID=00000cf71d1155c2:T=1706907866:RT=1706907866:S=ALNI_MZmQxGkb5i09Zd2rQsBrfjjcLge_Q',
        '__eoi': 'ID=3f3a7bd96bcefda6:T=1706907866:RT=1706907866:S=AA-AfjZ5Toraqi7VqTVBC9xDysho',
        'FCNEC': '%5B%5B%22AKsRol_C3YSw1aHCsDEkMPsv3yLzz0IyE2POIHxgVQJjG7EziWra1UvsvqoAXjGsZbcozQEJHq9yU77mA4d8pAWE8Ym098FGCWBWxTr13-jS8SsdvPtkU-YODlfgDeVLQngivaIv2n5JVxjpHoR22V2oKi2c8KBWmg%3D%3D%22%5D%5D',
    };

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
                'Cookie': Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')
            },
            body: new URLSearchParams(data),
        });

        const html = await response.text();
        const $ = cheerio.load(html);
        const getDownload = $('div.result_overlay a.pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.without_watermark.vignette_active');

        getDownload.each((index, element) => {
            const encodedUrl = $(element).attr('href').split('ssstwitter/')[1];
            const decodedUrl = Buffer.from(encodedUrl, 'base64').toString('utf-8');

            // Sending the file
            conn.sendFile(m.chat, decodedUrl, 'twitter.mp4', `By: @${sender}`, m, false, {
                asDocument: true
            });

            // Sending a message with the video URL
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

// Function to generate a random alphanumeric string
function generateRandomAlphanumericString(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to generate a random numeric string
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
