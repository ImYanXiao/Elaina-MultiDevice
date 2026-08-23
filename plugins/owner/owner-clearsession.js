import { readdirSync, rmSync } from 'fs'
let handler = async (m, { conn }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    const dir = './sessions'
    readdirSync(dir)
    .filter(v => v != 'creds.json')
    .forEach(f => rmSync(`${dir}/${f}`))
    await m.reply('Berhasil Menghapus File Sessions')
}
handler.help = ['clearsession']
handler.tags = ['owner']
handler.command = /^(clear(sesi|session))$/i
handler.mods = true
export default handler
