import moment from 'moment-timezone'
import fs from 'fs'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    let [hari, deposit] = text.split("|")
    let hwaifu = JSON.parse(fs.readFileSync('./json/hwaifu.json', 'utf-8'))
    let user = global.db.data.users[m.sender]
    let name = user.registered ? user.name : conn.getName(m.sender)
    if (hari && deposit) {
        hari = /permanen/i.test(hari) ? 9999 : +hari
        let harga = +deposit

        if (user.deposit < harga) {
            return m.reply(`Saldo Deposit kamu tidak mencukupi untuk membeli ini! \nSilahkan deposit dahulu menggunakan command *${usedPrefix}deposit*`)
        }
        
        let refID = generateRefID()
        let caption = `
*PEMBELIAN BERHASIL!*

RefID : ${refID}
Pembelian : Premium
Saldo : -Rp.${toRupiah(harga)}
Sisa Saldo : Rp.${toRupiah(user.deposit - harga)}
Waktu : ${formattedDate(Date.now())}

_Terimakasih sudah bertransaksi di ${conn.user.name}!_
`.trim()
        await conn.adReply(m.chat, caption, `Halo ${user.name}, ${wish()}`, global.config.watermark, fs.readFileSync("./media/thumbnail.jpg"), global.config.website, m)
        user.deposit -= harga
        user.historyTrx.push({
            refID: refID,
            nominal: harga,
            type: "Premium",
            time: Date.now()
        })

        let jumlahHari = 86400000 * hari
        let now = Date.now()
        user.premiumTime = now < user.premiumTime ? user.premiumTime + jumlahHari : now + jumlahHari
        user.premium = true
        let timers = user.premiumTime - now
        await conn.reply(global.config.owner[0][0] + "@s.whatsapp.net", `✔️ Success
📛 *Name:* ${user.name}
📆 *Days:* ${hari} days
📉 *Countdown:* ️ ${msToTime(timers)}`, null)
    } else if (hari && !deposit) {
        hari = /permanen/i.test(hari) ? "permanen" : hari.match(/\d+/g).join('')
        if (!/15|30|45|60|permanen/i.test(hari)) {
            return m.reply(`Kamu ingin premium berapa hari? \n\nContoh: \n${usedPrefix + command} 15`)
        }
        let harga = /permanen/i.test(hari) ? 30000 : calculateValue(hari)
        let caption = `
Nomor : ${m.sender.split("@")[0]}
Pembelian Premium Seharga Rp${toRupiah(harga)}
Pilih metode pembayaran kamu!
`.trim()
        await conn.textOptions(m.chat, caption, false, [[`${usedPrefix}quickpurchase prem${hari}|${m.sender.split("@")[0]}|${harga}|Premium ${/permanen/i.test(hari) ? "Permanen" : `${hari} Hari`}|https://pomf2.lain.la/f/6ucgnnc1.jpg`, "Qris"], [`${usedPrefix + command} ${hari}|${harga}`, "Deposit"]], m, {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    mediaType: 1,
                    title: `Halo ${name}, ${wish()}`,
                    body: global.config.watermark,
                    thumbnail: fs.readFileSync("./media/thumbnail.jpg"),
                    renderLargerThumbnail: true,
                    mediaUrl: hwaifu.getRandom(),
                    sourceUrl: global.config.website
                }
            }
        })
    } else if (!hari && !deposit) {
        let caption = `
❏ *_Harga Premium_*
❃ _15 Hari / 5k_
❃ _30 Hari / 10k_
❃ _45 Hari / 15k_
❃ _60 Hari / 20k_

❏ *_Fitur_*
❃ _Unlimited Limit_
❃ _Nsfw_
❃ _Bebas Pakai Bot Di Pc_
❃ _Dan Lain Lain_

Minat? Silahkan Chat Nomor Owner Dibawah 
${global.config.owner.map(([jid, name]) => {
    return `
Name : ${name}
wa.me/${jid}
`.trim()
}).join('\n\n')
}

Atau Ketik 
${usedPrefix + command} 15 hari
`.trim()
        await conn.adReply(m.chat, caption, `Halo ${name}, ${wish()}`, global.config.watermark, fs.readFileSync("./media/thumbnail.jpg"), global.config.website, m)
    }
}

handler.help = ["premium"]
handler.tags = ["main"]
handler.command = /^(premium)$/i

export default handler

function calculateValue(days) {
    const valuePer15Days = 5000
    const valuePerDay = valuePer15Days / 15
    const totalValue = days * valuePerDay
    return totalValue
}

let toRupiah = number => parseInt(number).toLocaleString('id-ID')

function formattedDate(ms) {
    return moment(ms).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm')
}

function generateRefID() {
    return 'ref-' + Math.random().toString(36).substr(2, 9)
}

function msToTime(ms) {
    let seconds = parseInt((ms / 1000) % 60)
    let minutes = parseInt((ms / (1000 * 60)) % 60)
    let hours = parseInt((ms / (1000 * 60 * 60)) % 24)
    let days = parseInt(ms / (1000 * 60 * 60 * 24))

    return `${days}d ${hours}h ${minutes}m ${seconds}s`
}

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