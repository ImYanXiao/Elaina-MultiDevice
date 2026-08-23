let handler = async (m, { conn }) => {
    try {
        await global.loading(m, conn)
        let who = m.quoted ? m.quoted.sender: m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0]: m.fromMe ? conn.user.jid: m.sender
        await conn.sendFile(m.chat, global.API('https://some-random-api.ml', '/canvas/horny', {
            avatar: await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
        }), 'hornycard.png', '*Nih Kartunya Kak*', m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['hornycard']
handler.tags = ['maker']
handler.command = /^(horny(card|license))$/i
handler.limit = true
export default handler