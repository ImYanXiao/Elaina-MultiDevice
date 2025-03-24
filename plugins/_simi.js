import fetch from 'node-fetch';

let handler = m => m;

handler.before = async (m) => {
    let chat = global.db.data.chats[m.chat];
    if (chat.simi && !chat.isBanned) {
        if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return;
        if (!m.text) return;

        const url = `https://o.simsimi.com/api/chats?lc=id&ft=1&normalProb=2&reqText=${encodeURIComponent(m.text)}&talkCnt=0`;

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch SimSimi response.');

            const json = await res.json();

            if (json.respSentence) {
                m.reply(json.respSentence);
            } else {
                m.reply('SimSimi tidak memahami pesan Anda.');
            }
        } catch (error) {
            console.error('Error:', error);
            m.reply('Terjadi kesalahan saat memproses permintaan.');
        }

        return !0;
    }
    return true;
};

export default handler;
