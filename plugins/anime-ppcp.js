import fetch from 'node-fetch'
let handler = async (m, { conn, command }) => {
let res = await fetch(`https://api.lolhuman.xyz/api/random/ppcouple?apikey=apikeymu`)
if (res.status != 200) throw await res.text()
let json = await res.json()
if (!json.status) throw json
conn.sendButton(m.chat, '𝙶𝚒𝚛𝚕𝚜', wm, json.result.female,[['NEXT', `/${command}`]], m)
conn.sendButton(m.chat, '𝙱𝚘𝚢𝚜', wm, json.result.male, [['NEXT', `/${command}`]], m)
}
handler.help = ['ppcouple']
handler.tags = ['internet']
handler.command = /^(ppcp|ppcouple)$/i
export default handler
