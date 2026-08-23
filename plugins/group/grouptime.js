let handler = async (m, { conn, text, args, command, usedPrefix }) => {
                      
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

                                                     


switch (command) {
case 'elainatutup':
				if (!m.isGroup) return m.reply(mess.group)
				if (args[1] == 'detik') {
					var timer = args[0] * `1000`
				} else if (args[1] == 'menit') {
					var timer = args[0] * `60000`
				} else if (args[1] == 'jam') {
					var timer = args[0] * `3600000`
				} else if (args[1] == 'hari') {
					var timer = args[0] * `86400000`
				} else {
					return m.reply(`[❗] invalid command\n/elainabuka 10 detik`)
				}
				m.reply(`Elaina menutup grub selama ${text} dimulai dari sekarang`)
				setTimeout(() => {
					var nomor = m.participant
					
					const close = `📢 *Elaina telah menutup group secara otomatis, hanya admin yang dapat mengirim pesan digrup (⁠･⁠–⁠･⁠)*`
					conn.groupSettingUpdate(chatId, 'announcement')
					m.reply(close)
				}, timer)
				
break
			case 'elainabuka':
				if (!m.isGroup) return m.reply(mess.group)
				if (args[1] == 'detik') {
					var timer = args[0] * `1000`
				} else if (args[1] == 'menit') {
					var timer = args[0] * `60000`
				} else if (args[1] == 'jam') {
					var timer = args[0] * `3600000`
				} else if (args[1] == 'hari') {
					var timer = args[0] * `86400000`
				} else {
					return m.reply(`[❗] invalid command\n/elainabuka 10 detik`)
				}
				m.reply(`Elaina membuka grub waktu ${text} dimulai dari sekarang`)
				setTimeout(() => {
					var nomor = m.participant
					const open = `📢 *Elaina telah membuka group secara otomatis setelah melakukan penutupan grup, semua peserta dapat mengirim pesan digrup ฅ⁠^⁠•⁠ﻌ⁠•⁠^⁠ฅ*`
					conn.groupSettingUpdate(chatId, 'not_announcement')
					m.reply(open)
				}, timer)
				}
   }
   
handler.help = handler.command = ["elainatutup","elainabuka"]
handler.tags = ['group']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
