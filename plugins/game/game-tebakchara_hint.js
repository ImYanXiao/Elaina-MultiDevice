let handler = async (m, { conn }) => {
    conn.tebakchara = conn.tebakchara ? conn.tebakchara : {}
    let id = m.chat
    if (!(id in conn.tebakchara)) return
    let json = conn.tebakchara[id][1]
    m.reply('Clue : ' + '```' + json.name.replace(/[AIUEOaiueo]/ig, '_') + '```' + '\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_')
}
handler.command = /^hcha$/i
handler.limit = true
export default handler