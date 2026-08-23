let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan Text Nya!\n\nContoh:\n${usedPrefix + command} Alok`)
        await global.loading(m, conn)
        let res = API('lol', '/api/ephoto1/freefire', { text: text }, 'apikey')
        await conn.sendFile(m.chat, res, 'error.jpg', 'Ini Dia Kak', m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['freefire']
handler.tags = ['maker']
handler.command = /^(freefire)$/i
handler.limit = true
export default handler