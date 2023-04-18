import uploadImage from '../lib/uploadImage.js'


let handler = async (m, { conn, usedPrefix, command }) => {

	let q = m.quoted ? m.quoted : m

 let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (!mime) throw `balas gambar dengan perintah\n\n${usedPrefix + command}`

    if (!/image\/(jpg|jpeg|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`

    await m.reply('Tunggu Sebentar\nSedang memproses...')

    let img = await q.download()

    let url = await uploadImage(img)

    let hasil = `https://api.lolhuman.xyz/api/imagetoanime?apikey=${global.lolkey}&img=${url}`

    await conn.sendFile(m.chat, hasil, 'anjim.jpg', 'Jadi Anime\nBy *Ikyy Bot*',m)

}

handler.help = ['jadianime']

handler.tags = ['tools']

handler.command = /^jadianime$/i

export default handler
