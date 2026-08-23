import util from "util";
import fs from "fs";
import path from "path";

let handler = async (m, { conn }) => {
  const file = salam.getRandom();
  const buffer = fs.readFileSync(file);
  await conn.sendMessage(m.chat, { 
    audio: buffer, 
    mimetype: 'audio/mp4',                                                 
    ptt: true 
  }, { quoted: m });
};

handler.customPrefix =
  /^(assalamualaikum|assalamu'alaikum|salam|asalamualaikum|assalam|asalam)$/i;
handler.command = new RegExp();

export default handler;

const salam = [
  "./vn/salam.mp3",
  "./vn/salam1.mp3"
];

Array.prototype.getRandom = function () {
  return this[Math.floor(Math.random() * this.length)];
};
