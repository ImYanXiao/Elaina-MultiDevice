import fs from 'fs'

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. nama pluginnya mana?\n\ncontoh:\n${usedPrefix + command} test\n(balas pesan berisi kode plugin)`
    if (!m.quoted?.text) throw `balas pesan yang berisi kode plugin yang ingin disimpan!`

    let path = `plugins/${text}.js`
    await fs.writeFileSync(path, m.quoted.text)
    m.reply(`✅ Plugin berhasil disimpan di: ${path}`)
}

handler.help = ['sp'].map(v => v + ' <nama_plugin>')
handler.tags = ['owner']
handler.command = /^sp$/i
handler.rowner = true

export default handler
