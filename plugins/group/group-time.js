let handler = async (m, { conn, isAdmin, isOwner, args, usedPrefix, command }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    let isClose = {
        'open': 'not_announcement',
        'buka': 'not_announcement',
        'on': 'not_announcement',
        '1': 'not_announcement',
        'close': 'announcement',
        'tutup': 'announcement',
        'off': 'announcement',
        '0': 'announcement',
    }[(args[0] || '')]
    if (isClose === undefined) {
        let caption = `
Contoh:
*${usedPrefix + command} tutup*
*${usedPrefix + command} buka*

Contoh pilihan: *${usedPrefix + command} tutup 1*
Maka grup akan di buka otomatis 1 jam kemudian.
`.trim()
        return m.reply(caption)
    }
    let timeoutset = 86400000 * args[1] / 24
    await conn.groupSettingUpdate(chatId, isClose).then(async _=> {
        m.reply(`Sukses me${isClose == 'announcement' ? 'nutup': 'mbuka'} grup${args[1] ? `, grup akan dibuka setelah *${clockString(timeoutset)}*`: ''}`)
    })
    if (args[1]) {
        setTimeout(async () => {
            await conn.groupSettingUpdate(chatId, `${isClose == 'announcement' ? 'not_announcement': 'announcement'}`).then(async _=> {
                conn.reply(chatId, `Grup telah di ${isClose == 'not_announcement' ? 'tutup, sekarang hanya admin yang dapat mengirim pesan': 'buka, sekarang semua member bisa mengirim pesan'}!`)
            })
        }, timeoutset)
    }
}
handler.help = ['grouptime']
handler.tags = ['group']
handler.command = /^(grouptime|gctime)$/i

handler.botAdmin = true
handler.admin = true
handler.group = true

export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
