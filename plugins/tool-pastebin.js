import fetch from 'node-fetch';
import os from 'os';

const api_dev_key = 'Db3ksgR9SLUN3EP84ZVWy6eTs2KuQykH';
const url_post = 'https://pastebin.com/api/api_post.php';

var handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        conn.reply(m.chat, `Silakan berikan teks untuk diposting di Pastebin\nContoh: \n *${usedPrefix + command} teks* \n *${usedPrefix + command} Hello, World!*`, m);
        return;
    }

    const pasteText = text;

    const formData = `api_dev_key=${api_dev_key}&api_option=paste&api_paste_code=${encodeURIComponent(pasteText.split(os.EOL).join('\n'))}`;

    await m.reply(wait);
    
    try {
        const response = await fetch(url_post, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,
        });
        const result = await response.text();
        const pasteKey = result.split("/").pop();
        conn.reply(m.chat, `Paste URL: https://pastebin.com/${pasteKey}\nRaw Paste URL: https://pastebin.com/raw/${pasteKey}`, m);
        // conn.reply(m.chat, `Raw Paste URL: https://pastebin.com/raw/${pasteKey}`, m);
    } catch (error) {
        console.error("Error:", error);
        conn.reply(m.chat, `An error occurred: ${error.message}`, m);
    }
};

handler.help = ['paste <text/code>', 'pastebin <text/code>'];
handler.tags = ['info', 'tool', 'internet'];
handler.command = /^(pastebin|paste)$/i;

export default handler;

export default handler;
