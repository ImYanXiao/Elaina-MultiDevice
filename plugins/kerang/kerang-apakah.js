let handler = async (m, { command, text }) => {
    let caption = `
*Pertanyaan:* ${command} ${text}
*Jawaban:* ${['Ya', 'Mungkin iya', 'Mungkin', 'Mungkin tidak', 'Tidak', 'Tidak mungkin'].getRandom()}
`.trim()
    m.reply(caption, false, { mentions: await conn.parseMention(caption) })
}
handler.help = ['apakah']
handler.tags = ['kerang']
handler.command = /^apakah$/i

export default handler