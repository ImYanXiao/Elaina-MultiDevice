const rewards = {
    exp: 50000,
    money: 49999,
    potion: 10,
    mythic: 3,
    legendary: 1,
    limit: 20
}

const cooldown = 2592000000
let handler = async (m, { conn, usedPrefix }) => {
    let user = global.db.data.users[m.sender]
    if (new Date - user.lastmonthly < cooldown) return m.reply(`You've already claimed *monthly rewards*, please wait till cooldown finish.

⏱️ ${((user.lastmonthly + cooldown) - new Date()).toTimeString()}`.trim())
    let text = ''
    for (let reward of Object.keys(rewards)) if (reward in user) {
        user[reward] += rewards[reward]
        text += `➠ ${global.rpg.emoticon(reward)} ${reward}: ${toRupiah(rewards[reward])}\n`
    }
    m.reply(`🔖 Monthly Reward Received :
${text}`.trim())
    user.lastmonthly = new Date * 1
}
handler.help = ['monthly']
handler.tags = ['rpg']
handler.command = /^(monthly)$/i
handler.register = true
handler.group = true
handler.cooldown = cooldown
handler.rpg = true
export default handler

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/gi, ".")