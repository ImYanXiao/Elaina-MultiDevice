import { tebakkata } from '@bochilteam/scraper'

let timeout = 120000
let poin = 4999
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakkata = conn.tebakkata ? conn.tebakkata : {}
    let id = m.chat
    if (id in conn.tebakkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakkata[id][0])
        throw false
    }
    const json = await tebakkata()
    let caption = `
${json.soal}
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}teka untuk bantuan
Bonus: ${poin} XP
`.trim()
    conn.tebakkata[id] = [
        await conn.sendFile(m.chat, fla + 'Tebak Kata', '', caption + '\n Untuk Bantuan Ketik \n`${usedPrefix}teka`', m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakkata[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, author, ['tebakkata', `${usedPrefix}tebakkata`], conn.tebakkata[id][0])
            delete conn.tebakkata[id]
        }, timeout)
    ]
}
handler.help = ['tebakkata']
handler.tags = ['game']
handler.command = /^tebakkata/i

export default handler
