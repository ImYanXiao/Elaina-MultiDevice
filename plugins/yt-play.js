import { youtubedl, youtubedlv2, youtubeSearch } from '@bochilteam/scraper'
var handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Use example ${usedPrefix}${command} naruto blue bird`
  let search = await youtubeSearch(text)
  let vid = await search.video[0]
  if (!search) throw 'Video Not Found, Try Another Title'
  let { authorName, title, thumbnail, duration, viewH, publishedTime, url } = vid
  if (!vid) throw 'Hasil Tidak Ditemukan'
  let caption = `╭──── 〔 Y O U T U B E 〕 ─⬣
⬡ Judul: ${title}
⬡ Author: ${authorName}
⬡ Durasi: ${duration}
⬡ Views: ${viewH}
⬡ Upload: ${publishedTime}
⬡ Link: ${url}
╰────────⬣`
 conn.reply(m.chat, caption, m, { contextInfo: { externalAdReply: { showAdAttribution: true, mediaType: 2, mediaUrl: sig, body: wm, thumbnail: await(await conn.getFile(thumbnail)).data, sourceUrl: url}}}) 
  
  //let buttons = [{ buttonText: { displayText: 'VIDEO' }, buttonId: `${usedPrefix}ytv ${url} 360` }]
 //let msg = await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: captvid, footer: author, buttons }, { quoted: m })

  const yt = await youtubedl(url).catch(async _ => await youtubedlv2(url))
const link = await yt.audio['128kbps'].download()
  let doc = { 
  audio: 
  { 
    url: link 
}, 
mimetype: 'audio/mp4', fileName: `${title}`}

  return conn.sendMessage(m.chat, doc, { quoted: m })
	// return conn.sendMessage(m.chat, { document: { url: link }, mimetype: 'audio/mpeg', fileName: `${title}.mp3`}, { quoted: m})
	// return await conn.sendFile(m.chat, link, title + '.mp3', '', m, false, { asDocument: true })
}
handler.help = ['play'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^play$/i

handler.exp = 0
handler.limit = true

export default handler
