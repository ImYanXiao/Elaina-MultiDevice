import { generateWAMessageFromContent } from '@adiwajshing/baileys'
var handler = async (m, { conn }) => {
let arr = []
for (let i = 0; i < 404; i++) arr.push({ productId: '25235574282755550' }) 
let pre = generateWAMessageFromContent(m.chat, { listMessage: { title: 'ᴇʟᴀɪɴᴀ ᴡᴀ ʙᴏᴛ',  description: 'ᴘʀᴏᴅᴜᴄᴛɴʏᴀ ᴋᴋ', listType: 2, productListInfo: { productSections: [{ title: 'Here List Product', products: arr }], headerImage: { productId: '25235574282755550', jpegThumbnail: await conn.resize(await getBuffer(thumb), 300, 150)}, businessOwnerJid: '6281231079387@s.whatsapp.net' }, footerText: '© ᴅ`ᴀʀᴄ ᴄʟᴀɪʀᴇ'}}, { quoted: m })
 conn.relayMessage(m.chat, pre.message, { messageId: pre.key.id })
 }
handler.command = /^list$/i
export default handler