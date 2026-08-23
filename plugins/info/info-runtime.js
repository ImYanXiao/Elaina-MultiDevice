import { generateWAMessageFromContent } from '@rexxhayanasi/elaina-baileys'
import { performance } from 'perf_hooks'
import fs from 'fs'
let handler  = async (m, { conn, usedPrefix: _p }) => {

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var days = Math.floor(seconds / (60 * 60 * 24));
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

                                                               
  return `\n\t\t*⏰ʀᴜɴᴛɪᴍᴇ「 \t${pad(days)}D\t ${pad(hours)}H ${pad(minutes)}M ${pad(seconds)}S \t」*\n`
}
					const runtime = process.uptime()
		            const teks = `${kyun(runtime)}`
					const itsme = `0@s.whatsapp.net`
					const split = `uwu >//<`
					const rtimebro = {
					contextInfo: {
					participant: itsme,
					quotedMessage: {
					extendedTextMessage: {
				    text: split
									}
								}
							}
					}
						    
						  let prep = generateWAMessageFromContent(m.chat, { orderMessage: { 
itemCount: -10062007, status: 500,
surface: 999,
message: teks,
description: '^^',
orderTitle: 'Haii Kak',
token: '9',
curreyCode: 'IDR',
totalCurrencyCode: '>〰<',
totalAmount1000: '1000000',
sellerJid: '6282249930312@s.whatsapp.net',
thumbnail: fs.readFileSync('media/thumbnail.jpg')
}}, {contextInfo: null, quoted: m})
conn.relayWAMessage(prep)
				                                                                    
}

handler.help = ['runtime']
handler.tags = ['info']
handler.command = /^(up|run)time$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null


export default handler
