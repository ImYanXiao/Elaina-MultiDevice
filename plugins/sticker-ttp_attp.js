let handler = async(m, { conn, text, args, usedPrefix, command }) => {
if (!text) throw `*[❗] 𝙼𝚊𝚗𝚊 𝚝𝚎𝚔𝚜𝚗𝚢𝚊?*\n\n*—◉ 𝙲𝚘𝚗𝚝𝚘𝚑:*\n*◉ ${usedPrefix + command} Elaina-Bots*`
let teks = encodeURI(text)

if (command == 'attp') {
conn.sendFile(m.chat, `https://api.xteam.xyz/attp?file&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}

if (command == 'attp2') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/attp?apikey=${global.lolkey}&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}
    
if (command == 'attp3') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/attp2?apikey=${global.lolkey}&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}

if (command == 'ttp6') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/ttp6?apikey=${global.lolkey}&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}
    
if (command == 'ttp5') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/ttp5?apikey=${global.lolkey}&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}
    
if (command == 'ttp4') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/ttp4?apikey=${global.lolkey}&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}
    
if (command == 'ttp3') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/ttp3?apikey=${global.lolkey}&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}
    
if (command == 'ttp2') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/ttp2?apikey=${global.lolkey}&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}
    
if (command == 'ttp') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/ttp?apikey=${global.lolkey}&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}
    
}
handler.command = handler.help = ['ttp', 'ttp2', 'ttp3', 'ttp4', 'ttp5', 'ttp6', 'attp', 'attp2', 'attp3']
handler.tags = ['sticker']
export default handler
