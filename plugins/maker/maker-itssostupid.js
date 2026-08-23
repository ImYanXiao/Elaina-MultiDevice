let handler = async (m, { conn, args }) => {
    try {
        await global.loading(m, conn)
        let text = args.slice(1).join(' ')
        let who = m.quoted ? m.quoted.sender: m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0]: m.fromMe ? conn.user.jid: m.sender
        await conn.sendFile(m.chat, API('https://some-random-api.com', '/canvas/its-so-stupid', {
            avatar: await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'), dog: text || 'im+stupid'
        }), 'error.png', `@${global.config.watermark}`, m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['sostupid']
handler.tags = ['maker']
handler.command = /^(sostupid)$/i
handler.limit = true
export default handler