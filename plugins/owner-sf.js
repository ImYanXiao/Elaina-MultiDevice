import fs from 'fs'
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply(`Kodenya Mana?\n\nContoh :\n${usedPrefix + command} plugins/menu.js`)
    if (!m.quoted) return m.reply(`balas pesan nya!`)
    let path = `${text}`
    await fs.writeFileSync(path, m.quoted.text)
    m.reply(`tersimpan di ${path}`)
}
handler.help = ['savefile']
handler.tags = ['owner']
handler.command = /^sf|savefile$/i
handler.mods = true
export default handler