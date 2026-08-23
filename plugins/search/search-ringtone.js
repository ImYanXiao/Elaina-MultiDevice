import { RingTone } from '../../lib/scrape.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) return m.reply(`Masukan query! \n\nContoh : \n${usedPrefix + command} old telephone`)
        await global.loading(m, conn)
        if (/ringtone-detail/i.test(command)) return conn.sendFile(m.chat, text, null, null, m, false, { mimetype: "audio/mpeg" })
        let data = await RingTone(text)
        if (data.length == 0) return m.reply(`Tidak dapat menemukan query *${text}* silahkan coba lagi dengan kata kunci yang berbeda`)
        let list = data.map((v, i) => {
            return [`${usedPrefix}ringtone-detail ${v.audio}`, (i + 1).toString(), v.title.trim()]
        })
        await conn.textList(m.chat, `Terdapat *${data.length} Ringtone* \nSilahkan pilih Ringtone yang anda mau`, false, list, m)
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['ringtone']
handler.tags = ['search']
handler.command = /^(ringtone(-detail)?)$/i
export default handler