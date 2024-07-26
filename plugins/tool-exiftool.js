import fetch from 'node-fetch';
import uploadImage from '../lib/uploadImage.js';

let handler = async (m, { usedPrefix, command, text }) => {
    m.reply(`Tunggu sebentar...${wait}`);
    try {
        let url;
        let media;
        
        if (text && text.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i)) {
            url = text.match(/^https?:\/\//) ? text : 'https://' + text;
        } else {
            let q = m.quoted ? m.quoted : m;
            let mime = (q.msg || q).mimetype || '';
            if (!mime) {
                throw new Error(`Kirim/Reply Gambar dengan caption ${usedPrefix + command}`);
            }

            media = await q.download();
            url = await uploadImage(media);
        }

        if (!url) throw new Error('URL-nya mana?');

        let response = await fetch(`https://bioskop-six.vercel.app/exiftool?url=${encodeURIComponent(url)}`);
        if (!response.ok) throw new Error('Failed to fetch EXIF data.');

        let data = await response.json();
        if (!data || Object.keys(data).length === 0) throw new Error('No EXIF data available.');

        let exifData = {
            "APP14": data.APP14 || {},
            "Composite": data.Composite || {},
            "Ducky": data.Ducky || {},
            "File": data.File || {},
            "XMP": data.XMP || {},
            "JFIF": data.JFIF || {}
        };

        let message = '';

        for (const [section, details] of Object.entries(exifData)) {
            if (Object.keys(details).length === 0) continue;

            message += `*${section}*\n`;
            for (const [key, value] of Object.entries(details)) {
                message += `  ${key}: ${value}\n`;
            }
            message += '\n';
        }

        m.reply(message || 'No data available.');

    } catch (error) {
        if (error.message.startsWith('Kirim/Reply Gambar')) {
            m.reply(`Kirim/Reply Gambar dengan caption ${usedPrefix + command}\nAtau\n${usedPrefix + command} https://ppcexpo.com/blog/wp-content/uploads/2020/11/what-is-a-meta-search-engine-.jpg`);
        } else if (error.message === 'URL-nya mana?') {
            m.reply('URL-nya mana?');
        } else {
            m.reply(`Error: ${error.message || 'An unknown error occurred.'}`);
        }
    }
}

handler.help = ['exiftool'].map(v => v + ' <Reply to image> or <url>');
handler.tags = ['internet', 'tool'];
handler.command = /^(exiftool|exif|exiftools|metadata|metadatas|exift)$/i;

handler.limit = 5;

export default handler;
