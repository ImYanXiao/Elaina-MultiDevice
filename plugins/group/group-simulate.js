let handler = async (m, { conn, usedPrefix, command, args: [event], text }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    if (!event) return await conn.reply(chatId, `Contoh Penggunaan:
${usedPrefix + command} welcome @user
${usedPrefix + command} bye @user
${usedPrefix + command} promote @user
${usedPrefix + command} demote @user`.trim(), m)
    let mentions = text.replace(event, '').trimStart()
    let who = mentions ? conn.parseMention(mentions) : []
    let part = who.length ? who : [sender]
    let act = false
    m.reply(`*❃ Simulating ${event}...*`)
    switch (event.toLowerCase()) {
        case 'add':
        case 'invite':
        case 'welcome':
            act = 'add'
            break
        case 'bye':
        case 'kick':
        case 'leave':
        case 'remove':
            act = 'remove'
            break
        case 'promote':
            act = 'promote'
            break
        case 'demote':
            act = 'demote'
            break
        default:
            return await conn.reply(chatId, `Contoh Penggunaan:
${usedPrefix + command} welcome @user
${usedPrefix + command} bye @user
${usedPrefix + command} promote @user
${usedPrefix + command} demote @user`.trim(), m)
    }
    if (act) return conn.participantsUpdate({
        id: chatId,
        participants: part,
        action: act
    })
}
handler.help = ['simulate']
handler.tags = ['group']
handler.command = /^(simulate|simulation|simulasi)$/i
handler.admin = true
handler.group = true
export default handler
