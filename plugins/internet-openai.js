import fetch from "node-fetch"
import { generateWAMessageFromContent } from "@adiwajshing/baileys"
import fs from 'fs'
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({ organization: 'Your-Org', apiKey: 'Your-Key' });
const openai = new OpenAIApi(configuration);
let handler = async (m, { conn, text }) => {
try {
            if (!text) return m.reply(`Chat dengan AI.\n\nContoh:\n${usedPrefix}${command} Halo? `);

            const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: text}],
          });
          m.reply(`${response.data.choices[0].message.content}`);
          } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            m.reply("Maaf, sepertinya ada yang error :"+ error.message);
          }
        }
}
handler.command = /^(ai|openai)$/i
export default handler
