let handler = async (m, { conn, command, text }) => {
    if (!text) return m.reply('Masukan Text!')
    let caption = `
*🌎Pertanyaan:* ${command} ${text}
*💬Jawaban:* ${pickRandom(['Iya','Bisa','Tentu saja bisa','Tentu bisa','Sudah pasti','Sudah pasti bisa','Tidak','Tidak bisa','Tentu tidak','tentu tidak bisa','Sudah pasti tidak'])}
`.trim()
    m.reply(caption, false, { mentions: await conn.parseMention(caption) })
}
handler.help = ['bisakah']
handler.tags = ['kerang']
handler.command = /^bisakah/i
export default handler 

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

