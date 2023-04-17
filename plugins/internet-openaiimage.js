import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({ organization: 'Your-Org': 'Your-Key'});
const openaiii = new OpenAIApi(configuration);
let handler = async (m, { conn, text, command }) => {
        
            if (!text) throw (`Membuat gambar dari AI.\n\nContoh:\n.aiimage Wooden house on snow mountain`);
            await m.reply(wait)
            const openai = new OpenAIApi(configuration);
            const response = await openai.createImage({
              prompt: text,
              n: 1,
              size: "512x512",
            });
conn.sendButtonImg(m.chat, response.data.data[0].url, 'Done', wm, 'Menu', '.m', m)
}
handler.help = ['ai-image']
handler.tags = ['internet']
handler.command = /^(dalle|aiimg|aiimage|ai-img|openaiimage|ai-image)$/i
handler.limit = true 
export default handler
