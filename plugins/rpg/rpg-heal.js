let handler = async (m, { args, usedPrefix, __dirname }) => {
    let user = global.db.data.users[m.sender]
    if (user.health >= 100) return m.reply(`
Your ❤️health is full!
`.trim())
    const heal = 40 + (user.cat * 4)
    let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((100 - user.health) / heal)))) * 1
    if (user.potion < count) return m.reply(`You need to buy ${count - user.potion} more 🥤Potion to heal.
you've ${user.potion} 🥤potion in bag.`.trim())
    user.potion -= count * 1
    user.health += heal * count
    m.reply(`Succesfully ${count} 🥤potion use to recover health.`)
}

handler.help = ['heal']
handler.tags = ['rpg']
handler.command = /^(heal)$/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}