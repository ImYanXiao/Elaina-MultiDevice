let handler = async (m, { conn, usedPrefix, command }) => {
    let store = global.db.data.chats[m.chat].store
    let list = Object.values(store)
    if (list.length === 0) {
        return m.reply('Belum ada list di grup ini')
    }
    list.sort((a, b) => a.command.localeCompare(b.command))
    let lists = list.map((v, i) => {
        return [v.command, (i + 1).toString(), v.command]
    })
    await conn.textList(m.chat, `Terdapat *${list.length} List*`, false, lists, m)
}
handler.help = ['list']
handler.tags = ['store']
handler.command = /^(list(store)?)$/i
handler.group = true

export default handler