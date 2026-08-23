import fetch from 'node-fetch'
let handler = async(m, { conn, text }) => {
  let res = await (await fetch(API('lol', '/api/random/puisi', null, 'apikey'))).json()
  m.reply(res.result)
}
handler.help = ['puisi']
handler.tags = ['quotes']
handler.command = /^(puisi)$/i
handler.limit = true
export default handler