var handler = async (m, { conn, usedPrefix, text, args, command }) => {
let mentionedJid = [m.sender]

  const sentMsg = await conn.sendContactArray(m.chat, [
    [`${nomorown}`, `${await conn.getName(nomorown+'@s.whatsapp.net')}`, `💌 Developer Bot `, `Just Solo People`, `yanxiao021@gmail.com`, `🇮🇩 Indonesia`, `📍 https://github.com/ImYanXiao`, `👤 ᴏᴡɴᴇʀ ᴇʟᴀɪɴᴀ ʙᴏᴛ`], 
    [`${conn.user.jid.split('@')[0]}`, `${await conn.getName(conn.user.jid)}`, `🎈 ʙᴏᴛ ᴡʜᴀᴛsᴀᴘᴘ`, `📵 ᴅᴏɴᴛ sᴘᴀᴍ/ᴄᴀʟʟ ᴍᴇ 😢`, `ɴᴏᴛʜɪɴɢ`, `🇮🇩 Indonesia`, `📍 https://github.com/ImYanXiao/Elaina-MultiDevice`, `Just a Bot, My Happiness Depends on My Owner 🌥`]
  ], global.fkontak)
  await conn.reply(m.chat, `ʜᴇʟʟᴏ @${m.sender.split(`@`)[0]} ᴛʜᴀᴛs ᴍʏ ᴏᴡɴᴇʀ ᴅᴏɴᴛ sᴘᴀᴍ ᴏʀ ʏᴏᴜ ᴡɪʟʟ ʙᴇ ʙʟᴏᴄᴋᴇᴅ`, m, { contextInfo : { mentionedJid }}) 
  } 
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

export default handler