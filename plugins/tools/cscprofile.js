                          
                                       
                                                                         
                          
  

import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { args, usedPrefix, command }) => {
  if (!args[0]) throw `Contoh pemakaian: ${usedPrefix + command} RexxHayanasi`
  let username = args[0]
  let url = `https://codeshare.cloudku.click/profile?user=${encodeURIComponent(username)}`

  try {
    let { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })
    let $ = cheerio.load(html)

    let ppUrl = $('.profile-avatar').attr('src')
    if (ppUrl && !ppUrl.startsWith('http')) {
      ppUrl = `https://codeshare.cloudku.click/${ppUrl}`
    }

    let name = $('.profile-name').text().trim() || username
    let bio = $('.profile-bio').text().trim() || 'Tidak ada bio'
    let followers = $('.stat-item:contains("Followers") strong').text().trim() || '0'
    let following = $('.stat-item:contains("Following") strong').text().trim() || '0'

    let snippets = []
    $('.snippet-card').each((i, el) => {
      let path = $(el).attr('href')
      let fullLink = path ? `https://codeshare.cloudku.click${path}` : ''
      let title = $(el).find('h3').text().trim() || `Snippet ${i+1}`
      let date = $(el).find('.snippet-meta').text().trim().replace('Shared on ', '')
      
      snippets.push({
        title,
        link: fullLink,
        date
      })
    })

    let caption = `👤 *${name}* (${username})\n`
    caption += `📝 *Bio*: ${bio}\n`
    caption += `👥 *Followers*: ${followers} | *Following*: ${following}\n\n`
    
    if (snippets.length > 0) {
      caption += `📄 *Snippet Terbaru (${snippets.length})*\n`
      snippets.slice(0, 3).forEach(snip => {
        caption += `\n🔗 *${snip.title}*\n`
        caption += `📅 ${snip.date}\n`
        caption += `${snip.link}\n`
      })
      if (snippets.length > 3) {
        caption += `\nDan ${snippets.length - 3} snippet lainnya...`
      }
    }

    if (ppUrl) {
      await conn.sendMessage(m.chat, {
        image: { url: ppUrl },
        caption: caption,
        contextInfo: {
          externalAdReply: {
            title: `Profil ${name}`,
            body: `${bio} • ${followers} Followers`,
            thumbnailUrl: ppUrl,
            sourceUrl: url
          }
        }
      })
    } else {
      await conn.sendMessage(m.chat, {
        text: caption,
        contextInfo: {
          externalAdReply: {
            title: `Profil ${name}`,
            body: `${bio} • ${followers} Followers`,
            thumbnailUrl: 'https://i.imgur.com/8RmUsZL.png',
            sourceUrl: url
          }
        }
      })
    }

  } catch (error) {
    console.error('Error:', error)
    throw `Gagal mengambil profil:\n${error.message}`
  }
}

handler.command = /^stalkcsc$/i
handler.help = ['stalkcsc <username>']
handler.tags = ['tools']
export default handler
