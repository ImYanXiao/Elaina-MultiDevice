export async function before(m) {
    if (m.isBaileys || m.fromMe) return
    let chat = global.db.data.chats[m.chat]
    let setting = global.db.data.settings[conn.user.jid]

    if (chat.viewonce && m.isGroup && m.mtype == 'viewOnceMessageV2') {
        let val = { ...m }
        let ephemeral = conn.chats[m.chat]?.metadata?.ephemeralDuration || conn.chats[m.chat]?.ephemeralDuration || false
        let msg = val.message?.viewOnceMessage?.message || val.message?.viewOnceMessageV2?.message
        delete msg[Object.keys(msg)[0]].viewOnce
        val.message = msg
        if (setting.composing)
            await this.sendPresenceUpdate('composing', m.chat)
        if (setting.autoread)
            await this.readMessages([m.key])
        await this.sendMessage(m.chat, { forward: val }, { quoted: m, ephemeralExpiration: ephemeral })
    }
    return !0
}