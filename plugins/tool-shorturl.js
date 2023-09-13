import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, args }) => {
	
let caption = 'Silahkan Pilih Type Urlnya kak\nTinyUrl\nLinkPoi\nOuO\nExample : ${usedPrefix}tinyurl https://github.com'

if (!args[0]) return m.reply('Linknya mana?')
if (!args[0].startsWith('https://')) throw 'Masukan Url Dengan Awalan *https://*'
if (!args[1]) return conn.reply(m.chat, caption, { quoted: m })

let tesk = '🚀 *ʟɪɴᴋ:* '
let pros = '_*ᴄ ᴏ ɴ ᴠ ᴇ ʀ ᴛ ɪ ɴ ɢ . . .*_'
//TINY
if (args[1] == "tinyurl") {
	let tiny = await (await fetch(`https://api.lolhuman.xyz/api/shortlink?apikey=${global.lolkey}url=${args[0]}`)).json()
m.reply(pros).then(_ => conn.reply(m.chat, `${tesk}${tiny.result}`,m))
}
//--------------

//LINKPOI
if (args[1] == "linkpoi") {
	let poi = await(await fetch(`https://linkpoi.ga/api.php?url=${args[0]}`)).json()
	m.reply(pros).then(_=> conn.reply(m.chat, `${tesk}${poi.shorturl.replace('\/','/')}`,m))
}
//------------

//OuO
if (args[1] == "ouo") {
	let ouo = await (await fetch(`https://api.lolhuman.xyz/api/ouoshortlink?apikey=${global.lolkey}&url=${args[0]}`)).json()
	m.reply(pros).then(_=> conn.reply(m.chat, `${tesk}${ouo.result}`,m))
	}
}
handler.help = ['short <url> <type>']
handler.tags = ['internet']
handler.command = /^(short(url)?)$/i

export default handler
