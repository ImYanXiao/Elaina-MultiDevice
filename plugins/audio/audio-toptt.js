import { toPTT } from '../../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted: m
        let mime = (m.quoted ? m.quoted: m.msg).mimetype || ''
        if (!/video|audio/.test(mime)) return m.reply(`reply video/audio you want to convert to voice note/vn with caption *${usedPrefix + command}*`)
        await global.loading(m, conn)
        let media = await q.download?.()
        if (!media) return m.reply('Can\'t download media')
        let audio = await toPTT(media, 'mp4')
        if (!audio.data) return m.reply('Can\'t convert media to audio')
        await conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, true)
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['tovn']
handler.tags = ['audio']
handler.command = /^to(vn|(ptt)?)$/i
export default handler