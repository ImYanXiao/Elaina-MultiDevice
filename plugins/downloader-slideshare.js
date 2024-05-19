import fetch from 'node-fetch';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (args.length < 1) {
        conn.reply(m.chat, `Silakan berikan URL SlideShare\nContoh: \n *${usedPrefix + command} LINKNYA*`, m);
        return;
    }
    
    const url = args[0];
    const filetypes = ['pdf', 'pptx'];

    try {
        for (const filetype of filetypes) {
            const response_get = await fetch(`https://bioskop-six.vercel.app/slideshare?url=${encodeURIComponent(url)}&filetype=${filetype}`);
            const { download_url } = await response_get.json();
            console.log(`Download URL for ${filetype.toUpperCase()}: ${download_url}`);

            conn.sendFile(m.chat, download_url, `${url.split('/').pop()}.${filetype}`, `> File ${filetype.toUpperCase()} berhasil diunduh dan disimpan sebagai ${url.split('/').pop()}.${filetype}`, m);
        }
    } catch (error) {
        console.error("Error:", error);
        conn.reply(m.chat, `> Terjadi kesalahan: ${error.message}\n\nSilakan berikan URL SlideShare\nContoh: \n *${usedPrefix + command} LINKNYA*`, m);
    }
};

handler.command = /^(slideshare|slidesharedownloader|slidesharedl|slidedownload)$/i;
handler.help = ['slideshare <LINKNYA>'];
handler.tags = ['downloader'];

export default handler;
