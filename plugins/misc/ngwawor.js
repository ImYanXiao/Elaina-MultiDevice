                       
const isIstri = /(istriku|istri)/i

export const before = async (m, { conn, isAdmin, isBotAdmin }) => {
    if (m.isBaileys && m.fromMe) return true
    if (!m.isGroup) return false

    const chat = global.db.data.chats[m.chat]
    const bot = global.db.data.settings[conn.user.jid] || {}

    const isAntiIstri = isIstri.exec(m.text)
    const hapus = m.key.participant
    const bang = m.key.id

    if (chat.antiIstri && isAntiIstri) {
        m.reply(`*Terdeteksi Orang Ini Mempunyai penyakit klaim istri*\n\nPenyakit Klaim istri Kumat 😂\n\nISTRIKU ISTRIKU ISTRI GWE ITU`)
        
        if (isBotAdmin && bot.restrict) {
            return conn.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: bang,
                    participant: hapus
                }
            })
        } else if (!bot.restrict) {
            return m.reply('Kalo itu istri anda mana surat nikahnya?')
        }
    }

    return true
}
