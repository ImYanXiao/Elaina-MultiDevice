var handler = async (m, { conn, args }) => {
    const url = args[0];
    if (!url.startsWith('https://www.instagram.com/')) {
        return conn.reply(m.chat, 'URL yang diberikan tidak valid.', m);
    }

    try {
        const response = await fetch(`https://bioskop-six.vercel.app/igp?u=${encodeURIComponent(url)}`);
        const result = await response.json();

        if (response.status === 200) {
            const mediaUrls = result.image_urls || []; 

            for (let mediaUrl of mediaUrls) {
                await conn.sendFile(m.chat, mediaUrl, '', '', m);
            }
        } else {
            throw new Error('Gagal mendapatkan media dari Instagram');
        }
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, `Error: ${error.message}`, m);
    }
}

handler.help = ['instagram'];
handler.tags = ['downloader'];
handler.command = /^(ig(dl)?|instagram(dl)?)$/i;

export default handler;
