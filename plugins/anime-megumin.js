import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix }) => {
    let res = await fetch('https://api.waifu.pics/sfw/megumin')
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.url) throw 'Error!'
    conn.sendButton(m.chat, 'Istrinya Kartun', author, json.url, [['megumin', `${usedPrefix}megumin`]], m)
}
handler.help = ['megumin']
handler.tags = ['anime']
handler.command = /^(megumin)$/i

export default handler
