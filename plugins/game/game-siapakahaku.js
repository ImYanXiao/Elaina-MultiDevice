import fs from 'fs'
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, usedPrefix }) => {
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku: {}
    let id = m.chat
    if (id in conn.siapakahaku) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.siapakahaku[id][0])
    let src = JSON.parse(fs.readFileSync('./json/siapakahaku.json', 'utf-8'))
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
Siapakah aku? ${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}who untuk bantuan
Bonus: ${poin} XP
`.trim()
    conn.siapakahaku[id] = [
        await m.reply(caption),
        json, poin, 4,
        setTimeout(() => {
            if (conn.siapakahaku[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.siapakahaku[id][0])
            delete conn.siapakahaku[id]
        }, timeout)
    ]
}
handler.help = ['siapakahaku']
handler.tags = ['game']
handler.command = /^siapa(kah)?aku$/i

handler.onlyprem = true
handler.game = true

export default handler