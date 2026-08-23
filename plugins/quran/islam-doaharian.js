import fs from 'fs'
let handler = async(m, { conn, usedPrefix, command, text }) => {
    let src = JSON.parse(fs.readFileSync('./json/doaharian.json', 'utf-8'))
    let caption = src.map((v, i) => {
        return `
*${i + 1}.* ${v.title}

❃ Latin :
${v.latin}

❃ Arabic :
${v.arabic}

❃ Translate :
${v.translation}
`.trim()
    }).join('\n\n')
    m.reply(caption)

}
handler.help = ['doaharian']
handler.tags = ['quran']
handler.command = /^(doaharian)$/i
export default handler