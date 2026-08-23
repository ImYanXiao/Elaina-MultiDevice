let handler = async (m, { conn, args, usedPrefix, command }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    let who
    if (m.isGroup) who = args[1] ? args[1] : chatId
    else who = args[1]
	if (global.db.data.chats[who].expired < 1) return m.reply(`Group Ini Tidak DiSet Expired !`)

    var jumlahHari = 86400000 * args[0]
    var now = new Date() * 1
    
    conn.reply(chatId, `*––––––『 EXPIRED 』––––––*
${msToDate(global.db.data.chats[who].expired - now)}`, m)
}
handler.help = ['cekexpired']
handler.tags = ['group']
handler.command = /^((cek)?expired)$/i
handler.group = true

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
    return days + " Days ☀️\n" + hours + " Hours 🕐\n" + minutes + " Minute ⏰";
                        
}
