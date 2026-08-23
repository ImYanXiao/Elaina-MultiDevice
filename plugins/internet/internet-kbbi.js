import fetch from 'node-fetch'
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukan query\n\nContoh:\n${usedPrefix + command} wibu`)
    let data = await(await fetch(API('https://api.lolhuman.xyz', '/api/kbbi', { query: text }, 'apikey'))).json()
    let kelas = data.result[0].makna[0].kelas.map(v => {
        return `Kode: ${v.kode}\nNama: ${v.nama}\nDesc: ${v.deskripsi}`
    }).join('\n\n')
    let makna = data.result[0].makna.map(v => {
        return v.submakna
    })
    let teks = `
*• Submakna:*
${makna}

*• Kelas:*
${kelas}

*• Note:*
p = Partikel: kelas kata yang meliputi kata depan, kata sambung, kata seru, kata sandang, ucapan salam
n = Nomina: kata benda
`.trim()
    m.reply(teks)
}
handler.help = ['kbbi']
handler.tags = ['internet']
handler.command = /^kbbi$/i

export default handler