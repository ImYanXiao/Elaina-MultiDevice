let handler = async (m, { conn, participants, groupMetadata }) => {
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
    const { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, delete: del } = global.db.data.chats[m.chat]
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
    let text = `*「 ɢʀᴏᴜᴘ ɪɴғᴏʀᴍᴀᴛɪᴏɴ 」*\n
*ID:* 
${groupMetadata.id}
*𝘕𝘢𝘮𝘦:* 
${groupMetadata.subject}
*𝘋𝘦𝘴𝘤𝘳𝘪𝘱𝘵𝘪𝘰𝘯:* 
${groupMetadata.desc?.toString() || 'unknown'}
*𝘛𝘰𝘵𝘢𝘭 𝘔𝘦𝘮𝘣𝘦𝘳𝘴:*
${participants.length} Members
*𝘎𝘳𝘰𝘶𝘱 𝘖𝘸𝘯𝘦𝘳:* 
@${owner.split('@')[0]}
*𝘎𝘳𝘰𝘶𝘱 𝘈𝘥𝘮𝘪𝘯𝘴:*
${listAdmin}
*𝘎𝘳𝘰𝘶𝘱 𝘚𝘦𝘵𝘵𝘪𝘯𝘨𝘴:*
${isBanned ? '✅' : '❌'} Banned
${welcome ? '✅' : '❌'} Welcome
${detect ? '✅' : '❌'} Detect
${del ? '❌' : '✅'} Anti Delete
${antiLink ? '✅' : '❌'} Anti Link
*𝘔𝘦𝘴𝘴𝘢𝘨𝘦 𝘚𝘦𝘵𝘵𝘪𝘯𝘨𝘴:*
𝘞𝘦𝘭𝘤𝘰𝘮𝘦: ${sWelcome}
𝘉𝘺𝘦: ${sBye}
𝘗𝘳𝘰𝘮𝘰𝘵𝘦: ${sPromote}
𝘋𝘦𝘮𝘰𝘵𝘦: ${sDemote}
`.trim()
    conn.sendFile(m.chat, pp, 'pp.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}

handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(gro?upinfo|info(gro?up|gc))$/i

handler.group = true

export default handler