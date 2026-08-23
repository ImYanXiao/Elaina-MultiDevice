const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text }) => {
    let chat = global.db.data.chats[m.chat]
    let isGroupLink = linkRegex.exec(text)
    text = chat.antiLinkGc && isGroupLink ? 'KAMU TERDETEKSI MENGIRIM LINK' : text
    let [l, r] = text.split`|`
    if (!l) l = ''
    if (!r) r = ''
    conn.reply(m.chat, l + readMore + r, m)
}
handler.help = ['readmore']
handler.tags = ['tools']
handler.command = /^(spoiler|hidetext|readmore|selengkapnya)$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)