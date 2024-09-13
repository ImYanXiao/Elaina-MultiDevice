import axios from 'axios';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    const apiKey = `${googlegemini}`;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const headers = {
      'Content-Type': 'application/json',
    };

    if (!handler.command.test(command)) {
      throw `Command not recognized. Please use: ${usedPrefix + command} <text>\nExample: ${usedPrefix + command} hello`;
    }

    if (args.length === 0 || args.join(" ").trim() === "") {
      throw `Chat dengan AI.\n\nContoh:\n${usedPrefix}${command} Halo? \n\n\nJika bot AI tidak dapat menjawab, silahkan donasi minimal 1k untuk menghidupkannya kembali.\n\n Dana: ${nomorbot}\nGopay: ${nomorbot}`;
    }

    const textToGenerate = args.join(" ").trim();
    const payload = {
      "contents": [
        {
          "parts": [
            {
              "text": textToGenerate
            }
          ]
        }
      ]
    };

    const response = await axios.post(url, payload, { headers });

    const formatAndPrintResponse = (responseJson) => {
      const candidates = responseJson.candidates || [];
      if (candidates.length > 0) {
        const candidate = candidates[0];
        const content = candidate.content || {};
        const parts = content.parts || [];
        if (parts.length > 0) {
          const text = parts[0].text || 'No text found';
          return `Generated Text:\n\n> ${text.trim()}`;
        }
      }

      return 'No content generated.';
    };

    const responseMessage = formatAndPrintResponse(response.data);
    await conn.reply(m.chat, responseMessage, m);

  } catch (error) {
    console.error("Error:", error.message || error);
    await conn.reply(m.chat, `${error.message || error}`, m);
  }
};

handler.command = /^(bard2|gemini2|googleai|aigoogle)$/i;
handler.help = ["bard2", "gemini2", "googleai", "aigoogle"].map(v => v + " <text>");
handler.tags = ["internet"];
handler.limit = 3;

export default handler;
