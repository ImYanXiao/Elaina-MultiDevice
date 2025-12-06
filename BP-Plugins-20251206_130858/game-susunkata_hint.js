let handler = async (m, { conn }) => {
    conn.susunkata = conn.susunkata ? conn.susunkata : {}
    let id = m.chat
    if (!(id in conn.susunkata)) throw false
    let json = conn.susunkata[id][1]
    conn.reply(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', m)
}
handler.command = /^suka$/i

handler.limit = true

export default handler
