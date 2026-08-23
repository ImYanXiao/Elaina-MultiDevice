import util from "util";
import fs from "fs";
import path from "path";

let handler = async (m, { conn }) => {
  const file = audio.getRandom();
  const buffer = fs.readFileSync(file);
  await conn.sendMessage(m.chat, { 
    audio: buffer, 
    mimetype: 'audio/mp3',                                                 
    ptt: true 
  }, { quoted: m });
};

handler.customPrefix = /^(Elaina|elaina)$/i;
handler.command = new RegExp();

export default handler;

const audio = [
	"./vn/clara.mp3",
	"./vn/clara1.mp3",
	"./vn/clara2.mp3",
	"./vn/clara3.mp3",
	"./vn/clara4.mp3",
];

Array.prototype.getRandom = function () {
  return this[Math.floor(Math.random() * this.length)];
};
