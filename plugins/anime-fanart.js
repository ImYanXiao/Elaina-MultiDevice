import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
	let url = 'https://api.lolhuman.xyz/api/random/art?apikey=Apikeymu'
	conn.sendButton(m.chat, 'Nih FanArtnya ', wm, await(await fetch(url)).buffer(), [['Next',`.${command}`]],m)
}
handler.command = /^(fanart)$/i
handler.tags = ['anime']
handler.help = ['fanart']

export default handler
