let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        let teks = args.join(' ').split('|')
        if (!teks[0] || !teks[1]) return m.reply(`Masukan Text Nya!\n\nContoh:\n${usedPrefix + command} Raja|Iblis`)
        await global.loading(m, conn)
        let res = API('lol', '/api/textprome2/space', { text1: teks[0], text2: teks[1] }, 'apikey')
        await conn.sendFile(m.chat, res, 'error.jpg', 'Ini Dia Kak', m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['space']
handler.tags = ['maker']
handler.command = /^(space)$/i
handler.limit = true
export default handler