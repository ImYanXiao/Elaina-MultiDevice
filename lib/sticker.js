import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { ffmpeg } from './converter.js';
import fluent_ffmpeg from 'fluent-ffmpeg';
import { spawn } from 'child_process';
import { fileTypeFromBuffer } from 'file-type';
import webp from 'node-webpmux';
import fetch from 'node-fetch';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tmp = path.join(__dirname, '../tmp');

/**
 * Proses konversi gambar atau video menjadi stiker webp menggunakan ffmpeg.
 * @param {Buffer} img - Buffer gambar atau video.
 * @param {String} [url] - URL gambar atau video.
 * @param {Boolean} [isAnimation=false] - Apakah file berupa animasi.
 * @param {Number} [duration=10] - Durasi maksimal animasi (jika file animasi).
 * @returns {Promise<Buffer>}
 */
async function processSticker(img, url, isAnimation = false, duration = 10) {
    if (url) {
        const res = await fetch(url);
        if (res.status !== 200) throw new Error(await res.text());
        img = await res.buffer();
    }

    const type = await fileTypeFromBuffer(img);
    if (!type) throw new Error('Unsupported file type');

    const tmpPath = path.join(tmp, `${Date.now()}.${type.ext}`);
    const outPath = `${tmpPath}.webp`;

    await fs.promises.writeFile(tmpPath, img);

    return new Promise((resolve, reject) => {
        let ffmpegProcess = fluent_ffmpeg(tmpPath)
            .on('error', (err) => {
                fs.promises.unlink(tmpPath).catch(console.error);
                reject(err);
            })
            .on('end', async () => {
                try {
                    const webpBuffer = await fs.promises.readFile(outPath);
                    resolve(webpBuffer);
                } finally {
                    await fs.promises.unlink(tmpPath).catch(console.error);
                    await fs.promises.unlink(outPath).catch(console.error);
                }
            });

        if (isAnimation) {
            ffmpegProcess
                .addOutputOptions([
                    '-vcodec', 'libwebp',
                    '-vf', `scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,fps=15`,
                    '-loop', '0',
                    '-vsync', 'vfr',
                    `-t ${duration}`,
                    '-qscale', '50'
                ])
                .toFormat('webp');
        } else {
            ffmpegProcess
                .addOutputOptions([
                    '-vcodec', 'libwebp',
                    '-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,pad=512:512:-1:-1:color=white@0.0'
                ])
                .toFormat('webp');
        }

        ffmpegProcess.save(outPath);
    });
}

/**
 * Mengubah gambar menjadi stiker menggunakan ffmpeg dan ImageMagick.
 * @param {Buffer} img - Buffer gambar.
 * @param {String} [url] - URL gambar.
 * @returns {Promise<Buffer>}
 */
async function sticker1(img, url) {
  try {
    if (url) {
      const res = await fetch(url);
      if (res.status !== 200) throw new Error(await res.text());
      img = await res.buffer();
    }

    const inp = path.join(tmp, `${Date.now()}.jpeg`);
    await fs.promises.writeFile(inp, img);

    const ffmpegProcess = spawn('ffmpeg', [
      '-y', '-i', inp,
      '-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1',
      '-f', 'png', '-'
    ]);

    const bufs = [];

    ffmpegProcess.stdout.on('data', chunk => bufs.push(chunk));

    const convertProcess = spawn(global.support.gm ? 'gm' : 'convert', ['png:-', 'webp:-']);
    ffmpegProcess.stdout.pipe(convertProcess.stdin);

    return new Promise((resolve, reject) => {
      convertProcess.stdout.on('data', (data) => bufs.push(data));
      convertProcess.on('exit', () => resolve(Buffer.concat(bufs)));
      ffmpegProcess.on('error', reject);
      convertProcess.on('error', reject);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Mengubah gambar atau video menjadi stiker menggunakan ffmpeg.
 * @param {Buffer} img - Buffer gambar atau video.
 * @param {String} [url] - URL gambar atau video.
 * @returns {Promise<Buffer>}
 */

  async function sticker2(img, url) {
  if (url) {
    const res = await fetch(url);
    if (res.status !== 200) throw new Error(await res.text());
    img = await res.buffer();
  }

  const type = await fileTypeFromBuffer(img);
  if (!type) {
    throw new Error('Unsupported file type');
  }

  const isAnimation = ['mp4', 'webm', 'gif', 'apng'].includes(type.ext);
  const isImage = ['png', 'jpg', 'jpeg'].includes(type.ext) && !isAnimation;

  if (!isAnimation && !isImage) {
    throw new Error('Unsupported file type for sticker');
  }

  const tmpPath = path.join(tmp, `${Date.now()}.${type.ext}`);
  const outPath = `${tmpPath}.webp`;

  await fs.promises.writeFile(tmpPath, img);

  return new Promise((resolve, reject) => {
    let ffmpegProcess = fluent_ffmpeg(tmpPath)
      .on('error', (err) => {
        fs.promises.unlink(tmpPath).catch(console.error);
        reject(err);
      })
      .on('end', async () => {
        const webpBuffer = await fs.promises.readFile(outPath);
        resolve(webpBuffer);
        fs.promises.unlink(tmpPath).catch(console.error); // Clean up input file
        fs.promises.unlink(outPath).catch(console.error); // Clean up output file
      });

    if (isAnimation) {
      ffmpegProcess
        .addOutputOptions([
          '-vcodec', 'libwebp',
          '-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,fps=15',
          '-loop', '0',
          '-vsync', 'vfr',
          '-t', '10', // Maksimal durasi 10 detik
          '-qscale', '50'
        ])
        .toFormat('webp');
    } else if (isImage) {
      ffmpegProcess
        .addOutputOptions([
          '-vcodec', 'libwebp',
          '-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,pad=512:512:-1:-1:color=white@0.0'
        ])
        .toFormat('webp');
    }

    ffmpegProcess.save(outPath);
  });
}

/**
 * Mengubah gambar menjadi stiker menggunakan wa-sticker-formatter.
 * @param {Buffer} img - Buffer gambar.
 * @param {String} url - URL gambar.
 * @param {String} packname - Nama paket stiker.
 * @param {String} author - Penulis stiker.
 * @param {Array<String>} [categories] - Kategori stiker.
 * @param {Object} [extra] - Metadata tambahan.
 * @returns {Promise<Buffer>}
 */
async function sticker3(img, url, packname, author, categories = [''], extra = {}) {
  const { Sticker } = await import('wa-sticker-formatter');
  const stickerMetadata = {
    type: 'default',
    pack: packname,
    author,
    categories,
    ...extra
  };

  return new Sticker(img || url, stickerMetadata).toBuffer();
}

/**
 * Menggunakan fluent-ffmpeg untuk konversi gambar menjadi stiker.
 * @param {Buffer} img - Buffer gambar.
 * @param {String} url - URL gambar.
 * @returns {Promise<Buffer>}
 */
async function sticker4(img, url) {
  if (url) {
    const res = await fetch(url);
    if (res.status !== 200) throw new Error(await res.text());
    img = await res.buffer();
  }

  const type = await fileTypeFromBuffer(img) || { mime: 'application/octet-stream', ext: 'bin' };
  if (type.ext === 'bin') throw new Error('Unsupported file type');

  const tmpPath = path.join(tmp, `${Date.now()}.${type.ext}`);
  const outPath = `${tmpPath}.webp`;

  await fs.promises.writeFile(tmpPath, img);

  return new Promise((resolve, reject) => {
    fluent_ffmpeg(tmpPath)
      .on('error', (err) => {
        fs.promises.unlink(tmpPath).catch(console.error);
        reject(err);
      })
      .on('end', async () => {
        fs.promises.unlink(tmpPath).catch(console.error);
        resolve(await fs.promises.readFile(outPath));
      })
      .addOutputOptions([
        '-vcodec', 'libwebp', '-vf',
        'scale="min(320,iw)":min"(320,ih)":force_original_aspect_ratio=decrease,fps=15,pad=320:320:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse'
      ])
      .toFormat('webp')
      .save(outPath);
  });
}

/**
 * Menambahkan metadata EXIF untuk stiker WhatsApp.
 * @param {Buffer} webpSticker - Buffer stiker webp.
 * @param {String} packname - Nama paket stiker.
 * @param {String} author - Penulis stiker.
 * @param {Array<String>} categories - Kategori stiker.
 * @param {Object} [extra] - Metadata tambahan.
 * @returns {Promise<Buffer>}
 */
async function addExif(webpSticker, packname, author, categories = [''], extra = {}) {
    const img = new webp.Image();
    const stickerPackId = crypto.randomBytes(32).toString('hex');
    const json = {
        'sticker-pack-id': stickerPackId,
        'sticker-pack-name': packname,
        'sticker-pack-publisher': author,
        'emojis': categories,
        ...extra
    };

    const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
    const jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
    const exif = Buffer.concat([exifAttr, jsonBuffer]);
    exif.writeUIntLE(jsonBuffer.length, 14, 4);

    await img.load(webpSticker);
    img.exif = exif;
    return img.save(null);
}

/**
 * Konversi gambar atau video ke stiker dengan metadata tambahan.
 * @param {Buffer} img - Buffer gambar atau video.
 * @param {String} url - URL gambar atau video.
 * @param {String} packname - Nama paket stiker.
 * @param {String} author - Penulis stiker.
 * @param {Array<String>} [categories] - Kategori stiker.
 * @param {Object} [extra] - Metadata tambahan.
 * @returns {Promise<Buffer>}
 */
async function sticker(img, url, packname, author, categories = [''], extra = {}) {
    try {
        const isAnimation = ['mp4', 'webm', 'gif', 'apng'].includes(await fileTypeFromBuffer(img).then(type => type?.ext));
        const stickerBuffer = await processSticker(img, url, isAnimation);
        return await addExif(stickerBuffer, packname, author, categories, extra);
    } catch (error) {
        console.error('Failed to create sticker:', error);
        throw error;
    }
}

const support = {
  ffmpeg: true,
  ffprobe: true,
  ffmpegWebp: true,
  convert: true,
  magick: false,
  gm: false,
  find: false
};

export {
  sticker,
  sticker1,
  sticker2,
  sticker3,
  sticker4,
  addExif,
  support
};
