import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix }) => {
    try {
        await global.loading(m, conn)
        let res = await fetch('https://api.waifu.pics/sfw/waifu')
        if (!res.ok) throw await res.text()
        let json = await res.json()
        conn.sendFile(m.chat, json.url, 'waifu.jpeg', 'Waifunya Kak...', m, false)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['waifu']
handler.tags = ['anime']
handler.command = /^(waifu)$/i
handler.limit = true
export default handler