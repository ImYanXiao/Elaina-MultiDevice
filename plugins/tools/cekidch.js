let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('Harap berikan link saluran WhatsApp.')

  const match = args[0].match(/(?:whatsapp\.com|wa\.me)\/channel\/([A-Za-z0-9_-]+)/i)
  if (!match) return m.reply('Link saluran tidak valid.')

  const code = match[1]

  try {
    const info = await conn.newsletterMetadata('invite', code)
    if (!info?.id) return m.reply('Saluran tidak ditemukan.')

    const name = info.name ?? info.thread_metadata?.name?.text
    return m.reply(`Kode: ${code}\nID: ${info.id}\nNama: ${name ?? '-'}`)
  } catch (e) {
    return m.reply('Gagal mengambil data saluran: ' + (e?.message ?? e))
  }
}

handler.help = ['cekidch <link>']
handler.tags = ['tools']
handler.command = /^cekidch$/i

export default handler