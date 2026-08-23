let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!m.quoted) return m.reply('Reply Sticker!')
    if (!m.quoted.fileSha256) return m.reply('SHA256 Hash Missing')
    let sticker = global.db.data.users[m.sender].sticker
    let hash = m.quoted.fileSha256.toString('hex')
    if (!(hash in sticker)) return m.reply('Hash not found in database')
    sticker[hash].locked = !/^un/i.test(command)
    m.reply('Done!')
} 
handler.help = ['unlockcmd', 'lockcmd']
handler.tags = ['database', 'premium']
handler.command = /^(un)?lockcmd$/i
handler.premium = true

export default handler
