let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        let [teks1, teks2] = text.split('|')
        if (!teks1 || !teks2) return m.reply(`Masukan Format Dengan Benar!\n\nContoh:\n${usedPrefix + command} Logo|Anjing`)
        await global.loading(m, conn)
        let res = API('lol', '/api/textprome2/wolflogo', { text1: teks1, text2: teks2 }, 'apikey')
        await conn.sendFile(m.chat, res, 'error.jpg', 'Ini dia kak', m, false)
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['logowolf']
handler.tags = ['nulis']
handler.command = /^(logowolf)$/i
handler.limit = true
export default handler