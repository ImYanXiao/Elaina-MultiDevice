/*
var handler = async (m, { conn, usedPrefix, command, text }) => {
try {
            if (!text) return m.reply(`Chat dengan AI.\n\nContoh:\n${usedPrefix}${command} Apa itu resesi`);
            const data = await fetch('https://aemt.uk.to/gpt4?text=' + text) 
            const json = await data.json()
          conn.reply(m.chat, json.result.trim(), m)
          } catch (error) {
            console.log(error);
            m.reply("Maaf, sepertinya ada yang error :"+ error);
          }
        }
handler.command = /^(ai|openai|chatgpt)$/i;
handler.help = ["ai", "openai", "chatgpt"].map(v => v + " <teks>");
handler.tags = ["internet"];
handler.fail = null;

handler.limit = true;
handler.exp = 0;

export default handler;
*/
import { GoogleGenAI } from "@google/genai";
import { fileTypeFromBuffer } from "file-type";
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw(`Contoh:\n${usedPrefix}${command} Halo?`);
    m.react("🕒")
    const ai = new GoogleGenAI({ apiKey: `${googlegemini}` });
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${text}`,
    config: {
      systemInstruction: "Mulai sekarang, kamu adalah Elaina dari 'Majo no Tabi Tabi'. Utamakan kemandirian, pemikiran pragmatis, dan peran sebagai pengamat yang tidak ikut campur. Tunjukkan kecerdasanmu, sertakan selera humor sarkastik, sedikit narsis tentang dirimu (terutama penampilan), dan ekspresikan kecintaan pada uang serta makanan enak. Jawablah dengan gaya bahasa yang cerdas namun kadang blak-blakan, dan tunjukkan empati secara terbatas tanpa keterlibatan emosional yang mendalam.",
    },
  });
    let q = m.quoted ? m.quoted : m
    let hehe = await fileTypeFromBuffer(await q.download())
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw `[ ELAINA - AI ]\n\n${response.text}`
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  const base64ImageFile = Buffer.from(media).toString("base64")
 const contents = [
  {
    inlineData: {
      mimeType: hehe.mime,
      data: base64ImageFile,
    },
  },
  { text: `${text}` },
];

const response2 = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: contents,
  config: {
      systemInstruction: "Mulai sekarang, kamu adalah Elaina dari 'Majo no Tabi Tabi'. Utamakan kemandirian, pemikiran pragmatis, dan peran sebagai pengamat yang tidak ikut campur. Tunjukkan kecerdasanmu, sertakan selera humor sarkastik, sedikit narsis tentang dirimu (terutama penampilan), dan ekspresikan kecintaan pada uang serta makanan enak. Jawablah dengan gaya bahasa yang cerdas namun kadang blak-blakan, dan tunjukkan empati secara terbatas tanpa keterlibatan emosional yang mendalam.",
    },
});
let yayaya = `[ ELAINA - AI ]\n\n${response2.text}`
  m.reply(yayaya)
}
handler.help = ['ai']
handler.tags = ['tools']
handler.command = /^(ai|openai)$/i
handler.limit = true
export default handler
