let handler = async (m, { conn, text }) => {
    let [nomor, pesan, jumlah] = text.split('|')
    if (!nomor) throw '- Format: *#spamwa nomor|teks|jumlah*\n- Contoh: *.spamwa 5219999999999|Apa coba|50*'
    if (!pesan) throw '- Format: *#spamwa nomor|teks|jumlah*\n- Contoh: *.spamwa 5219999999999|Apa coba|50*'
    if (jumlah && isNaN(jumlah)) throw '- Format: *.spamwa nomor|teks|jumlah*\n- Contoh: *.spamwa 5219999999999|Apa coba|50*'

    let fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net'
    let fixedJumlah = jumlah ? jumlah * 1 : 10
    if (fixedJumlah > 50) throw '*Maks 50 Pesan*'
    
    await m.reply(`*Spam Success To That Number*\nEstimated Sent All *${fixedJumlah}*`)
    
    for (let i = 0; i < fixedJumlah; i++) {
        let teks = `${pesan.trim()}\n\n[${i + 1}/${fixedJumlah}]`; // Tambahkan informasi iterasi dalam pesan
        await conn.relayMessage(fixedNumber, {
            text: teks,
            extendedTextMessage: {
                text: teks,
            },
        }, {})
    }
}

handler.help = ['spamwa <number>|<mesage>|<no of messages>']
handler.tags = ['tools']
handler.command = /^spam(wa)?$/i

handler.group = false
handler.premium = false
handler.private = true
handler.limit = 10

export default handler
