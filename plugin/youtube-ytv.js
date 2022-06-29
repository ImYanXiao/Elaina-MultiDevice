let limit = 80
import fetch from 'node-fetch'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'

let handler = async (m, { conn, args, isPrems, isOwner }) => {
  let wibu = `https://api.zacros.my.id/randomimg/loli`    
let thumb = await(await fetch(wibu)).buffer()
  if (args && /(?:https?:\/{2})?(?:w{3}|m|music)?\.?youtu(?:be)?\.(?:com|be)(?:watch\?v=|\/)([^\s&]+)/i.test(args[0])) {
    let opt = args[1] && args[1].isNumber() ? args[1].replace(/\D/g, '') : ''
    let res = await fetch(`https://yt-downloader.aliefputra.repl.co/yt?url=${args[0]}`)
    res = await res.json()
    if (!res) res = ''
    let { description, ownerChannelName, viewCount, uploadDate, likes, dislikes } = res.result.videoDetails
    let { thumbnail, video: _video, title } = await youtubedlv2(args[0]).catch(async _ => await youtubedl(args[0])).catch(async _ => await youtubedlv3(args[0]))
    await m.reply('_In progress, please wait..._')
    let limitedSize = (isPrems || isOwner ? 99 : limit) * 1024
    let video, quality, link, lastError, isLimit //, source
    for (let i in _video) {
      try {
        video = _video[i]
        quality = video.quality
        console.log(video)
        isLimit = video.fileSize > limitedSize
        if (isLimit && /1080p/.test(quality) || !quality.includes(opt)) continue
        link = await video.download()
        // if (isLimit) return conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: `*Title:* ${title}\n*Link:* ${await shortUrl(link)}\n\n_Filesize too big_` }, { quoted: m })
        if (link) break
        // if (source instanceof ArrayBuffer) break
      } catch (e) {
        video = quality = link = null
        lastError = e
        continue
      }
    }
    if (!link) throw 'Error: ' + (lastError || 'Can\'t download video')
    let _thumb = {}
    try { _thumb = { jpegThumbnail: await (await fetch(thumbnail)).buffer() } }
    catch (e) { }
    await conn.sendMessage(m.chat, { [/^(?:-|--)doc$/i.test(args[1]) || isLimit ? 'document' : 'video']: { url: link }, fileName: `${title}.mp4`, mimetype: 'video/mp4', ..._thumb }, { quoted: fkontak },{ contextInfo: { externalAdReply: { showAdAttribution: true,
      mediaUrl: "https://Instagram.com/Xiao_yan_21",
      mediaType: "VIDEO",
      description: "https://Instagram.com/Xiao_yan_21", 
      title: 'ᴋᴀɴɴᴀ-ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ',
      body: wm,
      thumbnail: thumb,
      sourceUrl: sgh
    }}}).then(async (msg) => {
      let caption = `*Title:* ${title}\n*Quality:* ${quality}\n*Channel:* ${ownerChannelName || ''}\n*Views:* ${viewCount}\n*Upload Date:* ${uploadDate}${likes ? `\n*Likes:* ${likes}` : ''}${dislikes ? `\n*Dislikes*: ${dislikes}` : ''}${description ? `\n*Description:*\n${description}` : ''}`.trim()
      await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption }, { quoted: msg })
    })
  } else throw 'Invalid URL'
}
handler.help = ['ytmp4']
handler.tags = ['downloader']
handler.command = /^yt(v|mp4)?$/i
handler.exp = 0

export default handler

async function shortUrl(url) {
  url = encodeURIComponent(url)
  let res = await fetch(`https://is.gd/create.php?format=simple&url=${url}`)
  if (!res.ok) throw false
  return await res.text()
}
