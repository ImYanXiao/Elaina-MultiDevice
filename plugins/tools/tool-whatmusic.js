  
                                                 
                                               
                                                             
                                                
                                                                                              
                                                    
                 
                         
                                                                            
                                                                       
                                                               

                                                                                                      
  

import acrcloud from 'acrcloud';

let acr = new acrcloud({
    host: 'identify-ap-southeast-1.acrcloud.com',
    access_key: '6047a4b4ca2f04378a9d578002fc83c6',
    access_secret: 'Y5TFipnelCZxueByedKAjA9lMcNtQvFAX4Ignv0x'
});

const handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || '';
        
        if (/video|audio/.test(mime)) {
            let buffer = await q.download();
            await m.reply('_✨Elaina sedang mencari..._');
            
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
        conn.reply(m.chat, 'Gagal mendeteksi lagu karena lagu tidak ada / error', m);
    }
};

handler.help = ['whatmusic'];
handler.tags = ['tools'];
handler.command = /^(whatmusic|whatsmusic|musikapa|whatmusik|detectmusic|deteksimusik|detectmusik)$/i;

export default handler;
