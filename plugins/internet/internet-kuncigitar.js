import { chord } from "@bochilteam/scraper";

let foundChords = new Map();                                                         

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukan nama lagu!!\n\nContoh\n${usedPrefix + command} mantra hujan`);

    let result = await chord(text);
    let chordList = result.chord.split('\n').filter(line => line.trim() !== '');

                                                             
    let existingChords = [];
    for (let line of chordList) {
        if (foundChords.has(line)) {
            existingChords.push(line);
        }
    }

    if (existingChords.length > 0) {
        let chordOptions = existingChords.map((chordLine, index) => `*${index + 1}.* ${chordLine}`).join('\n');
        let duplicateText = `
*Chord yang sama ditemukan:*
${chordOptions}
Ketik nomor chord yang diinginkan (misalnya 1) atau *0* untuk chord baru.
`.trim();

        m.reply(duplicateText, false, false, { smlcap: true });
        conn.chordSelection = conn.chordSelection || {};
        conn.chordSelection[m.sender] = {
            result,
            existingChords
        };
    } else {
                                    
        chordList.forEach(chordLine => foundChords.set(chordLine, result));

        let teks = `
*Title :* ${result.title}
*Artist :* ${result.artist}

*Chord :*
${result.chord}
`.trim();

        m.reply(teks, false, false, { smlcap: true });
    }
};

handler.before = async (m, { conn }) => {
    try {
        conn.chordSelection = conn.chordSelection || {};
        if (m.isBaileys) return;
        if (!m.text) return;
        if (!conn.chordSelection[m.sender]) return;

        let selection = parseInt(m.text, 10);
        if (isNaN(selection) || selection < 0) return;

        let selectedResult;
        if (selection === 0) {
            selectedResult = conn.chordSelection[m.sender].result;
        } else {
            let existingChords = conn.chordSelection[m.sender].existingChords;
            if (selection > existingChords.length) return;
            let selectedChord = existingChords[selection - 1];
            selectedResult = foundChords.get(selectedChord);
        }

        if (selectedResult) {
            let teks = `
*Title :* ${selectedResult.title}
*Artist :* ${selectedResult.artist}

*Chord :*
${selectedResult.chord}
`.trim();

            m.reply(teks, false, false, { smlcap: true });
            delete conn.chordSelection[m.sender];
        }
    } catch (error) {
        console.log(error);
        conn.reply(m.chat, 'Terjadi kesalahan saat menjalankan perintah', m);
    }
};

handler.help = ['kuncigitar']
handler.tags = ['internet']
handler.command = /^(kuncigitar|chord)$/i
export default handler;
