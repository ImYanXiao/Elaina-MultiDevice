import axios from "axios"
let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) return m.reply(`Masukan nama weapon! \n\nContoh: \n${usedPrefix + command} Hunter's Bow`)
        await global.loading(m, conn)
        let { data } = await axios.get(API("https://genshin-db-api.vercel.app", "/api/v5/weapons", { query: text }, false))
        let caption = `
*Name:* ${data.name}
*Description:* _${data.description}_
*Type Weapon:* ${data.weaponText}
*Base Attack:* ${data.baseAtkValue.toString().split(".")[0]}
*Rarity:* ${data.rarity}

*Story:* ${data.story}
`.trim()
        conn.sendFile(m.chat, data.images.icon, data.title + ".jpg", caption, m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ["giweapon"]
handler.tags = ["genshin"]
handler.command = /^((gi|genshin|genshinimpact)weapon|weapon(gi|genshin|genshinimpact))$/i
handler.limit = true
export default handler