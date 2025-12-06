import https from 'https'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const OWNER = 'ImYanXiao'
const REPO = 'Elaina-MultiDevice'
const BRANCH = 'master'
const SKIP_FILES = ['package.json', 'config.js', 'README.md']

function checkNodeVersion() {
  const major = parseInt(process.versions.node.split('.')[0])
  if (major < 21) {
    console.clear()
    console.log('========================================')
    console.log('  NODE.JS VERSION TIDAK DIDUKUNG')
    console.log('========================================')
    console.log(`  Versi saat ini : Node.js ${process.versions.node}`)
    console.log('  Minimal versi : Node.js v21.x.x')
    console.log('')
    console.log('  Silakan update Node.js terlebih dahulu:')
    console.log('  https://nodejs.org/')
    console.log('========================================')
    process.exit(1)
  }
}

function requestJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Elaina-Updater' } }, res => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(e)
        }
      })
    }).on('error', reject)
  })
}

function requestBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      const data = []
      res.on('data', chunk => data.push(chunk))
      res.on('end', () => resolve(Buffer.concat(data)))
    }).on('error', reject)
  })
}

function sha1(buf) {
  return crypto.createHash('sha1').update(buf).digest('hex')
}

async function scanFolder(dirPath = '') {
  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${dirPath}?ref=${BRANCH}`
  const list = await requestJSON(apiUrl)

  if (!Array.isArray(list)) {
    console.log(`[WARNING] Path ${dirPath || '/'} tidak ditemukan atau bukan folder.`, list.message || '')
    return
  }

  for (const item of list) {
    const localPath = path.join(process.cwd(), item.path)

    if (SKIP_FILES.includes(path.basename(item.path))) continue

    if (item.type === 'dir') {
      if (!fs.existsSync(localPath)) fs.mkdirSync(localPath, { recursive: true })
      await scanFolder(item.path)
      continue
    }

    const remoteBuffer = await requestBuffer(item.download_url)

    let needUpdate = true
    if (fs.existsSync(localPath)) {
      const localBuffer = fs.readFileSync(localPath)
      if (sha1(localBuffer) === sha1(remoteBuffer)) needUpdate = false
    }

    if (needUpdate) {
      fs.mkdirSync(path.dirname(localPath), { recursive: true })
      fs.writeFileSync(localPath, remoteBuffer)
      console.log('[UPDATE]', item.path)
    }
  }
}

export default async function checkUpdate() {
  try {
    checkNodeVersion()
    console.log('[SYSTEM] 💐 Sedang cek update terbaru dari github tunggu sebentar ...')
    await scanFolder('')
    console.log('[SYSTEM] ✅ Update selesai.')
  } catch (err) {
    console.log('[SYSTEM] ✖️ Update gagal:', err.message)
  }
}
