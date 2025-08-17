const { GoogleGenAI, Modality } = (await import("@google/genai"));
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw(`Contoh:\n${usedPrefix}${command} Tolong ubah warna rambutnya menjadi pink`);
    m.react("🕒")
  const ai = new GoogleGenAI({ apiKey: `${googlegemini}` });
  const q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw `Mana gambar/foto nya?`
  if (!/image\/(jpe?g|png|webp)/.test(mime)) {
        return m.reply(`Tipe ${mime} tidak didukung!`);
    } 
  const media = await q.download()
  const base64Image = Buffer.from(media).toString("base64");
  const contents = [
    { text: `${text}` },
    {
      inlineData: {
        mimeType: "image/png",
        data: base64Image,
      },
    },
  ];
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents: contents,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      m.reply('Tunggu! sebentar lagi mau jadi');
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      conn.sendFile(m.chat, buffer, '', 'Ini hasilnya kak', m);
    }
  }
}
handler.help = ['geminiedit']
handler.tags = ['tools']
handler.command = /^(geminiedit|editimg|aiedit)$/i
handler.limit = true
export default handler
