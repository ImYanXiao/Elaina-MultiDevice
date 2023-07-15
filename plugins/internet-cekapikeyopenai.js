import axios from 'axios';

var handler = async (m, { conn, text }) => {
  let APIKEYS_NYA = text;

  if (!APIKEYS_NYA) {
    return conn.reply(m.chat, '.cekopenai <APIKEYMU>', m);
  }

  try {
    const response = await axios.get(`https://tr.deployers.repl.co/openai?key=${APIKEYS_NYA}`);
    const data = response.data;

    const author = data.author;
    const donate = data.donate;
    const resultData = data.data[0];

    const apiKey = resultData['API Key (1)'];
    const creditsUsage = resultData['Credits Usage'];
    const expiresAt = resultData['Expires At'];
    const status = resultData['Status'];

    let output = `Author: ${author}\n`;
    output += `Donate: ${donate}\n\n`;
    output += `API Key: ${apiKey}\n`;
    output += `Credits Usage: ${creditsUsage}\n`;
    output += `Expires At: ${expiresAt}\n`;
    output += `Status: ${status}`;

    conn.reply(m.chat, output, m);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Terjadi kesalahan saat melakukan request', m);
  }
};

handler.help = ['cekopenai <APIKEY>'];
handler.tags = ['internet'];
handler.command = /^(cekopenai|cekapikeyopenai|cekopenaiapikey|apikeyopenai|openaiapikey)$/i;

export default handler;
