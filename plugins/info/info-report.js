let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
                                                                     
        if (!text) {
            return m.reply(`Tidak ada teks yang diberikan. Jika Anda menemukan pesan error, laporkan dengan perintah ini\n\ncontoh:\n${usedPrefix + command} selamat siang owner, sy menemukan error seperti berikut <copy/tag pesan errornya>`);
        }

                                 
        if (text.length < 10) throw `Pesan terlalu pendek 🗿, minimal 10 karakter!`;
        if (text.length > 1000) throw `Pesan terlalu panjang, maksimal 1000 karakter!`;

                       
        let formattedText = `*${command.toUpperCase()}!*\n\nDari : *@${m.sender.split`@`[0]}*\n\nPesan : ${text}\n`;

                                           
        await conn.sendMessage('6282249930312@s.whatsapp.net', { text: m.quoted ? formattedText + m.quoted.text : formattedText }, { quoted: m });

        m.reply(`_Pesan terkirim ke pemilik bot, jika ${command.toLowerCase()} hanya main-main tidak akan ditanggapi._`);
    } catch (error) {
                                                                           
        console.error('Gagal mengirim pesan:', error.message || error);
        m.reply('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.');
    }
}

handler.help = ['report', 'request'].map(v => v + ' <teks>')
handler.tags = ['info']
handler.command = /^(report|request)$/i

export default handler
