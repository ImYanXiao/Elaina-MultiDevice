import gtts from 'node-gtts';
import { readFileSync, unlinkSync } from 'fs';
import { join } from 'path';

const defaultLang = 'id';
let handler = async (m, { conn, args, usedPrefix, command }) => {
  let lang = args[0];
  let text = args.slice(1).join(' ');

  if ((args[0] || '').length !== 2 || !gtts.languages().includes(lang)) {
    lang = defaultLang;
    text = args.join(' ');
  }
  if (!text && m.quoted?.text) text = m.quoted.text;

  let res;
  try {
    res = await tts(text, lang);
  } catch (e) {
    m.reply(`Error: ${e.message}`);
    text = args.join(' ');
    if (!text) throw `Use example: ${usedPrefix}${command} en hello world`;
    res = await tts(text, defaultLang);
  } finally {
    if (res) {
      conn.sendFile(m.chat, res, 'tts.wav', null, m, true);
      unlinkSync(res);
    }
  }
}

handler.help = ['tts <lang> <text>'];
handler.tags = ['tools'];
handler.command = /^g?tts$/i;

export default handler;

function tts(text, lang = 'id') {
  console.log(lang, text);
  return new Promise((resolve, reject) => {
    try {
      let tts = gtts(lang);
      let filePath = join(global.__dirname(import.meta.url), '../tmp', (1 * new Date) + '.wav')
      tts.save(filePath, text, () => {
        resolve(filePath); 
      });
    } catch (e) {
      reject(e);
    }
  });
}
