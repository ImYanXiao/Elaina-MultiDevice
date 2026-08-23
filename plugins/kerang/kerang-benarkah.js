let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Masukan Text!')
    let caption = `
*Pertanyaan:* ${text}
*Jawaban:* ${pickRandom(['Iya','Sudah pasti','Sudah pasti bisa','Tidak','Tentu tidak','Sudah pasti tidak'])}
`.trim()
    m.reply(caption, false, { mentions: await conn.parseMention(caption) })
}
handler.help = ['benarkah']
handler.tags = ['kerang']
handler.command = /^benarkah/i
handler.owner = false

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

