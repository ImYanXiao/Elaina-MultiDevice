import { Sticker, StickerTypes } from 'wa-sticker-formatter'
import axios from 'axios'
var handler = async (m, { conn, text }) => {
if (!text) return m.reply("Textnya Mana Banh? ")
if (text.length > 50) return m.reply('Maximal 50 Text')
            var teks = text
			let pp;
			try {
				pp = await conn.profilePictureUrl(m.sender, "image");
			}
			catch (e) {
				pp = "https://artikel.rumah123.com/wp-content/uploads/sites/41/2023/09/12160753/gambar-foto-profil-whatsapp-kosong.jpg"
			}
			let ren = ["#FFFFFF", "#000000"];
			let has = ren[Math.floor(Math.random() * ren.length)];
			let tname = m.name
			let req = {
				type: "quote",
				format: "png",
				backgroundColor: has,
				width: 512,
				height: 512,
				scale: 3,
				messages: [
					{
						avatar: true,
						from: {
							first_name: tname,
							language_code: "en",
							name: tname,
							photo: {
								url: pp,
							},
						},
						text: teks, 
						replyMessage: {},
              },
            ],
			};
			let res = await axios.post("https://bot.lyo.su/quote/generate", req);
			let img = Buffer.alloc(res.data.result.image.length, res.data.result.image, "base64");
			let sticker = new Sticker(img, {
				pack: packname,
				author: tname, 
				type: StickerTypes.FULL,
				categories: ['🤩', '🎉'],
				id: '12345', 
				quality: 85,
				background: 'transparent'
			})
			const buffer = await sticker.toBuffer()
			conn.sendMessage(m.chat, {
				sticker: buffer
			}, {
				quoted: m
			})
}
handler.help = ['quotly']
handler.tags = ['sticker']
handler.command = ['quickchat', 'qc', 'quotly']
export default handler
