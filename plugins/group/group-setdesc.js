let handler = async (m, { text }) => {
    if (!text) return m.reply('Isinya ?')
    await conn.groupUpdateDescription(chatId, text)
    return m.reply("Done.")
}
handler.help = ['setdesc']
handler.tags = ['group']
handler.command = /^(setdesc|sdesc)$/i

handler.group = true
handler.admin = true

export default handler