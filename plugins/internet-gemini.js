import { fileTypeFromBuffer } from "file-type";
import { GoogleGenAI } from "@google/genai";
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw(`Contoh:\n${usedPrefix}${command} Halo?`);
    m.react("🕒")
    const ai = new GoogleGenAI({ apiKey: "AIzaSyB3Q74etnADQ_qSX3OJtzTnteGh-fd4df8" });
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${text}`,
  });
    let q = m.quoted ? m.quoted : m
    let hehe = await fileTypeFromBuffer(await q.download())
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw `[ GEMINI - AI ]\n\n${response.text}`
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
});
let yayaya = `[ GEMINI - AI ]\n\n${response2.text}`
  m.reply(yayaya)
}
handler.help = ['gemini']
handler.tags = ['ai']
handler.command = /^(gemini|bard)$/i
handler.limit = true
export default handler
