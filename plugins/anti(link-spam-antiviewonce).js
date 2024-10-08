import { downloadContentFromMessage } from '@adiwajshing/baileys';
import { format } from 'util';

export async function all(m) {
    if (!m.message) return;

    this.spam = this.spam || {};
    let chat = global.db.data.chats[m.chat];

    if (chat.antiSpam) {
        const sender = m.sender;
        
        if (sender in this.spam) {
            this.spam[sender].count++;

            if (m.messageTimestamp.toNumber() - this.spam[sender].lastspam > 5) {
                if (this.spam[sender].count > 5) {
                    global.db.data.users[sender].banned = true;
                    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : sender;
                    let caption = `Banned *@${who.split("@")[0]}* Jangan spam kak!`;
                    this.reply(m.chat, caption, m);
                }

                this.spam[sender].count = 0;
                this.spam[sender].lastspam = m.messageTimestamp.toNumber();
            }
        } else {
            this.spam[sender] = {
                jid: sender,
                count: 0,
                lastspam: 0
            };
        }
    }
}

handler.before = async function (m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true;
    let chat = global.db.data.chats[m.chat];
    let isGroupLink = linkRegex.exec(m.text);
    if (chat.antiLink && isGroupLink && !m.isBaileys && m.isGroup) {
        let thisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
        if (m.text.includes(thisGroup)) throw false;
        if (!isAdmin) {
            if (!isBotAdmin) {
                m.reply(` *「 ANTILINK 」* ${isAdmin ? "Admin mah bebas ygy :'v" : `\n\nLink grup terdeteksi dan ${global.namebot} bukan admin jadi tidak bisa ngekick!`}`);
            } else {
                m.reply(` *「 ANTILINK 」* \n\nLink Group Terdeteksi, bye Kamu Akan Di Kick!!`.trim());
                await this.delay(500);
                await this.groupParticipantsUpdate(m.chat, [m.sender], "remove");
                await this.sendMessage(m.chat, { delete: { remoteJid: m.chat, id: m.id }});
            }
        }
    }
    return true;
}


export async function before(m, { isAdmin, isBotAdmin }) {
    let chat = global.db.data.chats[m.chat];

    if (/^[.~#/\$,](read)?viewonce/.test(m.text)) return;
    if (!chat.viewonce || chat.isBanned) return;

    if (m.mtype == 'viewOnceMessageV2') {
        let msg = m.message.viewOnceMessageV2.message;
        let type = Object.keys(msg)[0];
        let media = await downloadContentFromMessage(msg[type], type === 'imageMessage' ? 'image' : type === 'videoMessage' ? 'video' : 'audio');
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
