import moment from 'moment-timezone'
import fs from 'fs'

let handler = async(m, { conn, text, usedPrefix, command }) => {
    try {
                                                                         
        let keywords = text || 'blue archive sesat'
        
        if (/ttsearch-detail/i.test(command)) {
            text = text.split('|')
            await conn.sendFile(m.chat, text[0], '', text[1], m)
            return
        }

                            
        await global.loading(m, conn)

                              
        let user = global.db.data.users[m.sender]
        let name = user.registered ? user.name : await conn.getName(m.sender)
        let hwaifu = JSON.parse(fs.readFileSync('./json/hwaifu.json', 'utf-8'))

                                                                    
        let api = await global.fetch(global.API("https://tikwm.com", "/api/feed/search", { keywords: keywords, count: 30 }))
        let { data } = await api.json()

                            
        let list = data.videos.map((v, i) => {
            return [`${usedPrefix}ttsearch-detail ${v.play}|${v.title}`, (i + 1).toString(), `${v.title.split("").length > 50 ? `${v.title.slice(0, 50)}..` : v.title} \nDuration : ${v.duration} \nViews : ${Convert(v.play_count)}`]
        })

                             
        await conn.textList(m.chat, `Terdapat *${data.videos.length} Result* \nSilahkan pilih mana Video yang mau Kamu Download!`, false, list, m, {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    mediaType: 1,
                    title: `Halo ${name}, ${wish()}`,
                    body: global.config.watermark,
                    thumbnail: (await conn.getFile("https://pomf2.lain.la/f/lzfyr03k.jpg")).data,
                    renderLargerThumbnail: true,
                    mediaUrl: hwaifu.getRandom(),
                    sourceUrl: global.config.website
                }
            }
        })
    } finally {
                           
        await global.loading(m, conn, true)
    }
}

handler.help = ['jjbluearchive']
handler.tags = ['premium']
handler.command = /^(jjba|jjbluearchive)$/i
handler.premium = true
export default handler

function Convert(count) {
    let ribuan = count / 1000;
    return ribuan.toLocaleString('id-ID', {
        style: 'decimal', maximumFractionDigits: 3
    }) + ' k'
}

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
