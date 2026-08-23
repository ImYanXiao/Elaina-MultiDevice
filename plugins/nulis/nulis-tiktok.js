let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        let [teks1, teks2] = text.split('|')
        if (!teks1 || !teks2) return m.reply(`Masukan Format Dengan Benar!\n\nContoh:\n${usedPrefix + command} Tiktok|Make`)
        await global.loading(m, conn)
        let res = API('lol', '/api/photooxy2/tiktok', { text1: teks1, text2: teks2 }, 'apikey')
        await conn.sendFile(m.chat, res, 'error.jpg', 'Ini Dia Kak', m, false)
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['logotiktok']
handler.tags = ['nulis']
handler.command = /^(logotiktok)$/i
handler.limit = true
export default handler