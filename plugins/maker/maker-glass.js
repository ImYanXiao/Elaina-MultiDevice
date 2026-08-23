let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan Format Dengan Benar!\n\nContoh:\n${usedPrefix + command} Raja Iblis`)
        await global.loading(m, conn)
        let res = API('lol', '/api/ephoto1/wetglass', { text: text }, 'apikey')
        await conn.sendFile(m.chat, res, 'glass.jpg', 'Ini Dia Kak', m, false)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['glass']
handler.tags = ['maker']
handler.command = /^(glass)$/i
handler.limit = true
export default handler