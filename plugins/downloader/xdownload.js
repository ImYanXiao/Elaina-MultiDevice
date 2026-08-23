import axios from "axios";

let twitterRegex = /https:\/\/(x|twitter)\.com\/[^\/]+\/status\/\d+/i;

let handler = async (m, { conn, text }) => {
    try {
        if (!text) throw 'Mana Kak Linknya?';

                                
        let isLink = text.match(twitterRegex);
        if (!isLink) return m.reply("Itu bukan link Twitter!");

        await global.loading(m, conn);

                      
        let apiUrl = `https://api.siputzx.my.id/api/d/twitter?url=${encodeURIComponent(text)}`;
        let res = await axios.get(apiUrl);
        let json = res.data;

        if (!json.status || !json.data?.downloadLink) throw 'Gagal mendapatkan video.';

        let { downloadLink, videoTitle } = json.data;

        m.reply(`Tunggu sebentar, sedang mengirim video...\nJudul: ${videoTitle}`);
        let download = await conn.getFile(downloadLink);
        await conn.sendFile(m.chat, download.data, "", videoTitle, m);

    } catch (error) {
        m.reply('Ada yang error, hubungi owner untuk memperbaikinya');
        console.error(error);
    } finally {
        await global.loading(m, conn, true);
    }
}

handler.help = ["twitter"];
handler.tags = ["downloader"];
handler.command = /^(twitter|tw)$/i;
handler.limit = true;
handler.register = true;

export default handler;
