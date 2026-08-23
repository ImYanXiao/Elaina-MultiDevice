import fs from 'fs'
import FormData from 'form-data'

let handler = async (m, { conn }) => {
  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
      ? conn.user.jid
      : m.sender

  let alok = {
    key: { participant: '0@s.whatsapp.net' },
    message: {
      orderMessage: {
        itemCount: 99999999,
        surface: 99999999,
        message: 'T O U R L',
        orderTitle: 'H A L O',
        thumbnail: fs.readFileSync('./media/thumbnail.jpg'),
        sellerJid: '0@s.whatsapp.net'
      }
    }
  }

  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Tidak ada media ditemukan.'

  if (!/image\/(jpe?g|png|gif|webp)/.test(mime)) {
    throw 'Telegraph hanya mendukung gambar.'
  }

  let media = await q.download()
  if (!media) throw 'Gagal mendownload media.'

  let ext = mime.split('/')[1]
  let filename = `upload.${ext}`

  let link = await uploadTelegraph(media, filename)

  let caption = `🚩 *ʟɪɴᴋ:*
${link}

☘️ *sɪᴢᴇ :* ${media.length} Byte
🍁 *ᴇxᴘɪʀᴇᴅ :* No Expiry

– *s ʜ ᴏ ʀ ᴛ :* ${await shortUrl(link)}`

  conn.sendMessage(m.chat, {
    text: caption,
    contextInfo: {
      externalAdReply: {
        mediaUrl: '',
        mediaType: 1,
        title: '',
        body: 'E L A I N A  M U L T I D E V I C E',
        thumbnailUrl: 'https://telegra.ph/file/5c636746e3be7de5fb61f.jpg',
        sourceUrl: 'https://whatsapp.com/channel/0029VaF8RYn9WtC16ecZws0H',
        renderLargerThumbnail: true,
        showAdAttribution: true
      }
    }
  }, { quoted: alok })
}

handler.help = ['tourl']
handler.tags = ['tools']
handler.command = /^(tourl|upload)$/i
export default handler

async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
  return await res.text()
}

async function uploadTelegraph(buffer, filename) {
  let form = new FormData()
  form.append('file', buffer, filename)

  let res = await fetch('https://telegra.ph/upload', {
    method: 'POST',
    body: form
  })

  let json = await res.json()
  if (!json[0]?.src) throw 'Gagal upload ke Telegraph'
  return 'https://telegra.ph' + json[0].src
}