import fs from 'fs'
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebaklirik = conn.tebaklirik ? conn.tebaklirik : {}
    let id = m.chat
    if (id in conn.tebaklirik) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebaklirik[id][0])
    let src = JSON.parse(fs.readFileSync('./json/tebaklirik.json', 'utf-8'))
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}terik untuk bantuan
Bonus: ${poin} XP
`.trim()
    conn.tebaklirik[id] = [
        await m.reply(caption),
        json, poin, 4,
        setTimeout(() => {
            if (conn.tebaklirik[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebaklirik[id][0])
            delete conn.tebaklirik[id]
        }, timeout)
    ]
}
handler.help = ['tebaklirik']
handler.tags = ['game']
handler.command = /^tebaklirik$/i

handler.onlyprem = true
handler.game = true

export default handler