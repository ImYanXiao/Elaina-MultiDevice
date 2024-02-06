/*
* This is credit: Xnuvers007, ImYanXiao and fdown.net
* 𝕏𝕟𝕦𝕧𝕖𝕣𝕤𝟘𝟘𝟟
* https://github.com/Xnuvers007
*/

import fetch from 'node-fetch';
import cheerio from 'cheerio-without-node-native';
import {
    toPTT
} from '../lib/converter.js';

const handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {

    const sender = m.sender.split(`@`)[0];

    try {
        if (!args[0] || !/^https?:\/\//i.test(args[0])) {
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
            await conn.sendMessage(
                m.chat, {
                    video: buffer,
                    mimetype: "video/mp4",
                    fileName: `video_${index + 1}.mp4`,
                    caption: `ini kak videonya @${sender} \n${caption}`,
                    mentions: [m.sender],
                }, {
                    quoted: m
                },
            );
            await conn.sendMessage(
                m.chat, {
                    document: buffer,
                    mimetype: "video/mp4",
                    fileName: `video_${index + 1}.mp4`,
                    caption: `ini kak videonya @${sender} *VERSI DOKUMEN* \n${caption}`,
                    mentions: [m.sender],
                }, {
                    quoted: m
                },
            );
        }

        const audioLink = mp4Links[0];
        const audioBuffer = await fetch(audioLink).then(res => res.buffer());

        let audio = await toPTT(audioBuffer, 'mp4');
        if (!audio.data) throw 'Can\'t convert media to audio';
        conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, true, {
            mimetype: 'audio/mp3'
        });
        await conn.sendMessage(
            m.chat, {
                audio: audioBuffer,
                mimetype: "mpeg/mp3",
                fileName: `suara.mp3`,
                caption: ``,
                mentions: [m.sender],
            }, {
                quoted: m
            },
        );

    } catch (error) {
        console.error('Fetch Error:', error);
        conn.reply(m.chat, 'An error occurred while processing your request.' + error, m);
    }
};

handler.help = ['fbdownload <url>'];
handler.tags = ['downloader'];
handler.command = /^(fbdownload|fb(dl)?)$/i;

export default handler;

/* Minify Version
import fetch from"node-fetch";import cheerio from"cheerio-without-node-native";import{toPTT}from"../lib/converter.js";const handler=async(e,{conn:t,args:a,usedPrefix:i,command:o})=>{const n=e.sender.split("@")[0];try{if(!a[0]||!/^https?:\/\//i.test(a[0]))return t.reply(e.chat,`Invalid URL. Please provide a valid Facebook Watch URL.\nEx: ${i+o} https://www.facebook.com/share/r/tcbnAb4uEft3kjMJ/?mibextid=D5vuiz`,e);const r=await fetch("https://fdown.net/download.php",{method:"POST",body:new URLSearchParams({URLz:a[0]})});e.reply("Please wait...");const d=await r.text(),c=cheerio.load(d),h=c(".lib-row.lib-header").text().trim(),l=c(".lib-row.lib-desc").text().trim(),s=c('a[href*=".mp4"]').map(((e,t)=>c(t).attr("href"))).get();s.sort((async(e,t)=>(await fetch(e).then((e=>e.buffer()))).length-(await fetch(t).then((e=>e.buffer()))).length)),console.log("Title:",h,"\nDescription:",l),console.log("MP4 Links:",s);const m=s[0],f=s[1],p=(await fetch(m).then((e=>e.buffer()))).length,w=(await fetch(f).then((e=>e.buffer()))).length;let u="",b="";p<w?(u="file sd akan di-download dan dikirimkan karena lebih kecil dari hd",t.reply(e.chat,u,e)):(b="file hd akan di-download dan dikirimkan karena lebih kecil dari sd",t.reply(e.chat,b,e));for(let i=0;i<s.length;i++){const o=s[i],r=await fetch(o).then((e=>e.buffer())),d=`Resolusi: (${0===i?"SD":"HD"})\n${h}\n\n${l}\nURL from user: ${a[0]}`;await t.sendMessage(e.chat,{video:r,mimetype:"video/mp4",fileName:`video_${i+1}.mp4`,caption:`ini kak videonya @${n} \n${d}`,mentions:[e.sender]},{quoted:e}),await t.sendMessage(e.chat,{document:r,mimetype:"video/mp4",fileName:`video_${i+1}.mp4`,caption:`ini kak videonya @${n} *VERSI DOKUMEN* \n${d}`,mentions:[e.sender]},{quoted:e})}const k=s[0],y=await fetch(k).then((e=>e.buffer()));let g=await toPTT(y,"mp4");if(!g.data)throw"Can't convert media to audio";t.sendFile(e.chat,g.data,"audio.mp3","",e,!0,{mimetype:"audio/mp3"}),await t.sendMessage(e.chat,{audio:y,mimetype:"mpeg/mp3",fileName:"suara.mp3",caption:"",mentions:[e.sender]},{quoted:e})}catch(a){console.error("Fetch Error:",a),t.reply(e.chat,"An error occurred while processing your request."+a,e)}};handler.help=["fbdownload <url>"],handler.tags=["downloader"],handler.command=/^(fbdownload|fb(dl)?)$/i;export default handler;
*/
