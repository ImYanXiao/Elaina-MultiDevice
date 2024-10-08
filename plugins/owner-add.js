import fetch from 'node-fetch';

let handler = async (m, { conn, text, participants, usedPrefix, command }) => {
    if (!text) throw `_Masukan nomor!_\nContoh:\n\n${usedPrefix + command} ${global.owner[0]}`;
    
    m.reply('_Sedang di proses..._');
    const _participants = participants.map(user => user.id);
    
    const users = await Promise.all(
        text.split(',')
            .map(v => v.replace(/[^0-9]/g, ''))
            .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
            .map(async v => {
                const userCheck = await conn.onWhatsApp(v + '@s.whatsapp.net');
                return userCheck[0]?.exists ? v + '@c.us' : null;
            })
    ).then(results => results.filter(Boolean));

    const response = await conn.groupParticipantsUpdate(m.chat, users, "add");

    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => null);
    const jpegThumbnail = pp ? await (await fetch(pp)).buffer() : Buffer.alloc(0);

    for (const participant of response) {
        const jid = participant.jid;
        const status = participant.status;

        if (status === '408') {
            conn.reply(m.chat, `Tidak dapat menambahkan @${jid.split('@')[0]}!\nMungkin @${jid.split('@')[0]} baru keluar dari grup ini atau dikick`, m);
        } else if (status === '403') {
            const inviteCode = participant.content.attrs.code;
            const inviteExp = participant.content.attrs.expiration;

            const txt = `Mengundang @${jid.split('@')[0]} menggunakan invite...`;
            await m.reply(txt, null, { mentions: await conn.parseMention(txt) });
            
            await conn.sendGroupV4Invite(
                m.chat,
                jid,
                inviteCode,
                inviteExp,
                await conn.getName(m.chat),
                'Undangan untuk bergabung ke grup WhatsApp saya',
                jpegThumbnail
            );
        }
    }
};

handler.help = ['add', '+'].map(v => 'o' + v + ' @user')
handler.tags = ['owner']
handler.command = /^(oadd|o\+)$/i

handler.owner = true
handler.group = true
handler.botAdmin = true


export default handler

