import uploadImage from '../../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return m.reply('Fotonya mana? Reply gambarnya aja')
        if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`Tipe ${mime} tidak didukung!`)

        await global.loading(m, conn)

        let img = await q.download?.()
        let url = await uploadImage(img)                   

        let res = await global.fetch(API('lol', '/api/read-qr', { img: url }, 'apikey'))
        let json = await res.json()

        m.reply(json.result, false, false, { smlcap: false })
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn)
    }
}

handler.help = ['readqr']
handler.tags = ['tools']
handler.command = /^(readqr)$/i
handler.limit = true

export default handler
