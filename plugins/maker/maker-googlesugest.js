let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        let teks = args.join(' ').split('|')
        if (!teks[0] || !teks[1] || !teks[2]) return m.reply(`Masukan Text Nya!\n\nContoh:\n${usedPrefix + command} Teks 1|Teks 2|Teks 3`)
        await global.loading(m, conn)
        let res = API('lol', '/api/gsuggest', { text1: teks[0], text2: teks[1], text3: teks[2] }, 'apikey')
        await conn.sendFile(m.chat, res, 'error.jpg', 'Ini Dia Kak', m, false)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['googlesugest']
handler.tags = ['maker']
handler.command = /^(googlesugest)$/i
handler.limit = true
export default handler