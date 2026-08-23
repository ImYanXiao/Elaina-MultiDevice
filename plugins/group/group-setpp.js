import { jidNormalizedUser } from '@rexxhayanasi/elaina-baileys'

let handler = async (m, { conn, usedPrefix, command, args }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''

    if (!/image/.test(mime)) return m.reply(`Balas gambar dengan caption *.${command}*`)

    let img = await q.download()
    if (!img) return m.reply('Gagal mengunduh gambar.')

    let target = conn.decodeJid(chatId)

    try {
        await conn.updateProfilePicture(target, img)
        m.reply(`✅ Foto profil untuk grup ini berhasil diperbarui.`)
    } catch (e) {
        console.error(e)
        m.reply('❌ Gagal memperbarui foto profil. Pastikan:\n• Bot adalah admin grup\n• Bot tidak diblokir di grup tersebut.')
    }
}

handler.help = ['setppgc']
handler.tags = ['group']
handler.command = /^setppgc$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
