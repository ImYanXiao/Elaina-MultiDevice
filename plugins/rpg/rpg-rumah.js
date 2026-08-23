import fs from "fs"
import moment from "moment-timezone"

let handler = async (m, { conn, usedPrefix, command, text }) => {
    let user = global.db.data.users
    let bot = global.db.data.bots
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let name = user.registered ? user.name : await conn.getName(m.sender)
    let hwaifu = JSON.parse(await fs.promises.readFile('./json/hwaifu.json', 'utf-8'))
    
    switch (command) {
        case 'rumah-buy': {
            let [ kondisi, id ] = text.split("|")
            if (kondisi && id) {
                if (kondisi == "bekas") {
                    let sellRumah = Object.values(bot.sellRumah)
                    let item = sellRumah.find(v => v.id == id)
                    if (!item) return m.reply("Rumah tidak ditemukan!")
                    if (item.seller == m.sender) return m.reply("Tidak bisa membeli rumah sendiri")
                    if (user[m.sender].bank < item.harga) return m.reply(`Uang kamu tidak cukup untuk membeli rumah ini!`)
                    if (typeof user[m.sender].rumah[item.id] !== "undefined") return m.reply("Tidak bisa membeli rumah yang sama!")
                    m.reply(`Sukses membeli rumah *${item.nama}* seharga *${toRupiah(item.harga)} Bank* ${global.rpg.emoticon("bank")} dari user @${item.seller.split("@")[0]}`, false, { mentions: [item.seller] })
                    user[m.sender].rumah[item.id] = {
                        id: item.id,
                        harga: item.harga,
                    }
                    user[m.sender].bank -= item.harga
                    user[item.seller].bank += item.harga
                    delete user[item.seller].rumah[item.id]
                    delete bot.sellRumah[item.seller]
                } else {
                    let item = bot.rumah.find(v => v.id == id)
                    if (item.stock == 0) return m.reply("Stock rumah ini telah habis!")
                    if (user[m.sender].bank < item.harga) return m.reply(`Uang kamu tidak cukup untuk membeli rumah ini!`)
                    if (typeof user[m.sender].rumah[item.id] !== "undefined") return m.reply("Tidak bisa membeli rumah yang sama!")
                    m.reply(`Sukses membeli rumah *${item.nama}* seharga *${toRupiah(item.harga)} Bank* ${global.rpg.emoticon("bank")}`)
                    user[m.sender].rumah[item.id] = {
                        id: item.id,
                        harga: item.harga,
                    }
                    item.stock -= 1
                    user[m.sender].bank -= item.harga
                }
            } else if (kondisi && !id) {
                if (kondisi == "bekas") {
                    let sellRumah = Object.values(bot.sellRumah)
                    if (sellRumah.length == 0) return m.reply("Tidak ada orang yang menjual rumah Bekas")
                    let list = sellRumah.map((v, i) => {
                        let name = user[v.seller].registered ? user[v.seller].name : conn.getName(v.seller)
                        return [`${usedPrefix + command} ${kondisi}|${v.id}`, (i + 1).toString(), `${v.nama} ( Seller: ${name} ) \nLokasi : ${v.lokasi} \nLuas Tanah : ${v.luasTanah} \nLuas Bangunan : ${v.luasBangunan} \nFasilitas : ${v.fasilitasTambahan.join(", ")} \nHarga : ${toRupiah(v.harga)}`]
                    })
                    await conn.textList(m.chat, `Terdapat *${sellRumah.length} Rumah* bekas yang sedang dijual`, false, list, m)
                } else {
                    let rumah = bot.rumah.filter(v => v.stock > 0)
                    if (rumah.length == 0) return m.reply("Tidak ada rumah baru yang dijual")
                    let list = rumah.map((v, i) => {
                        return [`${usedPrefix + command} ${kondisi}|${v.id}`, (i + 1).toString(), `${v.nama} \nLokasi : ${v.lokasi} \nLuas Tanah : ${v.luasTanah} \nLuas Bangunan : ${v.luasBangunan} \nFasilitas : ${v.fasilitasTambahan.join(", ")} \nStock: ${v.stock} \nHarga : ${toRupiah(v.harga)}`]
                    })
                    await conn.textList(m.chat, `Terdapat *${rumah.length} Rumah* baru yang sedang dijual`, false, list, m)
                }
            } else {
                await conn.textOptions(m.chat, "Kamu ingin membeli rumah Baru / Bekas", false, [[`${usedPrefix + command} baru|`, "Baru"], [`${usedPrefix + command} bekas|`, "Bekas"]], m)
            }
            break
        }
        case "rumah-sell": {
            let userRumah = Object.values(user[m.sender].rumah)
            if (!userRumah.length > 0) return m.reply(`Kamu tidak mempunyai rumah!`)
            let [id, harga] = text.split("|")
            if (id && harga) {
                let item = bot.rumah.find(x => x.id == id)
                m.reply(`Berhasil menambahkan rumah *${item.nama}* ke daftar tunggu, sekarang tinggal menunggu orang untuk membeli rumah kamu!`)
                bot.sellRumah[m.sender] = {
                    seller: m.sender,
                    harga: parseInt(harga),
                    id: item.id,
                    nama: item.nama,
                    lokasi: item.lokasi,
                    luasTanah: item.luasTanah,
                    luasBangunan: item.luasBangunan,
                    tahunDibangun: item.tahunDibangun,
                    fasilitasTambahan: item.fasilitasTambahan,
                }
            } else if (id && !harga) {
                let item = bot.rumah.find(x => x.id == id)
                await conn.textInput(m.chat, `Kamu ingin menjual rumah *${item.nama}* seharga berapa? \n\nSilahkan Reply/Balas pesan ini dengan Harga Rumah yang kamu mau!`, false, `${usedPrefix + command} ${id}|INPUT`, m)
            } else {
                let list = userRumah.map((v, i) => {
                    let item = bot.rumah.find(x => x.id == v.id)
                    return [`${usedPrefix + command} ${v.id}|`, (i + 1).toString(), `${item.nama} \nLokasi : ${item.lokasi} \nLuas Tanah : ${item.luasTanah} \nLuas Bangunan : ${item.luasBangunan} \nFasilitas : ${item.fasilitasTambahan.join(", ")}`]
                })
                await conn.textList(m.chat, `Kamu mempunyai *${userRumah.length} Rumah* pilih mana rumah yang mau kamu jual`, false, list, m)
            }
            break
        }
        default: {
            let userRumah = Object.values(user[who].rumah)
            if (!userRumah.length > 0) return m.reply(`${who == m.sender ? "Kamu" : "Dia"} tidak mempunyai rumah! \n_Gunakan command *${usedPrefix}rumah-buy* untuk membeli rumah_`)
            let caption = `
*RUMAH ${who == m.sender ? "KAMU" : "DIA"}*

${userRumah.map((v, i) => {
    let item = bot.rumah.find(x => x.id == v.id)
    return `
*${i + 1}.* ${item.nama}
Lokasi : ${item.lokasi}
Luas Tanah : ${item.luasTanah}
Luas Bangunan : ${item.luasBangunan}
Tahun Dibangun : ${item.tahunDibangun}
Fasilitas : ${item.fasilitasTambahan.join(", ")}
Jenis Sertifikat : ${item.jenisSertifikat}
Harga Beli : ${toRupiah(v.harga)}
`.trim()
}).join("\n\n")}
`.trim()
            await conn.adReply(m.chat, caption, `Halo ${name}, ${wish()}`, global.config.watermark, "https://telegra.ph/file/ccfab120681cd8bff3245.jpg", global.config.website, m)
        }
    }
}
handler.help = ["rumah", "rumah-buy", "rumah-sell"]
handler.tags = ["rpg"]
handler.command = /^(rumah(-buy|-sell)?)$/i
handler.rpg = true
handler.group = true
export default handler

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/g, ".")

function wish() {
    let wishloc = ''
    const time = moment.tz('Asia/Jakarta').format('HH')
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