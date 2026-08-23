import { SpotifyAPI } from '../../lib/spotify.js';
import fs from "fs";
import axios from "axios";

let handler = async (m, { conn, text, usedPrefix, command, isPrems }) => {
    try {
        if (!text) return m.reply(`Masukan judul lagu atau link Spotify! \n\nContoh : \n${usedPrefix + command} rewrite the stars \n${usedPrefix + command} https://open.spotify.com/track/65fpYBrI8o2cfrwf2US4gq`);
        await global.loading(m, conn);

        if (/http(s)?:\/\/open.spotify.com\/track\/[-a-zA-Z0-9]/i.test(text)) {
            let spotifyData = await spotifyDL(text);

            let caption = `
_*${spotifyData.title}*_

Artist : ${spotifyData.artists}
Duration : ${spotifyData.duration}
Album : ${spotifyData.album}

Audio sedang dikirim oleh elaina, harap bersabar!
            `.trim();

            let chat = await conn.sendFile(
                m.chat,
                spotifyData.cover,
                "cover.jpg",
                caption,
                m,
                false,
                false,
                { smlcap: true }
            );

            await conn.sendFile(m.chat, spotifyData.music, null, null, chat, false, { mimetype: "audio/mpeg" });
        } else {
            let spotify = await SpotifyAPI();
            let { tracks } = await spotify.trackSearch(text);

            let list = tracks.items.map((v, i) => {
                return [
                    `${usedPrefix + command} ${v.external_urls.spotify}`,
                    (i + 1).toString(),
                    `${v.name} \nArtist By ${v.artists[0].name}`
                ];
            });

            await conn.textList(
                m.chat,
                `Terdapat *${tracks.items.length} hasil* \nSilahkan pilih lagu yang kamu mau!`,
                false,
                list,
                m,
                {
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: false,
                            mediaType: 1,
                            title: tracks.items[0].name,
                            body: `Artist By ${tracks.items[0].artists[0].name}`,
                            thumbnail: (await conn.getFile(tracks.items[0].album.images[0].url)).data,
                            renderLargerThumbnail: true,
                            mediaUrl: tracks.items[0].external_urls.spotify,
                            sourceUrl: tracks.items[0].external_urls.spotify
                        }
                    }
                }
            );
        }
    } finally {
        await global.loading(m, conn, true);
    }
};
handler.help = ['spotify'];
handler.tags = ['audio'];
handler.command = /^spotify$/i;
handler.onlyprem = true;
handler.limit = true;
export default handler;

function convertMsToMinSec(ms) {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds}`;
}

   
                                                 
   
function spotifyDL(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const apiEndpoint = `https://api.vreden.web.id/api/spotify?url=${encodeURIComponent(url)}`;

            const { data } = await axios.get(apiEndpoint);
            if (data.status !== 200 || !data.result || !data.result.status) {
                return reject("Gagal mengambil data track Spotify! Harap periksa URL atau coba lagi nanti.");
            }

            const metadata = {
                music: data.result.music,
                title: data.result.title,
                artists: data.result.artists,
                album: data.result.type,                                                   
                duration: data.result.releaseDate,                                                  
                cover: data.result.cover,
                link: url
            };

            resolve(metadata);
        } catch (error) {
            reject("Terjadi kesalahan saat mengambil data track Spotify: " + error.message);
        }
    });
}
