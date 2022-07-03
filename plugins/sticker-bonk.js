import jimp from 'jimp'

let handler = async (m, { conn, text }) => {
	let img = await jimp.read('https://i.imgur.com/nav6WWX.png'),
		who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender,
		avatar = await jimp.read(await conn.profilePictureUrl(who, 'image')),
		bonk = await img.composite(avatar.resize(128, 128), 120, 90, {
			mode: 'dstOver',
			opacitySource: 1,
			opacityDest: 1
		}).getBufferAsync('image/png')
	conn.sendMessage(m.chat, { image: bonk }, { quoted: m })
}
handler.command = /^(bonk)$/i

export default handler
