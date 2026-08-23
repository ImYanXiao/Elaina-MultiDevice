let handler = async (m, { conn }) => {
  if (!m.quoted) throw 'Balas pesan dari saluran (channel)'

  try {
    let quoted = await m.getQuotedObj()
    let id = quoted.msg.contextInfo?.forwardedNewsletterMessageInfo

    if (!id) throw 'Pesan bukan dari channel (tidak ada forwardedNewsletterMessageInfo)'

    let teks = '```Channel Name:``` `' + id.newsletterName + '`\n'
    teks += '```Channel Id:``` `' + id.newsletterJid + '`'

    await conn.reply(m.chat, teks.trim(), m)
  } catch (e) {
    console.error('[CI ERROR]', e)                           
    throw 'Harus membalas pesan dari channel yang valid'
  }
}

handler.help = ['ci']
handler.tags = ['main']
handler.command = ['ci']

export default handler
