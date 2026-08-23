import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) {
            return m.reply(`Masukan Prompt! \n\nContoh: \n${usedPrefix + command} dog`)
        }
        
        await global.loading(m, conn)
        if (/bingimg-download/i.test(command)) {
            return await conn.sendFile(m.chat, text, null, null, m)
        }
        
        let base_url = global.config.APIs["rose"]
        let url = base_url + '/image/bing_create_image'
        let data = {
            prompt: text
        }
        let headers = {
            'accept': 'application/json',
            'Authorization': global.config.APIKeys[base_url],
            'Content-Type': 'application/json'
        }
        let { data: res } = await axios.post(url, data, { headers })
        
        let list = res.result.images.map((v, i) => {
            return [`.bingimg-download ${v}`, (i + 1).toString(), (i + 1).toString()]
        })
        await conn.textList(m.chat, `Terdapat *${res.result.images.length} Foto*`, res.result.images[0], list, m, { noList: true })
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ["bingimg"]
handler.tags = ["ai"]
handler.command = /^(bingimg(-download)?)$/i
handler.limit = true
export default handler