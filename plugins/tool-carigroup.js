import { groupWA } from '@bochilteam/scraper'
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `uhm.. cari apa?\n\ncontoh:\n${usedPrefix + command} mabar`
    let res = await groupWA(text)
    if (!res) throw 'Group Tidak Ditemukan'
    var pik = pickRandom(res) 
    var { subject, url } = pik
    let caption = `
*Nama* : ${subject}
*Link :* ${url}
`
        return m.reply(caption)
        
}
handler.help = ['carigrup <pencarian>']
handler.tags = ['tools']

handler.command = /^carig(ro?up|c)/i

export default handler
