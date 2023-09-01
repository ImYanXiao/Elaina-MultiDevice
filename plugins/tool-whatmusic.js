/*
TUTOR DAPETIN HOST, ACCESS_KEY, DAN ACCESS_SECRET
1. siapkan email palsu https://temp-mail.org/id
2. kesini https://console.acrcloud.com/#/register (isi bebas)
3. Kalian akan di arahkan ke website untuk login
4. pilih Audio & Video Recognition atau https://console.acrcloud.com/avr?region=ap-southeast-1
5. Pilih project dan pilih Audio & Video Recognition
6. Create project
7. isi project name bebas
8. pilih Recorded Audio (Audio captured via microphone or noisy audio files)
9. pilih ini Audio Fingerprinting & Cover Song (Humming) Identification
10. pilih buckets ACRCloud Music dan centang semua lalu confirm
*/

import acrcloud from 'acrcloud';

let acr = new acrcloud({
    host: 'xxxxxxxxxxxxxxxxxxxxx',
    access_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    access_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
});

const handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || '';
        
        if (/video|audio/.test(mime)) {
            let buffer = await q.download();
            await m.reply('_In progress, please wait..._');
            
            let { status, metadata } = await acr.identify(buffer);
            if (status.code !== 0) throw status.msg;

            let { title, artists, album, genres, release_date } = metadata.music[0];
            
            let txt = `*• Title:* ${title}${artists ? `\n*• Artists:* ${artists.map(v => v.name).join(', ')}` : ''}`;
            txt += `${album ? `\n*• Album:* ${album.name}` : ''}${genres ? `\n*• Genres:* ${genres.map(v => v.name).join(', ')}` : ''}\n`;
            txt += `*• Release Date:* ${release_date}`;
            
            conn.reply(m.chat, txt.trim(), m);
        } else {
            throw `Reply audio/video with command ${usedPrefix + command}`;
        }
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'Gagal mendeteksi lagu', m);
    }
};

handler.help = ['whatmusic'];
handler.tags = ['tools'];
handler.command = /^(whatmusic|whatsmusic|musikapa|whatmusik|detectmusic|deteksimusik|detectmusik)$/i;

export default handler;
