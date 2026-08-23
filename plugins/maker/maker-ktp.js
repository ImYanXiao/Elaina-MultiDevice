import fetch from 'node-fetch'
import uploadImage from '../../lib/uploadImage.js'
let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted: m
        let mime = (q.msg || q).mimetype || ''
        if (!mime && args[0] !== '?') return m.reply('Fotonya Mana?')
        if (!/image\/(jpe?g|png)/.test(mime) && args[0] !== '?') return m.reply(`_*Mime ${mime} tidak didukung!*_`)
        await global.loading(m, conn)
        if (args[0] == '?') return await conn.sendFile(m.chat, 'https://pomf2.lain.la/f/350wzn4.png', '', `Silahkan isi nomor foto diatas dengan data yang sesuai \n\nContoh: \n${usedPrefix + command} 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15`, m)
        let img = await q.download()
        let { files } = await uploadImage(img)
        let response = args.join(' ').split('|')
        let ktp = API('lol', '/api/ktpmaker', {
            nik: response[0] ? response[0]: 1,
            prov: response[1] ? response[1]: 2,
            kabu: response[2] ? response[2]: 3,
            name: response[3] ? response[3]: 4,
            ttl: response[4] ? response[4]: 5,
            jk: response[5] ? response[5]: 6,
            jl: response[6] ? response[6]: 7,
            rtrw: response[7] ? response[7]: 8,
            lurah: response[8] ? response[8]: 9,
            camat: response[9] ? response[9]: 10,
            agama: response[10] ? response[10]: 11,
            nikah: response[11] ? response[11]: 12,
            kerja: response[12] ? response[12]: 13,
            warga: response[13] ? response[13]: 14,
            until: response[14] ? response[14]: 15,
            img: files[0].url
        }, 'apikey')
        await conn.sendFile(m.chat, ktp, 'error.jpg', `Jika tidak mengerti cara penggunaan ketik ${usedPrefix + command} ?`, m, false)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['ktp']
handler.tags = ['maker', 'premium']
handler.command = /^(ktp)$/i
handler.premium = true
export default handler