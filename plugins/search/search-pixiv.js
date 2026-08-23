import fetch from 'node-fetch'
let handler = async(m, { conn, text, command, usedPrefix }) => {
    try {
        if (!text) return m.reply(`Masukan nama atau kode! \n\nContoh: \n${usedPrefix + command} Elaina`)
        await global.loading(m, conn)
        switch (command) {
            case 'pixiv':
                if (isNaN(text)) {
                    let api = await fetch(global.API('lol', '/api/pixiv', { query: text }, 'apikey'))
                    let { result } = await api.json()
                    let list = result.map((v ,i) => {
                        return [`${usedPrefix}pixiv-detail ${v.image}`, (i + 1).toString(), `${v.title.trim().split("").length > 50 ? `${v.title.slice(0, 50)}..` : v.title} \nId : ${v.id}`]
                    })
                    await conn.textList(m.chat, `Terdapat *${result.length} Result* \nSilahkan pilih Foto yang kamu cari!`, result[0].image, list, m)
                } else {
                    let api = await fetch(global.API('lol', '/api/pixivdl/' + text, null, 'apikey'))
                    let { result } = await api.json()
                    let list = result.images.map((v, i) => {
                        return [`${usedPrefix}pixiv-detail ${v}`, (i + 1).toString(), (i + 1).toString()]
                    })
                    await conn.textList(m.chat, `Title : ${result.title} \nID : ${result.id} \n\nTerdapat *${result.images.length} Result* \nSilahkan pilih Foto yang kamu cari dibawah`, result.images[0], list, m, { noList: true})
                }
                break
            case 'pixiv-detail':
                await conn.sendFile(m.chat, text, "", "", m)
                break
            default:
        }
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['pixiv']
handler.tags = ['search', 'premium']
handler.command = /^(pixiv(-detail)?)$/i
handler.premium = true
handler.nsfw = true
export default handler