import axios from 'axios'
import FormData from 'form-data'

const handler = async (m, { conn, usedPrefix, command }) => {
  const q = m.quoted ? m.quoted : m
  const mime = (q.msg || q).mimetype || ''

  if (!mime) throw `*• Example :* ${usedPrefix + command} *[reply/send media]*`

  m.reply(wait)

  const media = await q.download()                 

  const hasilBuffer = await upscale(media)

  await conn.sendFile(m.chat, hasilBuffer, 'upscaled.png', '✅  Hai kak, Elaina telah berhasil upscale gambar ini.', m)
}

handler.help = ['hd', 'hdr', 'upscale', 'remini'].map(a => a + ' *[reply/send media]*')
handler.tags = ['tools']
handler.command = ['hd', 'hdr', 'upscale', 'remini']
handler.limit = true

export default handler

async function upscale(buffer) {
  try {
    const form = new FormData()
    form.append('image', buffer, {
      filename: 'image.png',
      contentType: 'image/png',
    })
    form.append('scale', '4')

    const response = await axios.post(
      'https://api.siputzx.my.id/api/iloveimg/upscale',
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
        responseType: 'arraybuffer',                                  
        timeout: 60000,
      }
    )

    return Buffer.from(response.data)
  } catch (e) {
    throw `Upscale gagal: ${e.message || e}`
  }
}
