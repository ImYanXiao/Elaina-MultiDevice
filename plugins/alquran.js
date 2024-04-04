import fetch from 'node-fetch';

let handler = async (m, { args, usedPrefix, command }) => {
    if (!(args[0] || args[1])) throw `contoh:\n${usedPrefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, & ayatnya 1 saja`
    if (isNaN(args[0]) || isNaN(args[1])) throw `contoh:\n${usedPrefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
    
    //await m.reply(wait);
    
    let response = await fetch('https://raw.githubusercontent.com/Xnuvers007/Xnuvers007.github.io/master/database/alquran.json');
    if (!response.ok) throw 'Tidak dapat mengambil data Al-Quran.';
    
    let api = await response.json();
    let mes = `
${api[args[0] - 1].ayahs[args[1] - 1].text.ar}
    
${api[args[0] - 1].ayahs[args[1] - 1].translation.id}
( Q.S ${api[args[0] - 1 ].asma.id.short} : ${api[args[0] - 1].ayahs[args[1] - 1].number.insurah} )
`.trim()
    m.reply(mes)
    conn.sendFile(m.chat, api[args[0] - 1].ayahs[args[1] - 1].audio.url, '', '', m)
}

handler.help = ['alquran']
handler.tags = ['quran']
handler.command = ['alquran']

export default handler
