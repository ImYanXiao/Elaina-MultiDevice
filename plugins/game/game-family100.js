import fs from 'fs'
const winScore = 4999
let handler = async (m, { conn, usedPrefix }) => {
    conn.family = conn.family ? conn.family : {}
    let id = m.chat
    if (id in conn.family) return conn.reply(m.chat, 'Masih ada kuis yang belum terjawab di chat ini', conn.family[id].msg)
    let src = JSON.parse(fs.readFileSync('./json/family100.json', 'utf-8'))
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
*Soal:* ${json.soal}
Terdapat *${json.jawaban.length}* jawaban${json.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
`: ''}
+${winScore} XP tiap jawaban benar
    `.trim()
    conn.family[id] = {
        id,
        msg: await m.reply(caption), 
        ...json,
        terjawab: Array.from(json.jawaban, () => false),
        winScore,
    }
}
handler.help = ['family100']
handler.tags = ['game']
handler.command = /^family100$/i
handler.onlyprem = true
handler.game = true
export default handler