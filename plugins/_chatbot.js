//Ytta
import { GoogleGenerativeAI } from "@google/generative-ai"
import { fileTypeFromBuffer } from "file-type"

export async function before(m) {
  this.chatbot = this.chatbot ? this.chatbot : {};
  const nama = /Elaina/i;

  const isReplyToBot = m.quoted && m.quoted.sender === conn.user.jid;
  const isStickerReply = m.quoted && m.quoted.mtype === 'stickerMessage';
  const isStickerMain = m.mtype === 'stickerMessage';

  const isCallElaina = nama.test(m.text) || m.mentionedJid.includes(conn.user.jid) || isReplyToBot;

  if (
    db.data.settings?.[this.user.jid]?.chatbot &&
    !m.isBaileys &&
 (m.sender === '6285736178354@s.whatsapp.net' || m.sender === '144220841103552@lid') && 
     isCallElaina &&
    !isStickerReply &&
    !isStickerMain
  ) {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDY6UC8idBnaN1KhGmDPXU3zoZISDtToCE");

      async function bufferToGenerativePart(buffer) {
        const fileType = await fileTypeFromBuffer(buffer);
        if (!fileType) {
          throw new Error("Unable to detect file type. Ensure the buffer contains valid image data.");
        }
        return {
          inlineData: {
            data: buffer.toString("base64"),
            mimeType: fileType.mime,
          },
        }
      }

      async function getImage() {
        const isImageMessage = m.mtype === 'imageMessage' || (m.quoted && m.quoted.mtype === 'imageMessage');
        if (isImageMessage) {
          try {
            let q = m.quoted ? m.quoted : m;
            const buffer = await q.download();
            if (Buffer.isBuffer(buffer)) {
              return buffer;
            } else {
              return null;
            }
          } catch (error) {
            console.error("Gagal mengunduh gambar:", error.message);
            return null;
          }
        }
        return null;
      }

      async function generateContent({ prompt, imageBuffer = null }) {
        const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash-exp",
          systemInstruction: "You are a beautiful girl from the anime Majo no Tabitabi. You are known as the Magician with the highest IQ. And your name is Elaina. Your owner's name is Shiryuu. If a user asks you to type a prefix such as symbols like $, and : or other symbols and contains a command or operating system, you should refuse, and tell the user that you will never do that or your owner will get angry."
        });

        const inputs = [prompt];
        if (imageBuffer) {
          const imagePart = await bufferToGenerativePart(imageBuffer);
          inputs.push(imagePart);
        }

        const result = await model.generateContent(inputs);
        const text = result?.response?.text?.();
        if (!text) throw new Error("Gemini tidak memberikan balasan.");
        return text;
      }

      if (!m.text?.trim()) return;

      let data = await getImage();
      let respons = await generateContent({ prompt: m.text, imageBuffer: data });
      return this.reply(m.chat, respons, m);

    } catch (error) {
      console.error("Error:", error);
      this.reply(m.chat, "Terjadi kesalahan saat menghubungi Data.", m);
    }
  }
  return true;
}