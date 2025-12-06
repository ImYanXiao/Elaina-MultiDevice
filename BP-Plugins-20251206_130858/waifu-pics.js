import fetch from 'node-fetch'
import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  await conn.reply(m.chat, global.wait, m)

  const AllLists = [
    'waifu',
    'neko',
    'shinobu',
    'megumin',
    'bully',
    'cuddle',
    'cry',
    'hug',
    'awoo',
    'kiss',
    'lick',
    'pat',
    'smug',
    'bonk',
    'yeet',
    'blush',
    'smile',
    'wave',
    'highfive',
    'handhold',
    'nom',
    'bite',
    'glomp',
    'slap',
    'kill',
    'kick',
    'happy',
    'wink',
    'poke',
    'dance',
    'cringe'
  ];

  let type = (command).toLowerCase()

  switch (type) {
    case 'waifu':
      let res = await fetch('https://api.waifu.pics/sfw/waifu')
      if (!res.ok) throw await res.text()
      let json = await res.json()
      if (!json.url) throw 'Error!'
      conn.sendFile(m.chat, json.url, 'waifu.jpg', 'Istrinya Kartun🐧', m)
      break

    case 'bonks':
      let _bonk = await fetch('https://api.waifu.pics/sfw/bonk')
      if (!_bonk.ok) throw await _bonk.text()
      let bonk = await _bonk.json()
      if (!bonk.url) throw global.error
      conn.sendFile(m.chat, bonk.url, 'bonk.jpg', 'Istrinya Kartun🐧', m)
      break

    case 'kicks':
      let _kick = await fetch('https://api.waifu.pics/sfw/kick')
      if (!_kick.ok) throw await _kick.text()
      let kick = await _kick.json()
      if (!kick.url) throw global.error
      conn.sendFile(m.chat, kick.url, 'kick.jpg', 'Istrinya Kartun🐧', m)
      break

    case 'neko':
      let _neko = await fetch('https://api.waifu.pics/sfw/neko')
      if (!_neko.ok) throw await _neko.text()
      let neko = await _neko.json()
      if (!neko.url) throw global.error
      conn.sendFile(m.chat, neko.url, 'neko.jpg', 'Dasar Furry', m)
      break

    case 'megumin':
      let _megumin = await fetch('https://api.waifu.pics/sfw/megumin')
      if (!_megumin.ok) throw await _megumin.text()
      let megumin = await _megumin.json()
      if (!megumin.url) throw global.error
      conn.sendFile(m.chat, megumin.url, 'megumin.jpg', 'Istrinya Kartun🗿', m)
      break

    case 'shinobu':
      let _shinobu = await fetch('https://api.waifu.pics/sfw/shinobu')
      if (!_shinobu.ok) throw await _shinobu.text()
      let shinobu = await _shinobu.json()
      if (!shinobu.url) throw global.error
      conn.sendFile(m.chat, shinobu.url, 'shinobu.jpg', 'Istrinya Mayadd 🗿', m)
      break

    case 'bully':
    case 'cuddle':
    case 'cry':
    case 'hug':
    case 'awoo':
    case 'kiss':
    case 'lick':
    case 'pat':
    case 'smug':
    case 'yeet':
    case 'blush':
    case 'smile':
    case 'wave':
    case 'highfive':
    case 'handhold':
    case 'nom':
    case 'bite':
    case 'glomp':
    case 'slap':
    case 'kill':
    case 'happy':
    case 'wink':
    case 'poke':
    case 'dance':
    case 'cringe':
      let url = `https://api.waifu.pics/sfw/${type}`
      let resType = await fetch(url)
      if (!resType.ok) throw await resType.text()
      let data = await resType.json()
      if (!data.url) throw global.error
      conn.sendFile(m.chat, data.url, `${type}.jpg`, `Gambar ${type}`, m)
      break

   case 'waifuhelp':
          let helpText = 'The available commands are:\n'
          AllLists.forEach((item, index) => {
              helpText += `${index + 1}. ${usedPrefix + item}\n`
          })
          m.reply(helpText)
          break
    
    default:
      conn.reply(m.chat, `Unknown command`, m)
  }
}

handler.help = ['waifuhelp','waifu', 'neko', 'megumin', 'shinobu', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonks', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 'happy', 'wink', 'poke', 'dance', 'cringe', 'kicks']
handler.tags = ['random']
handler.command = /^(waifuhelp|waifu|neko|megumin|shinobu|bully|cuddle|cry|hug|awoo|kiss|lick|pat|smug|yeet|blush|smile|wave|highfive|handhold|nom|bite|glomp|slap|kill|happy|wink|poke|dance|cringe|bonks|kicks)$/i

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
