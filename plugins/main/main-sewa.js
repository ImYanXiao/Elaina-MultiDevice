import fs from 'fs'
let handler = async (m, { conn }) => {
    try {
        await global.loading(m, conn)
        let teks = `❏ *_Harga Sewa_*
❃ _10 Hari 5k / Group_
❃ _20 Hari 10k / Group_
❃ _30 Hari 15k / Group_
❃ _40 Hari 20k / Group_


❏ *_Fitur_*
❃ _Antilink_
❃ _Welcome_
❃ _Enable_
❃ _Store List_
❃ _Promote/Demote_
❃ _HideTag_
❃ _Dan Lain Lain_

Minat? Silahkan Chat Nomor Owner Dibawah
${global.config.owner.map(([jid, name]) => {
    return `
Name : ${name}
https://wa.me/${jid}
`.trim()
}).join('\n\n')
}
`.trim()
        await conn.adReply(m.chat, teks, 'S E W A - B O T', '', fs.readFileSync('./media/thumbnail.jpg'), global.config.website, m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['sewabot']
handler.tags = ['main']
handler.command = /^sewa(bot)?$/i

export default handler