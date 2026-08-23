import axios from "axios";
import cheerio from "cheerio";

let tiktokRegex = /https:\/\/(www\.)?tiktok\.com\/(@[^\/]+\/(video|photo)\/\d+|\w+\/\d+|\w+)|https:\/\/(vt|vm)\.tiktok\.com\/\w+/i;

let handler = async (m, { conn, text, args, command, usedPrefix }) => {
    try {
        if (!text) throw 'Mana Kak Linknya?';

        let targetChat = m.sender;

        if (m.isGroup) {
            await conn.sendMessage(m.chat, { text: `✅ @${m.sender.split('@')[0]}, hasil unduhan akan dikirim ke pesan pribadi Anda!`, mentions: [m.sender] });
        }

        if (/tiktok|tt/i.test(command)) {
            let isLink = text.match(tiktokRegex);
            if (!isLink) return m.reply("Itu bukan link TikTok!");

            await global.loading(m, conn);

            if (/tiktok-imgdl/i.test(command)) {
                return await conn.sendFile(targetChat, text, "", "", m);
            }

            let { data } = await tiktok(text);
            if (data?.images) {
                if (data.images.length > 0) {
                    await conn.sendMessage(targetChat, { text: "⏳ Sedang mengirim gambar, harap tunggu..." });
                    for (let i = 0; i < data.images.length; i++) {
                        await conn.sendFile(targetChat, data.images[i], "", "", m);
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    }
                } else {
                    m.reply('Tidak ada gambar yang ditemukan.');
                }
            } else {
                let download = await conn.getFile(data.play);
                await conn.sendFile(targetChat, download.data, "", `🎥 Nickname: ${data.author.nickname} \n⏳ Duration: ${data.duration} \n📌 ${data.title}`.trim(), m);
                                      
            }
        } else {
                                                     
            let mainUrl = `https://dlpanda.com/id?url=${text}&token=G7eRpMaa`;
            let backupUrl = `https://dlpanda.com/id?url=${text}&token51=G32254GLM09MN89Maa`;

            let response = await axios.get(mainUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0',
                    'Accept': '*/*',
                    'Cookie': 'cf_clearance=...; dlpanda_session=...',
                }
            });

            const html = response.data;
            const $ = cheerio.load(html);
            let imgSrc = [];
            $('div.col-md-12 > img').each((_, el) => {
                imgSrc.push($(el).attr('src'));
            });

            if (imgSrc.length === 0) {
                response = await axios.get(backupUrl, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0',
                        'Accept': '*/*',
                        'Cookie': 'cf_clearance=...; dlpanda_session=...',
                    }
                });
                const html2 = response.data;
                const $2 = cheerio.load(html2);
                $2('div.col-md-12 > img').each((_, el) => {
                    imgSrc.push($2(el).attr('src'));
                });
            }

            if (imgSrc.length === 0) throw 'Gambar tidak ditemukan';

            await conn.sendMessage(targetChat, { text: "⏳ Sedang mengirim gambar, harap tunggu..." });
            for (let i = 0; i < imgSrc.length; i++) {
                try {
                    await conn.sendFile(targetChat, imgSrc[i], '', null, m);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                } catch (e) {
                    console.error(e);
                    m.reply('❌ Terjadi error saat mengirim gambar, mencoba lagi...');
                }
            }
            await conn.sendMessage(targetChat, { text: `🙏 Tetap support terus ${global.namebot}!\nJangan lupa donasi ke nomor bot ini: ${global.nomorown}` });
        }
    } catch (error) {
        m.reply('❌ Berikan Link Tiktok-nya. Jika tidak terkirim, silakan lapor ke owner Elaina - AI');
        console.error(error);
    } finally {
        await global.loading(m, conn, true);
    }
};

handler.help = ["tiktok"];
handler.tags = ["downloader"];
handler.command = /^(tiktok-imgdl|tiktok(mp4|slide|foto|video)?|tt(mp4|slide|foto|video)?)$/i;
handler.limit = true;
handler.onlyprem = true;

export default handler;

async function tiktok(url) {
    let res = await axios.post("https://www.tikwm.com/api", {}, { params: { url, hd: 1 } });
    return res.data;
}
