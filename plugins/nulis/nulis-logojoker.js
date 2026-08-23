let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan Format Dengan Benar!\n\nContoh:\n${usedPrefix + command} Joker`)
        await global.loading(m, conn)
        let res = API('lol', '/api/textprome/jokerlogo', { text: text }, 'apikey')
        await conn.sendFile(m.chat, res, 'joker.jpg', 'Sudah Jadi', m, false)
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['logojoker']
handler.tags = ['nulis']
handler.command = /^(logojoker)$/i

handler.limit = true

export default handler