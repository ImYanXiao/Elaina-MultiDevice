import { xnxx } from "../../lib/scrape.js"
import fs from "fs"
import moment from 'moment-timezone'
let handler = async(m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) return m.reply(`Masukan nama! \n\nContoh: \n${usedPrefix + command} Korean`)
        await global.loading(m, conn)
        let user = global.db.data.users[m.sender]
        let name = user.registered ? user.name : await conn.getName(m.sender)
        let hwaifu = JSON.parse(fs.readFileSync('./json/hwaifu.json', 'utf-8'))

        let setting = global.db.data.settings[conn.user.jid]
        let ephemeral = conn.chats[m.chat]?.metadata?.ephemeralDuration || conn.chats[m.chat]?.ephemeralDuration || false
        if (/xnxx-download/i.test(command)) {
            let { result } = await xnxx.detail(text)
            let caption = ""
            caption += `${result.title}\n\n`
            caption += `Duration: ${result.duration}\n`
            caption += `Info: ${result.info}`
            let { data } = await conn.getFile(result.files.low, true)
            let sizeMB = data.byteLength / (1024 * 1024)
            if (sizeMB <= 80) {
                await conn.sendMessage(m.chat, { video: data, fileName: `${result.title}.mp4`, mimetype: 'video/mp4', caption: setting.smlcap ? conn.smlcap(caption): caption }, { quoted: m, ephemeralExpiration: ephemeral })
            } else {
                await conn.sendMessage(m.chat, { document: data, fileName: `${result.title}.mp4`, mimetype: 'video/mp4', caption: setting.smlcap ? conn.smlcap(caption): caption }, { quoted: m, ephemeralExpiration: ephemeral })
            }

        } else {
            let { status, result } = await xnxx.search(text)
            if (!status || result.length == 0) return m.reply("Maaf tidak dapat menemukan apa yang anda cari")
            let list = result.map((v, i) => {
                return [`${usedPrefix}xnxx-download ${v.link}`, (i + 1).toString(), `${v.title} \n${v.info}`]
            })
            await conn.textList(m.chat, `Terdapat *${result.length} Result* \nSilahkan pilih mana Video yang anda Mau!`, false, list, m, {
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: false,
                        mediaType: 1,
                        title: `Halo ${name}, ${wish()}`,
                        body: global.config.watermark,
                        thumbnail: (await conn.getFile("https://files.catbox.moe/ukeri9.jpg")).data,
                        renderLargerThumbnail: true,
                        mediaUrl: hwaifu.getRandom(),
                        sourceUrl: global.config.website
                    }
                }
            })
        }
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['xnxx']
handler.tags = ['nsfw']
handler.command = /^(xnxx(-download)?)$/i
handler.premium = true
handler.nsfw = true
handler.age = 18
export default handler

function wish() {
    let wishloc = ''
    const time = moment.tz('Asia/Jakarta').format('HH')
    wishloc = ('Hi')
    if (time >= 0) {
        wishloc = ('Selamat Malam')
    }
    if (time >= 4) {
        wishloc = ('Selamat Pagi')
    }
    if (time >= 11) {
        wishloc = ('Selamat Siang')
    }
    if (time >= 15) {
        wishloc = ('️Selamat Sore')
    }
    if (time >= 18) {
        wishloc = ('Selamat Malam')
    }
    if (time >= 23) {
        wishloc = ('Selamat Malam')
    }
    return wishloc
}