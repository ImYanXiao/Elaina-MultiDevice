let handler = async (m, { conn, usedPrefix, command, text }) => {
    let data = Object.keys(resep)
    let emot = v => global.rpg.emoticon(v)
    let listResep = data.map((v, i) => {
        return `${capitalize(v)} ${emot(v)}\nBahan : \n${resep[v].map(v => `• ${capitalize(v)} ${emot(v)}`).join("\n")}`.trim()
    }).join("\n\n")
    let example = `\n\nContoh: \n${usedPrefix + command} steak`
    let user = global.db.data.users[m.sender]
    let type = (text || '').toLowerCase()
    if (!type) return m.reply(`Kamu ingin masak apa? \n\n${listResep + example}`)
    if (!data.includes(type)) return m.reply(`Tidak dapat menemukan masakan! \n\n${listResep + example}`)
    let required = resep[type]
    let bahan = required.filter(v => !user[v] || user[v] < 1)
    if (bahan.length) return m.reply(`Kamu membutuhkan bahan \n${bahan.map(v => `• ${capitalize(v)} ${emot(v)}`).join("\n")}`)
    await m.reply("Sedang memasak 👨‍🍳🍳")
    await delay(5000)
    await m.reply(`${capitalize(type)} ${emot(type)} telah jadi!`)
    required.forEach(v => {
        user[v]--
    })
    user[type]++
}
handler.help = ["cook"]
handler.tags = ["rpg"]
handler.command = /^(masak|cook)$/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler

let delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

let resep = {
    "steak": ['sapi', 'garam'],
    "ayam_goreng": ['ayam', 'garam', 'minyak'],
    "ribs": ['babi', 'garam'],
    "roti": ['gandum'],
    "udang_goreng": ['udang', 'minyak', 'garam'],
    "bacon": ['babi'],
}

let toRupiah = number => parseInt(number).toLocaleString().replace(/,/gi, ".")

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substr(1)
}

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}