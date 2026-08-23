let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan Format Dengan Benar!\n\nContoh:\n${usedPrefix + command} Donal Trump`)
        await global.loading(m, conn)
        let res = API('lol', '/api/tweettrump', { text: text }, 'apikey')
        await conn.sendFile(m.chat, res, 'error.jpg', 'Ini Dia Kak', m, false)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['trumptweet']
handler.tags = ['maker']
handler.command = /^(donaldtrumptweet|trumptweet)$/i
handler.limit = true
export default handler