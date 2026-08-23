let handler = async (m, { conn, text, usedPrefix }) => {
    try {
        if (!text) return m.reply(`Masukan text yang ingin ditulis \n\nContoh: \n${usedPrefix}nulis3 Hello World`)
        await global.loading(m, conn)
        let kertas = API('lol', '/api/nulis', { text: text }, 'apikey')
        await conn.sendFile(m.chat, kertas, 'error.jpg', 'Lain Kali Nulis Sendiri...', m)
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['nulis3']
handler.tags = ['nulis']
handler.command = /^nulis3$/i
export default handler