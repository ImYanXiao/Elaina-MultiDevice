import yts from 'yt-search'

var handler = async(m, { conn, usedPrefix, text, args, command }) => {
let name = await conn.getName(m.sender)

  if (!text) throw 'Cari apa?'
  let cari = await yts(`${text}`)
    let dapet = cari.all
    let listSections = []
	Object.values(dapet).map((v, index) => {
	listSections.push([index + ' ' + cmenub + ' ' + v.title, [
          ['Video 🎥', usedPrefix + 'getvid' + v.url, '\n⌚ *Duration:* ' + v.timestamp + '\n⏲️ *Uploaded:* ' + v.ago + '\n👁️ *Views:* ' + v.views + '\n📎 *Url:* ' + v.url],
          ['Audio 🎧', usedPrefix + 'getaud' + v.url, '\n⌚ *Duration:* ' + v.timestamp + '\n⏲️ *Uploaded:* ' + v.ago + '\n👁️ *Views:* ' + v.views + '\n📎 *Url:* ' + v.url]
        ]])
	}) 
	return conn.sendList(m.chat, '*───「 Youtube Search 」───*', `Silahkan pilih type di bawah...\n*Teks yang anda minta:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `YouTube Search 🔎`, listSections, m)
}
handler.help = ['ytsearch <query>']
handler.tags = ['internet']
handler.command = /^yts(earch)?$/i


export default handler
