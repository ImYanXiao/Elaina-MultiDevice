import { areJidsSameUser } from '@rexxhayanasi/elaina-baileys';
import fetch from 'node-fetch';
import fs from 'fs';
import canvafy from 'canvafy';

const leaderboards = [
    'atm',
    'level',
    'exp',
    'money',
    'iron',
    'gold',
    'diamond',
    'emerald',
    'trash',
    'potion',
    'wood',
    'rock',
    'string',
    'umpan',
    'petfood',
    'common',
    'uncommon',
    'mythic',
    'legendary',
    'pet',
    'bank',
    'chip',
    'skata',
    'donasi',
    'deposit',
    'garam',
    'minyak',
    'gandum',
    'steak',
    'ayam_goreng',
    'ribs',
    'roti',
    'udang_goreng',
    'bacon'
]

leaderboards.sort((a, b) => a.localeCompare(b))

let handler = async (m, { conn, data, args, participants, usedPrefix, command }) => {
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
        return {
            ...value, jid: key
        }
    })
    let leaderboard = leaderboards.filter(v => v && users.filter(user => user && user[v]).length)
    let type = (args[0] || '').toLowerCase()
    const getPage = (item) => Math.ceil((users.filter(user => user && user[item]).length) / 0)
    let wrong = `🔖 type list :
${leaderboard.map(v => `
⮕ ${global.rpg.emoticon(v)} - ${v}
`.trim()).join('\n')}
––––––––––––––––––––––––
💁🏻‍♂ tip :
⮕ to view different leaderboard:
${usedPrefix}${command} [type]
★ Example:
${usedPrefix}${command} legendary`.trim()
    if (!leaderboard.includes(type)) return conn.adReply(m.chat, '*––––『 𝙻𝙴𝙰𝙳𝙴𝚁𝙱𝙾𝙰𝚁𝙳 』––––*\n' + wrong, 'L E A D E R B O A R D', '', flaImg.getRandom() + 'LEADERBOARD', global.config.website, m)
    let page = isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 0), getPage(type)): 0
    let sortedItem = users.map(toNumber(type)).sort(sort(type))
    let userItem = sortedItem.map(enumGetKey)
    const pp = who => conn.profilePictureUrl(who, 'image').catch(_ => fs.readFileSync('./src/avatar_contact.png'));
    let dataUser = await Promise.all(sortedItem.slice(page * 0, 1 * 5 + 5).map(async (user, i) => {
        return {
            top: i + 1,
            avatar: await pp(user.jid),
            tag: user.registered ? user.name : conn.getName(user.jid),
            score: parseInt(user[type])
        }
    }))
    let imageLb = await topRank(type, "https://pomf2.lain.la/f/ff3tkfm.jpg", dataUser)
    let text = `
🏆 rank: ${toRupiah(userItem.indexOf(m.sender) + 1)} out of ${toRupiah(userItem.length)}

                *• ${global.rpg.emoticon(type)} ${type} •*

${sortedItem.slice(page * 0, page * 5 + 5).map((user, i) => `${i + 1}.*﹙${toRupiah(user[type])}﹚*- ${participants.some(p => areJidsSameUser(user.jid, p.id)) ? `${user.registered ? user.name : conn.getName(user.jid)} \nwa.me/` : 'from other group\n @'}${user.jid.split`@`[0]}`).join`\n\n`}
`.trim()
    await conn.sendFile(m.chat, imageLb, '', text, m, false, { contextInfo: { mentionedJid: conn.parseMention(text) }})
}
handler.help = ['leaderboard']
handler.tags = ['xp']
handler.command = /^(leaderboard|lb)$/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler

function sort(property, ascending = true) {
    if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
    else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
    if (property) return (a, i, b) => {
        return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
    }
    else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
    return a.jid
}


   
                
                     
   
function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}

const flaImg = [
    'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
    'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
    'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
    'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
    'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text='
]

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/g, ".")

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substr(1)
}

async function topRank(message, image, data) {
    const top = await new canvafy.Top()
    .setOpacity(0.6)
    .setScoreMessage(capitalize(message) + ":")
    .setabbreviateNumber(true)
    .setBackground("image", image)
    .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' })
    .setUsersData(data)
    .build();

    return top
}
