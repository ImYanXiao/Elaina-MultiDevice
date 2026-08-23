import fetch from 'node-fetch'
import Jimp from 'jimp'
import { screenshotWeb } from "../../lib/scrape.js"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan uid genshin! \n\nContoh : \n${usedPrefix + command} 828342426`)
        if (isNaN(text)) return m.reply('Hanya berupa angka!')
        await global.loading(m, conn)
        let src = await(await fetch(`https://enka.network/api/uid/${text}/`)).json()
        let teks = `
❃ Nickname : ${src.playerInfo.nickname}
❃ Signature : ${src.playerInfo.signature ? src.playerInfo.signature: 'Tidak Ada Signature'}
❃ Adventure Level : ${src.playerInfo.level}

❃ World Level : ${src.playerInfo.worldLevel ? src.playerInfo.worldLevel: '0'}
❃ Archievment : ${src.playerInfo.finishAchievementNum}
❃ Abyss : Floor ${src.playerInfo.towerFloorIndex ? src.playerInfo.towerFloorIndex: '0'} Chamber ${src.playerInfo.towerLevelIndex ? src.playerInfo.towerLevelIndex: '0'}

❃ Open In Enkanetwork : https://enka.network/u/${text}
`.trim()
        let screenshot = await screenshotWeb(`https://enka.network/u/${text}`, { width: 1024, height: 2236 }, 2000)
        let { filename } = await conn.getFile(screenshot, true)
        let image = await Jimp.read(filename)
        let crop = await image.crop(15, 300, 990, 410).getBufferAsync('image/png')
        await conn.sendFile(m.chat, crop, 'profilgenshin.jpg', teks, m)
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['profilgi']
handler.tags = ['genshin']
handler.command = /^profilgenshin|profilgi|profilegi|profilgi$/i
handler.limit = true
export default handler