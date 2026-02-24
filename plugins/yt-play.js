import fetch from 'node-fetch';
import yts from 'yt-search';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let txt = isLink(text), input = '';
    if (!text && txt === null) return await conn.reply(m.chat, `Judul/Link nya mana?\n> Ex: ${usedPrefix + command} Dj joanna`, m);
    if (txt === null) {
        const getUrl = await search(text);
        input = getUrl[0].url;
    } else {
        input = txt[0];
    };
    
    conn.play = conn.play ? conn.play : {};
    try {
        let anu = await youtubeScrape(input);
        const { status, judul, channel, thumb, vid, video, audio } = anu;
        const youtubeData = { video, audio };
        const youtubeMediaData = [];
        for (const type in youtubeData) {
            const items = youtubeData[type];
            for (const key in items) {
                if (Object.hasOwnProperty.call(items, key)) {
                    const item = items[key];
                    if (item.q_text && item.size) {
                        youtubeMediaData.push({ q_text: item.q_text, size: item.size, k: item.k });
                    }
                }
            }
        };
        const listQuality = youtubeMediaData.map((item, index) => `_${index + 1}. ${item.q_text}_ ( *${item.size}* )`).join('\n');
        const options = {
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: judul,
                    body: channel,
                    thumbnailUrl: thumb,
                    sourceUrl: '',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            },
            ephemeralExpiration: m.isGroup ? 86400 : false
        };
        await conn.reply(m.chat, listQuality, m, options);
        let allKeys = youtubeMediaData.map(v => v.k);
        return conn.play[m.sender] = {
            vid,
            allKeys,
            timeout: setTimeout(() => {
                delete conn.play[m.sender];
            }, 160000)
        };
    } catch (err) {
        console.error(err);
    };
};

handler.before = async (m, { conn }) => {
    conn.play = conn.play ? conn.play : {};
    if (!m.sender in await conn.play) {
        return;
    } else if (m.sender in await conn.play) {
        const { vid, allKeys, timeout } = await conn.play[m.sender];
        let input = m.text.match(/\d+/g); // Get input number
        if (!input) {
            return;
        } else {
            try {
                let index = input - 1;
                if (index >= 0 && index < allKeys.length) {
                    async function startConvert(index) {
                        if (index < 0 || index >= allKeys.length) return;
                        await convert(vid, allKeys[index]).then(async (res) => {
                            const { status, c_status, vid, title, ftype, fquality, dlink } = res;
                            let caption = `Title: ${title}\nType: ${ftype}\nQuality: ${fquality}\nDownload: ${dlink}`;
                            await conn.sendFile(m.chat, dlink, `${title + '.' + ftype}`, caption, m).then(() => {
                                clearTimeout(timeout);
                                delete conn.play[m.sender];
                            });
                        });
                    };
                    return await startConvert(parseInt(index));
                } else {
                    await conn.reply(m.chat, `Harap pilih angka nya sesuai dengan opsi pilihan yang ada!`, m, { ephemeralExpiration: 86400 });
                };
            } catch (e) {
                console.error(e);
                clearTimeout(timeout);
                delete conn.play[m.sender];
            };
        };
    };
};

handler.help = ['play'];
handler.tags = ['downloader'];
handler.command = ["play", "yt"];
handler.limit = true;

export default handler;

function isLink(text) {
    let pattern = /https?:\/\/\S+/gi;
    let links = text.match(pattern);
    return links;
};

async function search(query, options = {}) {
    const search = await yts.search({ query, hl: "id", gl: "ID", ...options });
    return search.videos;
};

async function youtubeScrape(input) {
    return new Promise(async (resolve, reject) => {
        try {
            const headers = {
                Accept: '*/*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                Cookie: '_ga=GA1.1.411148416.1729081671; _ga_6LBJSB3S9E=GS1.1.1730381636.3.1.1730381650.0.0.0',
                Origin: 'https://www.ssvid.net',
                Priority: 'u=1, i',
                Referer: 'https://www.ssvid.net/youtube-downloader',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest'
            };

            const response = await fetch('https://www.ssvid.net/api/ajax/search', {
                method: 'POST',
                headers: headers,
                body: new URLSearchParams({
                    query: input,
                    vt: 'downloader'
                })
            });

            const youtubeData = await response.json();
            const { status, mess, p, vid, title, t, a, links } = youtubeData;
            let thumb = `https://i.ytimg.com/vi/${vid}/0.jpg`;
            let result = {
                status,
                judul: title,
                channel: a,
                thumb,
                vid,
                video: links.mp4,
                audio: links.mp3, ...links[2] || {}
            };
            resolve(result);
        } catch (e) {
            console.log(e);
            reject(e);
        };
    });
};

async function convert(vid, k) {
    return new Promise(async (resolve, reject) => {
        const headers = {
            Accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Cookie: '_ga=GA1.1.411148416.1729081671; _ga_6LBJSB3S9E=GS1.1.1730381636.3.1.1730381650.0.0.0',
            Origin: 'https://www.ssvid.net',
            Priority: 'u=1, i',
            Referer: 'https://www.ssvid.net/youtube-downloader',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
        };

        const response = await fetch('https://www.ssvid.net/api/ajax/convert', {
            method: 'POST',
            headers: headers,
            body: new URLSearchParams({
                vid: vid,
                k: k
            })
        });

        const data = await response.json();
        resolve(data);
    });
}