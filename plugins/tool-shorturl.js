import fetch from 'node-fetch'

let handler = async (m, { args, usedPrefix, command }) => {
    if (!args[0]) return m.reply(`${usedPrefix}${command} https://mykingbee.blogspot.com/`);

    try {
        const response = await fetch(`https://tr.deployers.repl.co/short?url=${args[0]}`);

        if (response.ok) {
            const data = await response.json();

            // Extract relevant data from the response
            const author = data.author;
            const bitly = data.bitly;
            const isgd = data.isgd;
            const ouo = data.ouo;
            const tinyurl = data.tinyurl;
            const vgd = data.vgd;

            // Format the data as a list of key-value pairs
            const formattedData = `Author: ${author}\n\nLink Asli ${args[0]}\n=====SHORT LINK=====\nBitly: ${bitly}\nIsgd: ${isgd}\nOuo: ${ouo}\nTinyURL: ${tinyurl}\nVgd: ${vgd}`;

            // Send the formatted data to m.reply
            m.reply(formattedData);
        } else {
            m.reply('Failed to retrieve data. Please try again later.');
        }
    } catch (error) {
        console.error(error);
        m.reply('An error occurred. Please try again later.');
    }
}

handler.help = ['short <url>'];
handler.tags = ['internet'];
handler.command = /^(short|singkatin|singkat|bitly|tinyurl|vgd|ouo|isgd|shortlink|linkshort)$/i;

export default handler;
