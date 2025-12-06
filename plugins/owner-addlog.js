let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukan logs \n\nContoh : \n${usedPrefix + command} downloader-ig.js|Memperbaiki error`)
    let logs = global.db.data.bots.logs
    logs.history = logs.history ? logs.history : []
    let [fitur, update] = text.split('|')
    if (!fitur) return m.reply('Masukan nama file yang di update')
    if (!update) return m.reply('Masukan updatean nya')
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    logs.history.push({
        fitur: fitur,
        update: update,
        date: date
    })
    m.reply('Berhasil!')
}
handler.help = ['addlogs']
handler.tags = ['owner']
handler.command = /^(addlog(s)?)$/i
handler.limit = true
export default handler