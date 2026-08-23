import axios from 'axios'

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args.length) {
    return conn.reply(m.chat, `${usedPrefix + command} <url>`, m)
  }

  const input = args.join(' ').trim()
  let yt

  try {
    yt = new URL(input)
  } catch {
    return conn.reply(m.chat, 'Invalid YouTube URL', m)
  }

  if (!/youtube\.com|youtu\.be/.test(yt.hostname)) {
    return conn.reply(m.chat, 'Invalid YouTube URL', m)
  }

  try {
    await global.loading(m, conn)

    const response = await axios.get('https://api.vreden.my.id/api/v1/download/youtube/video', {
      params: {
        url: yt.href,
        quality: 360
      }
    })

    const result = response.data?.result
    if (!response.data?.status || !result?.status) {
      return conn.reply(m.chat, 'Gagal mengambil data video.', m)
    }

    const { metadata, download } = result

    conn.ytmp4 = conn.ytmp4 || {}
    conn.ytmp4[m.sender] = {
      url: yt.href,
      metadata,
      available: download.availableQuality
    }

    const list = download.availableQuality.map(v => `• ${v}p`).join('\n')

    const sent = await conn.sendMessage(
      m.chat,
      {
        text: `*${metadata.title}*\n\nPilih quality dengan membalas angka:\n${list}\n\nContoh:\n360`,
        contextInfo: {
          externalAdReply: {
            title: metadata.title,
            body: metadata.author.name,
            thumbnailUrl: metadata.thumbnail || metadata.image,
            sourceUrl: metadata.url,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      },
      { quoted: m }
    )

    conn.ytmp4[m.sender].msgId = sent.key.id
  } catch (e) {
    conn.reply(m.chat, e.response?.data?.message || e.message, m)
  } finally {
    await global.loading(m, conn, true)
  }
}

handler.before = async (m, { conn }) => {
  const s = conn.ytmp4 && conn.ytmp4[m.sender]
  if (!s) return
  if (!m.quoted || m.quoted.id !== s.msgId) return

  const q = parseInt(m.text)
  if (isNaN(q)) return

  if (!s.available.includes(q)) {
    return conn.reply(m.chat, s.available.map(v => v + 'p').join(', '), m)
  }

  try {
    await global.loading(m, conn)

    const response = await axios.get('https://api.vreden.my.id/api/v1/download/youtube/video', {
      params: {
        url: s.url,
        quality: q
      }
    })

    const result = response.data?.result
    if (!result?.download?.url) {
      return conn.reply(m.chat, 'Video tidak tersedia.', m)
    }

    await conn.sendMessage(
      m.chat,
      {
        video: { url: result.download.url },
        mimetype: 'video/mp4',
        caption: `${s.metadata.title} (${q}p)`
      },
      { quoted: m }
    )
  } catch (e) {
    conn.reply(m.chat, e.response?.data?.message || e.message, m)
  } finally {
    delete conn.ytmp4[m.sender]
    await global.loading(m, conn, true)
  }
}

handler.help = ['ytmp4']
handler.tags = ['downloader']
handler.command = /^(yt(mp4|video)|youtube(mp4|video))$/i
handler.limit = true

export default handler