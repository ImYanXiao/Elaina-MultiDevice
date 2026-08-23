import { NovitaSDK } from "novita-sdk"
const Apikey = "1a3692ef-9f4e-4981-a7a8-297d46d18319"
const novitaClient = new NovitaSDK(Apikey)

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted: m
        let mime = (q.msg || q).mimetype || ""
        if (!mime) return m.reply("Fotonya Mana? Reply gambar atau upload")
        if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`Tipe ${mime} tidak didukung!`)
        await global.loading(m, conn)
        let download = await q.download()
        let params = {
            image_file: download.toString("base64")
        }
        let { image_file } = await novitaClient.removeText(params)
        await conn.sendFile(m.chat, Buffer.from(image_file, "base64"), "", "", m)
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ["removetext"]
handler.tags = ["ai", "premium"]
handler.command = /^(removetext)$/i
handler.premium = true
export default handler