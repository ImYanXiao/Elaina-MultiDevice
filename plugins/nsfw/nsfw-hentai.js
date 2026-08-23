import axios from 'axios'
let handler = async (m, { conn, usedPrefix, command, args }) => {
    let list = `
• ahegao
• ass
• blowjob
• bsdm
• cuckold
• cum
• ecchi -
• ero
• feet
• femdom
• foot
• futanari -
• gangbang
• glasses
• hentai
• jahy
• loli -
• manga
• milf -
• masturbation
• neko -
• panties
• pussy
• oppai -
• orgy
• tentacles
• thighs
• uniform
• incest
• waifu -
• yaoi -
• yuri
• zettai -

Cara Penggunaan:
${usedPrefix + command} cum
`.trim()
    if (!args[0]) return m.reply(list)
    let type = args[0].toLowerCase()
    if (/nsfw|hentai/i.test(command)) {
        switch (type) {
            case 'ahegao':
            case 'ass':
            case 'blowjob':
            case 'cuckold':
            case 'bdsm':
            case 'cum':
            case 'ero':
            case 'femdom':
            case 'foot':
            case 'gangbang':
            case 'glasses':
            case 'hentai':
            case 'jahy':
            case 'masturbation':
            case 'panties':
            case 'pussy':
            case 'orgy':
            case 'tentacles':
            case 'thighs':
            case 'uniform':
            case 'incest':
            case 'yuri':
                global.db.data.settings[conn.user.jid].loading ? await m.reply(global.config.loading) : false
                axios.get(`https://raw.githubusercontent.com/Yunxvoid/GOJO-BOT/682aff3f1cedbf9e60332940a9993dbeb282af5b/Shikimori/imports/hmfull/src/images/${type}.json`).then(async v => {
                    let img = v.data.getRandom()
                    await conn.sendFile(m.chat, img, false, 'Category: ' + type, m, false)
                })
            break
            default:
                return m.reply(list)
        }
    }
}
handler.help = ['nsfw']
handler.tags = ['nsfw', 'premium']
handler.command = /^(nsfw|hentai)$/i
handler.nsfw = true
handler.premium = true
export default handler