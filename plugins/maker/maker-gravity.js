let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        let teks = args.join(' ').split('|')
        if (!teks[0] || !teks[1]) return m.reply(`Masukan Text Nya!\n\nContoh\n${usedPrefix + command} Maker|Gravity`)
        await global.loading(m, conn)
        let res = API('lol', '/api/textprome2/coolgravity', { text1: teks[0], text2: teks[1] }, 'apikey')
        await conn.sendFile(m.chat, res, 'error.jpg', 'Ini Dia Kak', m, false)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['gravity']
handler.tags = ['maker']
handler.command = /^(gravity)$/i

handler.limit = true

export default handler