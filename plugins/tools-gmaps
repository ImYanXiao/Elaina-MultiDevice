import { jarak } from "../lib/scrape.js"
let handler = async (m, { conn, text, usedPrefix, command }) => {
let [dari, ke] = text.split(",")
if (!dari || !ke) throw `*GMAPS JARAK*\n\n*• Gesek pesan ini* atau\nKetik *${usedPrefix}${command} pekalongan,sukabumi`
let { result } = await jarak(dari, ke)

conn.sendFile(m.chat, result.img, "", `*GOOGLE MAPS*
${result.desc ? result.desc : "404"}`, m)
}
handler.help = ['jarak', 'gmaps'].map(v => v + ' <dari> <ke>')
handler.tags = ['tools']
handler.desc = ["Melihat jarak dari kota A ke kota B"]
handler.command = /^(jarak|gmaps)$/i

export default handler 
