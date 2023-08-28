import { googleImage } from '@bochilteam/scraper';
import sharp from 'sharp';

var handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Gunakan contoh ${usedPrefix}${command} Kanao Tsuyuri`;

    const res = await googleImage(text);
    let images = res;
    conn.reply("Tunggu Sebentar...")

    for (let i = 0; i < Math.min(images.length, 8); i++) {
        let randomIndex = Math.floor(Math.random() * images.length); // Random Image
        let imageLink = images[randomIndex];
      
        /*
        untuk imageLink dibawah ini, digunakan ketika kalian tidak ingin membuat gambar yang dikirim itu acak/Random. Jika ingin terurut, hapus simbol // pada let imageLink = images[i]; . lalu beri tanda // pada
        
        let randomIndex = Math.floor(Math.random() * images.length);
        let imageLink = images[randomIndex];
        */
      
        // let imageLink = images[i];
      
        try {
            let imgBuffer = await (await fetch(imageLink)).buffer();
            let metadata = await sharp(imgBuffer).metadata();
            let resolution = `${metadata.width} x ${metadata.height}`;
          
            let processedImageBuffer = await sharp(imgBuffer)
                .resize(5120) // YHHA Yang HD HD Aja
                .toBuffer();

            let metadata_HD = await sharp(processedImageBuffer).metadata();
            let resolution_HD = `${metadata_HD.width} x ${metadata_HD.height}`;

            conn.sendFile(m.chat, processedImageBuffer, 'google.jpg', `*Hasil Pencarian Google Image*
🔎 *Query:* ${text}
📐 *Resolusi Original:* ${resolution}
📏 *Resolusi HD:* ${resolution_HD}
🌎 *Sumber:* Google`, m);

            await new Promise(resolve => setTimeout(resolve, 2000)); // kasih jeda berapa detik 1000 -> 2 detik
        } catch (error) {
            console.error('Error fetching image:', error);
            // Skip dan ngelanjutin ke gambar selanjutnya
        }
    }
}

handler.help = ['gimage <query>', 'image <query>'];
handler.tags = ['internet'];
handler.command = /^(gimage|image|googleimage|googleimg|gimg)$/i;

export default handler;
