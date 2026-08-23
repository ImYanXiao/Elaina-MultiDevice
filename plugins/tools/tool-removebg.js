import uploadImage from '../../lib/uploadImage.js'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return m.reply('Fotonya Mana?')
        if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`Tipe ${mime} tidak didukung!`)

        let ephemeral = conn.chats[m.chat]?.metadata?.ephemeralDuration || conn.chats[m.chat]?.ephemeralDuration || false
        await global.loading(m, conn)

        let img = await q.download()

        switch (command) {
            case 'removebg': {
                let out = await removebgSIPU(img)
                await conn.sendFile(m.chat, out, 'removebg.jpg', '*DONE (≧ω≦)ゞ*', m)
                break
            }
        }
    } catch (e) {
        console.error(e)
        m.reply('❌ Gagal memproses gambar.')
    } finally {
        await global.loading(m, conn, true)
    }
}

handler.help = ['removebg']
handler.tags = ['tools', 'premium']
handler.command = /^(removebg)$/i
handler.premium = true
export default handler

async function removebgSIPU(buffer, color = null) {
    try {
        const form = new FormData()
        const tempFile = './tmp_img_' + Date.now() + '.jpg'
        fs.writeFileSync(tempFile, buffer)

        form.append('image', fs.createReadStream(tempFile))

        if (color) form.append('bgcolor', color)

        const res = await axios.post('https://api.siputzx.my.id/api/iloveimg/removebg', form, {
            headers: {
                ...form.getHeaders()
            },
            responseType: 'arraybuffer'                                               
        })

        fs.unlinkSync(tempFile)
        return Buffer.from(res.data)
    } catch (err) {
        console.error('❌ removebgSIPU error:', err)
        throw 'Gagal menghapus background.'
    }
}
