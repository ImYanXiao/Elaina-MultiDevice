import fs from 'fs'
import path from 'path'

const pluginFolder = './plugins'
const CHECK_INTERVAL = 2 * 60 * 1000 // 2 menit
let isChecking = false

async function checkAndCleanPlugins(conn) {
  if (isChecking) return
  isChecking = true

  try {
    const files = fs.readdirSync(pluginFolder)

    for (let file of files) {
      const fullPath = path.join(pluginFolder, file)

      if (!file.endsWith('.js') && fs.lstatSync(fullPath).isFile()) {
        fs.unlinkSync(fullPath)
        console.log(`🗑️ Dihapus: ${file}`)

        const ownerNumber = global.config?.owner?.[0]?.[0]
        if (ownerNumber) {
          await conn.sendMessage(ownerNumber + '@s.whatsapp.net', {
            text: `⚠️ File plugin *${file}* dihapus karena tidak berakhiran *.js*`
          })
        }
      }
    }
  } catch (err) {
    console.error('❌ Gagal memeriksa folder plugins:', err)
  } finally {
    isChecking = false
  }
}

setInterval(() => {
  if (global.conn) checkAndCleanPlugins(global.conn)
}, CHECK_INTERVAL)

export default {}