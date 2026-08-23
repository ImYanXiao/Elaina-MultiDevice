import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) return m.reply(`Masukan Nama Negara!\n\nContoh :\n${usedPrefix + command} indonesia`)
  let res = await fetch(API('https://covid19.mathdro.id', '/api/countries/'+ (text)))
  let json = await res.json()
  if (!json.confirmed) return m.reply('Negara?')
  m.reply(`
🌏 Negara : ${text}
✅ Terkonfirmasi : ${json.confirmed.value}
📉 Sembuh : ${json.recovered.value}
☠️ Meninggal : ${json.deaths.value}
💌 Update Info : ${json.lastUpdate}
`.trim())
}
handler.help = ['covid']
handler.tags = ['internet']
handler.command = /^(corona|covid|covid19)$/i
export default handler