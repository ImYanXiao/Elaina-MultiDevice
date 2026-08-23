let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        if (!args[0]) {
            return m.reply(`Masukkan username Instagram!\n\nContoh:\n${usedPrefix + command} @bluearchive.idn`);
        }

        await global.loading(m, conn);

                                           
        args = args[0].startsWith('@') ? args[0].replace('@', '') : args[0];

                           
        let res = await global.fetch(`https://api.vreden.my.id/api/igstalk?query=${args}`);
        if (!res.ok) throw await res.text();

        let json = await res.json();
        if (json.status !== 200 || !json.result?.status) throw json;

        let result = json.result.user;

                                                             
        let profilePicUrl = result.hd_profile_pic_url_info?.url || '';

                       
        let caption = `
❃ Username: ${args}
❃ Full Name: ${result.full_name || 'Tidak ada'}
❃ Posts: Tidak tersedia
❃ Followers: ${result.follower_count || 0}
❃ Following: ${result.following_count || 0}
❃ Bio: ${result.biography || 'Tidak ada'}
❃ URL: ${result.external_url || 'Tidak ada'}
        `.trim();

                                        
        if (!profilePicUrl) {
            caption += '\n❃ Foto Profil: Tidak tersedia';
            await conn.sendMessage(m.chat, { text: caption }, { quoted: m });
        } else {
            await conn.sendFile(m.chat, profilePicUrl, 'profile.jpg', caption, m);
        }
    } catch (err) {
        console.error(err);
        m.reply('Terjadi kesalahan, coba lagi nanti.');
    } finally {
        await global.loading(m, conn, true);
    }
};

                      
handler.help = ['stalkig'];
handler.tags = ['tools'];
handler.command = /^((ig|instagram)stalk|stalk(ig|instagram))$/i;
handler.limit = true;
handler.register = true;

export default handler;
