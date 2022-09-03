let handler = async (m, { conn, text }) => {
	let setting = global.db.data.settings[conn.user.jid]
	if (new Date() * 1 - setting.status > 1000) {
		let _uptime = process.uptime() * 1000
		let uptime = clockString(_uptime);
		let bio = `Im ${namebot} 🤖 || ⏰ Aktif Selama ${uptime} || 🌎 Mode: ${global.opts['self'] ? 'Private' : setting.groupOnly ? 'Hanya Grup' : 'Publik'} || 🎨 Create By ${nameown}`)
		await conn.updateProfileStatus(bio).catch(_ => _)
		conn.reply(m.chat, 'Sukses Mengganti Bio Bot', m)
		setting.status = new Date() * 1
	}
}

export default handler
function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, ' *Days ☀️*\n ', h, ' *Hours 🕐*\n ', m, ' *Minute ⏰*\n ', s, ' *Second ⏱️* '].map(v => v.toString().padStart(2, 0)).join('')
}
