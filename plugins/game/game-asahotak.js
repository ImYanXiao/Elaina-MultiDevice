import fs from 'fs'
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.asahotak = conn.asahotak ? conn.asahotak : {}
    let id = m.chat
    if (id in conn.asahotak) return conn.reply(m.chat, 'Masih ada pertanyaan belum terjawab di chat ini', conn.asahotak[id][0])
    let src = JSON.parse(fs.readFileSync('./json/asahotak.json', 'utf-8'))
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hotak untuk hotak
Bonus: ${poin} XP
`.trim()
    conn.asahotak[id] = [
        await m.reply(caption),
        json, poin, 4,
        setTimeout(() => {
            if (conn.asahotak[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.asahotak[id][0])
            delete conn.asahotak[id]
        }, timeout)
    ]
}
handler.help = ['asahotak']
handler.tags = ['game']
handler.command = /^asahotak$/i

handler.onlyprem = true
handler.game = true

export default handler