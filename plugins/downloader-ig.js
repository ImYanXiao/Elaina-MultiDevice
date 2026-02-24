import axios from 'axios';
import FormData from 'form-data';
import * as cheerio from 'cheerio';

async function igdl(url) {
    const formData = new FormData();
    formData.append("url", url);
    formData.append("ajax", "1");
    formData.append("lang", "en");

    try {
        const res = await axios({
            method: "POST",
            url: "https://ins1d.net/mates/en/analyze/ajax?retry=undefined&platform=instagram",
            data: formData,
            headers: {
                ...formData.getHeaders(),
                "accept": "application/json, text/javascript, */*; q=0.01",
                "origin": "https://ins1d.net",
                "referer": "https://ins1d.net/en/",
                "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
                "x-requested-with": "XMLHttpRequest"
            }
        });

        const $ = cheerio.load(res.data.result);
        const hrefs = [];
        $('.download-bottom a').each(function () {
            const caption = $(this).text();
            const typeMatch = caption.match(/Download (Photo|Video)/i);
            const resolutionMatch = caption.match(/\((\d+x\d+)\)/);
            const type = typeMatch ? (typeMatch[1] === 'Photo' ? 'Foto' : 'Video') : 'Tidak Diketahui';
            const resolution = resolutionMatch ? resolutionMatch[1] : '';
            const href = $(this).attr('href');
            hrefs.push({
                type: type,
                resolution: resolution,
                url: href
            });
        });

        return {
            status: hrefs.length > 0,
            data: hrefs
        };
    } catch (error) {
        console.error("Error in igdl:", error.message);
        return { status: false, data: [] };
    }
}

var handler = async (m, { conn, args }) => {
    try {
        if (!args[0]) throw 'URL Instagram tidak diberikan.';
        const result = await igdl(args[0]);
        if (result.status) {
            for (let media of result.data) {
                await conn.sendFile(m.chat, media.url, '', '', m);
            }
        } else {
            throw new Error('Gagal mendapatkan media dari Instagram.');
        }
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, `Terjadi kesalahan: ${error.message}`, m);
    }
};

handler.help = ['instagram'];
handler.tags = ['downloader'];
handler.command = /^(ig(dl)?|instagram(dl)?)$/i;

export default handler;