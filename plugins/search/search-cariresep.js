import { resep } from '../../lib/scrape.js'
let handler = async(m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) return conn.reply(m.chat, `Masukan Format Dengan Benar\n\nContoh: \n${usedPrefix + command} Ayam Geprek`)
        await global.loading(m, conn)
        switch (command) {
            case 'cariresep':
            case 'resep': {
                let { data } = await resep.search(text)
                let rows = []
                for (let i = 0; i < data.length; i++) {
                    let results = {
                        "header": "",
                        "title": data[i].judul.trim(),
                        "description": "",
                        "id": usedPrefix + "resep-detail " + data[i].link
                    }
                    rows.push(results)
                }
                let buttonMsg = {
                    "title": "Click Here",
                    "sections": [{
                        "title": "Resep Search",
                        "highlight_label": "Popular",
                        "rows": rows
                    }]
                }
                let buttons = [{
                    "name": "single_select",
                    "buttonParamsJson": JSON.stringify(buttonMsg)
                }]
                await conn.sendButton(m.chat, "", "Silahkan pilih resep yang kamu cari dibawah", global.config.watermark, buttons, m)
                break
            }
            case 'resep-detail': {
                let { data } = await resep.detail(text)
                let caption = `
▧ Judul: ${data.judul}

▧ Waktu Masak: ${data.waktu_masak}
▧ Hasil: ${data.hasil}
▧ Tingkat Kesulitan: ${data.tingkat_kesulitan}

▧ Bahan:
${data.bahan}

▧ Langkah Langkah:
${data.langkah_langkah}
`.trim()
                await conn.sendFile(m.chat, data.thumb, data.judul + '.jpeg', caption, m)
                break
            }
            default:
        }
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['cariresep']
handler.tags = ['search']
handler.command = /^(cariresep|resep(-detail)?)$/i
handler.limit = true
export default handler