import axios from 'axios';
import { promises as fs } from 'fs';
import { join } from 'path';

const regex = /https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+(\?[\w=&-]+)?|https:\/\/(?:www\.)?youtube\.com\/(?:shorts|watch)\/[a-zA-Z0-9_-]+(?:\?si=[a-zA-Z0-9_-]+)?/i;

const handler = async (m, { conn, args, command, usedPrefix }) => {
    try {
        if (!args[0]) {
            return m.reply(`Masukkan Link YouTube!\n\nContoh:\n${usedPrefix + command} https://www.youtube.com/watch?v=EMW2a35uveI`);
        }

        if (!args[0].match(regex)) {
            return m.reply("Itu bukan link YouTube!");
        }

        if (!conn.youtube) conn.youtube = {};
        if (conn.youtube[m.sender]) {
            return m.reply("Kamu masih mendownload audio!");
        }

        await global.loading(m, conn);
        conn.youtube[m.sender] = true;

        const apiUrl = 'https://api.vreden.my.id/api/v1/download/youtube/audio';
        const response = await axios.get(apiUrl, {
            params: {
                url: args[0],
                quality: 128
            }
        });

        const result = response.data?.result;
        if (!response.data?.status || !result?.status) {
            return m.reply(`Respon API gagal.\n\n❗ *Detail:* ${response.data?.message || 'Unknown error'}`);
        }

        const { metadata, download } = result;
        if (!download?.url) {
            return m.reply("Link download tidak ditemukan.");
        }

        const caption = `*🎵 YouTube Audio Downloader*

❏ Title: ${metadata.title}
❏ Duration: ${metadata.duration?.timestamp || metadata.timestamp}
❏ Views: ${metadata.views?.toLocaleString()}x
❏ Channel: ${metadata.author?.name}
❏ Quality: ${download.quality}
❏ Source: ${args[0]}`;

        if (metadata.thumbnail || metadata.image) {
            await conn.sendFile(
                m.chat,
                metadata.thumbnail || metadata.image,
                'thumbnail.jpg',
                caption,
                m
            );
        } else {
            await conn.sendMessage(m.chat, { text: caption }, { quoted: m });
        }

        await conn.sendMessage(
            m.chat,
            {
                audio: { url: download.url },
                mimetype: 'audio/mpeg',
                ptt: false
            },
            { quoted: m }
        );

    } catch (error) {
        console.error('[YTMP3 ERROR]', error);
        m.reply(`Terjadi kesalahan.\n\n❗ *Error:* ${error?.message || 'Unknown error'}`);
    } finally {
        if (conn.youtube) delete conn.youtube[m.sender];
        await global.loading(m, conn, true);
    }
};

handler.help = ['ytmp3'];
handler.tags = ['downloader'];
handler.command = /^(yt(mp3|audio)|youtube(mp3|audio))$/i;
handler.limit = true;

export default handler;