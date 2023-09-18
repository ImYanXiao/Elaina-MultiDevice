import axios from 'axios';

const handler = async (m, { conn, text, command, usedPrefix }) => {
    if (!text) return m.reply(`Gunakan format ${usedPrefix + command} <url>\n\n*Contoh :* ${usedPrefix + command} https://github.com/Xnuvers007\nList:\n${usedPrefix}ss <url> (screenshot via hp)\n${usedPrefix}ssweb <url> (screenshot via tablet)\n${usedPrefix}sstablet <url> (screenshot via tablet)\n${usedPrefix}sspc <url> (screenshot via pc)\n${usedPrefix}sslaptop <url> (screenshot via laptop)\n${usedPrefix}sshp <url> (screenshot via hp)`);
  
    //m.reply("_Loading. . ._");
    m.reply(wait);
    
    const phone = await ssweb(text, 'phone');
    const desktop = await ssweb(text, 'desktop');
    const tablet = await ssweb(text, 'tablet');

    // PENGGUNA REPLIT, WAJIB HAPUS // dari const now sampai const minute
    // const now = new Date();
    // now.setHours(now.getHours() + 7);
    // const hour = now.getHours();
    // const minute = now.getMinutes();
  
    const now = new Date();
    now.setHours(now.getHours());
    const hour = now.getHours();
    const minute = now.getMinutes();

    
    const res = `Ini kak screenshotnya dari ${text}\njam ${hour}:${minute}`;
    
    if (command === 'sshp' || command === 'ss') {
        await conn.sendFile(m.chat, phone.result, '', res, m, false);
    }
    
    if (command === 'ssweb' || command === 'sstablet') {
        await conn.sendFile(m.chat, tablet.result, '', res, m, false);
    }
    
    if (command === 'sspc' || command === 'sslaptop') {
        await conn.sendFile(m.chat, desktop.result, '', res, m, false);
    }
};

handler.help = ['ss','ssweb', 'sspc', 'sslaptop', 'sshp', 'sstablet'].map(v => v + ' <url>');
handler.tags = ['tools'];
handler.command = /^(ss|ssweb|sstablet|sspc|sslaptop|sshp)$/i;
handler.limit = false;

export default handler;

async function ssweb(url, device = 'desktop') {
    return new Promise((resolve, reject) => {
        const base = 'https://www.screenshotmachine.com';
      
        // jika ingin screenshot tidak full, hapus saja simbol //
        // const param = {
        //     url: url,
        //     device: device,
        //     cacheLimit: 0
        // };
      
        const param = {
            url: url,
            device: device,
            full: 'on',
            cacheLimit: 0
        };
        
        axios({
            url: base + '/capture.php',
            method: 'POST',
            data: new URLSearchParams(Object.entries(param)),
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then((data) => {
            const cookies = data.headers['set-cookie'];
            
            if (data.data.status == 'success') {
                axios.get(base + '/' + data.data.link, {
                    headers: {
                        'cookie': cookies.join('')
                    },
                    responseType: 'arraybuffer'
                }).then(({ data }) => {
                    const result = {
                        status: 200,
                        author: 'Xnuvers007',
                        result: data
                    };
                    resolve(result);
                });
            } else {
                reject({ status: 404, author: 'Xnuvers007', message: data.data });
            }
        }).catch(reject);
    });
}
