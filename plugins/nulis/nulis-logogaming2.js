let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan Format Dengan Benar!\n\nContoh:\n${usedPrefix + command} Saya Gaming`)
        await global.loading(m, conn)
        let res = API('lol', '/api/ephoto1/fpslogo', { text: text }, 'apikey')
        await conn.sendFile(m.chat, res, 'logogaming2.jpg', `Sudah Jadi`, m, false)
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['logogaming2']
handler.tags = ['nulis']
handler.command = /^(logogaming2)$/i
export default handler