// support me on https://trakteer.id/xnuvers007 or https://tr.deployers.repl.co/images

import axios from 'axios';
import fetch from 'node-fetch';

var handler = async (m, { args }) => {
    if (!args[0]) {
        throw 'Input URL\nEx: .fb https://www.facebook.com/groups/175204112986693/permalink/1621191825054574/?mibextid=Nif5oz';
    }
    
    try {
        const url = args[0];
        const headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        };

        const reqOptions = {
            url: `https://tr.deployers.repl.co/fb?u=${url}`,
            method: "GET",
            headers: headersList,
        };

        const response = await axios.request(reqOptions);
        const firstUrls = response.data.map(item => item.split(','));

        const hdMedia = firstUrls[0][0];
        const sdMedia = firstUrls[1][0];

        m.reply(`support me on https://trakteer.id/xnuvers007 \n https://tr.deployers.repl.co/images`);
        
        const hdCaption = `Video Kualitas HD\nLink HD: ${hdMedia}`;
        const sdCaption = `Video Kualitas SD\nLink SD: ${sdMedia}`;
        
        m.reply('_Sedang diproses, mohon tunggu..._');

        try {
            // Send HD video
            const hdFile = await fetch(hdMedia);
            conn.sendFile(m.chat, await hdFile.buffer(), 'video_hd.mp4', hdCaption, m);

            try {
                // Send SD video
                const sdFile = await fetch(sdMedia);
                conn.sendFile(m.chat, await sdFile.buffer(), 'video_sd.mp4', sdCaption, m);
            } catch {
                // If SD video sending fails, no further action needed
            }
        } catch {
            try {
                // Send SD video
                const sdFile = await fetch(sdMedia);
                conn.sendFile(m.chat, await sdFile.buffer(), 'video_sd.mp4', sdCaption, m);
            } catch {
                // If both HD and SD videos don't exist, send an error message
                const cap = 'Gagal mengunduh video FB';
                conn.sendFile(m.chat, 'facebook.mp4', 'facebook.mp4', cap, m);
            }
        }
    } catch {
        // Jika terjadi kesalahan pada tahap lainnya, kirim pesan kesalahan
        const cap = 'Gagal mengunduh video FB';
        conn.sendFile(m.chat, 'facebook.mp4', 'facebook.mp4', cap, m);
    }
};

// Konfigurasi bantuan dan tag
handler.help = ['fbdownload <url>'];
handler.tags = ['downloader'];
handler.command = /^(fbdownload|fb(dl)?)$/i;

export default handler;
