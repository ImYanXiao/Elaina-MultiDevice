import { groupsor } from "../../lib/scrape.js"
let handler = async (m, { text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan nama group! \n\nContoh : \n${usedPrefix + command} anime`)
        await global.loading(m, conn)
        if (/link/i.test(command)) {
            let link = await groupsor.link(text)
            await m.reply(link)
        } else {
            let data = await groupsor.search(text)
            if (data.length == 0) return m.reply(`Tidak dapat menemukan group *${text}*, periksa kembali nama group yang ingin anda cari!`)
            let list = data.map((v, i) => {
                return [`${usedPrefix + command}-link ${v.link}`, (i + 1).toString(), `${v.title} \n${v.desc.length >= 49 ? `${v.desc}..` : v.desc}`]
            })
            await conn.textList(m.chat, `Terdapat *${data.length} Group* \nSilahkan pilih mana group yang anda cari`, false, list, m)
        }
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['gcwa']
handler.tags = ['tools']
handler.command = /^((group(wa)?|gcwa)(-link)?)$/i
handler.limit = true
export default handler