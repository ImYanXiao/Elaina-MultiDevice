import axios from 'axios';

var handler = async (m, { conn, args }) => {
    if (!args[0]) {
        throw 'Uhm... URL-nya mana?';
    }

    try {
        const tiktokData = await tryServer1(args[0]);

        if (!tiktokData || !tiktokData.result.video || !tiktokData.result.music || !tiktokData.result.title) {
            throw 'Gagal mendownload video dari server 1!';
        }

        const { title, music, video } = tiktokData.result;
        const videoURL = video;
        const audioURL = music;
        const videoTitle = title;

        if (videoURL && audioURL && videoTitle) {
            const infonya_gan = `Judul: ${videoTitle}\nLagu: ${audioURL}`;
            await conn.sendFile(m.chat, videoURL, 'tiktok.mp4', `Ini kak videonya\n\n${infonya_gan}`, m);
        } else {
            throw 'Tidak ada tautan video, audio, atau judul yang tersedia dari server 1.';
        }
    } catch (error1) {
        // Jika server 1 gagal, gunakan server 2
        await conn.reply(m.chat, 'Tunggu sebentar kak, video sedang di download... server 2', m);
        try {
            const tiktokData2 = await tryServer2(args[0]);

            if (!tiktokData2 || !tiktokData2.result || !tiktokData2.result.video || !tiktokData2.result.audio || !tiktokData2.result.title) {
                throw 'Gagal mendownload video dari server 2!';
            }

            const { title, title_audio, video, audio, creator } = tiktokData2.result;
            const videoURL2 = video[0];
            const audioURL2 = audio[0];
            const videoTitle = title;
            const audioTitle = title_audio;
            const videoCreator = creator;

            if (videoURL2 && audioURL2 && videoTitle && audioTitle) {
                const infonya_gan = `Judul: ${videoTitle}\nLagu: ${audioTitle}\nAudio link: ${audioURL2}\nCreator: ${videoCreator}`;
                await conn.sendFile(m.chat, videoURL2, 'tiktok2.mp4', `Ini kak videonya\n\n${infonya_gan}`, m);
            } else {
                throw 'Tidak ada tautan video, audio, atau judul yang tersedia dari server 2.';
            }
        } catch (error2) {
            conn.reply(m.chat, `Error: ${error2}`, m);
        }
    }
};

handler.help = ['tiktok'].map((v) => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^t(t|iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i;
handler.register = true;

export default handler;

async function tryServer1(url) {
    let tiklydownAPI = `https://aemt.me/download/tikdl?url=${url}`;
    let response = await axios.get(tiklydownAPI);
    return response.data;
}

async function tryServer2(url) {
    let tiklydownAPI = `https://aemt.me/download/ttdl?url=${url}`;
    let response = await axios.get(tiklydownAPI);
    return response.data;
}
