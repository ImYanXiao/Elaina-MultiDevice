let handler = async (m, { conn }) => {
    conn.tebakmakanan = conn.tebakmakanan ? conn.tebakmakanan : {}
    let id = m.chat
    if (!(id in conn.tebakmakanan)) return
    let json = conn.tebakmakanan[id][1]
    m.reply('Clue : ' + '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```' + '\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_')
}
handler.command = /^(teman)$/i
handler.limit = true
export default handler