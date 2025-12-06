import fetch from 'node-fetch';
import os from 'os';

const handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        throw `Invalid input. Format: convertcode <from>|<to>|<code>\nEx: \n${usedPrefix + command} python|java|print("hallo")${os.EOL}a=5${os.EOL}b=10${os.EOL}print(a+b)`;
    }

    const [From, to, ...codeArray] = args[0].split('|');
    const code = codeArray.join('|').replace(/\\n/g, os.EOL);

    if (!From || !to || !code) {
        throw `Invalid input. Format: convertcode <from>|<to>|<code>\nEx: \n${usedPrefix + command} python|java|print("hallo")${os.EOL}a=5${os.EOL}b=10${os.EOL}print(a+b)`;
    }

    const headers = {
    'Content-Type': 'application/json'
    };

    const json_data = {
        'from': From,
        'to': to,
        'code': code,
    };

    const response = await fetch('https://api.codeconverter.com/convert_sample', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(json_data),
    });

    const data = await response.json();
    const result = data.data.result;

    conn.reply(m.chat, `Result: \n\n${result}`, m);
};

handler.help = ['convertcode <from>|<to>|<code>'];
handler.tags = ['code'];
handler.command = /^(convertcode|konversikode)$/i;

export default handler;
