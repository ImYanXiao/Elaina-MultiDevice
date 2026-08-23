let handler = async (m, { conn, usedPrefix: _p, args, text, usedPrefix }) => {
    if (!m.quoted) return m.reply('Balas Chatnya !')
    if (text.length > 2) return m.reply('Cuma Untuk 1 Emoji!')
    if (!text) return m.reply(`📍 Contoh Penggunaan :\n${usedPrefix}react 🗿`)
    conn.relayMessage(m.chat, { reactionMessage: { key: { id: m.quoted.id, remoteJid: m.chat, fromMe: true }, text: `${text}` }}, {messageId: m.id })
}
handler.help = ['react']
handler.tags = ['tools']
handler.command = /^(react)$/i

export default handler