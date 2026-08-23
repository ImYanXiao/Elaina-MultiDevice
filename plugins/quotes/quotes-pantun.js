import axios from 'axios'
let handler = async (m) => {
    let url = await axios.get('https://raw.githubusercontent.com/IdkJhus/JhuszBotV1/main/node_modules/ra-api/lib/database/pantun.json')
    let data = url.data.getRandom()
    m.reply(data.trim())
}
handler.help = ['pantun']
handler.tags = ['quotes']
handler.command = /^(pantun)$/i

export default handler