const gclinkRegex = /chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/gi
const walinkRegex = /wa\.me\/([0-9])/gi
const linkRegex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi

export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys || m.fromMe) return 
    let chat = global.db.data.chats[m.chat]
    let setting = global.db.data.settings[conn.user.jid]

    let isGroupLink = gclinkRegex.exec(m.text)
    let isLinkWa = walinkRegex.exec(m.text)
    let isLink = linkRegex.exec(m.text)

    // Fungsi untuk hapus pesan + info
    const deleteMessage = async (type) => {
        if (chat.teks) {
            if (setting.composing) await this.sendPresenceUpdate('composing', m.chat)
            if (setting.autoread) await this.readMessages([m.key])
            await m.reply(`_*乂 ${type} Terdeteksi!*_\n_Pesan kamu akan dihapus._ ${isBotAdmin ? '' : '\n\n_❬Bot Bukan Admin❭_'}`)
        }
        if (isBotAdmin) {
            await conn.sendMessage(m.chat, { delete: m.key })
        }
    }

    if (chat.antiLinkGc && m.isGroup) {
        if (isGroupLink && !isAdmin) {
            if (isBotAdmin) {
                const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat) || '123'}`
                if (m.text.includes(linkThisGroup)) return !0
            }
            await deleteMessage('Link Group')
        }
    }

    if (chat.antiLinkWa && m.isGroup) {
        if (isLinkWa && !isAdmin) {
            await deleteMessage('Link WhatsApp')
        }
    }

    if (chat.antiLinks && m.isGroup) {
        if (isLink && !isAdmin) {
            await deleteMessage('Link')
        }
    }
}