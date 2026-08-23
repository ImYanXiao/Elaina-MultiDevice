let handler = async (m, { conn, args }) => {
  try {
    const res = await fetch("https://api.siputzx.my.id/api/berita/jkt48")
    const json = await res.json()

    if (!json.status) return m.reply("ɢᴀɢᴀʟ ᴍᴇɴɢᴀᴍʙɪʟ ᴅᴀᴛᴀ ʙᴇʀɪᴛᴀ.")

    const limit = parseInt(args[0]) || 10
    let teks = "*📢 𝗕𝗲𝗿𝗶𝘁𝗮 𝗧𝗲𝗿𝗯𝗮𝗿𝘂 𝗝𝗞𝗧𝟰𝟴:*\n\n"

    json.data.slice(0, limit).forEach((item, i) => {
      teks += `${i + 1}. ${item.title}\n🗓️ ${item.date}\n🔗 ${item.link}\n\n`
    })

    m.reply(teks.trim())
  } catch (e) {
    console.error(e)
    m.reply("ᴛᴇʀᴊᴀᴅɪ ᴋᴇsᴀʟᴀʜᴀɴ sᴀᴀᴛ ᴍᴇɴɢᴀᴍʙɪʟ ʙᴇʀɪᴛᴀ.")
  }
}

handler.tags = ["news"]
handler.command = /^(jkt48news)$/i
handler.register = true

export default handler