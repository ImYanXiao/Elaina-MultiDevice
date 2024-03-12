import axios from 'axios'

var handler = async (m, { conn, args }) => {
	if (args[0] && args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) {
		let res = await Telesticker(args[0])
		await m.reply(`Sending ${res.length} stickers...`)
		if (m.isGroup && res.length > 30) {
			await m.reply('Number of stickers more than 30, bot will send it in private chat.')
			for (let i = 0; i < res.length; i++) {
				conn.sendMessage(m.sender, { sticker: { url: res[i].url }})
			}
		} else {
			for (let i = 0; i < res.length; i++) {
				conn.sendMessage(m.chat, { sticker: { url: res[i].url }})
			}
		}
	} else throw 'Input Query / Telesticker Url'
}
handler.help = ['telesticker']
handler.tags = ['downloader']
handler.command = /^(telestic?ker|stic?kertele)$/i
handler.limit = true

export default handler

//Thanks Xfarr : https://github.com/xfar05 , Xnuvers007 : https://github.com/Xnuvers007
async function Telesticker(url) {
    return new Promise(async (resolve, reject) => {
        if (!url.match(/(https:\/\/t.me\/addstickers\/)/gi)) throw 'Enter your telegram sticker URL'
        let packName = url.replace("https://t.me/addstickers/", "")
        let data = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`, { method: "GET", headers: { "User-Agent": "GoogleBot" } })
        const hasil = []
        for (let i = 0; i < data.data.result.stickers.length; i++) {
            let fileId = data.data.result.stickers[i].thumb.file_id
            let data2 = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
            let result = {
                status: 200,
                author: 'Xnuvers007',
                url: "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + data2.data.result.file_path
            }
            hasil.push(result)
        }
        resolve(hasil)
    })
}
