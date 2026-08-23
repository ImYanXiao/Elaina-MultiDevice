import fs from 'fs'

let handler = async (m, { text, usedPrefix, command }) => {
    let store = global.db.data.chats[m.chat].store
    let list = Object.values(store)
    if (list.length == 0) return m.reply('Belum ada list di group ini')
    if (typeof store[text] === 'undefined') return m.reply('Nama command tersebut tidak ditemukan')
    m.reply(`Sukses menghapus command ${text}`).then(v => {
        delete store[text]
    })
}
handler.help = ['dellist']
handler.tags = ['store']
handler.command = /^(del(ete)?(store|list))$/i
handler.admin = true
handler.group = true
export default handler