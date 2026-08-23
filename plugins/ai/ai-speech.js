import { vitsSpeech } from "../../lib/scrape.js"
import fs from "fs"
import { translate } from "bing-translate-api"
let speech = new vitsSpeech()
let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`Masukan text! \n\nContoh: \n${usedPrefix + command} dasar mesum`)
    text = text.split("|")
    if (!text[1]) {
        let data = JSON.parse(fs.readFileSync('./json/speechModel.json', 'utf-8'))
        let result = Object.keys(data.model)
        let list = result.map((v, i) => {
            return [`${usedPrefix + command} ${text[0]}|${result[i]}`, (i + 1).toString(), data.model[v]]
        })
        await conn.textList(m.chat, `Terdapat *${result.length} Model* \nSilahkan pilih Model mana yang ingin Kamu Gunakan`, false, list, m)
    } else {
        try {
            await global.loading(m, conn)
            let translated = await translate(text[1], null, "ja")
            let result = await speech.generate(translated.translation, text[1], "ja")
            await conn.sendFile(m.chat, result.url, "", "", m, true)
        } finally {
            await global.loading(m, conn, true)
        }
    }
}
handler.help = ["speech"]
handler.tags = ["ai"]
handler.command = /^((ai)?speech)$/i
export default handler