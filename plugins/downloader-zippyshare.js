import { extract } from 'zs-extract'
import { lookup } from 'mime-types'

let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'Input Zippyshare URL'
  if (!args[0].includes('zippyshare.com/v')) throw 'Invalid URL'
  await m.reply('_In progress, please wait..._')
  for (let i = 0; i < args.length; i++) {
    if (!args[i].includes('zippyshare.com/v')) continue
    let res = await extract(args[i])
    let mimetype = await lookup(res.download)
    conn.sendMessage(m.chat, { document: { url: res.download }, fileName: res.filename, mimetype }, { quoted: m })
  }
}
handler.help = ['zippyshare']
handler.tags = ['downloader']
handler.command = /^z(s|ippy(dl|share)?)$/i 

export default handler
