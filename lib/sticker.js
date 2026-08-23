import * as crypto from 'crypto';
import webp from 'node-webpmux';
import { Sticker } from 'wa-sticker-formatter';

                              
async function sticker(img, url, packName, authorName) {
    try {
        const stickerMetadata = {
            type: 'full',
            pack: packName,
            author: authorName,
        };
        const stickerInstance = new Sticker(img || url, stickerMetadata);
        await stickerInstance.build();
        
        return await stickerInstance.toBuffer();
    } catch (error) {
        console.error('Error in sticker function:', error);
        throw error;
    }
}

                                                   
async function addExif(webpSticker, packname, author, categories = [''], extra = {}) {
    try {
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
        return await img.save(null);
    } catch (error) {
        console.error('Error in addExif function:', error);
        throw error;
    }
}

export {
    sticker,
    addExif
};
