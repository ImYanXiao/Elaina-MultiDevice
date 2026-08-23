let handler = async (m, { conn, usedPrefix, text, command }) => {
    let hash = text
    if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
    if (!hash) return m.reply(`Reply sticker yang memiliki hash!`)
    let sticker = global.db.data.users[m.sender].sticker
    if (sticker[hash] && sticker[hash].locked) return m.reply('Kamu tidak memiliki izin untuk menghapus perintah stiker ini')
    delete sticker[hash]
    m.reply(`Berhasil!`)
}
handler.help = ['delcmd']
handler.tags = ['database', 'premium']
handler.command = /^delcmd$/i
handler.premium = true

export default handler
