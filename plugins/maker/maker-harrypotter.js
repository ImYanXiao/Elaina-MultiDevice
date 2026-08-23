let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan Text Nya!\n\nContoh:\n${usedPrefix + command} Elaina`)
        await global.loading(m, conn)
        let res = API('lol', '/api/photooxy1/harrypotter', { text: text }, 'apikey')
        await conn.sendFile(m.chat, res, 'error.jpg', 'Ini Dia Kak', m, false)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['harrypotter']
handler.tags = ['maker']
handler.command = /^(harrypotter)$/i
handler.limit = true
export default handler