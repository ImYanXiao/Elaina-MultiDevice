let handler = async (m, { conn, args }) => {
    let bot = conn.user.jid // Bot
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image/.test(mime)) {
      let img = await q.download()
      if (!img) throw `Fotonya Gak Ada Kak *┰ω┰*`
     conn.updateProfilePicture (bot, img)
    conn.reply(m.chat, 'Selesai Mengganti Profil Bot Kak*>ω<*!', m)
	}
    }
handler.help = ['setbotpp']
handler.tags = ['owner']
handler.command = /^(setbotpp)$/i
handler.owner = true

export default handler
