let handler = async (m, { conn, command, text }) => {
    const angka = Math.floor(Math.random() * 12)
    const caption = `
*Pertanyaan:* ${command} ${text}
*Jawaban:* ${angka} ${waktu.getRandom()} lagi ...
`.trim()
    m.reply(caption, false, { mentions: await conn.parseMention(caption) })
}
handler.help = ['kapankah']
handler.tags = ['kerang']
handler.command = /^kapan(kah)?$/i

export default handler

const waktu = [
    'detik',
    'menit',
    'jam',
    'hari',
    'minggu',
    'bulan',
    'tahun',
    'dekade',
    'abad'
]