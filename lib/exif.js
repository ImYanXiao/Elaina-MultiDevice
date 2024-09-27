import fs from 'fs';
import { tmpdir } from 'os';
import Crypto from 'crypto';
import ff from 'fluent-ffmpeg';
import webp from 'node-webpmux';
import path from 'path';

function createTmpFile(extension) {
    return path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.${extension}`);
}

async function imageToWebp(media) {
    const tmpFileOut = createTmpFile('webp');
    const tmpFileIn = createTmpFile('jpg');
    
    try {
        await fs.promises.writeFile(tmpFileIn, media);
        await new Promise((resolve, reject) => {
            ff(tmpFileIn)
                .on('error', reject)
                .on('end', resolve)
                .addOutputOptions([
                    '-vcodec',
                    'libwebp',
                    '-vf',
                    "scale='min(320,iw)':min(320,ih):force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
                ])
                .toFormat('webp')
                .save(tmpFileOut);
        });
        const buff = await fs.promises.readFile(tmpFileOut);
        await fs.promises.unlink(tmpFileOut);
        await fs.promises.unlink(tmpFileIn);
        return buff;
    } catch (error) {
        console.error('Error converting image to webp:', error);
        throw error;
    }
}

async function videoToWebp(media) {
    const tmpFileOut = createTmpFile('webp');
    const tmpFileIn = createTmpFile('mp4');

    try {
        await fs.promises.writeFile(tmpFileIn, media);
        await new Promise((resolve, reject) => {
            ff(tmpFileIn)
                .on('error', reject)
                .on('end', resolve)
                .addOutputOptions([
                    '-vcodec', 'libwebp',
                    '-vf',
                    "scale='min(320,iw)':min(320,ih):force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
                    '-loop', '0',
                    '-ss', '00:00:00',
                    '-t', '00:00:05',
                    '-preset', 'default',
                    '-an',
                    '-vsync', '0'
                ])
                .toFormat('webp')
                .save(tmpFileOut);
        });
        const buff = await fs.promises.readFile(tmpFileOut);
        await fs.promises.unlink(tmpFileOut);
        await fs.promises.unlink(tmpFileIn);
        return buff;
    } catch (error) {
        console.error('Error converting video to webp:', error);
        throw error;
    }
}

async function writeExifImg(media, metadata) {
    let wMedia = await imageToWebp(media);
    const tmpFileIn = createTmpFile('webp');
    const tmpFileOut = createTmpFile('webp');
    
    try {
        await fs.promises.writeFile(tmpFileIn, wMedia);
        
        if (!(metadata.packname || metadata.author)) {
            return wMedia;  // Return media without EXIF if no metadata
        }

        const img = new webp.Image();
        const json = {
            'sticker-pack-id': 'https://github.com/DikaArdnt/Hisoka-Morou',
            'sticker-pack-name': metadata.packname,
            'sticker-pack-publisher': metadata.author,
            'emojis': metadata.categories ? metadata.categories : [""]
        };

        const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
        const jsonBuff = Buffer.from(JSON.stringify(json), 'utf-8');
        const exif = Buffer.concat([exifAttr, jsonBuff]);
        exif.writeUIntLE(jsonBuff.length, 14, 4);

        await img.load(tmpFileIn);
        await fs.promises.unlink(tmpFileIn);
        img.exif = exif;
        await img.save(tmpFileOut);
        
        return tmpFileOut;
    } catch (error) {
        console.error('Error writing EXIF to image:', error);
        throw error;
    }
}

async function writeExifVid(media, metadata) {
    let wMedia = await videoToWebp(media);
    const tmpFileIn = createTmpFile('webp');
    const tmpFileOut = createTmpFile('webp');
    
    try {
        await fs.promises.writeFile(tmpFileIn, wMedia);

        if (!(metadata.packname || metadata.author)) {
            return wMedia;  // Return media without EXIF if no metadata
        }

        const img = new webp.Image();
        const json = {
            'sticker-pack-id': 'https://dikode-team.com',
            'sticker-pack-name': metadata.packname,
            'sticker-pack-publisher': metadata.author,
            'emojis': metadata.categories ? metadata.categories : [""]
        };

        const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
        const jsonBuff = Buffer.from(JSON.stringify(json), 'utf-8');
        const exif = Buffer.concat([exifAttr, jsonBuff]);
        exif.writeUIntLE(jsonBuff.length, 14, 4);

        await img.load(tmpFileIn);
        await fs.promises.unlink(tmpFileIn);
        img.exif = exif;
        await img.save(tmpFileOut);

        return tmpFileOut;
    } catch (error) {
        console.error('Error writing EXIF to video:', error);
        throw error;
    }
}

export default { imageToWebp, videoToWebp, writeExifImg, writeExifVid };
