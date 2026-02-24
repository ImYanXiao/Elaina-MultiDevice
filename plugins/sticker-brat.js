import { sticker } from '../lib/sticker.js';
import { createCanvas, registerFont } from 'canvas';
import Jimp from 'jimp';

let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} [text]`;
  let stiker = false;

  try {
    registerFont('./src/font/AppleColorEmoji.ttf', { family: 'AppelFont' });

    const width = 512, height = 512;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    const margin = 40;
    let fontSize = 100;
    const lineHeightMultiplier = 1.3;
    const wordSpacing = 25;

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.textDrawingMode = "glyph";

    let words = text.split(' ');
    let lines = [];

    const rebuildLines = () => {
      lines = [];
      let currentLine = '';
      
      for (let word of words) {
        if (ctx.measureText(word).width > width - 2 * margin) {
          fontSize -= 2;
          ctx.font = `bold ${fontSize}px AppleFont`;
          return rebuildLines();
        }
        let testLine = currentLine ? `${currentLine} ${word}` : word;
        let lineWidth = ctx.measureText(testLine).width + (currentLine.split(' ').length - 1) * wordSpacing;
        
        if (lineWidth < width - 2 * margin) {
          currentLine = testLine;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      if (currentLine) lines.push(currentLine);
    };

    ctx.font = `bold ${fontSize}px AppleFont, Arial, sans-serif`
    rebuildLines();
    
    while (lines.length * fontSize * lineHeightMultiplier > height - 2 * margin) {
      fontSize -= 2;
      ctx.font = `bold ${fontSize}px AppleFont`;
      rebuildLines();
    }

    let lineHeight = fontSize * lineHeightMultiplier;
    let y = (height - lines.length * lineHeight) / 2;

    for (let line of lines) {
      let wordsInLine = line.split(' ');
      let x = margin;
      let space = (width - 2 * margin - ctx.measureText(wordsInLine.join('')).width) / (wordsInLine.length - 1);

      for (let word of wordsInLine) {
        ctx.fillStyle = '#000000';
        ctx.fillText(word, x, y);
        x += ctx.measureText(word).width + space;
      }
      y += lineHeight;
    }

    let buffer = canvas.toBuffer('image/png');
    let image = await Jimp.read(buffer);
    image.blur(3);
    let blurredBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    
    stiker = await sticker(blurredBuffer, false, global.stickpack, global.stickauth);
  } catch (e) {
    console.error(e);
    if (!stiker) stiker = e;
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
    else throw 'Conversion failed';
  }
};

handler.help = ['brat <input text>'];
handler.tags = ['sticker'];
handler.command = ["brat"];

export default handler;