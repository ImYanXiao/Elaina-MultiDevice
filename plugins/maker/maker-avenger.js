let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        let teks = args.join(' ').split('|')
        if (!teks[0] || !teks[1]) return m.reply(`Masukan Text Nya!\n\nContoh:\n${usedPrefix + command} The|Avengers`)
        await global.loading(m, conn)
        let res = API('lol', '/api/textprome2/avenger', { text1: teks[0], text2: teks[1] }, 'apikey')
        await conn.sendFile(m.chat, res, 'error.jpg', 'Ini Dia Kak', m, false)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['avengers']
handler.tags = ['maker']
handler.command = /^(avenger(s)?)$/i
handler.limit = true
export default handler