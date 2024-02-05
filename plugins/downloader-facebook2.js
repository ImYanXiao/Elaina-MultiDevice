import fetch from 'node-fetch';
import cheerio from 'cheerio-without-node-native';

const handler = async (m, { conn, args, usedPrefix, command }) => {
    
    const sender = m.sender.split(`@`)[0];
    
    try {
        if (!args[0]) {
            return conn.reply(m.chat, `Invalid URL. Please provide a valid Facebook Watch URL.\nEx: ${usedPrefix + command} https://www.facebook.com/share/r/tcbnAb4uEft3kjMJ/?mibextid=D5vuiz`, m);
        }

        const response = await fetch('https://fdown.net/download.php', {
            method: 'POST',
            body: new URLSearchParams({
                'URLz': args[0]
            }),
        });

        m.reply('Please wait...');

        const html = await response.text();
        const $ = cheerio.load(html);

        const title = $('.lib-row.lib-header').text().trim();
        const description = $('.lib-row.lib-desc').text().trim();

        const mp4Links = $('a[href*=".mp4"]').map((i, el) => $(el).attr('href')).get();

        // Sort links based on file size
        mp4Links.sort(async (a, b) => {
            const sizeA = (await fetch(a).then(res => res.buffer())).length;
            const sizeB = (await fetch(b).then(res => res.buffer())).length;
            return sizeA - sizeB;
        });

        console.log('Title:', title, '\nDescription:', description);
        console.log('MP4 Links:', mp4Links);

        const sdLink = mp4Links[0];
        const hdLink = mp4Links[1];

        const sizeSD = (await fetch(sdLink).then(res => res.buffer())).length;
        const sizeHD = (await fetch(hdLink).then(res => res.buffer())).length;

        let sdWarning = '';
        let hdWarning = '';

        if (sizeSD < sizeHD) {
            sdWarning = 'file sd akan di-download dan dikirimkan karena lebih kecil dari hd';
            conn.reply(m.chat, sdWarning, m);
        } else {
            hdWarning = 'file hd akan di-download dan dikirimkan karena lebih kecil dari sd';
            conn.reply(m.chat, hdWarning, m);
        }

        for (let index = 0; index < mp4Links.length; index++) {
            const link = mp4Links[index];
            const buffer = await fetch(link).then(res => res.buffer());
            const resolution = index === 0 ? 'SD' : 'HD';
            const caption = `Resolusi: (${resolution})\n${title}\n\n${description}\nURL from user: ${args[0]}`;
            //conn.sendFile(m.chat, buffer, `video_${index + 1}.mp4`, caption, m);
            await conn.sendMessage(
                m.chat,
                {
                    video: buffer,
        			mimetype: "video/mp4",
        			fileName: `video_${index + 1}.mp4`,
        			caption: `ini kak videonya @${sender} \n${caption}`,
        			mentions: [m.sender],
      			},
      		{
                quoted: m
            },
            );
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        conn.reply(m.chat, 'An error occurred while processing your request.'+error, m);
    }
};

handler.help = ['fbdownload <url>'];
handler.tags = ['downloader'];
handler.command = /^(fb2|fbdl2|fbdownload2)$/i;

export default handler;
