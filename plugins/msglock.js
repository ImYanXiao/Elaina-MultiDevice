let handler = async (m, { text, command, usedPrefix }) => {
    if (!text) throw `uhm.. teksnya mana?\n\nexample:\n${usedPrefix + command} tes`
    let msgs = global.db.data.msgs
    if (!(text in msgs)) return await conn.sendButton(m.chat, `'${text}' tidak terdaftar!`, wm, null, [['daftar semua pesan', '.listall']], m)
    msgs[text].locked = !/^un/i.test(command)
    m.reply('berhasil dikunci!')
}
    handler.rowner = true
    handler.help = ['un', ''].map(v => v + 'lockmsg <teks>')
    handler.tags = ['database']
    handler.command = /^(un)?lock(vn|msg|video|audio|img|stic?ker|gif)$/i

export default handler