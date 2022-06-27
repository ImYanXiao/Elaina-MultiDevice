import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
	let url = 'https://api.lolhuman.xyz/api/meme?apikey=Apikeymu'
	conn.sendButton(m.chat, 'Random Mim', wm, await(await fetch(url)).buffer(), [['Next',`.${command}`]],m)
}
handler.command = /^(r-meme)$/i
handler.tags = ['internet']
handler.help = ['random-meme']

export default handler
