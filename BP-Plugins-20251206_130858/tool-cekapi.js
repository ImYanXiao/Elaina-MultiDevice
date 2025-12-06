import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, args, command }) => {
	let type = (args[1] || '').toLowerCase()
    let _type = (args[1] || '').toLowerCase()
    if (!args[0]) return m.reply('Apikeynya mana?')
  
  let cek = '「🔎」ᴍᴇɴᴄᴀʀɪ ᴀᴘɪᴋᴇʏ...'
try {
    if (/cekapi(key)?|cekkey/i.test(command)) {
      const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
        switch (type) {
       case 'xteam':
       if (type == 'xteam') {
         let xteam = await (await fetch(`https://api.xteam.xyz/cekey?APIKEY=${args[0]}`)).json().catch(v => 'error')
         await m.reply(cek)
         if (xteam == 'error') {
m.reply(`Maaf restapi ini sedang error, harap coba lagi nanti`)
} else { 
if (xteam.response == "Only alphanumeric!") return m.reply('Only alphanumeric!')
 if (xteam.response == "Apikey tidak ditemukan, silahkan daftar atau beli ke developer untuk mendapatkan apikey yang valid!") return m.reply('ɪɴᴠᴀʟɪᴅ ᴀᴘɪᴋᴇʏ !')
conn.reply(m.chat, `• *ᴛʏᴘᴇ:* XTEAM
• *ᴀᴘɪᴋᴇʏ:* ${args[0]}

• *ɴᴀᴍᴇ:* ${xteam.response.name}
• *ɪᴘ:* ${xteam.response.ip}
• *ᴇᴍᴀɪʟ:* ${xteam.response.email}
• *ᴛᴏᴛᴀʟ ʜɪᴛ:* ${xteam.response.totalhit}
• *ᴘʀᴇᴍɪᴜᴍ:* ${xteam.response.premium}

• *ᴇxᴘɪʀᴇᴅ:* ${(xteam.response.expired).replace('Premium left:', '')}`, m)
}
}
            break
          case 'lolhuman': 
    let lol = await (await fetch(`https://api.lolhuman.xyz/api/checkapikey?apikey=${args[0]}`)).json()
    m.reply(cek)
    if (lol.message == 'success') {
    conn.reply(m.chat, `• *ᴛʏᴘᴇ:* LOLHUMAN
• *ᴀᴘɪᴋᴇʏ:* ${args[0]}

• *ɴᴀᴍᴇ:* ${lol.result.username}
• *ᴛᴏᴛᴀʟ ʜɪᴛ:* ${lol.result.requests}
• *ʜɪᴛ ᴛᴏᴅᴀʏ:* ${lol.result.today}
• *ᴀᴄᴄᴏᴜɴᴛ:* ${lol.result.account_type}

• *ᴇxᴘɪʀᴇᴅ:* ${lol.result.expired}`, m)
} else m.reply('ɪɴᴠᴀʟɪᴅ ᴀᴘɪᴋᴇʏ !')
            break
          default:
            return conn.sendButton(m.chat, `*${htki} CEK APIKEY ${htka}*`, 'sᴇʟᴇᴄᴛ ᴛʏᴘᴇ ᴀᴘɪᴋᴇʏ ʜᴇʀᴇ!', null, [['xᴛᴇᴀᴍ', `.cekapi ${args[0]} xteam`],['ʟᴏʟʜᴜᴍᴀɴ', `.cekapi ${args[0]} lolhuman`]],m)
        }
    } else if (/enchant|enchan/i.test(command)) {
      const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count)
      switch (_type) {
        case 't':
          break
        case '':
          break

        default:
          return conn.sendButton( m.chat, wm, wm, null, [`⋮☰ Menu`, `.menu`], m)
      }
    }
  } catch (err) {
    m.reply("Error\n\n\n" + err.stack)
  }
}
handler.help = ['cekapikey']
handler.tags = ['internet', 'tools']
handler.command = /^(cek(key|api))$/i

export default handler
