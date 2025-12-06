import fs from 'fs'
import archiver from 'archiver'

let handler = async (m, { conn }) => {
  // LID helpers usage
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

  // LID injection removed (now using global helpers)

    m.reply('Tunggu sebentar, sedang menyiapkan backup...')

    const zipPath = './Elaina - AI Backup.zip'
    const output = fs.createWriteStream(zipPath)
    const archive = archiver('zip', { zlib: { level: 9 } })

    output.on('close', async () => {
        try {
            const zipFile = fs.readFileSync(zipPath)
            await conn.sendMessage(chatId, {
                document: zipFile,
                mimetype: 'application/zip',
                fileName: 'Elaina - AI Backup.zip'
            }, { quoted: m })

            fs.unlinkSync(zipPath) // hapus zip setelah dikirim
        } catch (err) {
            console.error(err)
            m.reply('❌ Gagal mengirim file ZIP.')
        }
    })

    archive.on('error', err => {
        console.error(err)
        m.reply('❌ Terjadi kesalahan saat membuat ZIP.')
    })

    archive.pipe(output)

    // Tambahkan semua file & folder kecuali node_modules dan sessions
    archive.glob('**/*', {
        ignore: ['node_modules/**', 'sessions/**', 'Elaina - AI Backup.zip']
    })

    await archive.finalize()
}

handler.help = ['getbp']
handler.tags = ['owner']
handler.command = /^(getbp)$/i
handler.mods = true
export default handler