let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        let [teks1, teks2] = text.split('|')
        if (!teks1 || !teks2) return m.reply(`Masukan Format Dengan Benar!\n\nContoh:\n${usedPrefix + command} Singa|Harimau`)
        await global.loading(m, conn)
        let res = API('lol', '/api/textprome2/lionlogo', { text1: teks1, text2: teks2 }, 'apikey')
        await conn.sendFile(m.chat, res, 'lion.jpg', 'Ini Dia Kak', m, false)
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['logolion']
handler.tags = ['nulis']
handler.command = /^(logolion)$/i

handler.limit = true

export default handler