import fetch from 'node-fetch'
var handler = async (m, { conn, usedPrefix, command, text }) => {
try {
            if (!text) return m.reply(`Chat dengan AI.\n\nContoh:\n${usedPrefix}${command} Apa itu resesi`);
            const data = await(await fetch('https://widipe.com/gpt4?text=' + text)).json() 
          m.reply(data.result.trim())
          } catch (error) {
            console.log(error);
            m.reply("Maaf, sepertinya ada yang error :"+ error);
          }
        }
handler.command = ['ai', 'openai']
export default handler