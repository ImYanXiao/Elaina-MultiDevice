let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`Masukan nama apk \n\nContoh : \n${usedPrefix + command} whatsapp`)
    conn.apk = conn.apk ? conn.apk : {}
    if (text.split('').length <= 2 && !isNaN(text) && m.sender in conn.apk) {
        text = text.replace(/http:\/\/|https:\/\//i, '')
        let dt = conn.apk[m.sender]
        if (dt.download) return m.reply('Kamu masih mendownload!')
        try {
            dt.download = true
            let data = await aptoide.download(dt.data[text - 1].id)
            let caption = `
Name : ${data.appname}
Developer : ${data.developer}
`.trim()
            let msg = await conn.adReply(m.chat, caption, data.appname, data.developer, data.img, '', m)
            let dl = await conn.getFile(data.link)
            conn.sendMessage(m.chat, { document: dl.data, fileName: data.appname, mimetype: dl.mime }, { quoted: msg })
        } catch (e) {
            throw e
        } finally {
            dt.download = false
        }
    } else {
        let data = await aptoide.search(text)
        let caption = data.map((v, i) => {
            return `
${i + 1}. ${v.name}
• Size : ${v.size}
• Version : ${v.version}
• Download : ${v.download}
• Id : ${v.id}
`.trim()
        }).join('\n\n')
        let header = `_Silahkan download dengan cara mengetik, *${usedPrefix + command} 1*_\n\n`
        m.reply(header + caption)
        conn.apk[m.sender] = {
            download: false,
            data: data,
            time: setTimeout(() => {
                delete conn.apk[m.sender]
            }, 3600000)
        }
    }
}
handler.help = ['apk']
handler.tags = ['internet']
handler.command = /^(apk)$/i

export default handler 

const aptoide = {
    search: async function(args) {
        let res = await global.fetch(`https://ws75.aptoide.com/api/7/apps/search?query=${args}&limit=1000`)
        let ress = {}
        res = await res.json()
        ress = res.datalist.list.map(v => {
            return {
                name: v.name,
                size: v.size,
                version: v.file.vername,
                id: v.package,
                download: v.stats.downloads
            }
        })
        return ress
    },
    download: async function(id) {
        let res = await global.fetch(`https://ws75.aptoide.com/api/7/apps/search?query=${id}&limit=1`)
        res = await res.json()
        return {
            img: res.datalist.list[0].icon,
            developer: res.datalist.list[0].store.name,
            appname: res.datalist.list[0].name,
            link: res.datalist.list[0].file.path
        }
    }
}