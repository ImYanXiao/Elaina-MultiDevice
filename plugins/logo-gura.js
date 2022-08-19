import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
let response = args.join(' ').split('|')
  if (!args[0]) throw 'Masukkan Parameter'
  m.reply('Proses...')
  let res = `https://api-xzn-yotsuya.up.railway.app/docs/gura?name=${response[0]}`
  conn.sendFile(m.chat, res, 'gura.jpg', `Sudah Jadi`, m, false)
}
handler.help = ['logogura'].map(v => v + ' <text>')
handler.tags = ['maker']
handler.command = /^(logogura)$/i
handler.register = false

handler.limit = false

export default handler
