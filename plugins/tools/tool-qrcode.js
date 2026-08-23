import { toDataURL } from 'qrcode'

let handler = async (m, { conn, text }) => {
    try {
        let qr = m.quoted && !text ? m.quoted.text: text ? text: false
        if (!qr) return m.reply('Kirim Atau Reply Text!')
        await global.loading(m, conn)
        await conn.sendFile(m.chat, await toDataURL(qr.slice(0, 2048), { scale: 8 }), 'qrcode.png', '¯\\_(ツ)_/¯', m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['qrcode']
handler.tags = ['tools']
handler.command = /^qr(code)?$/i

export default handler