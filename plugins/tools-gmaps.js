import axios from 'axios';
import cheerio from 'cheerio';
import sharp from 'sharp';

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0';

async function jarak(dari, ke) {
    let html = (await axios.get(`https://www.google.com/search?q=${encodeURIComponent('jarak ' + dari + ' ke ' + ke)}&hl=id`, {
        headers: {
            'User-Agent': userAgent
        }
    })).data;
    let $ = cheerio.load(html);
    let obj = {};

    let img = html.split("var s=\'")?.[1]?.split("\'")?.[0];
    obj.img = /^data:.*?\/.*?;base64,/i.test(img) ? Buffer.from(img.split(',')[1], 'base64') : '';
    
    // ngambil waktu jarak
    obj.captions = [];
    $('div.BbbuR.uc9Qxb.uE1RRc').each((index, element) => {
        let caption = $(element).text()?.trim();
        obj.captions.push(caption);
    });

    return obj;
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
    let [dari, ke] = text.split('|');
    if (!dari || !ke) throw `Ex: ${usedPrefix + command} pekalongan|sukabumi`;
    
    if (dari.toLowerCase() === ke.toLowerCase()) {
        conn.reply(m.chat, "hey bung, kau dari kota bodoh mana ?!\nAWOKAWOAKOAK", m);
        return;
    }

    conn.reply(m.chat, "Tunggu sebentar yah, sedang diminta peta nya...", m);

    let result = await jarak(dari, ke);

    if (result.img) {
        let imgBuffer = Buffer.from(result.img, 'base64');
        let resizedImgBuffer = await sharp(imgBuffer).toBuffer();

        conn.sendMessage(m.chat, { image: resizedImgBuffer, caption: result.captions.join('\n') + `\n\nhttps://www.google.com/maps/dir/${encodeURIComponent(dari)}/${encodeURIComponent(ke)}/` }, { quoted: m });
    } else {
        conn.reply(m.chat, result.captions.join('\n') + `\n\nhttps://www.google.com/maps/dir/${encodeURIComponent(dari)}/${encodeURIComponent(ke)}/`, m);
    }
};

handler.help = ['jarak', 'gmaps'].map(v => v + ' dari|ke');
handler.tags = ['tools'];
handler.command = /^(jarak|gmaps)$/i;

export default handler;
