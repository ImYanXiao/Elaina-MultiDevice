import fs from 'fs'
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, usedPrefix }) => {
    conn.caklontong = conn.caklontong ? conn.caklontong : {}
    let id = m.chat
    if (id in conn.caklontong) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.caklontong[id][0])
    let src = JSON.parse(fs.readFileSync('./json/caklontong.json', 'utf-8'))
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}calo untuk bantuan
Bonus: ${poin} XP
`.trim()
    conn.caklontong[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin, 4,
        setTimeout(async () => {
            if (conn.caklontong[id]) await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*\n${json.deskripsi}`, conn.caklontong[id][0])
            delete conn.caklontong[id]
        }, timeout)
    ]
}
handler.help = ['caklontong']
handler.tags = ['game']
handler.command = /^caklontong/i
handler.onlyprem = true
handler.game = true
export default handler