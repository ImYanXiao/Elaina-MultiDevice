import { downloadContentFromMessage } from '@adiwajshing/baileys';

export async function before(m, { isAdmin, isBotAdmin }) {
    let chat = global.db.data.chats[m.chat];

    if (/^[.~#/\$,](read)?viewonce/.test(m.text)) return;
    if (!chat.viewonce || chat.isBanned) return;

    if (m.mtype == 'viewOnceMessageV2') {
        let msg = m.message.viewOnceMessageV2.message;
        let type = Object.keys(msg)[0];
        let media;
        if (type === 'imageMessage') {
            media = await downloadContentFromMessage(msg[type], 'image');
        } else if (type === 'videoMessage') {
            media = await downloadContentFromMessage(msg[type], 'video');
        } else if (type === 'audioMessage') {
            media = await downloadContentFromMessage(msg[type], 'audio');
        }

        let buffer = Buffer.from([]);
        for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        if (/video/.test(type)) {
            return this.sendFile(m.chat, buffer, 'media.mp4', msg[type].caption || '', m);
        } else if (/image/.test(type)) {
            return this.sendFile(m.chat, buffer, 'media.jpg', msg[type].caption || '', m);
        } else if (/audio/.test(type)) {
            return this.sendFile(m.chat, buffer, 'media.mp3', msg[type].caption || '', m);
        }
    }
}