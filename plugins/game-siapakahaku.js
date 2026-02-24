let timeout = 120000
let poin = 1000
let handler = async (m, { conn, usedPrefix }) => {
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
    let id = m.chat
    if (id in conn.siapakahaku) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.siapakahaku[id][0])
        throw false
    }
    const json = await siapakahaku()
    let caption = `
Siapakah aku? ${json.soal}
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}who untuk bantuan
Bonus: ${poin} XP
`.trim()
    conn.siapakahaku[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.siapakahaku[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.siapakahaku[id][0])
            delete conn.siapakahaku[id]
        }, timeout)
    ]
}
handler.help = ['siapakahaku']
handler.tags = ['game']
handler.command = /^siapa(kah)?aku/i

export default handler

import got from 'got';

async function siapakahaku() {
    let siapakahakujson;

  if (!siapakahakujson) {

    siapakahakujson = await got(

      'https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json'

    ).json();

  }

  const randomEntry = siapakahakujson[Math.floor(Math.random() * siapakahakujson.length)];

  // Simple validation to check if the structure of the data is correct

  if (typeof randomEntry.soal !== 'string' || typeof randomEntry.jawaban !== 'string') {

    throw new Error('Invalid data format');

  }

  return randomEntry;

}