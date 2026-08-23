let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan Format Dengan Benar!\n\nContoh:\n${usedPrefix + command} Ruok`)
        await global.loading(m, conn)
        let res = API('lol', '/api/ephoto1/logogaming', { text: text }, 'apikey')
        await conn.sendFile(m.chat, res, 'gaming.jpg', 'Ini Dia Kak', m)
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['logogaming']
handler.tags = ['nulis']
handler.command = /^(logogaming)$/i
export default handler