import axios from 'axios'
import FormData from 'form-data'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted: m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return m.reply('Fotonya Mana? Reply gambar atau upload')
        if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`Tipe ${mime} tidak didukung!`)
        await global.loading(m, conn)
        let img = await q.download()
        let image = await dehaze(img)
        await conn.sendFile(m.chat, image, '', '', m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['dehaze']
handler.tags = ['tools']
handler.command = /^(dehaze)$/i
handler.limit = true
export default handler

async function dehaze(imageData) {
    try {
        const api = 'https://inferenceengine.vyro.ai';
        const version = '1';

        const formData = new FormData();
        formData.append('model_version', version);
        formData.append('image', imageData, {
            filename: 'input.png'
        });

        const response = await axios.post(`${api}/dehaze`, formData, {
            headers: formData.getHeaders(),
            responseType: 'arraybuffer',
        });

        return response.data;
    } catch (error) {
        console.error('An error occurred upscaling the image:', error);
        return null;
    }
}