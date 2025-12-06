import { Quotes } from 'dhn-api'
var handler = async(m, { conn, text }) => {
var res = await Quotes()
return m.reply('*' + res.author + '*' + '\n' + res.quotes)
}
handler.help = ['katabijak']
handler.tags = ['quotes']
handler.command = /^(katabijak)$/i

export default handler
