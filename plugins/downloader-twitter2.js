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
        return m.reply(`Masukkan Link:\n${usedPrefix + command} https://twitter.com/kegblgnunfaedh/status/1747862212725862428/`)
    }

    const sender = m.sender.split(`@`)[0];

    let url = `https://twitsave.com/info?url=${text}`
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
    }

    let res = await fetch(url, {
        method: 'GET',
        headers: headers,
        follow: 5
    });

    if (res.status !== 200) {
        throw new Error(`HTTP status ${res.status}`);
    }
    
    await m.reply("Maaf kalau spam, karena memungkinkan user mendownload dari semua server, karena ada server yang bisa saja mati.");

    let body = await res.text();
    const $ = cheerio.load(body);

    const filteredHrefs = $('a[href^="https://twitsave.com/download?file="]').map((index, element) => {
        return $(element).attr('href');
    }).get();

    const finalURLs = await Promise.all(filteredHrefs.map(async (href) => {
        const response = await fetch(href);
        return response.redirected ? response.url : href;
    }));
    
    let server = 0;

    for (const finalURL of finalURLs) {
        // Bodo amat, gw kirim semua file downloadnya dari berbagai server
        // await conn.sendFile(m.chat, finalURL, 'filename.mp4', 'File caption');
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
};

handler.help = ['twitsave', 'xdl','x','twitdl','twitterdownloader','txdl'].map(v => v + ' <url>');
handler.tags = ['downloader','twitter','internet'];
handler.command = /^(twitsave|x|twitdl|xdl|twitterdownloader|txdl)$/i

export default handler;
