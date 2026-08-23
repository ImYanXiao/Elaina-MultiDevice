import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let url = args[0]
  if (!url) return m.reply(`Contoh:\n${usedPrefix + command} https://pin.it/7jWBaQGhd`)

  if (!/^https?:\/\/(www\.)?pin(it|terest)\./i.test(url)) {
    return m.reply('❌ Link Pinterest tidak valid.')
  }

  try {
    let api = `https://api.siputzx.my.id/api/d/pinterest?url=${encodeURIComponent(url)}`
    let res = await fetch(api)
    let json = await res.json()

    if (!json.status || !json.data) return m.reply('❌ Gagal mendapatkan data dari API.')

    let media = json.data.media_urls
    if (!media || media.length === 0) return m.reply('❌ Tidak ada media yang ditemukan.')

    let best = media.find(x => x.quality === 'original') || media[0]

    let caption = `📌 *Pinterest Downloader*\n🆔 ID: ${json.data.id}\n📏 Resolusi: ${best.size}\n🔗 URL Asli: ${json.data.original_url}`

    if (best.type === 'image') {
      await conn.sendMessage(m.chat, {
        image: { url: best.url },
        caption
      }, { quoted: m })
    } else if (best.type === 'video') {
      await conn.sendMessage(m.chat, {
        video: { url: best.url },
        caption
      }, { quoted: m })
    } else {
      m.reply('❌ Jenis media tidak dikenali.')
    }

  } catch (e) {
    console.error(e)
    m.reply('❌ Terjadi kesalahan saat memproses Pinterest.')
  }
}

handler.help = ['pindl <url>']
handler.tags = ['downloader']
handler.command = /^pindl$/i

export default handler