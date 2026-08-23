import uploadImage from '../../lib/uploadImage.js'

let handler = async (m, { conn, text, command, usedPrefix }) => {
    let store = global.db.data.chats[m.chat].store
    let [cmd, caption] = text.split('@')
    if (!cmd) return m.reply(`Masukan nama command! \n\nContoh : \n${usedPrefix + command} diamond`)
    if (typeof store[cmd] !== 'undefined') return m.reply('Command tersebut telah ada!')
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (cmd && !caption && !m.quoted && !/image\/(jpe?g|png)|video\/mp4/.test(mime)) return m.reply(`Masukan isi command \n\nContoh : \n${usedPrefix + command} diamond@List Harga Diamond...`)
    if (!cmd && !/image\/(jpe?g|png)|video\/mp4/.test(mime)) return m.reply(`Hanya support image atau video`)
    if (/image\/(jpe?g|png)|video\/mp4/.test(mime)) {
        let media = await q.download()
        let { files } = await uploadImage(media)
        m.reply(`Sukses menambahkan command ${cmd} kedalam menu store`)
        store[cmd] = {
            command: cmd,
            media: files[0].url,
            caption: caption ? caption : m.quoted ? m.quoted.text : ''
        }
    } else {
        m.reply(`Sukses menambahkan command ${cmd} kedalam menu store`)
        store[cmd] = {
            command: cmd,
            media: false,
            caption: caption ? caption : m.quoted ? m.quoted.text : ''
        }
    }
}
handler.help = ['addlist']
handler.tags = ['store']
handler.command = /^(add(store|list))$/i

handler.group = true
handler.admin = true

export default handler