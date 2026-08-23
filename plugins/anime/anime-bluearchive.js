import axios from "axios"

const handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Silahkan masukan nama character! \n\nContoh: \n${usedPrefix + command} Shiroko`)
        await global.loading(m, conn)
        const { data } = await axios.get(API("https://api-blue-archive.vercel.app", "/api/characters/students", { name: text }))
        if (data.data.length === 0) return m.reply("Nama tidak ditemukan")
        const { names, age, birthday, school, hobbies, height, weapon, background, image, photoUrl } = data.data[0]
        const characterInfo = `*[ CHARA BLUE ARCHIVE INFO ]*
*• Name :* ${names.japanName} *[ ${names.firstName} ${names.lastName} ]*
*• Age :* ${age} TH
*• Birthday :* ${birthday}
*• Study In :* ${school}
*• Hobbies :* ${hobbies.join(", ")}
*• Height:* ${height}
*• Use Weapon :* ${weapon}
${background}`.trim()
        await conn.sendFile(m.chat, image || photoUrl, "", characterInfo, m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}

handler.help = ["bluearchive"]
handler.tags = ["anime"]
handler.command = /^(ba|bluearchive)$/i

export default handler
