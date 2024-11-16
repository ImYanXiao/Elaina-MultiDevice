//import { wallpaper } from '@bochilteam/scraper';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Use example ${usedPrefix}${command} Minecraft`;
  
  const maxWallpapers = 10; // ubah berapa gambar yang mau dikirim
  for (let i = 0; i < maxWallpapers; i++) {
    const res = await bochil.wallpaper(text);
    const img = res[Math.floor(Math.random() * res.length)];
    conn.sendFile(m.chat, img, 'wallpaper.jpg', `Result from *${text}*`, m);
  }
};

handler.help = ['wallpaper' + ' <query>'];
handler.tags = ['downloader'];
handler.command = /^(wallpaper|cariwallpaper)$/i;

export default handler;
