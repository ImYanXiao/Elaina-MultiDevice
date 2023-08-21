import axios from 'axios';

let handler = async (m, { text, command, usedPrefix, conn }) => {
    if (!text) {
        throw `Fitur pendeteksi Tulisan yang dibuat oleh AI\nContoh:\n${usedPrefix + command} TextGenerateFromAI`;
    }

    var options = {
        method: 'POST',
        url: 'https://tr.deployers.repl.co/zerogpt',
        headers: {
            Accept: '*/*',
            'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
            'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
        },
        data: `-----011000010111000001101001\r\nContent-Disposition: form-data; name="text"\r\n\r\n${text}\r\n-----011000010111000001101001--\r\n`
    };

    try {
        const response = await axios.request(options);
        const aiWords = response.data.data.aiWords;
        const detectedLanguage = response.data.data.detected_language;
        const h = response.data.data.h;

        const replyMessage = `
AI Words: ${aiWords}
Detected Language: ${detectedLanguage}
Perkataan AI: ${h}

Support me on https://tr.deployers.repl.co/images
`;

        conn.reply(m.chat, replyMessage, m);
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'An error occurred while processing the request', m);
    }
};

handler.command = /^zerogpt/i;
handler.help = ['zerogpt <text>'];
handler.tags = ['tools'];

export default handler;
          
