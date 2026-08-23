import { hoax } from '../../lib/scrape.js'
let handler = async (m, { conn }) => {
    let data = await hoax()
    let src = data.getRandom()
    let cap = `
*Judul:* ${src.title}
*Date:* ${src.date}

*Desc:* _${src.desc}_

*Link:* ${src.link}
`.trim()
    await conn.sendFile(m.chat, src.thumbnail, null, cap, m)
}
handler.help = ['turnbackhoax']
handler.tags = ['internet']
handler.command = /^turnbackhoax|tbh$/i

export default handler