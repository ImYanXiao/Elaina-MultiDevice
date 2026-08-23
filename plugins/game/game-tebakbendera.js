import fs from 'fs'
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera: {}
    let id = m.chat
    if (id in conn.tebakbendera) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakbendera[id][0])
    let src = JSON.parse(fs.readFileSync('./json/tebakbendera.json', 'utf-8'))
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
Silahkan Tebak Bendera Di Atas...

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}teben untuk bantuan
Bonus: ${poin} XP
`.trim()
    conn.tebakbendera[id] = [
        await conn.sendFile(m.chat, json.img, 'tebakbendera.jpg', caption, m),
        json, poin, 4,
        setTimeout(() => {
            if (conn.tebakbendera[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.name}*`, conn.tebakbendera[id][0])
            delete conn.tebakbendera[id]
        }, timeout)
    ]
}
handler.help = ['tebakbendera']
handler.tags = ['game']
handler.command = /^tebakbendera$/i

handler.onlyprem = true
handler.game = true

export default handler