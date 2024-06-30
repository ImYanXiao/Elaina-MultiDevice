var handler = async (m, { conn, usedPrefix, command, text }) => {
try {
            if (!text) return m.reply(`Chat dengan AI.\n\nContoh:\n${usedPrefix}${command} Apa itu resesi`);
            const data = await fetch('https://widipe.com/gpt4?text=' + text) 
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
