// support me on https://trakteer.id/xnuvers007 or https://tr.deployers.repl.co/images

import axios from 'axios';

var handler = async (m, { args }) => {
    if (!args[0]) throw 'Input URL\nEx: .fb https://www.facebook.com/groups/175204112986693/permalink/1621191825054574/?mibextid=Nif5oz';
    
    try {
        let url = args[0];
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        };

        let reqOptions = {
            url: `https://tr.deployers.repl.co/fb?u=${url}`,
            method: "GET",
            headers: headersList,
        };

        let response = await axios.request(reqOptions);
        let res = response.data;
        const firstUrls = await res.map(item => item.split(','));

        const hdUrl = firstUrls[0][0];
        const sdUrl = firstUrls[1][0];
        
        const hdMedia = hdUrl;
        const sdMedia = sdUrl;
        
        const hdCaption = 'HD Quality Video';
        const sdCaption = 'SD Quality Video';
        
        m.reply('_In progress, please wait..._');
        conn.sendMessage(m.chat, { video: { url: hdMedia }, caption: hdCaption }, m);
        conn.sendMessage(m.chat, { video: { url: sdMedia }, caption: sdCaption }, m);
    } catch {
        const cap = 'gagal download fb';
        conn.sendFile(m.chat, 'facebook.mp4', 'facebooks.mp4', cap, m);
    }
};

handler.help = ['fbdownload <url>'];
handler.tags = ['downloader'];
handler.command = /^(fbdownload|fb(dl)?)$/i;

export default handler;
