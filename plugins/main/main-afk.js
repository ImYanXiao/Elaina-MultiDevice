const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

let handler = async (m, { text: txt }) => {
    let user = global.db.data.users[m.sender]
    let chat = global.db.data.chats[m.chat]
    user.afk = + new Date
    let isGroupLink = linkRegex.exec(txt)
    let text = chat.antiLinkGc && isGroupLink ? 'KAMU TERDETEKSI MENGIRIM LINK' : txt
    user.afkReason = text
    m.reply(`${user.registered ? user.name : conn.getName(m.sender)} is now AFK

Reason ➠ ${text ? '' + text : 'Tanpa Alasan'}`)
}
handler.help = ['afk']
handler.tags = ['main']
handler.command = /^afk$/i

export default handler