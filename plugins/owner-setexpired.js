let handler = async (m, { conn, args, usedPrefix, command }) => {
  // LID helpers usage
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

  // LID injection removed (now using global helpers)

    if (!args[0] || isNaN(args[0])) return m.reply(`Masukkan angka mewakili jumlah hari !\n*Misal : ${usedPrefix + command} 30*`)

    let who
    if (m.isGroup) who = args[1] ? args[1] : chatId
    else who = args[1]

    var jumlahHari = 86400000 * args[0]
    var now = new Date() * 1
    if (now < global.db.data.chats[who].expired) global.db.data.chats[who].expired += jumlahHari
    else global.db.data.chats[who].expired += now + jumlahHari
    conn.reply(chatId, `Berhasil menetapkan hari kadaluarsa untuk Grup ini selama ${args[0]} hari.\n\nHitung Mundur : ${msToDate(global.db.data.chats[who].expired - now)}`, m)
}
handler.help = ['addexpired']
handler.tags = ['owner']
handler.command = /^(set(sewa|expired)|add(sewa|expired))$/i
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
    return days + " hari " + hours + " jam " + minutes + " menit";
    // +minutes+":"+sec;
}
