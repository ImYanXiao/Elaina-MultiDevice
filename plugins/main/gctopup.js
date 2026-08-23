import fs from 'fs';
import fetch from 'node-fetch';
let handler = async (m, { conn }) => { 

         let caption = `*Haloo Elainfers ini adalah Grub Topup Elaina AI Yang dibuat Oleh RexxHayanasi dan ARIFZYN* \n-------⫹⫺ Elaina TopUp OFC Grub ⫹⫺-------\n\n https://chat.whatsapp.com/EZHJgacfF9S46MhHvscYsz`;
  conn.reply(m.chat, caption, m, {
      contextInfo: {
        externalAdReply: {
          title: "E L A I N A  M U L T I D E V I C E",
          thumbnailUrl: 'https://telegra.ph/file/6890ee54916c4de72bf0e.jpg',
          sourceUrl: "https://chat.whatsapp.com/EZHJgacfF9S46MhHvscYsz",
          mediaType: 1,
          renderLargerThumbnail: true, 
          showAdAttribution: true
        }
      }
    });
 }
 handler.help = ['gcbottopup', 'gctopup'];
handler.tags = ['main'];
handler.command = /^(gctopup|groupbottt|ttbotgc|botgrouptopup|gctopupelaina|groupelainatopup)$/i;
export default handler;