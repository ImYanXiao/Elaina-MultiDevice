import axios from 'axios'

let handler = async (m, { conn }) => {
    try {
        await global.loading(m, conn)
        let url = await axios.get('https://raw.githubusercontent.com/veann-xyz/result-daniapi/main/cecan/cogan.json')
        let image = url.data.getRandom()
        conn.sendFile(m.chat, image, 'cogan.jpeg', null, m, false)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['cogan']
handler.tags = ['internet']
handler.command = /^(cogan)$/i
handler.limit = true
export default handler