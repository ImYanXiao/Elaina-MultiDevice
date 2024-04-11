import axios from "axios";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs/promises";
import { tiktokdl } from "@bochilteam/scraper-sosmed";

const handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        throw `*[❗] Contoh: ${usedPrefix + command} https://www.tiktok.com/@tuanliebert/video/7313159590349212934?is_from_webapp=1&sender_device=pc*`;
    }

    const sender = m.sender.split(`@`)[0];

    try {
        await conn.reply(m.chat, "Tunggu sebentar kak, video sedang diunduh... server 1", m);
        const tiktokData = await tryServer1(args[0]);
        m.reply(tiktokData);

        if (!tiktokData) {
            throw "Gagal mendownload video!";
        }

        const videoURL = tiktokData.video.noWatermark;
        const videoURLWatermark = tiktokData.video.watermark;

        const infoMessage = `Judul: ${tiktokData.title}\nUpload: ${tiktokData.created_at}\n\nSTATUS:\n=====================\nLike = ${tiktokData.stats.likeCount}\nKomentar = ${tiktokData.stats.commentCount}\nBagikan = ${tiktokData.stats.shareCount}\nDitonton = ${tiktokData.stats.playCount}\nSimpan = ${tiktokData.stats.saveCount}\n=====================\n\nUploader: ${tiktokData.author.name || "Tidak ada informasi penulis"}\n(${tiktokData.author.unique_id} - https://www.tiktok.com/@${tiktokData.author.unique_id})\nBio: ${tiktokData.author.signature}\nLagu: ${tiktokData.music.play_url}\nResolusi: ${tiktokData.video.ratio}\n`;

        if (videoURL || videoURLWatermark) {
            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", `Ini kak videonya\n\n${infoMessage}`, m);
            await conn.sendFile(m.chat, videoURLWatermark, "tiktokwm.mp4", `*Ini Versi Watermark*\n\n${infoMessage}`, m);
            await conn.sendFile(m.chat, `${tiktokData.music.play_url}`, "lagutt.mp3", "ini lagunya", m);
            conn.reply(m.chat, "•⩊• Ini kak Videonya ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა\nDitonton yah ₍^ >ヮ<^₎", m);
        } else {
            throw "Tidak ada tautan video yang tersedia.";
        }
    } catch (error1) {
        try {
            await conn.reply(m.chat, "Tunggu sebentar kak, video sedang diunduh... server 2", m);
            const tiktokData2 = await tiktokdl(args[0]);
            m.reply(tiktokData2);

            if (!tiktokData2.success) {
                throw "Gagal mendownload video!";
            }

            const { author, video } = tiktokData2;
            const { unique_id, nickname, avatar } = author;
            const { no_watermark, no_watermark_hd } = video;

            const avatarURL = avatar || "https://i.pinimg.com/564x/56/2e/be/562ebed9cd49b9a09baa35eddfe86b00.jpg";

            const infoMessage2 = `ID Unik: ${unique_id}\nNickname: ${nickname}`;

            await conn.sendFile(m.chat, avatarURL, "thumbnail.jpg", `Ini thumbnail videonya\n\n${infoMessage2}`, m);
            await conn.sendFile(m.chat, no_watermark, "tiktok2.mp4", "Ini kak videonya dari Server 2", m);
            await conn.sendFile(m.chat, no_watermark_hd, "tiktokhd2.mp4", "Ini kak videonya dari Server 2 lebih hd", m);

            const audioURL2 = `suaratiktok.mp3`;
            await convertVideoToMp3(no_watermark, audioURL2);

            if (audioURL2) {
                await conn.sendFile(m.chat, mp3FileName, mp3FileName, `ini kak suaranya @${sender} versi MP3`, m);
                await fs.unlink(mp3FileName);
            }

            await conn.reply(m.chat, "•⩊• Ini kak Videonya ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა\nDitonton yah ₍^ >ヮ<^₎", m);
        } catch (error2) {
            try {
                await conn.reply(m.chat, "Tunggu sebentar kak, video sedang diunduh... server 3", m);
                const tiktokData3 = await tryServer3(args[0]);

                m.reply(tiktokData3);

                if (!tiktokData3) {
                    throw "Gagal mendownload video!";
                }

                const { data } = tiktokData3;

                const {
                    title,
                    play,
                    size,
                    wm_size,
                    hd_size,
                    play_count,
                    comment_count,
                    share_count,
                    download_count,
                    collect_count,
                    create_time,
                    wmplay,
                    hdplay
                } = data;

                const musicInfo = tiktokData3.data.music_info;
                const { play: musicPlay, title: musicTitle } = musicInfo;

                const sizeInMB = (sizeInBytes) => (sizeInBytes / (1024 * 1024)).toFixed(2);

                const sizeInMB_size = sizeInMB(size);
                const sizeInMB_wm_size = sizeInMB(wm_size);
                const sizeInMB_hd_size = sizeInMB(hd_size);

                const pesan = `Judul = ${title}\nView = ${play_count}\nKomen = ${comment_count}\nShare = ${share_count}\nDownload = ${download_count}\nSimpan = ${collect_count}\nUpload = ${create_time}`;

                await conn.sendFile(m.chat, play, "tiktok3.mp4", `*TANPA WATERMARK*\nUkuran: ${sizeInMB_size} MB\n\n${pesan}`, m);
                await conn.sendFile(m.chat, wmplay, "tiktokwm3.mp4", `*WATERMARK*\nUkuran: ${sizeInMB_wm_size} MB\n\n${pesan}`, m);
                await conn.sendFile(m.chat, hdplay, "tiktokhd3.mp4", `*HD No Watermark (TANPA WATERMARK)*\nUkuran: ${sizeInMB_hd_size} MB\n\n${pesan}`, m);
                await conn.sendFile(m.chat, musicPlay, "tiktokmp3.mp3", `*MUSIC*\nJudul: ${musicTitle}`, m);

                await conn.reply(m.chat, "•⩊• Ini kak Videonya ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა\nDitonton yah ₍^ >ヮ<^₎", m);
            } catch (error3) {
                try {
                    await conn.reply(m.chat, "Tunggu sebentar kak, video sedang diunduh... server 4", m);
                    const tiktokData4 = await tryServer4(args[0]);
                    m.reply(tiktokData4)

                    if (!tiktokData4) {
                        throw "Gagal mendownload video!";
                    }

                    if (tiktokData4.result) {
                        const { video1, video2, video_hd, video_watermark, music } = tiktokData4.result;
                        const avatar = tiktokData4.result.author.avatar;
                        const nickname = tiktokData4.result.author.nickname;
                        const desc = tiktokData4.result.desc;

                        conn.reply(m.chat, `Statistik: \n>Avatar : ${avatar}\nNickname ${nickname}\Deskripsi: ${desc}`, m);

                        for (const tiktokDataItems of [video1, video2, video_hd, video_watermark]) {
                            if (tiktokDataItems) {
                                await conn.sendFile(
                                    m.chat,
                                    tiktokDataItems,
                                    `tiktok${tiktokDataItems === video1 ? '1' : tiktokDataItems === video2 ? '2' : tiktokDataItems === video_hd ? 'hd' : 'wm'}.mp4`,
                                    `Ini kak videonya: ${tiktokDataItems === video1 ? '(Video 1)' : tiktokDataItems === video2 ? '(Video 2)' : tiktokDataItems === video_hd ? '(Video HD)' : '(Video Watermark)'}\n\n${args[0]}`,
                                    m
                                );
                            }
                        }
                        await conn.sendFile(m.chat, music, 'lagu.mp3', `Ini lagunya: ${args[0]}`, m);
                        await conn.reply(m.chat, "•⩊• Ini kak Videonya ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა\nDitonton yah ₍^ >ヮ<^₎", m);
                    } else {
                        throw "Tidak ada tautan video yang tersedia.";
                    }
                } catch (error4) {
                    conn.reply(m.chat, `Error: ${error4}`, m);
                }
            }
        }
    }
};

async function tryServer1(url) {
    try {
        const tiklydownAPI = `https://api.tiklydown.eu.org/api/download?url=${url}`;
        const response = await axios.get(tiklydownAPI, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language": "id,en-US;q=0.7,en;q=0.3",
                "Accept-Encoding": "gzip, deflate, br",
                Connection: "keep-alive",
                Cookie: "cf_clearance=IDhpJ2RO8UDI40tXLI4g45ZZGDiET0lnWy6bO.4oLqQ-1706368220-1-ASlDi8PXO3c7Jk/wNqrgxTj4gCrY4qr6QonEpMmvW1EKPYICk//uDMJ+wFCv2LXuv7t26eyFoSyVEGbdV8dV2gQ=",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "none",
                "Sec-Fetch-User": "?1",
                "If-None-Match": "W/faa-OLjMXtR3QSf5fGpXMh35fxB63x0",
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function tryServer3(url) {
    try {
        const skizoTechAPI = "https://skizo.tech/api/tiktok";
        const response = await axios.post(skizoTechAPI, { url: url }, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
                Accept: "*/*",
                "Accept-Language": "id,en-US;q=0.7,en;q=0.3",
                "Accept-Encoding": "gzip, deflate, br",
                Referer: "https://tiktok.vihangayt.me/",
                "Content-Type": "application/json",
                Authorization: "https://skizo.tech",
                Origin: "https://tiktok.vihangayt.me",
                Connection: "keep-alive",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site",
                TE: "trailers",
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function tryServer4(url) {
    try {
        const tiklydownAPI2 = `https://api.tiklydown.eu.org/api/download/v2?url=${url}`;
        const response = await axios.get(tiklydownAPI2, { headers: { "accept": "*/*" } });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function convertVideoToMp3(videoUrl, outputFileName) {
    return new Promise((resolve, reject) => {
        ffmpeg(videoUrl)
            .toFormat("mp3")
            .on("end", () => resolve())
            .on("error", (err) => reject(err))
            .save(outputFileName);
    });
}

handler.help = ["tiktok"].map((v) => v + " <url>");
handler.tags = ["downloader"];
handler.exp = 500;
handler.command = /^t(t|iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i;

export default handler;
