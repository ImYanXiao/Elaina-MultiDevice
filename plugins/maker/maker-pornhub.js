let handler = async (m, { conn, args, usedPrefix }) => {
    try {
        let response = args.join(' ').split('|')
        if (!args[0]) return m.reply(`Masukan text \n\nContoh: \n ${usedPrefix}pornhub Teks1|Teks2`)
        await global.loading(m, conn)
        let res = API('lol', '/api/textprome2/pornhub', { text1: response[0], text2: response[1] }, 'apikey')
        await conn.sendFile(m.chat, res, 'error.jpg', 'Ini Dia...', m, false)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['pornhub']
handler.tags = ['maker']
handler.command = /^(pornhub)$/i

handler.limit = true

export default handler