import axios from "axios"
import moment from 'moment-timezone'
import fs from 'fs'
import crypto from "crypto"
let taxRate = 0.05

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        await global.loading(m, conn)
        let user = global.db.data.users[m.sender]
        let bot = global.db.data.bots
        let name = user.registered ? user.name : await conn.getName(m.sender)
        let hwaifu = JSON.parse(fs.readFileSync('./json/hwaifu.json', 'utf-8'))
        let image = "https://pomf2.lain.la/f/rf0j9l4.jpg"
        let [itemID, number, confirm] = text.split("|")
        let footer = `
Silahkan Balas/Reply pesan ini dengan UID Genshin Impact kamu!

_*Note :* Pastikan username dan user ID sesuai sebelum melakukan transaksi._
`.trim()
        let adReply = {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    mediaType: 1,
                    title: `Halo ${name}, ${wish()}`,
                    body: global.config.watermark,
                    thumbnail: (await conn.getFile(image)).data,
                    renderLargerThumbnail: true,
                    mediaUrl: hwaifu.getRandom(),
                    sourceUrl: global.config.website
                }
            }
        }

        if (itemID && number && confirm) {
            let { data } = await axios.get("https://www.okeconnect.com/harga/json?id=905ccd028329b0a")
            let item = data.find(v => v.kode === itemID)
            let harga = countProfit(item.harga)
            if (user.deposit < harga) return m.reply(`Saldo Deposit kamu tidak mencukupi untuk membeli ini! \nSilahkan deposit dahulu menggunakan command *${usedPrefix}deposit*`)
            if (item.status !== "1") return m.reply("Status item ini Tidak Ready!")
            let refID = generateRefID()
            let signature = generateSignature(global.config.OK.ID, itemID, number, refID, global.config.OK.Pin, global.config.OK.Pass)
            let { data: result } = await axios.get(`https://h2h.okeconnect.com/trx?memberID=${global.config.OK.ID}&pin=${global.config.OK.Pin}&password=${global.config.OK.Pass}&product=${itemID}&dest=${number}&refID=${refID}&sign=${signature}`)
            let caption = `
*PEMBELIAN BERHASIL!*

RefID : ${refID}
Pembelian : ${item.keterangan}
Waktu : ${formattedDate(Date.now())}
Saldo : -Rp.${toRupiah(harga)}
Sisa Saldo : Rp.${toRupiah(user.deposit - harga)}

_Terimakasih sudah bertransaksi di ${conn.user.name}!_
`.trim()
            if (!/GAGAL/i.test(result)) {
                await m.reply(caption, false, adReply)
                user.deposit -= harga
                user.historyTrx.push({
                    refID: refID,
                    nominal: harga,
                    type: item.keterangan,
                    time: new Date() * 1
                })
            } else {
                m.reply("Pembelian gagal! silahkan hubungi Owner untuk info lebih lanjut...")
            }
        } else if (itemID && number && !confirm) {
            try {
                if (!isNumber(number)) return conn.textInput(m.chat, `Masukan hanya angka!\n\n${footer}`, false, `${usedPrefix + command} ${itemID}|INPUT`, m, adReply)
                let { data: id } = await axios.get(`https://enka.network/api/uid/${number}`)
                let { data } = await axios.get("https://www.okeconnect.com/harga/json?id=905ccd028329b0a")
                let item = data.find(v => v.kode === itemID)
                let harga = countProfit(item.harga)
                await conn.textOptions(m.chat, `Username : ${id.playerInfo.nickname} \nSilahkan pilih metode pembayaran?`, false, [[`${usedPrefix}quickpurchase ${itemID}|${number}|${harga}|${item.keterangan}|${image}`, "Qris"], [`${usedPrefix + command} ${itemID}|${number}|confirm`, "Deposit"]], m, adReply)
            } catch (e) {
                conn.textInput(m.chat, `ID tersebut tidak ditemukan! \n\n${footer}`, false, `${usedPrefix + command} ${itemID}|INPUT`, m, adReply)
            }
        } else if (itemID && !number && !confirm) {
            let { data } = await axios.get("https://www.okeconnect.com/harga/json?id=905ccd028329b0a")
            let item = data.find(v => v.kode === itemID)
            let harga = countProfit(item.harga)
            await conn.textInput(m.chat, `Kamu akan membeli *${item.keterangan}* seharga *Rp.${toRupiah(harga)}* \n\n${footer}`, false, `${usedPrefix + command} ${itemID}|INPUT`, m, adReply)
        } else {
            let { data } = await axios.get("https://www.okeconnect.com/harga/json?id=905ccd028329b0a")
            let genshin = data.filter(v => /TPG Genshin Impact Crystals/i.test(v.produk) && v.harga > 0)
            genshin.sort(function(a, b) {
                return a.harga - b.harga
            })
            let list = genshin.map((v, i) => {
                let harga = countProfit(v.harga)
                return [`${usedPrefix + command} ${v.kode}`, (i + 1).toString(), `${v.keterangan} \nHarga : ${toRupiah(harga)} \nStatus : ${v.status == "1" ? "Ready" : "Tidak Ready"}`]
            })
            await conn.textList(m.chat, `Saldo Deposit Anda : Rp.${toRupiah(user.deposit)}`, false, list, m, adReply)
        }
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.command = /^(topup-genshin)$/i
export default handler

let toRupiah = number => parseInt(number).toLocaleString('id-ID')

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

function generateSignature(memberID, product, dest, refID, pin, password) {
    let textToHash = `OtomaX${memberID}${product}${dest}${refID}${pin}${password}`
    let hashedText = crypto.createHash('sha1').update(textToHash).digest('base64')
    return hashedText
}

function generateRefID() {
    return 'ref-' + Math.random().toString(36).substr(2, 9);
}

function generateTransactionId(length = 10) {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let transactionId = ''
    for (let i = 0; i < length; i++) {
        transactionId += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return transactionId
}

function formattedDate(ms) {
    return moment(ms).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm');
}

function countProfit(jumlahAwal) {
    jumlahAwal = parseInt(jumlahAwal)
    let keuntungan = jumlahAwal * 0.1
    if (keuntungan > 1000) {
        keuntungan = 1000
    }
    return (jumlahAwal + keuntungan).toFixed(0)
}

function isNumber(value) {
    value = parseInt(value)
    return typeof value === 'number' && !isNaN(value)
}