import fs from 'fs'
import archiver from 'archiver'

let handler = async (m, { conn }) => {
    m.reply('Tunggu sebentar, sedang menyiapkan backup...')

    const zipPath = './Elaina - MultiDevice Backup.zip'
    const output = fs.createWriteStream(zipPath)
    const archive = archiver('zip', { zlib: { level: 9 } })

    output.on('close', async () => {
        try {
            const zipFile = fs.readFileSync(zipPath)
            await conn.sendMessage(chatId, {
                document: zipFile,
                mimetype: 'application/zip',
                fileName: 'Elaina - MultiDevice Backup.zip'
            }, { quoted: m })

            fs.unlinkSync(zipPath) 
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
    archive.glob('**/*', {
        ignore: ['node_modules/**', 'sessions/**', 'Elaina - AI Backup.zip']
    })

    await archive.finalize()
}

handler.help = ['getbp']
handler.tags = ['owner']
handler.command = /^(getbp|getbackup)$/i
handler.mods = true
export default handler
