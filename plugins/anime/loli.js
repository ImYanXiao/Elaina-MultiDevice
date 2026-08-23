import fetch from 'node-fetch';

let handler = async (m, { conn, command }) => {
    conn.reply(m.chat, 'Elaina Sedang memproses, mohon tunggu yaa ʕ⁠っ⁠•⁠ᴥ⁠•⁠ʔ⁠っ...', m);
    
                                     
    let name = m.pushName || 'kak';                                                 

    if (command === 'loli') {
        let res = await (await fetch('https://raw.githubusercontent.com/RexxHayanasi/animedatabase/main/database/main/anime/loli.json')).json();
        let rexx = res[Math.floor(Math.random() * res.length)];
        conn.sendFile(m.chat, rexx, 'result.jpg', `Nihh Loli nya untuk ${name} 😄 Jangan dikarungin ya punya Kesayangan MinRex semua soalnya 🗿@${m.sender.split('@')[0]}`, m);
    }
};

handler.command = handler.help = [
    'loli'
];
handler.tags = ['anime'];
handler.limit = true;
handler.register = true;
handler.premium = true;

export default handler;
