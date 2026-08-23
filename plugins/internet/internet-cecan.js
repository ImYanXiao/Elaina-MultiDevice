import axios from 'axios'
let handler = async (m, { conn, command }) => {
    try {
        await global.loading(m, conn)
        let url = await axios.get('https://raw.githubusercontent.com/veann-xyz/result-daniapi/main/cecan/cecan.json')
        let image = url.data.getRandom()
        conn.sendFile(m.chat, image, 'cecan.jpeg', null, m, false)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['cecan']
handler.tags = ['internet']
handler.command = /^(cecan)$/i
handler.limit = true
export default handler