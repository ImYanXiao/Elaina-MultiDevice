import moment from 'moment-timezone'

let bioInterval = null

function startAutoBio(conn) {
  if (bioInterval) return // jangan duplikat interval

  bioInterval = setInterval(async () => {
    try {
      const waktu = moment().tz('Asia/Jakarta').format('HH:mm:ss')
      const namaOwner = global.config?.owner?.[0]?.[1] || 'Unknown'
      const bio = `🥀 Elaina MultiDevice aktif ${waktu} | Owner Script: ${namaOwner}`
      await conn.updateProfileStatus(bio).catch(() => {})
    } catch (e) {
      console.error('Auto bio error:', e)
    }
  }, 10000) //  detik
}