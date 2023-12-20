import OpenAI from 'openai'

const mySecret = process.env['key-apikey'] // process.env['key-apikey'] ubah jadi key-APIKEY kamu di openai.com

const openai = new OpenAI({ apiKey: mySecret });

const Nomor = 'Nomer Kamu'

let handler = async (m, { conn, text, command }) => {
    try {
        if (!text) throw new Error(`Membuat gambar dari AI.\n\nContoh:\n.img Wooden house on snow mountain\n\n\nJika bot AI tidak dapat menjawab, silahkan donasi minimal 1k untuk menghidupkannya kembali.\n\n Dana: ${Nomor}\nGopay: ${Nomor}`);
        
        await m.reply(wait)
        const response = await openai.images.generate({
  model: "dall-e-2", // dall-e-3 terlalu banyak permintaan jadi sering error
  prompt: "a white siamese cat",
  n: 1,
  // quality: 'hd', // jika mau ganti optional, defaultnya adalah standart
  size: "1024x1024", // Pixel Tersedia 1024x1024, 1024x1792 or 1792x1024
});
        
        conn.sendFile(m.chat, response.data[0].url, 'image.png', `Done\n\n\nJika bot AI tidak dapat menjawab, silahkan donasi minimal 1k untuk menghidupkannya kembali.\n\n Dana: ${Nomor}\nGopay: ${Nomor}`, m)
        // Or use conn.reply:
        // conn.reply(m.chat, `Done\n\n\nJika bot AI tidak dapat menjawab, silahkan donasi minimal 1k untuk menghidupkannya kembali.\n\n Dana: ${Nomor}\nGopay: ${Nomor}`, m);
        
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
        } else {
            console.log(error);
            m.reply(error.message);
        }
    }
}

handler.help = ['ai-image']
handler.tags = ['internet']
handler.exp = 0;
handler.command = /^(dalle|aiimg|aiimage|ai-img|openaiimage|ai-image|img)$/i 

export default handler;
    
