import fetch from 'node-fetch'
import { Darkjokes } from 'dhn-api'
var handler = async (m, { conn }) => {
const res = await Darkjokes()
await conn.sendFile(m.chat, res, 'darkjoke.jpg', `Dark ga si adick adick`,m)
}
handler.help = ['darkjoke']
handler.tags = ['internet']
handler.command = /^(darkjoke)$/i
handler.limit = true

export default handler
