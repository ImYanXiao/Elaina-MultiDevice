import { BukaLapak } from '../../lib/scrape.js'

let handler  = async (m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) return m.reply(`Masukan nama barang yang ingin dicari \n\nContoh : \n${usedPrefix + command} Case handphone poco x3 pro`)
        await global.loading(m, conn)
        let setting = global.db.data.settings[conn.user.jid]
        let ephemeral = conn.chats[m.chat]?.metadata?.ephemeralDuration || conn.chats[m.chat]?.ephemeralDuration || false

        switch (command) {
            case 'bukalapak': {
                let data = await BukaLapak(text)
                let rows = []
                for (let i = 0; i < data.length; i++) {
                    let results = {
                        "header": "",
                        "title": data[i].title.trim(),
                        "description": `Rating: ${data[i].rating} ( ${data[i].terjual} )`,
                        "id": usedPrefix + "bukalapak-detail " + text + "|" + i
                    }
                    rows.push(results)
                }
                let buttonMsg = {
                    "title": "Click Here",
                    "sections": [{
                        "title": "BukaLapak Search",
                        "highlight_label": "Popular",
                        "rows": rows
                    }]
                }
                let buttons = [{
                    "name": "single_select",
                    "buttonParamsJson": JSON.stringify(buttonMsg)
                }]
                await conn.sendButton(m.chat, "", "Silahkan pilih barang yang kamu cari dibawah", global.config.watermark, buttons, m)
                break
            }
            case 'bukalapak-detail': {
                text = text.split("|")
                let data = await BukaLapak(text[0])
                let caption = `
Title : ${data[text[1]].title}
Harga : ${data[text[1]].harga}
Rating : ${data[text[1]].rating}
Terjual : ${data[text[1]].terjual}

Store Info : 
• Lokasi : ${data[text[1]].store.lokasi}
• Nama : ${data[text[1]].store.nama}
• Link : ${data[text[1]].store.link}

Link : ${data[text[1]].link}
`.trim()
                await conn.sendMessage(m.chat, { image: { url: data[text[1]].image }, fileName: 'bukalapak.jpg', mimetype: 'image/jpeg', caption: setting.smlcap ? conn.smlcap(caption) : caption }, { quoted: m, ephemeralExpiration: ephemeral })
                break
            }
            default:
        }
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['bukalapak']
handler.tags = ['search']
handler.command = /^(bukalapak(-detail)?)$/i

export default handler 