import { NHentai } from '@rexxhayanasi/nhentai'
import fs from "fs"
import moment from 'moment-timezone'

const nhentai = new NHentai()

let handler = async(m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) return m.reply(`Masukan query! \n\nContoh: \n${usedPrefix + command} asuna`)
        await global.loading(m, conn)
        let user = global.db.data.users[m.sender]
        let name = user.registered ? user.name : await conn.getName(m.sender)
        let hwaifu = JSON.parse(fs.readFileSync('./json/hwaifu.json', 'utf-8'))

        let { data } = await nhentai.search(text)
        let list = data.map((v, i) => {
            return [`${usedPrefix}nhentai ${v.id}`, (i + 1).toString(), `${v.title}`]
        })
        await conn.textList(m.chat, `Terdapat *${data.length} Result* \nSilahkan pilih Judul dibawah untuk langsung Mendownload PDF`, false, list, m, {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    mediaType: 1,
                    title: `Halo ${name}, ${wish()}`,
                    body: global.config.watermark,
                    thumbnail: (await conn.getFile("https://pomf2.lain.la/f/ri0tqqd1.jpg")).data,
                    renderLargerThumbnail: true,
                    mediaUrl: hwaifu.getRandom(),
                    sourceUrl: global.config.website
                }
            }
        })
    } catch {
        m.reply(`Tidak dapat menemukan query *${text}*`)
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['nhentais']
handler.tags = ['nsfw', 'premium']
handler.command = /^(nhentai(s|search))$/i
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