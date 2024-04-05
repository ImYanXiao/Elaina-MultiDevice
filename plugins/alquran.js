import fetch from 'node-fetch';

const maxRetries = 3;
const retryDelay = 10000; // jeda 10 detik

let handler = async (m, { args, usedPrefix, command }) => {
    let retries = 0;
    let api;

    while (retries < maxRetries) {
        try {
            const response = await fetch('https://raw.githubusercontent.com/Xnuvers007/Xnuvers007.github.io/master/database/alquran.json');
            if (!response.ok) throw 'Tidak dapat mengambil data Al-Quran.';
            api = await response.json();
            break; // berhenti kalo udah berhasil
        } catch (error) {
            console.error(`Error fetching data (attempt ${retries + 1}):`, error);
            retries++;
            await new Promise(resolve => setTimeout(resolve, retryDelay)); // jeda dulu sebelum coba lagi
        }
    }

    if (retries === maxRetries) {
        throw 'Gagal mengambil data Al-Quran setelah beberapa percobaan.';
    }

    if (!Array.isArray(api)) {
        throw `Data Al-Quran tidak sesuai format yang diharapkan.`;
    }

    const surahList = api.map(surah => {
        let name = `${surah.asma.id.long} (${surah.asma.translation.id + " " + surah.asma.translation.en})`;
        return `${surah.number}. Surat ${surah.asma.ar.short} (${name}), ${surah.ayahCount + " ayat" + " | " + surah.type.ar}\n${surah.tafsir.id}`;
    }).join('\n\n');

    const listsurah = `Nama-nama Surah:\n${surahList}`;

    if (!(args[0] || args[1])) throw `contoh:\n${usedPrefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, & ayatnya 1 saja\n\n${listsurah}`;
    if (isNaN(args[0]) || isNaN(args[1])) throw `contoh:\n${usedPrefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja\n\n${listsurah}`;

    await m.reply(wait);

    const mes = `
${api[args[0] - 1].ayahs[args[1] - 1].text.ar}
${api[args[0] - 1].ayahs[args[1] - 1].text.read}
        
Indonesia: ${api[args[0] - 1].ayahs[args[1] - 1].translation.id}
English: ${api[args[0] - 1].ayahs[args[1] - 1].translation.en}
( Q.S ${api[args[0] - 1].asma.id.short} (${api[args[0] - 1].asma.ar.short}) : ${api[args[0] - 1].ayahs[args[1] - 1].number.insurah} )
  
*Tafsir: ${api[args[0] - 1].ayahs[args[1] - 1].tafsir.id}*
`.trim();
    m.reply(mes);
    conn.sendFile(m.chat, api[args[0] - 1].ayahs[args[1] - 1].audio.url, '', `( Q.S ${api[args[0] - 1].asma.id.short} (${api[args[0] - 1].asma.ar.short}) : ${api[args[0] - 1].ayahs[args[1] - 1].number.insurah} )`, m);
}

handler.help = ['alquran']
handler.tags = ['quran']
handler.command = ['alquran']

export default handler;
