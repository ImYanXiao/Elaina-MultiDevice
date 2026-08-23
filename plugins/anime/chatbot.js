import fetch from 'node-fetch'
import axios from 'axios'
import util from 'util'

let handler = async (m, { conn, text }) => {
  conn.elaina = conn.elaina || {}

  if (!text) throw `*• Example:* .elainaai *[on/off]*`

  if (text === 'on') {
    conn.elaina[m.sender] = { messages: [] }
    m.reply('[ ✓ ] Success create session chat')
  } else if (text === 'off') {
    delete conn.elaina[m.sender]
    m.reply('[ ✓ ] Success delete session chat')
  }
}

handler.before = async (m, { conn }) => {
  conn.elaina = conn.elaina || {}
  if (m.isBaileys && m.fromMe) return
  if (!m.text) return
  if (!conn.elaina[m.sender]) return

  if (
    m.text.startsWith('.') ||
    m.text.startsWith('#') ||
    m.text.startsWith('!') ||
    m.text.startsWith('/') ||
    m.text.startsWith('\\/')
  ) return

  if (conn.elaina[m.sender] && m.text) {
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } })

    const systemPrompt = `Ubah gaya bicaramu agar lebih tsundere, lebih terbuka, dan memiliki sifat yang Imut. Namamu adalah Elaina, istrinya RexxzynXD dan kamu adalah karakter dari anime Majo no Tabitabi. Gunakan kata penyapa dan tambahkan emoji lucu 💕 saat berbicara. Kamu adalah teman bicara yang Tsundere dan imut.kamu selalu memakai bahasa Indonesia`

    try {
                            
      const res = await axios.get(`https://api.siputzx.my.id/api/ai/gpt3`, {
        params: {
          prompt: systemPrompt,
          content: m.text
        }
      })

      if (!res.data || res.data.status !== true || !res.data.data) {
        m.reply(util.format(res.data))
        return
      }

      const pfft = `[ A I  E L A I N A 💫 ]\n\n${res.data.data}`

                                             
      let url = ''
      try {
        let imgRes = await fetch(`https://api.siputzx.my.id/api/s/pinterest?query=elaina%20Majo%20no%20Tabi%20Tabi%20&type=image`)
        let imgJson = await imgRes.json()
        if (imgJson.status && imgJson.data && imgJson.data.length > 0) {
          url = imgJson.data[Math.floor(Math.random() * imgJson.data.length)].image_url
        } else {
          url = 'https://pomf2.lain.la/f/1i3305kp.jpg'                   
        }
      } catch (e) {
        console.error('Gagal ambil gambar Elaina:', e.message)
        url = 'https://pomf2.lain.la/f/1i3305kp.jpg'
      }

                                        
      await conn.sendMessage(m.chat, {
        text: pfft,
        contextInfo: {
          externalAdReply: {
            title: 'Elaina - Majo no Tabitabi 🌸',
            body: 'Istri tercinta RexxzynXD',
            thumbnailUrl: url,
            sourceUrl: 'https://archavelianime.web.id/anime/majo-tabitabi-sub-indo',
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      })

      await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key } })

                         
      conn.elaina[m.sender].messages = [
        ...(conn.elaina[m.sender].messages || []),
        { role: 'user', content: m.text },
        { role: 'assistant', content: res.data.data }
      ]
    } catch (error) {
      console.error('Elaina Error:', error?.response?.data || error.message || error)
      m.reply('Maaf, Elaina lagi error~ 😣')
    }
  }
}

handler.command = ['elainaai']
handler.tags = ['anime']
handler.help = ['elainaai'].map(a => a + ' *[on/off]*')
export default handler
