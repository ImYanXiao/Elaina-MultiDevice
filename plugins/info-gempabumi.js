// Atas segala hormat, saya Turut berduka cita kepada seseorang yang mendapatkan musibah ini ❤ Semoga diberikan ketabahan kepada Tuhan Yang Maha Esa❤

import fetch from 'node-fetch'
import sharp from 'sharp'

const link = 'https://data.bmkg.go.id/DataMKG/TEWS/'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    let res = await fetch(link + 'autogempa.json')
    let anu = await res.json()
    anu = anu.Infogempa.gempa
    let txt = `Tanggal : ${anu.Tanggal}\n`
    txt += `Waktu : ${anu.Jam}\n`
    txt += `Potensi : *${anu.Potensi}*\n`
    txt += `Magnitude : ${anu.Magnitude}\n`
    txt += `Kedalaman : ${anu.Kedalaman}\n`
    txt += `Wilayah : ${anu.Wilayah}\n`
    txt += `Lintang : ${anu.Lintang} & Bujur: ${anu.Bujur}\n`
    txt += `Koordinat : ${anu.Coordinates}\n`
    txt += anu.Dirasakan ? `Dirasakan : ${anu.Dirasakan}\n\n\nsupport me on https://trakteer.id/Xnuvers007\nyou can Scan me on DANA https://ndraeee25.000webhostapp.com/dana/DanaXnuvers007.jpeg` : ''

    let imgBuffer = await (await fetch(link + anu.Shakemap)).buffer()
    let img = await sharp(imgBuffer).png().toBuffer()

    await conn.sendFile(m.chat, img, 'shakemap.png', txt, m)
  } catch (e) {
    console.log(e)
    m.reply(`[!] Fitur Error.`)
  }
}

handler.help = ['gempa']
handler.tags = ['internet', 'info']
handler.command = /^(gempa|gempabumi)$/i

handler.premium = false
handler.limit = false

export default handler
