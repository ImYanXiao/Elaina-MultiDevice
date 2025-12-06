let handler = async (m, { conn, participants }) => {
  // LID helpers usage
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

  // LID injection removed (now using global helpers)


    let now = new Date() * 1
    let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce && !chat.isCommunity && !chat.isCommunityAnnounce && !chat?.metadata?.isCommunity && !chat?.metadata?.isCommunityAnnounce).map(v => v[0])
    let txt = ''
    let chats = global.db.data.chats

    for (let [jid, chat] of Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.isCommunity && !chat.isCommunityAnnounce && !chat?.metadata?.isCommunity && !chat?.metadata?.isCommunityAnnounce))
        txt += `${await conn.getName(jid)}\n${jid} [${chat?.metadata?.read_only ? 'Left': 'Joined'}]\n${chats[jid] == undefined ? chats[jid] = { isBanned: false, welcome: false, antiLink: false, delete: true } : chats[jid].expired ? msToDate(chats[jid].expired - now): '*Tidak Diatur Expired Group*'}
${chats[jid].isBanned ? '✅': '❌'} _Group Banned_
${chats[jid].welcome ? '✅': '❌'} _Auto Welcome_
${chats[jid].antiVirtex ? '✅': '❌'} _Anti Virtex_
${chats[jid].antiLink ? '✅': '❌'} _Anti Link_\n\n`
    m.reply(`List Groups:
Total Group: ${groups.length}

${txt}

`.trim())

}

handler.help = ['grouplist']
handler.tags = ['group']
handler.command = /^(group(s|list)|(s|list)group)$/i
handler.owner = true
export default handler

    function msToDate(ms) {
        let temp = ms
        let days = Math.floor(ms / (24 * 60 * 60 * 1000));
        let daysms = ms % (24 * 60 * 60 * 1000);
        let hours = Math.floor((daysms) / (60 * 60 * 1000));
        let hoursms = ms % (60 * 60 * 1000);
        let minutes = Math.floor((hoursms) / (60 * 1000));
        let minutesms = ms % (60 * 1000);
        let sec = Math.floor((minutesms) / (1000));
        return days + " Days ⏳ \n" + hours + " Hours ⏳ \n" + minutes + " Minute ⏳ ";
        // +minutes+":"+sec;
    }