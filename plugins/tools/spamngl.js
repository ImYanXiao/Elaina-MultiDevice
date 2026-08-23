import crypto from 'crypto';
import fetch from 'node-fetch';
                       
                                                                      

const sendMessage = async (username, message, spamCount) => {
    let counter = 0;
    while (counter < spamCount) {
        try {
            const date = new Date();
            const minutes = date.getMinutes();
            const hours = date.getHours();
            const formattedDate = `${hours}:${minutes}`;
            const deviceId = crypto.randomBytes(21).toString('hex');
            const url = 'https://ngl.link/api/submit';
            const headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.5',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'Referer': `https://ngl.link/${username}`,
                'Origin': 'https://ngl.link'
            };
            const body = `username=${username}&question=${message}&deviceId=${deviceId}&gameSlug=&referrer=`;

            const response = await fetch(url, {
                method: 'POST',
                headers,
                body,
                mode: 'cors',
                credentials: 'include'
            });

            if (response.status === 429) {
                                                 
                console.log(`[${formattedDate}] [Err] Ratelimited, waiting...`);
                await new Promise(resolve => setTimeout(resolve, 60000));                                         
            } else if (response.status !== 200) {
                console.log(`[${formattedDate}] [Err] Unexpected Error: ${response.status}`);
                await new Promise(resolve => setTimeout(resolve, 25000));                                       
            } else {
                counter++;
                console.log(`[${formattedDate}] [Msg] Sent: ${counter}`);
                await new Promise(resolve => setTimeout(resolve, 5000));                                           
            }
        } catch (error) {
            console.error(`[${formattedDate}] [Err] ${error}`);
            await new Promise(resolve => setTimeout(resolve, 5000));                                 
        }
    }
};

                                   
const handler = async (m, { text }) => {
    if (!text.split("|")[0] || !text.split("|")[1] || !text.split("|")[2]) {
        return m.reply("Masukan username, pesan, dan jumlah spam!\nContoh: .nglspam rexxzynxd|haloo|5");
    }

    const [username, message, count] = text.split("|");
    const spamCount = parseInt(count, 10);

    if (isNaN(spamCount) || spamCount <= 0) {
        return m.reply("Jumlah spam harus berupa angka positif!");
    }

    try {
        await sendMessage(username, message, spamCount);
        m.reply(`Sukses mengirim ${spamCount} pesan NGL ke ${username}`);
    } catch (e) {
        console.error(e);                                         
        return m.reply("Fitur error, coba lagi nanti.");
    }
};

handler.command = handler.help = ["nglspam"];
handler.tags = ["tools"];

export default handler;
