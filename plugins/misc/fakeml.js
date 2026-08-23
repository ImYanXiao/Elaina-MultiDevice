import { createCanvas, loadImage, registerFont } from 'canvas';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data';

let handler = async (m, { args, usedPrefix, command }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';
  const nickname = args.length > 0 ? args.join(" ").trim() : 'Hydro';

  if (!mime.startsWith('image/')) {
    return m.reply(
`✨━━━〔 🎮 *Fake Lobby ML* 〕━━━✨  

📌 *Cara Pakai*:  
1. Reply gambar/foto yang ingin dipakai.  
2. Ketik: \`${usedPrefix + command} <nick>\`  

💡 *Contoh*:  
> Reply gambar lalu kirim:  
\`${usedPrefix + command} freya\``  
    );
  }

  m.reply(`⏳ *Sedang membuat Fake Lobby ML dengan nama* ➜ *${nickname}*   
🎨 Mohon tunggu sebentar...`);

  const tmpDir = process.cwd();
  const fontUrl = 'https://cloudkuimages.com/uploads/files/CL8QHRYN.ttf';
  const fontPath = path.join(tmpDir, 'CL8QHRYN.ttf');

  try {
    if (!fs.existsSync(fontPath)) {
      const res = await axios.get(fontUrl, { responseType: 'arraybuffer' });
      fs.writeFileSync(fontPath, Buffer.from(res.data));
    }

    registerFont(fontPath, { family: 'CustomFont' });

    const mediaBuffer = await q.download();
    if (!mediaBuffer) throw new Error('Gagal download media');

                                            
    let form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('fileToUpload', mediaBuffer, 'file.png');

    let uploadRes = await axios.post('https://catbox.moe/user/api.php', form, {
      headers: form.getHeaders(),
      maxBodyLength: Infinity
    });

    const uploadedUrl = uploadRes.data;
    if (!uploadedUrl || !uploadedUrl.startsWith('http')) throw new Error('Upload gagal');

    const userImage = await loadImage(uploadedUrl);
    const bg = await loadImage("https://files.catbox.moe/liplnf.jpg");
    const frameOverlay = await loadImage("https://files.catbox.moe/2vm2lt.png");

    const canvas = createCanvas(bg.width, bg.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    const avatarSize = 205;
    const frameSize = 293;
    const centerX = (canvas.width - frameSize) / 2;
    const centerY = (canvas.height - frameSize) / 2 - 282;
    const avatarX = centerX + (frameSize - avatarSize) / 2;
    const avatarY = centerY + (frameSize - avatarSize) / 2 - 3;

    const { width, height } = userImage;
    const minSide = Math.min(width, height);
    const cropX = (width - minSide) / 2;
    const cropY = (height - minSide) / 2;

    ctx.drawImage(userImage, cropX, cropY, minSide, minSide, avatarX, avatarY, avatarSize, avatarSize);
    ctx.drawImage(frameOverlay, centerX, centerY, frameSize, frameSize);

    const maxFontSize = 36;
    const minFontSize = 24;
    const maxChar = 11;
    let fontSize = maxFontSize;
    if (nickname.length > maxChar) {
      const excess = nickname.length - maxChar;
      fontSize -= excess * 2;
      if (fontSize < minFontSize) fontSize = minFontSize;
    }

    ctx.font = `${fontSize}px CustomFont`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(nickname, canvas.width / 2 + 13, centerY + frameSize + 15);

    const buffer = canvas.toBuffer('image/png');
    await varhad.sendMessage(
      m.chat,
      {
        image: buffer,
        caption: `✨━━━〔 ✅ *Fake Lobby ML* 〕━━━✨  

🖼 *Nama*: ${nickname}  
🛠 *Status*: Sukses dibuat  

⚡ Dibuat oleh Elaina MultiDevice`
      },
      { quoted: m }
    );
  } catch (e) {
    m.reply(`❌ *Terjadi kesalahan*: ${e.message}`);
  }
};

handler.command = ['fakeml', 'fakelobby', 'fakelobbyml'];

export default handler;
