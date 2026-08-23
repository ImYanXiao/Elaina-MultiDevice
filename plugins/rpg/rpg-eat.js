let handler = async (m, { args, usedPrefix, __dirname }) => {
    let user = global.db.data.users[m.sender]
    let emot = v => global.rpg.emoticon(v)
    let type = (args[0] || '').toLowerCase()
    let item = makanan.filter(v => v in user && user[v] > 0)
    let listMakanan = item.map(v => { return `• ${capitalize(v)} ${emot(v)}`}).join("\n")
    if (!type) return m.reply(item.length ? `Kamu ingin makan apa? \n\n${listMakanan}` : "Sepertinya kamu belum mempunyai makanan, silahkan masak terlebih dahulu menggunakan command *#cook*")
    if (!makanan.includes(type)) return m.reply(item.length ? `Nama makanan tidak valid \n\n${listMakanan}` : "Sepertinya kamu belum mempunyai makanan, silahkan masak terlebih dahulu menggunakan command *#cook*")
    if (user.energy >= 100) return m.reply("Energy kamu masih penuh!")
    let energyTotal = /pisang|anggur|mangga|jeruk|apel/i.test(type) ? 20 : 40
    m.reply(getRandomEatingText())
    user[type]--
    user.energy += energyTotal
}
handler.help = ['eat']
handler.tags = ['rpg']
handler.command = /^(makan|eat)$/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler

function getRandomEatingText() {
    let texts = [
        "Nyam-nyam!",
        "Mmm nyam-nyam!",
        "Nyam-nyam enak!",
        "Nyam-nyam lezat!",
        "Nyam-nyam mantap!",
        "Nyam-nyam banget!",
        "Nyam-nyam sedap!",
        "Nyam-nyam seru!"
    ];
    let randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}

let makanan = [
    "steak",
    "ayam_goreng",
    "ribs",
    "roti",
    "udang_goreng",
    "bacon",
    "pisang",
    "anggur",
    "mangga",
    "jeruk",
    "apel"
]

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substr(1)
}