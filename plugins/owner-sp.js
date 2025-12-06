import fs from 'fs'
import path from 'path'

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply(`Nama filenya mana?\n\nContoh:\n${usedPrefix + command} tesmenu`)
    if (!m.quoted || !m.quoted.text) return m.reply('Balas pesan yang berisi kode JavaScript!')

    let filename = text.trim().replace(/\.js$/i, '')
    let filepath = path.join('plugins', `${filename}.js`)

    try {
        // Jika ada, hapus file lama
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath)

        // Tulis file baru
        fs.writeFileSync(filepath, m.quoted.text)
        m.reply(`✅ Plugin berhasil disimpan sebagai *${filename}.js* (ditimpa jika sebelumnya ada)`)
    } catch (err) {
        console.error(err)
        m.reply('❌ Gagal menyimpan file.')
    }
}

handler.help = ['sp']
handler.tags = ['owner']
handler.command = /^sp$/i
handler.mods = true
export default handler