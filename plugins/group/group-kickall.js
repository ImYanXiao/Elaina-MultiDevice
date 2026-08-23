let handler = async (m, { conn }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    let group = await conn.groupMetadataPn(chatId)
    let participants = group.participants

                        
    let admins = participants.filter(p => p.admin).map(p => p.id)

                                            
    let toKick = participants
        .map(p => p.id)
        .filter(id => !admins.includes(id) && id !== conn.user.id)

    if (!toKick.length) return m.reply("Tidak ada anggota yang bisa dikeluarkan.")

                                                   
    for (let user of toKick) {
        await conn.groupParticipantsUpdate(chatId, [user], 'remove')
        await delay(1500)                                      
    }

    await m.reply(`Sukses mengeluarkan ${toKick.length} anggota non-admin dari grup!`)
}

handler.help = ['kickall']
handler.tags = ['group']
handler.command = /^kickall$/i
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler

let delay = ms => new Promise(resolve => setTimeout(resolve, ms))
