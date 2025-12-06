var handler = async (m, { conn, usedPrefix: _p }) => {
    let info = `*ᴏʀᴀɴɢ ʏᴀɴɢ ᴍᴇɴɢᴜᴄᴀᴘᴋᴀɴ ꜱᴀʟᴀᴍ ꜱᴇᴘᴇʀᴛɪ ɪɴɪ ᴍᴀᴋᴀ ɪɑ ᴍᴇɴᴅᴀᴘᴛᴋᴀɴ 30 ᴘᴀʜᴀʟᴀ, ᴋᴇᴍᴜᴅɪᴀɴ, ᴏʀᴀɴɢ ʏᴀɴɢ ᴅɪʜᴀᴅᴀᴘᴀɴ ᴀᴛᴀᴜ ᴍᴇɴᴅᴇɴɢᴀʀɴʏᴀ ᴍᴇᴍʙᴀʟᴀꜱ ᴅᴇɴɢᴀɴ ᴋᴀʟɪᴍᴀᴛ ʏᴀɴɢ ꜱᴀᴍᴀ ʏᴀɪᴛᴜ ᴡᴀᴀʟᴀɪᴋᴜᴍᴜsꜱᴀʟᴀᴍ ᴡᴀʀᴀʜᴍᴀᴛᴜʟʟᴀʜɪ ᴡᴀʙᴀʀᴀᴋᴀᴛᴜʜ” ᴀᴛᴀᴜ ᴅɪᴛᴀᴍʙᴀʜ ᴅᴇɴɢᴀɴ ʏᴀɴɢ ʟᴀɪɴ (ᴡᴀʀɪᴅʜᴡᴀᴀɴᴀ). ᴀʀᴛɪɴʏᴀ ꜱᴇʟᴀɪɴ ᴅᴀʀɪᴘᴀᴅᴀ ᴅᴏ'ᴀ ꜱᴇʟᴀᴍᴀᴛ ᴊᴜɢᴀ ᴍᴇᴍɪɴᴛᴀ ᴘᴀᴅᴀ ᴀʟʟᴀʜ ꜱᴡᴛ*\nSumber: https://rumaysho.com/2677-lebih-sempurna-dalam-salam-lebih-baik.html#:~:text=Disebutkan%20dalam%20sunan%20An%20Nasai,%20ada%20seseorang%20mendatangi%20beliau%20lantas%20mengucapkan%20salam`

    if (m.text.match(/assalamu'alaikum/i)) {
        info = `*ᴏʀᴀɴɢ ʏᴀɴɢ ᴍᴇɴɢᴜᴄᴀᴘᴋᴀɴ ꜱᴀʟᴀᴍ ꜱᴇᴘᴇʀᴛɪ ɪɴɪ ᴍᴀᴋᴀ ɪɑ ᴍᴇɴᴅᴀᴘᴛᴋᴀɴ 30 ᴘᴀʜᴀʟᴀ, ᴋᴇᴍᴜᴅɪᴀɴ, ᴏʀᴀɴɢ ʏᴀɴɢ ᴅɪʜᴀᴅᴀᴘᴀɴ ᴀᴛᴀᴜ ᴍᴇɴᴅᴇɴɢᴀʀɴʏᴀ ᴍᴇᴍʙᴀʟᴀꜱ ᴅᴇɴɢᴀɴ ᴋᴀʟɪᴍᴀᴛ ʏᴀɴɢ ꜱᴀᴍᴀ ʏᴀɪᴛᴜ ᴡᴀᴀʟᴀɪᴋᴜᴍᴜsꜱᴀʟᴀᴍ ᴡᴀʀᴀʜᴍᴀᴛᴜʟʟᴀʜɪ ᴡᴀʙᴀʀᴀᴋᴀᴛᴜʜ” ᴀᴛᴀᴜ ᴅɪᴛᴀᴍʙᴀʜ ᴅᴇɴɢᴀɴ ʏᴀɴɢ ʟᴀɪɴ (ᴡᴀʀɪᴅʜᴡᴀᴀɴᴀ). ᴀʀᴛɪɴʏᴀ ꜱᴇʟᴀɪɴ ᴅᴀʀɪᴘᴀᴅᴀ ᴅᴏ'ᴀ ꜱᴇʟᴀᴍᴀᴛ ᴊᴜɢᴀ ᴍᴇᴍɪɴᴛᴀ ᴘᴀᴅᴀ ᴀʟʟᴀʜ ꜱᴡᴛ*\nSumber: https://rumaysho.com/2677-lebih-sempurna-dalam-salam-lebih-baik.html#:~:text=Disebutkan%20dalam%20sunan%20An%20Nasai,%20ada%20seseorang%20mendatangi%20beliau%20lantas%20mengucapkan%20salam`;
    }
    
    let waalaikumsalam = `📚 _وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ_\n_wa\'alaikumussalam wa rahmatullahi wa barakatuh_\n 🙏`;

    await conn.sendMessage(m.chat, {
        react: {
            text: '🙏',
            key: m.key,
        }
    });
    await conn.reply(m.chat, waalaikumsalam, m);
    await conn.reply(m.chat, info, m);
}

// handler.customPrefix = /^(assalam(ualaikum)?|(salamualaiku|(sa(lamu|m)liku|sala))m)$/i;

handler.customPrefix = /^(assalamualaikum|assalam|salam|asalamualaikum|assalamualaykum|salamu|salamualaikum|samlikum|assalamu'alaikum|assalamu'alaykum|asalamu'alaykum|likum|samlikom|samlekom|assalamualaikum\s+wr\.\s+wb\.|assalamu'alaikum\s+wr\.\s+wb\.|Assalamu'alaikum\s+warahmatullahi\s+wabarakatuh|Assalamualaikum\s+warahmatullahi\s+wabarakatuh|Assalamu'alaikum\s+wr\s+wb|Assalamu'alaikum\s+wr\.\s+wb|Assalamualaikum\s+wr\s+wb|Assalamualaikum\s+wr\.\s+wb|Assalamualaikum\s+wa\s+rahmatullahi\s+wa\s+barakatuh|Assalamualaikum\s+wa\s+rahmatullahi\s+wabarakatuh|Assalamualaikum\s+warahmatullahi\s+wa\s+barakatuh|Assalamu'alaikum\s+wa\s+rahmatullahi\s+wa\s+barakatuh|Assalamu'alaikum\s+warahmatullahi\s+wa\s+barakatuh|Assalamu'alaikum\s+warahmatullahi\s+wa\s+barakatuh)$/i;


handler.command = new RegExp;

export default handler;
