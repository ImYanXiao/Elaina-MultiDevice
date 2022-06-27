let handler = async (m, { conn }) => {
    conn.caklontong = conn.caklontong ? conn.caklontong : {}
    let id = m.chat
    if (!(id in conn.caklontong)) throw false
    let json = conn.caklontong[id][1]
    let ans = json.jawaban
    let clue = ans.replace(/[AIUEO]/gi, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^calo$/i

handler.limit = true

export default handler