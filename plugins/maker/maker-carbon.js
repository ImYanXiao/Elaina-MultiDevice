import axios from 'axios'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        text = m.quoted ? m.quoted.text: text
        if (!text) return m.reply(`Masukan Text Yang Ingin Dibuat\n\nContoh:\n${usedPrefix + command} print(hello world)`)
        await global.loading(m, conn)
        let { data } = await axios({
            url: 'https://carbonara.solopov.dev/api/cook',
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                code: text
            },
            responseType: 'arraybuffer'
        })
        await conn.sendFile(m.chat, data, '', text, m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['carbon']
handler.tags = ['maker']
handler.command = /^(carbon)$/i
handler.limit = true
export default handler