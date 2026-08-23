const rewards = {
    exp: 9999,
    money: 4999,
    potion: 5,
    limit: 5
}
const cooldown = 79200000
let handler = async (m, { conn, usedPrefix }) => {

    let user = global.db.data.users[m.sender]
    if (new Date - user.lastclaim < cooldown) return m.reply(`You've already claimed *today rewards*, please wait till cooldown finish.

⏱️ ${((user.lastclaim + cooldown) - new Date()).toTimeString()}`.trim())
    let text = ''
    for (let reward of Object.keys(rewards)) {
        if (!(reward in user)) continue
        user[reward] += rewards[reward]
        text += `➠ ${global.rpg.emoticon(reward)} ${reward}: ${toRupiah(rewards[reward])}\n`
    }
    m.reply(`🔖 Daily reward received :

${text}`.trim())
    user.lastclaim = new Date * 1
}
handler.help = ['claim']
handler.tags = ['xp']
handler.command = /^(daily|claim)$/i

handler.register = true
handler.group = true
handler.rpg = true
export default handler

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/gi, ".")