import axios from 'axios';

const API_URL_SEARCH = 'https://api.siputzx.my.id/api/anime/otakudesu/search';
const API_URL_DETAIL = 'https://api.siputzx.my.id/api/anime/otakudesu/detail';

const handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) {
            return m.reply(`Masukkan nama anime yang ingin dicari!\n\nContoh:\n${usedPrefix + command} Blue Archive`);
        }

                                                 
        const query = text.split(' ').join('+');
        const { data: result } = await axios.get(`${API_URL_SEARCH}?s=${query}`);
        const searchResults = result.data;

        if (!searchResults.length) {
            return m.reply('Anime tidak ditemukan.');
        }

                                                   
        const selectedAnime = searchResults[0];
        const { data: detail } = await axios.get(`${API_URL_DETAIL}?url=${selectedAnime.link}`);
        const { animeInfo, episodes } = detail.data;
        const { title, japaneseTitle, score, producer, status, totalEpisodes, duration, releaseDate, studio, genres, imageUrl } = animeInfo;

        const teks = `
*🎥 Title:* ${title} (${japaneseTitle})
*⭐ Score:* ${score}
*🏢 Producer:* ${producer}
*📺 Status:* ${status}
*🗓️ Total Episodes:* ${totalEpisodes}
*⏱️ Duration:* ${duration}
*📅 Release Date:* ${releaseDate}
*🏢 Studio:* ${studio}
*🎭 Genres:* ${genres}

*📄 Episodes List:*
${episodes.map((ep, i) => `${i + 1}. [${ep.title}](${ep.link}) - ${ep.date}`).join('\n')}
        `.trim();

                                                            
        await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: teks }, { quoted: m });
    } catch (error) {
        console.error(error);
        m.reply(`Terjadi kesalahan saat memproses permintaan Anda. Error: ${error.message}`);
    }
};

handler.help = ['otakudesu'];
handler.tags = ['anime'];
handler.command = /^(otakudesu)$/i;
handler.limit = true;

export default handler;
