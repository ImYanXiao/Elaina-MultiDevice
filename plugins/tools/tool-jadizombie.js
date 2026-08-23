import axios from 'axios'
import Jimp from 'jimp'
import FormData from 'form-data'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return m.reply(`Kirim/Balas Foto Dengan Caption ${usedPrefix + command}`)
        if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`*Format ${mime} tidak didukung!*`)
        await global.loading(m, conn)
        let img = await q.download()
        let result = await tozombie(img)
        await conn.sendFile(m.chat, result.image_data, 'zombie.png', 'Nih Kak', m)
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['jadizombie']
handler.tags = ['tools']
handler.command = /^(jadi|to)zombie/i
handler.limit = true
handler.onlyprem = true
export default handler

async function tozombie(input) {
    const image = await Jimp.read(input)
    const buffer = await new Promise((resolve, reject) => {
        image.getBuffer(Jimp.MIME_JPEG, (err, buf) => {
            if (err) {
                reject('Terjadi Error Saat Mengambil Data......')
            } else {
                resolve(buf)
            }
        })
    })
    const form = new FormData()
    form.append('image', buffer, {
        filename: 'tozombie.jpg'
    })
    try {
        const { data } = await axios.post(`https://tools.betabotz.eu.org/ai/tozombie`, form, {
                headers: {
                    ...form.getHeaders(),
                    'accept': 'application/json',
                },
            })
        var res = {
            image_data: data.result,
            image_size: data.size
        }
        return res
    } catch (error) {
        console.error('Identifikasi Gagal:', error)
        return {
            status: false
        }
    }
}