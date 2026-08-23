                          
                      
                                                          
  

import axios from 'axios'

let handler = async (m, { args, usedPrefix, command }) => {
  if (!args[0]) throw `📌 Contoh: ${usedPrefix + command} javascript 1`

  let query = args[0]
  let page = args[1] ? parseInt(args[1]) : 1
  let apiUrl = `https://codeshare.nauval.site/api/search?q=${encodeURIComponent(query)}&page=${page}`

  try {
    let { data } = await axios.get(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    })

    if (!data?.results?.length) throw `Tidak ada hasil untuk "${query}" di halaman ${page}`

    let caption = `🔍 *Pencarian Codeshare*\n`
    caption += `📌 Query: ${query}\n📄 Halaman: ${page}\n`
    caption += `💡 Total hasil: ${data.total || data.results.length}\n\n`

    data.results.forEach((item, i) => {
      caption += `*${(i + 1) + ((page - 1) * data.results.length)}. ${item.title}*\n`
      caption += `👤 ${item.author_username || '-'}`
      if (item.author_badge_details?.length) {
        let badges = item.author_badge_details.map(b => `${b.icon} ${b.display_name}`).join(', ')
        caption += ` [${badges}]`
      }
      caption += `\n`
      caption += `🗓️ ${item.created_at || '-'}\n`
      caption += `👁️ ${item.views || 0} views\n`
      caption += `🔗 https://codeshare.nauval.site/paste/${item.id}\n\n`
    })

    await conn.sendMessage(m.chat, { text: caption.trim() })

  } catch (err) {
    console.error(err)
    throw `Gagal mengambil hasil: ${err.message}`
  }
}

handler.command = /^searchcsc$/i
handler.help = ['searchcsc <query> [page]']
handler.tags = ['tools']
export default handler
