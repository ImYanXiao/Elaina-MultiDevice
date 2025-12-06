import { Couples } from 'dhn-api'
var handler = async (m, { conn, command }) => {

const res = await Couples() 
await conn.sendFile(m.chat, res.male, 'ppcp.jpg', 'Male', m) 
return conn.sendFile(m.chat, res.female, 'ppcp.jpg', 'Female', m)
}
handler.help = ['ppcouple']
handler.tags = ['internet']
handler.command = /^(ppcp|ppcouple)$/i
export default handler
