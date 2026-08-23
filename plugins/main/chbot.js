import fs from 'fs';
import fetch from 'node-fetch';
let handler = async (m, { conn }) => { 

         let caption = `*Haloo Elainfers ini adalah Channel Whatsapp Elaina AI Yang dibuat Oleh Rexx Hayanasi, info update sc ditaruh di ch ini*\n『 _Jadi jangan lupa Follow!!!_ 』\n*biar ga ketinggalan update seputar Scriptnya*\n-------⫹⫺ Elaina Channel Whatsapp ⫹⫺-------\n\n https://whatsapp.com/channel/0029VapYyKEGufIpsd3Rja2C`;
  conn.reply(m.chat, caption, m, {
      contextInfo: {
        externalAdReply: {
          title: "E L A I N A  M U L T I D E V I C E",
          thumbnailUrl: 'https://telegra.ph/file/6890ee54916c4de72bf0e.jpg',
          sourceUrl: "https://whatsapp.com/channel/0029VapYyKEGufIpsd3Rja2C",
          mediaType: 1,
          renderLargerThumbnail: true, 
          showAdAttribution: true
        }
      }
    });
 }
 handler.help = ['chbot'];
handler.tags = ['main'];
handler.command = /^(chbot|chelaina|chbotelaina)$/i;
export default handler;