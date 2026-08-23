import axios from "axios"
let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) return m.reply(`Masukan text! \n\n${usedPrefix + command} How to center a div`)
        await global.loading(m, conn)
        let result = await blackbox(text)
        await m.reply(result.trim())
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ["blackbox"]
handler.tags = ["ai"]
handler.command = /^(blackbox(ai)?)$/i
handler.limit = true
export default handler

           
async function blackbox (text) {
    var options = {
        method: 'POST',
        url: 'https://www.blackbox.ai/api/chat',
        headers: {
            cookie: 'sessionId=073f7075-6b49-4330-8f72-5f295bdd8036',
            'Content-Type': 'application/json',
            'User-Agent': 'insomnia/8.6.1'
        },
        data: {
            messages: [{
                id: 'OKDTXlG',
                content: text,
                role: 'user'
            }],
            id: 'OKDTXlG',
            previewToken: null,
            userId: '4fcbeb66-45a6-4f01-9172-a8fc44786e57',
            codeModelMode: true,
            agentMode: {},
            trendingAgentMode: {},
            isMicMode: false,
            isChromeExt: false,
            githubToken: null
        }
    }
    try {
        const response = await axios.request(options)
        let data = response.data.toString()
        data = data.replace(/\$@\$v=.*?\$@\$|\$~~~\$.*?\$~~~\$/gs, '').trim()
        return data
    } catch (error) {
        console.error('Error fetching data:', error)
        return null
    }
}
