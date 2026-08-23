let handler = async (m, { conn, participants, groupMetadata }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    const pp = await conn.profilePictureUrl(chatId, 'image').catch(_ => null) || './src/avatar_contact.png'
    const { isBanned, welcome, pembatasan, sWelcome, sBye, sPromote, isDetect, sDemote, antiLink, antiVirtex, antiBadword, antiLinkWa, viewonce, nsfw, rpg, game, delete: del } = global.db.data.chats[chatId]
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || chatId.split`-`[0] + '@s.whatsapp.net'
    let text = `*ID:* 
${groupMetadata.id}
*Name:* 
${groupMetadata.subject}
*Description:* 
${groupMetadata.desc?.toString() || 'unknown'}
*Total Members:*
${participants.length} Members
*Group Owner:* 
@${owner.split('@')[0]}
*Group Admins:*
${listAdmin}
*Group Settings:*
${welcome ? '✅' : '❌'} Welcome
${pembatasan ? '✅' : '❌'} Restrict
${del ? '❌' : '✅'} Anti Delete
${antiLink ? '✅' : '❌'} Anti Link
${antiBadword ? '✅' : '❌'} Anti BadWord
${viewonce ? '✅' : '❌'} Anti ViewOnce
${nsfw ? '✅' : '❌'} Nsfw
${rpg ? '✅' : '❌'} Rpg Game
${game ? '✅' : '❌'} Game
*Message Settings:*
Welcome: ${sWelcome}
Bye: ${sBye}
Promote: ${sPromote}
Demote: ${sDemote}
`.trim()
    await conn.sendFile(chatId, pp, null, text, m, null, { mentions: [...groupAdmins.map(v => v.id), owner] })
}

handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(gro?upinfo|info(gro?up|gc))$/i

handler.group = true

export default handler
