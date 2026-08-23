import fs from 'fs'
let handler = async (m, { conn, usedPrefix }) => {
	let payi = `
╭─「 • *ᴘᴜʟꜱᴀ* • 」
│ • *Not Available* ${global.config.pulsa}
╰─────

╭─「 • *ᴇ-ᴡᴀʟʟᴇᴛ* • 」
│ • *ᴅᴀɴᴀ* ${global.config.dana ? global.config.dana : 'ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ'}
│ • *ɢᴏᴘᴀʏ* ${global.config.gopay ? global.config.gopay : 'ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ'}
│ • *ᴏᴠᴏ* ${global.config.ovo ? global.config.ovo : 'ꜱɪʟᴀʜᴋᴀɴ ꜱᴄᴀɴ Qʀɪꜱ ᴅɪᴀᴛᴀꜱ'}
╰─────

◛˖ _*ᴊɪᴋᴀ ꜱᴜᴅᴀʜ ᴍᴇᴍʙᴀʏᴀʀ*_\n_*ꜱɪʟᴀʜᴋᴀɴ ᴋɪʀɪᴍ ʙᴜᴋᴛɪ ᴘᴇᴍʙᴀʏᴀʀᴀɴ ᴋᴇ ᴏᴡɴᴇʀ ʙᴏᴛ...*_`
    await conn.sendFile(m.chat, fs.readFileSync('./media/qris.jpg'), 'qris.jpg', payi, m)
}
handler.help = ['payment']
handler.tags = ['info']
handler.command = /^(pay|payment|bayar)$/i

export default handler