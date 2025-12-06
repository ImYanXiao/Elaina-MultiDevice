import fetch from 'node-fetch';

var handler = async (m, { args, conn, usedPrefix, command }) => {
    if (!args[0]) {
        throw `Masukkan ekspresi matematika\nContoh: ${usedPrefix + command} berapa 1+1 atau soal matematika lainnya.\n\n_*Note: Dikoding dengan menggunakan kecerdasan buatan AI mathematics by Xnuvers007/Indra.*_`;
    }

    try {
        conn.reply(m.chat, `bentar ya\n${global.wait}`)
        const response = await fetch(`https://vihangayt.me/tools/mathssolve?q=${encodeURIComponent(args[0])}`);
        const data = await response.json();

        if (data.status) {
            const result = data.data;
            conn.reply(m.chat, `Hasil: ${result}`, m);
        } else {
            throw 'Gagal menyelesaikan ekspresi matematika.';
        }
    } catch (error) {
        console.error('Error:', error);
        conn.reply(m.chat, `Terjadi kesalahan saat memproses permintaan. ${error}`, m);
    }
};

handler.help = ['mathsolver <ekspresi_matematika>'];
handler.tags = ['tools'];
handler.command = /^(mathsolver|mathsolve|matematika|mtk)$/i;

export default handler;
