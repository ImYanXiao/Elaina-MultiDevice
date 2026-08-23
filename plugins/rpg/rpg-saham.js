import moment from 'moment-timezone'

let handler = async (m, { conn, usedPrefix, command, args }) => {
    let bot = global.db.data.bots
    let user = global.db.data.users[m.sender]
    let name = user.registered ? user.name : conn.getName(m.sender)
    let emot = v => global.rpg.emoticon(v)
    let invest = Object.entries(bot.saham.item).sort((a, b) => {
        let totalA = a[1].marketcap * a[1].harga
        let totalB = b[1].marketcap * b[1].harga
        return totalB - totalA
    })
    let cap = `
*Saham Bot ${conn.user.name}*

${invest.map((v, i) => {
    let hargaSebelumnya = v[1].hargaBefore;
    let hargaSekarang = v[1].harga;

    let keuntungan = ((hargaSekarang - hargaSebelumnya) / hargaSebelumnya) * 100;
    let update = v[1].harga - v[1].hargaBefore
    return `
*${i + 1}.* ${emot(v[0])} ${v[1].name}
Harga Per/Lembar : ${toRupiah(v[1].harga)}
Harga Per/Lot : ${toRupiah(v[1].harga * 100)}
Update : ${update > 0 ? `+${toRupiah(update)}` : toRupiah(update)} ( ${keuntungan.toFixed(2)}% )
Market Cap : ${toRupiah(v[1].marketcap * v[1].harga)}
` .trim()
}).join("\n\n")}


Contoh Penggunaan :
> Untuk Membeli Saham
> ${usedPrefix}saham-buy bbca 100
> Untuk Menjual Saham
> ${usedPrefix}saham-sell bbca 100
`.trim()
    let commands = command.split("-")[1]
    let text = (args[0] || "").toLowerCase()
    let sahamName = (text || '').toUpperCase()
    if (!(sahamName || commands)) return conn.adReply(m.chat, cap, `Halo ${name}, ${wish()}`, global.config.watermark, "https://telegra.ph/file/ccfab120681cd8bff3245.jpg", global.config.website, m)
    let saham = Object.entries(bot.saham.item).find(v => v[1].name.toLowerCase() == text)
    if (!saham) return m.reply(`Nama saham tidak ditemukan! \n*List saham:* \n\n${invest.map(v => { return `*•* ${v[1].name}` }).join("\n")}`)
    user.saham[sahamName] = user.saham[sahamName] || { harga: 0, stock: 0 }
    let total = (Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1) * 100
    switch (commands) {
        case 'buy': {
            let price = saham[1].harga * total
            if (price > user.bank) return m.reply("Saldo bank kamu kurang untuk membeli saham ini")
            let avarage = await calculateAverage(user.saham[sahamName].harga, user.saham[sahamName].stock, saham[1].harga, total)

            user.bank -= price * 1
            user.saham[sahamName].stock += total
            user.saham[sahamName].harga = avarage

            bot.saham.item[sahamName].marketcap += total
            bot.saham.item[sahamName].volumeBuy += total
            bot.saham.item[sahamName].trade.push({
                user: m.sender,
                total: total,
                type: "buy"
            })
            m.reply(`Berhasil membeli *${toRupiah(total / 100)} ${sahamName}* seharga *${toRupiah(price)}*`)
            break
        }
        case 'sell': {
            if (user.saham[sahamName].stock < total) return m.reply(`Kamu hanya mempunyai *${toRupiah(user.saham[sahamName].stock)} ${sahamName}*`)
            let price = saham[1].harga * total
            if (user.fullatm < user.bank + price) return m.reply(`Kapasitas *Bank ${emot("bank")}* kamu telah full, silahkan upgrade terlebih dahulu!`)
            let avarage = await calculateAverage(user.saham[sahamName].harga, user.saham[sahamName].stock, saham[1].harga, total)

            user.bank += price * 1
            user.saham[sahamName].stock -= total
            user.saham[sahamName].harga = avarage

            bot.saham.item[sahamName].marketcap -= total
            bot.saham.item[sahamName].volumeSell += total
            bot.saham.item[sahamName].trade.push({
                user: m.sender,
                total: total,
                type: "sell"
            })
            m.reply(`Berhasil menjual *${toRupiah(total / 100)} ${sahamName}* seharga *${toRupiah(price)}*`)
            break
        }
        case 'history':
            let footer = `${bot.saham.item[sahamName].name} Trade History \n\n`
            let cap = bot.saham.item[sahamName].trade.reverse().slice(0, 19).map(v => {
                return `> ( ${conn.getName(v.user).slice(0, 5)}.. ) ${v.type == "buy" ? "_Membeli_" : "_Menjual_"} *${toRupiah(v.total)}* ${emot(sahamName)} ${bot.saham.item[sahamName].name}`
            }).join("\n")
            m.reply(footer + cap)
            break
        default:
    }
}
handler.help = ["crypto"]
handler.tags = ["rpg"]
handler.command = /^(saham(-buy|-sell|-history)?)$/i
handler.rpg = true
handler.group = true
export default handler


async function calculateAverage(hargaNew, stockNew, harga, stock) {
    let stockHarga = new Array(stock).fill(harga);
    
    for (let i = 0; i < stockNew; i++) {
        stockHarga.push(hargaNew);
    }
    
    let totalBiaya = stockHarga.reduce((total, harga) => total + harga, 0);
    let jumlahTransaksi = stockHarga.length;
    let biayaRataRata = totalBiaya / jumlahTransaksi;
    let split = biayaRataRata.toString().split(".")[0]
    return parseFloat(split);
}

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}

let toRupiah = number => parseInt(number).toLocaleString().replace(/,/g, ".")

function wish() {
    let wishloc = ''
    let time = moment.tz('Asia/Jakarta').format('HH')
    wishloc = ('Hi')
    if (time >= 0) {
        wishloc = ('Selamat Malam')
    }
    if (time >= 4) {
        wishloc = ('Selamat Pagi')
    }
    if (time >= 11) {
        wishloc = ('Selamat Siang')
    }
    if (time >= 15) {
        wishloc = ('️Selamat Sore')
    }
    if (time >= 18) {
        wishloc = ('Selamat Malam')
    }
    if (time >= 23) {
        wishloc = ('Selamat Malam')
    }
    return wishloc
}