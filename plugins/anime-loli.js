import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
	let url = 'https://api.lolhuman.xyz/api/random/loli?apikey=Apikeymu'
	conn.sendButton(m.chat, 'Dasar Pedo', wm, await(await fetch(url)).buffer(), [['Next',`.${command}`]],m)
}
handler.command = /^(loli)$/i
handler.tags = ['anime']
handler.help = ['loli']

export default handler
