import { instagramdl } from '@bochilteam/scraper';
import fetch from 'node-fetch';

var handler = async (m, { args, conn, usedPrefix, command }) => {
    if (!args[0]) throw `Ex:\n${usedPrefix}${command} https://www.instagram.com/reel/C0EEgMNSSHw/?igshid=MzY1NDJmNzMyNQ==`;
    try {
        let res = await bochil.snapsave(args[0]);
        let media = await res[0].url;
      
        const sender = m.sender.split(`@`)[0];

        conn.reply(m.chat, 'Sedang mengunduh video...', m);

        if (!res) throw 'Can\'t download the post';
      
        await conn.sendMessage(m.chat, { video: { url: media }, caption: `ini kak videonya @${sender}`, mentions: [m.sender]}, m);
      
      await conn.sendMessage(m.chat, { 
        document: { url: media }, 
        mimetype: 'video/mp4', 
        fileName: `instagram.mp4`,
        caption: `ini kak videonya @${sender} versi dokumen, agar jernih`, mentions: [m.sender]
      }, {quoted: m})

    } catch (e) {
      try {
          let response = await fetch(`https://tr.deployers.repl.co/instagramdl?url=${encodeURIComponent(args[0])}`);
          let data = await response.json();

          if (data.image && data.video) {
              const sender = m.sender.split(`@`)[0];

              conn.reply(m.chat, 'Sedang mengunduh video...', m);

            await conn.sendMessage(m.chat, { video: data.video, caption: `ini kak videonya @${sender}`, mentions: [m.sender] }, m);

            await conn.sendMessage(m.chat, { 
              document: { url: data.video }, 
              mimetype: 'video/mp4', 
              fileName: `instagram.mp4`,
              caption: `ini kak videonya @${sender} versi dokumen, agar jernih`, mentions: [m.sender]
            }, {quoted: m})
            
          } else {
              throw 'Gagal mengunduh video';
          }
      } catch (error) {
          conn.reply(m.chat, 'Gagal mengunduh video', m);
      }
    }
};

handler.help = ['instagram'];
handler.tags = ['downloader'];
handler.command = /^(ig(dl)?|instagram(dl)?)$/i;

export default handler;
