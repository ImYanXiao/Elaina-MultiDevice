let handler = async (m, { conn, command, text }) => {
    const caption = `
*Pertanyaan:* ${command} ${text}
*Jawaban:* ${pickRandom(['di neraka', 'di surga', 'di mars', 'di tengah laut', 'di dada :v', 'di hatimu >///<'])}
`.trim()
    conn.reply(m.chat, caption, m, { mentions: await conn.parseMention(caption) })
}
handler.help = ['dimanakah']
handler.tags = ['kerang']
handler.command = /^dimanakah$/i

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}