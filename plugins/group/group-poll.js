let handler = async (m, { conn, text }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    let args = text.split('\n').map(arg => arg.trim())
    let name = args[0]
    let values = args.slice(1)

    if (!name) {
        return m.reply(`*Contoh pemakaian:*
.poll text
text1
text2
seterusnya...

⌕ Contoh:
.poll best game
free fire
mobile legends
call of duty mobile
pubg mobile`.trim())
    }

    if (values.length < 2) {
        return m.reply(`*Berikan minimal 2 kata yang ingin dipoll*\n\n⌕ Contoh:\n.poll mending mana\npaolo maldini\nsergio ramos`)
    }

    let poll = {
        name: name,
        values: values,
        selectableCount: true
    }

    conn.sendMessage(chatId, { poll: poll })

}
handler.help = ['poll']
handler.tags = ['group']
handler.command = /^(poll|polling)$/i
handler.group = true

export default handler
