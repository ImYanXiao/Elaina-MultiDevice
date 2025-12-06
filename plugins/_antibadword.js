let badwordRegex = /anj(k|g)|ajn?(g|k)|a?njin(g|k)|bajingan|b(a?n)?gsa?t|ko?nto?l|me?me?(k|q)|pe?pe?(k|q)|meki|titi(t|d)|pe?ler|tetek|toket|ngewe|go?blo?k|to?lo?l|idiot|(k|ng)e?nto?(t|d)|jembut|bego|dajj?al|janc(u|o)k|pantek|puki ?(mak)?|kimak|kampang|lonte|col(i|mek?)|pelacur|henceu?t|nigga|fuck|dick|bitch|tits|bastard|asshole|anjeng|anjink|konthol|khontol|memek|mmhek|mmek|memhek|jembut|jembhut|jembhoad|jembhoat/i

export async function before(m, { isBotAdmin, isAdmin }) {
    if (m.isBaileys || m.fromMe) return 
    let chat = global.db.data.chats[m.chat]
    let setting = global.db.data.settings[conn.user.jid]

    let isBadword = badwordRegex.exec(m.text)
    if (chat.antiBadword && isBadword && m.isGroup) {
        if (!isAdmin) {
            await conn.sendMessage(m.chat, { delete: m.key })

            if (setting.composing)
                await this.sendPresenceUpdate('composing', m.chat)
            if (setting.autoread)
                await this.readMessages([m.key])

            await m.reply(`*📮 Kata Kata Kasar Terdeteksi dan Telah Dihapus*

“Tolong jaga etika dalam grup, gunakan kata-kata yang baik.” 

“Barang siapa yang beriman kepada Allah dan Hari Akhir maka hendaklah dia berkata baik atau diam” (HR. Bukhari dan Muslim).`)
        }
    }
    return !0
}