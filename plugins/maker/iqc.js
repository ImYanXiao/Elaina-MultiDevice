import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw `📌 Gunakan format:
.iqc jam|batre|pesan

Contoh:
.iqc 18:00|40|hai hai

⛔ Jam tidak boleh lebih dari 24:00
⛔ Baterai maksimal 100%`
  }

  let [time, battery, ...msg] = text.split('|')

  if (!time || !battery || msg.length === 0) {
    throw `❌ Format salah!

Contoh penggunaan:
.iqc 18:00|40|hai hai

• Jam tidak boleh lebih dari 24:00
• Baterai tidak boleh lebih dari 100`
  }

                         
  let [hh, mm] = time.split(':').map(v => Number(v))
  if (
    isNaN(hh) || isNaN(mm) ||
    hh < 0 || hh > 24 ||
    mm < 0 || mm >= 60
  ) {
    throw `❌ Format jam salah! Pastikan dalam 24-jam dan menit < 60`
  }

                     
  if (isNaN(battery) || Number(battery) < 0 || Number(battery) > 100) {
    throw `❌ Baterai harus antara 0 sampai 100`
  }

  try {
                          
    await global.loading(m, conn)

    let messageText = encodeURIComponent(msg.join('|').trim())
    let url = `https://brat.siputzx.my.id/iphone-quoted` +
              `?time=${encodeURIComponent(time)}` +
              `&batteryPercentage=${battery}` +
              `&carrierName=INDOSAT` +
              `&messageText=${messageText}` +
              `&emojiStyle=apple`

    let res = await fetch(url)
    if (!res.ok) throw '❌ Gagal mengambil gambar dari server.'

    let buffer = await res.buffer()
    await conn.sendMessage(m.chat, { image: buffer }, { quoted: m })
  } catch (e) {
    throw e
  } finally {
                            
    await global.loading(m, conn, true)
  }
}

handler.help = ['iqc jam|batre|pesan']
handler.tags = ['maker']
handler.command = ['iqc']

export default handler
