import fetch from 'node-fetch'
import fs from 'fs'

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*🔍 Masukan Nama Paket Npm*\n\n*📍 Example:*\n- ${usedPrefix + command} @adiwajshing/baileys`
  conn.reply(m.chat, global.wait, m)
  let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
  let { objects } = await res.json()
  if (!objects.length) throw `Tidak Ditemukan *${text}* `
  let txt = objects.map(({ package: pkg }) => {
    return `*📝 Name:* ${pkg.name}\n*📑 Versi:* v${pkg.version}\n*🌏 Link:* ${pkg.links.npm}\n*📖 Deskripsi:* ${pkg.description}`
  }).join`\n\n╶\n\n`
  let imgnpm = fs.readFileSync('./src/npm.jpg')
  await conn.sendFile(m.chat, imgnpm, 'Error.jpg', txt, m)
}

handler.help = ['npm']
handler.tags = ['internet']
handler.command = /^(npmjs|npmsearch|npms)$/i

export default handler