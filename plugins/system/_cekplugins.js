import fs from 'fs'
import path from 'path'

const pluginFolder = './plugins'
const CHECK_INTERVAL = 2 * 60 * 1000           
let isChecking = false

async function checkAndCleanPlugins(conn, dir = pluginFolder) {
  if (dir === pluginFolder) {
    if (isChecking) return
    isChecking = true
  }

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (let entry of entries) {
      if (entry.name.startsWith('.')) continue
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
                                                                         
        await checkAndCleanPlugins(conn, fullPath)
        continue
      }

      if (!entry.name.endsWith('.js')) {
        fs.unlinkSync(fullPath)
        console.log(`🗑️ Dihapus: ${fullPath}`)

        const ownerNumber = global.config?.owner?.[0]?.[0]
        if (ownerNumber) {
          await conn.sendMessage(ownerNumber + '@s.whatsapp.net', {
            text: `⚠️ File plugin *${fullPath}* dihapus karena tidak berakhiran *.js*`
          })
        }
      }
    }
  } catch (err) {
    console.error('❌ Gagal memeriksa folder plugins:', err)
  } finally {
    if (dir === pluginFolder) isChecking = false
  }
}

setInterval(() => {
  if (global.conn) checkAndCleanPlugins(global.conn)
}, CHECK_INTERVAL)

export default {}
