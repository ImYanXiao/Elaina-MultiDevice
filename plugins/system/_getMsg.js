export async function before(m) {
    let chat = global.db.data.chats[m.chat] || {}
    global.db.data.chats[m.chat] = chat

    let user = global.db.data.users[m.sender] || {}
    global.db.data.users[m.sender] = user

    let setting = global.db.data.settings[this.user.jid] || {}
    global.db.data.settings[this.user.jid] = setting

    if (!m.isGroup) return
    if (m.isBaileys || m.fromMe) return
    if (chat.isBanned || chat.mute || user.banned) return

    if (chat.store && typeof chat.store[m.text] !== 'undefined') {
        let { media, caption } = chat.store[m.text]
        if (setting.composing) await this.sendPresenceUpdate('composing', m.chat).catch(() => {})
        if (setting.autoread) await this.readMessages([m.key]).catch(() => {})
        if (media) {
            await this.sendFile(m.chat, media, false, caption, m).catch(() => {})
        } else {
            await m.reply(caption)
        }
    }
    return !0
}