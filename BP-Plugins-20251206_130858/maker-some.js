const effects = ['jail', 'gay', 'glass', 'wasted' ,'triggered', 'lolice', 'simpcard', 'horny']

let handler = async (m, { conn, usedPrefix, text, command }) => {
let effect = text.trim().toLowerCase()
if (!effects.includes(effect)) throw `

┌─⊷ *List Effect*
${effects.map(effect => `▢ ${effect}`).join('\n')}
└───────────

📌 *Example:* 
${usedPrefix + command} wasted 
`.trim()
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

let data = global.API('https://some-random-api.com', '/canvas/' + effect, {
avatar: await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')}) 
conn.sendFile(m.chat, data, '', 'Nih Kak ' + effect + ' Cardnya', m) 
}

handler.help = ['maker']
handler.tags = ['maker']
handler.command = ['maker'] 
handler.limit = false

export default handler
