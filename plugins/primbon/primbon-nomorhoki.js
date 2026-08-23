import { nomorhoki } from '@bochilteam/scraper'
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukan Nomor Kamu\n\nContoh:\n${usedPrefix + command} ${m.sender.split('@')[0]}`)
    let result = await nomorhoki(text)
    let nohoki = `
*NOMOR:* ${result.nomer}
*ANGKA BAGUA SHUZI:* ${result.angka_bagua_shuzi}

*POSITIF:* ${result.positif.positif}
*KEKAYAAN:* ${result.positif.kekayaan}
*KESEHATAN:* ${result.positif.kesehatan}
*CINTA:* ${result.positif.cinta}
*KESTABILAN:* ${result.positif.kestabilan}

*NEGATIF:* ${result.negatif.negatif}
*PERSELISIHAN:* ${result.negatif.perselisihan}
*KEHILANGAN:* ${result.negatif.kehilangan}
*MALAPETAKA:* ${result.negatif.malapetaka}
*KEHANCURAN:* ${result.negatif.Kehancuran}
`.trim()
await m.reply(nohoki)
}

handler.help = ['nomorhoki']
handler.tags = ['primbon']
handler.command = /^(nomorhoki)$/i
handler.limit = true

export default handler
