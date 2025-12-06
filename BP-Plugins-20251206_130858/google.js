// import { googleIt } from '@bochilteam/scraper'
// let handler = async (m, { conn, command, args }) => {
//     const fetch = (await import('node-fetch')).default
//     let full = /f$/i.test(command)
//     let text = args.join` `
//     if (!text) return conn.reply(m.chat, 'Tidak ada teks untuk di cari', m)
//     let url = 'https://google.com/search?q=' + encodeURIComponent(text)
//     let search = await googleIt(text)
//     let msg = search.articles.map(({
//         // header,
//         title,
//         url,
//         description
//     }) => {
//         return `*${title}*\n_${url}_\n_${description}_`
//     }).join('\n\n')
//     try {
//         let ss = await (await fetch(global.API('nrtm', '/api/ssweb', { delay: 1000, url, full }))).arrayBuffer()
//         if (/<!DOCTYPE html>/i.test(ss.toBuffer().toString())) throw ''
//         await conn.sendFile(m.chat, ss, 'screenshot.png', url + '\n\n' + msg, m)
//     } catch (e) {
//         m.reply(msg)
//     }
// }
// handler.help = ['google', 'googlef'].map(v => v + ' <pencarian>')
// handler.tags = ['internet']
// handler.command = /^googlef?$/i


// export default handler

import fetch from 'node-fetch';

const serpdogKeys = [
    '65bd9a6ce0e9295f44d09630',
    '65bd8425f99538646b149808',
    '65bd9abaf4dc5c61588328a9',
    '65bd9b3ee0e9295f44d09633',
    '65bd9c0af4dc5c61588328ac',
    '65bd9d21f4dc5c61588328b0',
    '65bd9e68e0e9295f44d09636',
    '65bd9f4e84004cce4623e3a0',
    '65bd9fa05d6be24ca69c6a06',
    '65bda00e556fd4f497b49ef7',
    '65bda0ab99dd071b50aa0fe5',
    '65bda135713d311fce6a661b',
    '65bda16e556fd4f497b4a032',
    '65bda1baf99538646b149df7',
    '65bda1fb84004cce4623e3a7',
    '65bda232f4dc5c6158832956',
    '65bda287713d311fce6a6621',
    '65bda2e099dd071b50aa0fe9',
    '65bda32955e8caa91e7ee404',
    '65bda37dfe6b9e1e058f8306',
    '65bda3ef84004cce4623e3ac',
    '65bda697f4dc5c61588329f9'
];

let handler = async (m, {
    conn,
    command,
    args,
    usedPrefix
}) => {
    if (!args[0]) return conn.reply(m.chat, `Tidak ada teks untuk dicari\nEx: ${usedPrefix + command} siapa Kanao Tsuyuri ?`, m);

    let query = args.join(' ');
    let selectedKey = getRandomKey();
    let url = `https://api.serpdog.io/search?api_key=${selectedKey}&q=${encodeURIComponent(query)}&gl=us`;
    m.reply(wait);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.organic_results && data.organic_results.length > 0) {
                const organicResults = data.organic_results;

                organicResults.forEach((result, index) => {
                    conn.reply(m.chat, `Organic Result #${index + 1}:\n\n` +
                        `Title: ${result.title}\n\n` +
                        `Link: ${result.link}\n\n` +
                        `Displayed Link: ${result.displayed_link}\n\n` +
                        `Source: ${result.source}\n\n` +
                        `Snippet: ${result.snippet}\n\n` +
                        `Highlighted Keywords: ${result.higlighted_keywords.join(', ')}\n\n` +
                        `Inline Snippet: ${result.inline_snippet}\n\n` +
                        `Rank: ${result.rank}\n\n`
                    );
                });
            } else {
                conn.reply(m.chat, 'Tidak ada hasil organik yang ditemukan untuk pencarian ini.', m);
            }
        })
        .catch(error => {
            console.error(error);
            retryWithAnotherKey(m, conn, command, args, usedPrefix, selectedKey);
        });
};

function getRandomKey() {
    return serpdogKeys[Math.floor(Math.random() * serpdogKeys.length)];
}

function retryWithAnotherKey(m, conn, command, args, usedPrefix, failedKey) {
    let remainingKeys = serpdogKeys.filter(key => key !== failedKey);

    if (remainingKeys.length > 0) {
        let selectedKey = getRandomKey();
        let query = args.join(' ');
        let url = `https://api.serpdog.io/search?api_key=${selectedKey}&q=${encodeURIComponent(query)}&gl=us`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.organic_results && data.organic_results.length > 0) {
                    const organicResults = data.organic_results;

                    organicResults.forEach((result, index) => {
                        conn.reply(m.chat, `Organic Result #${index + 1}:\n\n` +
                            `Title: ${result.title}\n\n` +
                            `Link: ${result.link}\n\n` +
                            `Displayed Link: ${result.displayed_link}\n\n` +
                            `Source: ${result.source}\n\n` +
                            `Snippet: ${result.snippet}\n\n` +
                            `Highlighted Keywords: ${result.higlighted_keywords.join(', ')}\n\n` +
                            `Inline Snippet: ${result.inline_snippet}\n\n` +
                            `Rank: ${result.rank}\n\n`
                        );
                    });
                } else {
                    conn.reply(m.chat, 'Tidak ada hasil organik yang ditemukan untuk pencarian ini.', m);
                }
            })
            .catch(error => {
                console.error(error);
                retryWithAnotherKey(m, conn, command, args, usedPrefix, selectedKey);
            });
    } else {
        conn.reply(m.chat, 'Semua kunci API SerpDog sudah kedaluwarsa. Silakan buat kunci API baru.', m);
    }
}

handler.help = ['google', 'googlef'].map(v => v + ' <pencarian>');
handler.tags = ['internet'];
handler.command = /^googlef?$/i;

export default handler;
