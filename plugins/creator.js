import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who){
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:ᴏᴡɴᴇʀ;ᴇʟᴀɪɴᴀ;;ʙᴏᴛ\nFN:ᴏᴡɴᴇʀ ᴇʟᴀɪɴᴀ ʙᴏᴛ\nɴɪᴄᴋɴᴀᴍᴇ:🎐 ɪᴍ-ʏᴀɴxɪᴀᴏ\nORG:ʏᴀɴ-xɪᴀᴏ\nTITLE:xɪᴀᴏ\nitem1.TEL;waid=6285736178354:+62 857-3617-8354\nitem1.X-ABLabel:📞 Nomor Owner\nitem2.URL:https://github.com/ImYanXiao\nitem2.X-ABLabel:💬 More\nitem3.EMAIL;type=INTERNET:yanxiao021@mail.com\nitem3.X-ABLabel:💌 Mail Owner ᴇʟᴀɪɴᴀ ʙᴏᴛ\nitem4.ADR:;;🇮🇩 Indonesia;;;;\nitem4.X-ABADR:💬 More\nitem4.X-ABLabel:📍 My Location\nEND:VCARD`
const tag_own = await conn.sendMessage(m.chat, { contacts: { displayName: wm, contacts: [{ vcard }] }}, { quoted: fliveLoc })
let caption = `👋 Hai *${name} @${who.split("@")[0]}*, ᴛʜɪs ᴏᴡɴᴇʀ *${conn.user.name}* `
    await conn.sendButton(m.chat, caption, author, null, [['🎀 ᴍᴇɴᴜ', '#menu']], m, { quoted: tag_own, mentions: conn.parseMention(caption) })
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

export default handler
