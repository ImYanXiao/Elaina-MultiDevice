import fs from 'fs'
import path from 'path'

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply(`Nama filenya mana?\n\nContoh:\n${usedPrefix + command} tesmenu\n${usedPrefix + command} exp/tesmenu (kalau mau disimpan di subfolder)`)
    if (!m.quoted || !m.quoted.text) return m.reply('Balas pesan yang berisi kode JavaScript!')

    let filename = text.trim().replace(/\.js$/i, '').replace(/\\/g, '/')

                                                          
    if (filename.split('/').some(part => part === '..' || part === '')) {
        return m.reply('❌ Nama file/folder tidak valid.')
    }

                                                                                
                                                                                   
                                                                               
    let targetName = filename
    if (!filename.includes('/')) {
        let existingKey = Object.keys(global.plugins || {}).find(k => path.basename(k, '.js') === filename)
        if (existingKey) targetName = existingKey.replace(/\.js$/i, '')
    }

    let filepath = path.join('plugins', `${targetName}.js`)

    try {
                                                                                               
        fs.mkdirSync(path.dirname(filepath), { recursive: true })

                                    
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath)

                          
        fs.writeFileSync(filepath, m.quoted.text)
        m.reply(`✅ Plugin berhasil disimpan sebagai *${targetName}.js* (ditimpa jika sebelumnya ada)`)
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
