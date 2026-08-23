import fetch from 'node-fetch'
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan url github \n\nContoh : \n${usedPrefix + command} https://github.com/DavidModzz/BaileysWaBot`)
        await global.loading(m, conn)
        let link = text.split("/")
        let url = `https://api.github.com/repos/${link[3]}/${link[4]}/zipball`
        let name = `${link[4]}.zip`
        await conn.sendFile(m.chat, url, name, null, m)
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['gitclone']
handler.tags = ['downloader']
handler.command = /gitclone/i
handler.limit = true
export default handler