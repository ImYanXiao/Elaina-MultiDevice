let handler = async (m, { conn, usedPrefix: _p, args, text, usedPrefix}) => {
	if (!m.quoted) throw 'Balas Chatnya !'
	if (!text) throw `📍 Contoh Penggunaan :\n${usedPrefix}react 🗿`
const reactionMessage = {
                    react: {
                        text: ${args[0]},
                        key: { remoteJid: m.chat, fromMe: true, id: m.quoted.id }
                    }
                }
                conn.sendMessage(m.chat, reactionMessage)
 handler.help = ['react <emoji>']
handler.tags = ['tools']
handler.command = /^(react)$/i

export default handler