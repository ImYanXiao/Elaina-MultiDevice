import fetch from 'node-fetch'
import { sizeFormatter } from 'human-readable'
let formatSize = sizeFormatter({
    std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`
})

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        if (!args[0]) return m.reply(`Masukan link Gdrive! \n\nContoh : \n${usedPrefix + command} https://drive.google.com/file/d/1A65dgGvA18X_6ns5uN5yLW8FOWrq1i2d/view?usp=drivesdk`)
        await global.loading(m, conn)
        GDriveDl(args[0]).then(async (res) => {
            await conn.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m })
        })
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['gdrive']
handler.tags = ['downloader']
handler.command = /^gd(rive(d(own(load(er)?)?|l))?|dle|l)$/i
handler.limit = true
export default handler

async function GDriveDl(url) {
    let id
    if (!(url && url.match(/drive\.google/i))) throw 'Invalid URL'
    id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
    if (!id) throw 'ID Not Found'
    let res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
        method: 'post',
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            'content-length': 0,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'origin': 'https://drive.google.com',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
            'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
            'x-drive-first-party': 'DriveWebUi',
            'x-json-requested': 'true'
        }
    })
    let { fileName, sizeBytes, downloadUrl } = JSON.parse((await res.text()).slice(4))
    if (!downloadUrl) throw 'Link Download Limit!'
    let data = await fetch(downloadUrl)
    if (data.status !== 200) throw data.statusText
    return {
        downloadUrl,
        fileName,
        fileSize: formatSize(sizeBytes),
        mimetype: data.headers.get('content-type')
    }
}