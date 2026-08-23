import moment from "moment"

let handler = async (m, { conn }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    let chat = global.db.data.chats[chatId]
    let listUser = Object.entries(chat.member).filter(v => v[1].blacklist)
    if (listUser.length == 0) return m.reply("Tidak ada user yang masuk Blacklist!")

    let caption = `
List user yang ada di *Blacklist*

${await Promise.all(listUser.map(async ([number, value], i) => {
    let time = dateTime(value.blacklistTime)
    return `*${i + 1}.* @${number.split("@")[0]}\nMasuk blacklist pada *${time}*`
})).then(res => res.join("\n\n"))}
    `.trim()

    await m.reply(caption, false, { contextInfo: { mentionedJid: listUser.map(([number]) => number) } })
}

handler.help = ["listblacklist"]
handler.tags = ["group"]
handler.command = /^(listblacklist)$/i
handler.group = true
export default handler

function dateTime(timestamp) {
    const dateReg = new Date(timestamp)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = dateReg.toLocaleDateString('id-ID', options)
    return formattedDate
}
