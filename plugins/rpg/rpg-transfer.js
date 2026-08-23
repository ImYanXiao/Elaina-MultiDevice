let items = [
    'money', 'bank', 'potion', 'trash', 'wood',
    'rock', 'string', 'petfood', 'emerald',
    'diamond', 'gold', 'iron', 'common',
    'uncommon', 'mythic', 'legendary', 'pet', 'chip', 
    'anggur', 'apel', 'jeruk', 'mangga', 'pisang', 
    'bibitanggur', 'bibitapel', 'bibitjeruk', 'bibitmangga', 'bibitpisang',
]
let handler = async (m, { conn, args, usedPrefix, command }) => {
    let user = global.db.data.users[m.sender]
    let item = items.filter(v => v in user && typeof user[v] == 'number')
    let lol = `Use format ${usedPrefix + command} [type] [value] [number]
Example ${usedPrefix}${command} money 9999 @${m.sender.split("@")[0]}

📍 Transferable items
${item.map(v => `${global.rpg.emoticon(v)}${v}`.trim()).join('\n')}
`.trim()
    let type = (args[0] || '').toLowerCase()
    if (!item.includes(type)) return conn.reply(m.chat, lol, m, { mentions: [m.sender] })
    let count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
    let _user = global.db.data.users[who]
    if (!who) return m.reply('Tag salah satu, atau ketik Nomernya!!')
    if (!(who in global.db.data.users)) return m.reply(`User ${who} not in database`)
    if (user[type] * 1 < count) return m.reply(`Your *${type + special(type)} ${global.rpg.emoticon(type)}* is less *${toRupiah(count - user[type])}*`)
    if (/money/i.test(type) && _user[type] * 1 > 99999998) return m.reply(`${type}${global.rpg.emoticon(type)} @${who.split('@')[0]} sudah limit`, false, { mentions: [who] })
    let previous = user[type] * 1
    let _previous = _user[type] * 1
    user[type] -= count * 1
    _user[type] += count * 1
    if (previous > user[type] * 1 && _previous < _user[type] * 1) m.reply(`*––––––『 𝚃𝚁𝙰𝙽𝚂𝙵𝙴𝚁 』––––––*\n*📊 Status:* Succes\n*🗂️ Type:* ${type + special(type)} ${global.rpg.emoticon(type)}\n*🧮 Count:* ${toRupiah(count)}\n*📨 To:* @${(who || '').replace(/@s\.whatsapp\.net/g, '')}`, null, { mentions: [who] })
    else {
        user[type] = previous
        _user[type] = _previous
        m.reply(`*––––––『 TRANSFER 』––––––*\n*📊 Status:* Failted\n*📍 Item:* ${toRupiah(count)} ${type + special(type)} ${global.rpg.emoticon(type)}\n*📨 To:* @${(who || '').replace(/@s\.whatsapp\.net/g, '')}`, null, { mentions: [who] })
    }
}

handler.help = ['transfer']
handler.tags = ['rpg']
handler.command = /^(transfer|tf)$/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler

function special(type) {
    let b = type.toLowerCase()
    let special = (['common', 'uncommon', 'mythic', 'legendary', 'pet'].includes(b) ? ' Crate' : '')
    return special
}

function isNumber(x) {
    return !isNaN(x)
}

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/g, ".")
