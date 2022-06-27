import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
	let url = 'https://api.lolhuman.xyz/api/random/kanna?apikey=Apikeymu'
	conn.sendButton(m.chat, 'Kanna? ', wm, await(await fetch(url)).buffer(), [['Next',`.${command}`]],m)
}
handler.command = /^(kanna)$/i
handler.tags = ['anime']
handler.help = ['kanna']

export default handler
