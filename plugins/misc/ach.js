import axios from 'axios';

let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    let [Url, quality] = text.split(' ');

    if (!Url) {
        return conn.reply(m.chat, `Gunakan format: ${usedPrefix}${command} <url> [quality]`, m);
    }

    let Quality = Number(quality) || 128;
    const api = `https://api.vreden.my.id/api/ytmp3?url=${encodeURIComponent(Url)}`;

    try {
        const { data } = await axios.get(api);

        if (!data?.result?.status || !data.result.download?.url) {
            return m.reply("Gagal mengambil audio dari API.");
        }

        const result = data.result;
        const metadata = result.metadata;
        const download = result.download;

                                
        if (!download.availableQuality.includes(Quality)) {
            return m.reply(`❗ Kualitas ${Quality}kbps tidak tersedia.\nTersedia: ${download.availableQuality.join(', ')}`);
        }

                                                  
        const finalUrl = download.url.replace(/\/\d+\//, `/${Quality}/`);

        conn.sendMessage(m.chat, { react: { text: '⏱️', key: m.key } });

        await conn.sendMessage(
            `120363379471962526@newsletter`,
            {
                audio: { url: finalUrl },
                mimetype: "audio/mpeg",
                ptt: true,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    mentionedJid: [m.sender],
                    businessMessageForwardInfo: {
                        businessOwnerJid: "0@s.whatsapp.net"
                    },
                    forwardedNewsletterMessageInfo: {
                        newsletterName: '[🎶] ' + 'Hallooo para Archavelian semoga hari ini berjalan dengan lancar yah',
                        newsletterJid: `120363379471962526@newsletter`
                    },
                    externalAdReply: {
                        showAdAttribution: true,
                        title: '📘 Selamat Pagi',
                        mediaType: 1,
                        previewType: 1,
                        body: "Duration: " + metadata.timestamp,
                        thumbnailUrl: metadata.thumbnail,
                        renderLargerThumbnail: false,
                        mediaUrl: Url,
                        sourceUrl: 'https://archavecommunity.biz.id'
                    }
                }
            },
            { quoted: m }
        );

        conn.sendMessage(m.chat, { react: { text: '', key: m.key } });

    } catch (error) {
        console.error(error);
        await m.reply("Terjadi error:\n" + error.message);
    }
};

handler.command = /^(ach)$/i;
handler.owner = true;

export default handler;
