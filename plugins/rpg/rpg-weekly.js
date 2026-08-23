const rewards = {
  exp: 15000,
  money: 35999,
  potion: 9,
  limit: 10
}
const cooldown = 604800000
let handler = async (m, { conn, usedPrefix }) => {
  let user = global.db.data.users[m.sender]
  if (new Date - user.lastweekly < cooldown) return m.reply(`You've already claimed *weekly rewards*, please wait till cooldown finish.\n\n${((user.lastweekly + cooldown) - new Date()).toTimeString()}`)
  let text = ''
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue
    user[reward] += rewards[reward]
    text += `*+${toRupiah(rewards[reward])}* ${global.rpg.emoticon(reward)}${reward}\n`
  }
  m.reply(text.trim())
  user.lastweekly = new Date * 1
}
handler.help = ['weekly']
handler.tags = ['rpg']
handler.command = /^(weekly)$/i
handler.register = true
handler.group = true
handler.cooldown = cooldown
handler.rpg = true
export default handler

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/gi, ".")