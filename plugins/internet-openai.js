import { Configuration, OpenAIApi } from "openai";

var handler = async (m, { text, command, usedPrefix }) => {
     if (!text) throw `contoh:\n${usedPrefix + command} halo?`
let res = await ask(text)
await conn.reply(m.chat, res, m) 
}
handler.tags = ['internet']
handler.command = /^(ai|openai)$/i
export default handler

async function ask(txt) {
  const configuration = new Configuration({
  apiKey: 'Your Key', // Create Your Key
});                   // https://platform.openai.com/account/api-keys
const openai = new OpenAIApi(configuration);
  let text = `Q: ${txt}
A:`
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    temperature: 0.9,
    max_tokens: 800,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["A:"],
  });
  return await response.data.choices[0].text
		}
