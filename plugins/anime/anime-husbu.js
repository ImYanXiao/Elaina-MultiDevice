let handler = async (m, { conn, command }) => {
    try {
        await global.loading(m, conn)
        let url = API('lol', '/api/random/husbu', null, 'apikey')
        conn.sendFile(m.chat, url, 'husbu.jpeg', 'Ini Dia Kak', m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.command = /^(husbu)$/i
handler.tags = ['anime']
handler.help = ['husbu']
handler.premium = false
handler.limit = true

export default handler