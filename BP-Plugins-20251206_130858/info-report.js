import util from 'util'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `kalo kamu nemu pesan eror, lapor pake perintah ini\n\ncontoh:\n${usedPrefix + command} selamat siang owner, sy menemukan eror seperti berikut <copy/tag pesan erornya>`
    if (text.length < 10) throw `kependekan gblk, minimal 10 karakter!`
    if (text.length > 1000) throw `mo lapor atau curhat?, maksimal 1000 karakter!`

    let teks = `*${command.toUpperCase()}!*\n\nDari : *@${m.sender.split`@`[0]}*\n\nPesan : ${text}\n`
    if (m.quoted?.text) teks += `\nBalasan:\n${m.quoted.text}`

    let tujuan = [
        `${global.nomorown}@s.whatsapp.net`,
        ...(global.moderatorgh || []) 
    ]

    for (let jid of tujuan) {
        await conn.reply(jid, teks, null, {
            contextInfo: {
                mentionedJid: [m.sender]
            }
        })
    }

    m.reply(`✅ _Pesan terkirim ke pemilik bot dan moderator._\nJika ${command.toLowerCase()} hanya main-main tidak akan ditanggapi.`)
}

handler.help = ['report', 'request'].map(v => v + ' <teks>')
handler.tags = ['info']
handler.command = /^(report|request)$/i

export default handler
