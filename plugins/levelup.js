import fetch from 'node-fetch'
import { canLevelUp, xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, usedPrefix }) => {
  // let pp = './src/avatar_contact.png'
  let who = m.sender
  let name = conn.getName(m.sender)
  let discriminator = who.substring(9, 13)
  let pp = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
	try {
		pp = await this.profilePictureUrl(m.sender, 'image')
	} catch (e) {
	} finally {
    let user = global.db.data.users[m.sender]
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
      return { ...value, jid: key }
    })
    let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
    let usersLevel = sortedLevel.map(enumGetKey)
    let { min, xp, max } = xpRange(user.level, global.multiplier)
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
      let rank = 'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=birdy-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=DIKIT%20LAGI%20NAIK'
        {
          await conn.sendButtonImg(m.chat, rank, `Level ${name} ${user.level} (${user.exp - min}/${xp})\nKurang ${max - user.exp} EXP lagi!`.trim(), wm, 'Enable autolevelup', `${usedPrefix}on autolevelup`, m)
        }
    }
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
      let rank = 'https://telegra.ph/file/5acbd203b92c03cdde356.jpg'
        {
          await conn.sendButtonImg(m.chat, rank, `${name} Level Up!\n_${before}_ -> ${user.level}`.trim(), wm, 'AUTO LEVEL UP', `${usedPrefix}on autolevelup`)
          //await conn.sendButtonLoc(m.chat, await (await fetch(rank)).buffer(), `${name} Level Up!\n_${before}_ -> ${user.level}`.trim(), wm, 'AUTO LEVEL UP', `${usedPrefix}on autolevelup`, m)
        }
    }
  }
}

handler.help = ['levelup']
handler.tags = ['xp']

handler.command = /^levelup$/i

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
