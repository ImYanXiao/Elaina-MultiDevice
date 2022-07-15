import fs from 'fs'
import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix: _p }) => {
let info = `Waalaikumsalam`

let td = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
conn.reply(m.chat, info, m, { quoted: fkontak },{ contextInfo: { externalAdReply: { showAdAttribution: true,
      mediaUrl: "https://github.com/ImYanXiao",
      mediaType: 2,
      description: "https://github.com/ImYanXiao", 
      title: 'ᴋᴀɴɴᴀ-ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ',
      body: wm,
      thumbnail: thumb,
      sourceUrl: sig  }}})
}
handler.customPrefix = /^(assalamualaikum|salam)$/i
handler.command = new RegExp

export default handler
