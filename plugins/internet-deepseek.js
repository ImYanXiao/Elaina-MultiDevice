import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command }) => {
  const prompt = m.text || m.body;
  
  if (!prompt) {
    throw `Please provide a prompt with the *${usedPrefix + command}* command.`;
  }

  const trimmedText = prompt.trim();

  try {
    const apiUrl = `https://deepseek-r1-api.mistra.top/ai/llm/deepseek-r1?prompt=${encodeURIComponent(trimmedText)}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from the API. Status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.status === 200 && data.result) {
      let result = data.result.trim();

      result = result.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

      if (result) {
        // await conn.sendMessage(m.chat, result, 'conversation', { quoted: m });
          await m.reply(`Respon:\n> ${result}`);
      } else {
        m.reply('Sorry, I could not generate a valid response.');
      }
    } else {
      m.reply(`Error: No valid result received from the DeepSeek API.`);
    }
  } catch (error) {
    console.error(error);
    m.reply(`An error occurred while contacting the server: ${error.message}`);
  }
};

handler.help = ['deepseek <text>'];
handler.tags = ['ai'];
handler.command = /^(deepseek|dp|dipsik)?$/i

export default handler;
