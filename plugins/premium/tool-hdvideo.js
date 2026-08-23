import { fileURLToPath } from 'url';                                 
import { join, dirname } from 'path';                                     
import { promises } from 'fs';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);                         
const __dirname = dirname(__filename);                              

const handler = async (m, { conn, text, usedPrefix, args, command }) => {
  conn.hdvid = conn.hdvid ? conn.hdvid : {};
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';

  if (!mime) throw `Kirim/Balas video dengan caption *${usedPrefix}${command}*`;
  const tinggi = q.height;
  const lebar = q.width;
  let additionalFFmpegOptions;
  if (text === '1' || text === '2') {
    additionalFFmpegOptions = [
      '-c:v', 'libx264',
      '-crf', text === '1' ? (args[2] || '10') : (args[2] || '5'),
      '-b:v', args[1] || '8M',
      '-s', `${lebar * (text === '1' ? 2 : 3)}x${tinggi * (text === '1' ? 2 : 3)}`,
      '-x264opts', 'keyint=30:min-keyint=30',
    ];
  } else throw 'Pilih level:\n\n[1]. 1 (medium)\n[2]. 2 (HD)';
  
  const videoBuffer = await q.download();
  const additionalArgs = [
    ...additionalFFmpegOptions,
    '-q:v', '60',
  ];
  const buff = await videoConvert(videoBuffer, additionalArgs);
  await conn.sendFile(m.chat, buff, '', 'Selesai', m);
};

handler.help = ['hdvideo *<level>*'];
handler.tags = ['premium'];
handler.command = /^(hdvideo|hdvideos|hdvid)$/i;
handler.premium = true;

export default handler;

async function videoConvert(buffer, input = []) {
  return new Promise(async (resolve, reject) => {
    try {
      const tmp = join(__dirname, '../tmp', `${+new Date()}.mp4`);
      await promises.writeFile(tmp, buffer);
      const out = tmp.replace('.mp4', '_converted.mp4');
      const args = [
        '-y',
        '-i', tmp,
        ...input,
        out
      ];

      spawn('ffmpeg', args)
        .on('error', reject)
        .on('close', async (code) => {
          try {
            await promises.unlink(tmp);
            if (code !== 0) return reject(code);
            const outputVideoBuffer = await promises.readFile(out);
            await promises.unlink(out);
            resolve(outputVideoBuffer);
          } catch (e) {
            reject(e);
          }
        });
    } catch (e) {
      reject(e);
    }
  });
}
