let handler = async (m, { text, command, usedPrefix }) => {
    if (!text) return m.reply(`Contoh Penggunaan :\n${usedPrefix + command} Apakah Aku Boleh Main Ff`)
    const caption = `
*Pertanyaan:* ${text}
*Jawaban:* ${response.getRandom()}`.trim()
    m.reply(caption, false, { mentions: await conn.parseMention(caption) })
}
handler.help = ['kerangajaib']
handler.tags = ['kerang']
handler.command = /^(kulit)?kerang(ajaib)?$/i
export default handler

const response = [
    'Mungkin suatu hari',
    'Tidak juga',
    'Tidak keduanya',
    'Kurasa tidak',
    'Ya',
    'Boleh',
    'Mungkin',
    'Ya, Mungkin',
    'Coba tanya lagi',
    'Tidak ada'
]
