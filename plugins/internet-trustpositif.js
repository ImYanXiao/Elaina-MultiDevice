import {trustpositif} from '../lib/scrape.js'

let handler = async (m, { conn, args }) => {
   if (isUrl(args[0])) throw 'url invalid'
   let res = await trustpositif(args[0])
   m.reply(res.result)
}

handler.help = ['trustpositif <url>']
handler.tags = ['internet']
handler.command = /^trustpositif$/i
export default handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
