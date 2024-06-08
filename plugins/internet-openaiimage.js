import axios from "axios"
var handler = async (m, { conn, usedPrefix, command, text }) => {
try {
            if (!text) return m.reply(`Chat dengan AI.\n\nContoh:\n${usedPrefix}${command} Apa itu resesi`);
            const data = await(await axios.get('https://aemt.me/dalle?text=' + text, {responseType:'arraybuffer'})).data
         return conn.sendFile(m.chat, data, '', `Result From : ${text}`, m) 
          } catch (error) {
            console.log(error);
            m.reply("Maaf, sepertinya ada yang error :"+ error);
          }
        }
handler.help = ['ai-image']
handler.tags = ['internet']
handler.exp = 0;
handler.command = /^(dalle|aiimg|aiimage|ai-img|openaiimage|ai-image|img)$/i 

export default handler;
