import fetch from 'node-fetch'

const CSC_API_KEY = '4da03cc7ed3ace4e731b740076a071'

const LANG_MAP = {
  js: 'javascript',
  javascript: 'javascript',
  py: 'python',
  python: 'python',
  html: 'html',
  css: 'css',
  c: 'c',
  cpp: 'cpp',
  java: 'java',
  go: 'go',
  php: 'php',
  rb: 'ruby',
  ts: 'typescript',
  sh: 'shell',
  txt: 'text'
}

let handler = async (m, { text }) => {
  try {
    if (!text) return m.reply('⚠️ Format salah. Contoh:\n.cscpost js | Judul | Kode kamu')

    let [langRaw, titleRaw, ...codeParts] = text.split('|')
    if (!langRaw || !titleRaw || codeParts.length === 0) return m.reply('⚠️ Format salah!\nContoh: *.cscpost js | Judul | console.log("hi")*')

    let language = LANG_MAP[langRaw.trim().toLowerCase()]
    if (!language) return m.reply('⚠️ Bahasa tidak dikenal. Gunakan: js, py, html, cpp, etc.')

    let title = titleRaw.trim()
    let code_content = codeParts.join('|').trim()

    const response = await fetch('https://codeshare.cloudku.click/users.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CSC_API_KEY}`
      },
      body: JSON.stringify({
        title,
        code_content,
        language
      })
    })

    const result = await response.json()
    if (!result?.url) throw 'Upload gagal.'

    m.reply(`✅ Snippet berhasil diunggah!\n📄 Judul: ${title}\n💻 Bahasa: ${language}\n🔗 URL: ${result.url}`)
  } catch (e) {
    console.error(e)
    m.reply('❌ Gagal mengunggah snippet. Pastikan API Key valid dan format benar.')
  }
}

handler.command = /^cscpost$/i
handler.help = ['cscpost <bahasa> | <judul> | <kode>']
handler.tags = ['tools']
export default handler