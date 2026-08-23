import fs from "fs"
let handler = async(m, { conn }) => {
    let { result } = JSON.parse(fs.readFileSync('./json/tahlil.json', 'utf-8'))
    let caption = result.map((v, i) => {
        return `
*${i + 1}.* ${v.title}

❃ Arabic :
${v.arabic}

❃ Translate :
${v.translation}
`.trim()
    }).join('\n\n')
    m.reply(caption)
}
handler.help = ['tahlil']
handler.tags = ['quran']
handler.command = /^(tahlil)$/i
export default handler