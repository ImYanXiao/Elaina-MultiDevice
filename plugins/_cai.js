import axios from 'axios';

export async function before(m) {
    this.characterai = this.characterai ? this.characterai : {};

    if (db.data.users[m.sender].characterai && !m.isBaileys && m.text) {
        try {
            // Memeriksa dan mengatur sessionId
            let characterId = this.characterai[m.sender].characterId;
            let sessionId = this.characterai[m.sender].sessionId;

            let url = `https://komtol-api.hf.space/api?characterId=${characterId}&text=${m.text}`;
            if (sessionId) {
                url += `&sessionId=${sessionId}`;
            }

            let response = await axios.get(url);
            if (!response.data.result) throw new Error('Invalid response from API');

            let anu = response.data;
            let thumb = this.characterai[m.sender].charThumb;
            this.reply(m.chat, anu.result.text, m, {
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        title: '',
                        body: '',
                        mediaUrl: 'https://beta.character.ai',
                        description: '',
                        mediaType: 2,
                        thumbnail: await getBuffer(thumb),
                        sourceUrl: 'https://instagram.com/Xiao_Yan_21',
                    },
                },
            });

            // Jika tidak ada sessionId, simpan yang baru
            if (!this.characterai[m.sender].sessionId) {
                this.characterai[m.sender].sessionId = anu.result.sessionId;
            }

        } catch (error) {
            console.error("Error:", error);
            this.reply(m.chat, "Terjadi kesalahan saat menghubungi API. Coba lagi nanti.", m);
        }
    }
    return true;
}