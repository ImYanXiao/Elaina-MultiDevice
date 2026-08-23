import fetch from "node-fetch"
let tfinventory = {
  others: {
    money: true,
  },
  tfitems: {
    potion: true,
    trash: true,
    wood: true,
    rock: true,
    string: true,
    emerald: true,
    diamond: true,
    gold: true,
    iron: true,
  },
  tfcrates: {
    common: true,
    uncommon: true,
    mythic: true,
    legendary: true,
    
  },
  tfpets: {
    horse: 10,
    cat: 10,
    fox: 10,
    dog: 10,
  }
}
let rewards = {
    common: {
        money: 51,
        trash: 11,
        potion: [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        common: [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        uncommon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    uncommon: {
        money: 101,
        trash: 31,
        potion: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        diamond: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        common: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        uncommon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        mythic: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        wood: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        rock: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        string: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    mythic: {
        money: 201,
        exp: 50,
        trash: 61,
        potion: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        emerald: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        diamond: [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        gold: [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        iron: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        common: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        uncommon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        mythic: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        legendary: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        pet: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        wood: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        rock: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        string: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    legendary: {
        money: 301,
        exp: 50,
        trash: 101,
        potion: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        emerald: [0, 0, 0, 0, 0, 0 ,0, 0, 1, 0, 0, 0, 0, 0, 0],
        diamond: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        gold: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        iron: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        common: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        uncommon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        mythic: [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        legendary: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        pet: [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        wood: [0, 1, 0, 0, 0, 0, 0, 0, 0],
        rock: [0, 1, 0, 0, 0, 0, 0, 0, 0],
        string: [0, 1, 0, 0, 0, 0, 0, 0, 0]
    },
}
let handler = async (m, { conn, command, args, usedPrefix }) => {
    let user = global.db.data.users[m.sender]
    let { stock } = global.db.data.bots
    let tfcrates = Object.keys(tfinventory.tfcrates).map(v => user[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${toRupiah(user[v])}`).filter(v => v).join('\n').trim()
    let listCrate = Object.fromEntries(Object.entries(rewards).filter(([v]) => v && v in user))
    let info = `🧑🏻‍🏫 user: *${user.registered ? user.name : conn.getName(m.sender)}*

🔖 Crate List :
${Object.keys(tfinventory.tfcrates).map(v => user[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${toRupiah(user[v])}`).filter(v => v).join('\n')}
––––––––––––––––––––
💁🏻‍♂ tip :
⮕ Open Crate:
${usedPrefix}open [crate] [quantity]
★ Example:
${usedPrefix}open mythic 3
`.trim()
    let type = (args[0] || '').toLowerCase()
    let count = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
    if (!(type in listCrate)) return conn.adReply(m.chat, info, 'O P E N  C R A T E', '', flaImg.getRandom() + 'OPEN CRATE', global.config.website, m)
    if (count > 1000000) return m.reply(`Maksimal open Crate adalah ${toRupiah(1000000)}!`)
    if (user[type] < count) return m.reply(`
Your *${capitalize(type)} ${global.rpg.emoticon(type)} Crate* is not enough!, you only have ${toRupiah(user[type])} *${capitalize(type)} ${global.rpg.emoticon(type)} Crate*
type *${usedPrefix}buy ${type} ${toRupiah(count - user[type])}* to buy
`.trim())
                          
                          
    let crateReward = {}
    for (let i = 0; i < count; i++)
        for (let [reward, value] of Object.entries(listCrate[type]))
            if (reward in user) {
                let total = value.getRandom()
                if (total) {
                    user[reward] += total * 1
                    crateReward[reward] = (crateReward[reward] || 0) + (total * 1)
                }
            }
    user[type] -= count * 1
    stock[type] += count * 1
    m.reply(`
You have opened *${toRupiah(count)}* ${capitalize(type)} ${global.rpg.emoticon(type)} Crate and got:
${Object.keys(crateReward).filter(v => v && crateReward[v] && !/hai/i.test(v)).map(reward => `
*${global.rpg.emoticon(reward)} ${reward}:* ${toRupiah(crateReward[reward])}
`.trim()).join('\n')}
`.trim())
    
}
handler.help = ['open']
handler.tags = ['rpg']
handler.command = /^(open|buka|gacha)$/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler

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
