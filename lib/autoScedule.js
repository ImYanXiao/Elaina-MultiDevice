import axios from 'axios'
import { readdirSync, rmSync } from 'fs'
import moment from 'moment-timezone'
import fs from 'fs'
import path from 'path'
import crypto from "crypto"
import os from 'os'

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

function getTime() {
    return new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}

let fdoc = {
    key: {
        remoteJid: 'status@broadcast',
        participant: '0@s.whatsapp.net'
    },
    message: {
        documentMessage: {
            title: '𝙳 𝙰 𝚃 𝙰 𝙱 𝙰 𝚂 𝙴'
        }
    }
}

let requestOptions = {
    method: 'GET',
    redirect: 'follow'
}

function generateSignature(memberID, product, dest, refID, pin, password) {
    let textToHash = `OtomaX${memberID}${product}${dest}${refID}${pin}${password}`
    let hashedText = crypto.createHash('sha1').update(textToHash).digest('base64')
    return hashedText
}

function generateRefID() {
    return 'ref-' + Math.random().toString(36).substr(2, 9);
}

let toRupiah = number => parseInt(number).toLocaleString('id-ID')

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

function formattedDate(ms) {
    return moment(ms).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm');
}

async function resetCommand() {
    let user = global.db.data.users
    let chat = global.db.data.chats
    let dataUser = Object.keys(user).filter(number => user[number].command > 0)
    let dataChat = Object.keys(chat).filter(v => v.endsWith("@g.us"))

    for (let number of dataUser) {
        user[number].command = 0
    }

    for (let number of dataChat) {
        let user = chat[number].member
        let data = Object.keys(user).filter(v => user[v].chat > 0)
        for (let member of data) {
            user[member].command = 0
        }
    }

}

async function resetChat() {
    let user = global.db.data.users
    let chat = global.db.data.chats
    let dataUser = Object.keys(user).filter(number => user[number].chat > 0)
    let dataChat = Object.keys(chat).filter(v => v.endsWith("@g.us"))

    for (let number of dataUser) {
        user[number].chat = 0
    }

    for (let number of dataChat) {
        let user = chat[number].member
        let data = Object.keys(user).filter(v => user[v].chat > 0)
        for (let member of data) {
            user[member].chat = 0
        }
    }
}

async function resetLimit() {
    let user = global.db.data.users
    let data = Object.keys(user).filter(number => user[number].limit < 10)
    for (let number of data) {
        if (user[number].limit < 50) {
            user[number].limit = 50
        }
    }
}

async function resetCryptoPrice() {
    let invest = global.db.data.bots.invest.item
    let data = Object.keys(invest)
    for (let name of data) {
        invest[name].hargaBefore = invest[name].harga
    }
}

async function resetSahamPrice() {
    let saham = global.db.data.bots.saham.item
    let data = Object.keys(saham)
    for (let name of data) {
        saham[name].hargaBefore = saham[name].harga
    }
}

async function resetVolumeSaham() {
    let bot = global.db.data.bots
    let data = Object.keys(bot.saham.item)
    for (let v of data) {
        bot.saham.item[v].volumeBuy = 0
        bot.saham.item[v].volumeSell = 0
    }
}

async function Backup() {
    let setting = global.db.data.settings[conn.user.jid]
    if (setting.backup) {
        let d = new Date
        let date = d.toLocaleDateString('id', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        let database = fs.readFileSync('./database.json')
        for (let [jid] of global.config.owner.filter(([number, _, developer]) => number && developer)) {
            conn.reply(jid + '@s.whatsapp.net', `*🗓️ Database:* ${date}`, null)
            conn.sendMessage(jid + '@s.whatsapp.net', { document: database, mimetype: 'application/json', fileName: 'database.json' }, { quoted: fdoc })
        }
    }
}

async function resetVolumeCrypto() {
    let bot = global.db.data.bots
    let data = Object.keys(bot.invest.item)
    for (let v of data) {
        bot.invest.item[v].volumeBuy = 0
        bot.invest.item[v].volumeSell = 0
    }
}

function clearMemory() {
    if (conn.spam) conn.spam = {}
    if (conn.khodam) conn.khodam = {}
}


async function KomikuNews() {
    let chat = global.db.data.chats
    let bot = global.db.data.bots
    let data = await komiku.latest()
    if (!Array.isArray(data)) return
    if (data.length == 0) return
    if (data[0].title !== bot.komikuNow) {
        bot.komikuNow = data[0].title
        let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce && !chat.isCommunity && !chat.isCommunityAnnounce && !chat?.metadata?.isCommunity && !chat?.metadata?.isCommunityAnnounce).map(v => v[0])
        let { mainDescription, synopsis, info } = await komiku.getDetails(data[0].link)
        for (let v of groups) {
            if (!chat[v].komikuNews) continue
            chat[v].komikuNow = data[0].title
            let caption = `
*Komiku Update!*

${Object.entries(info).map(v => {
    return `${v[0]} : ${v[1]}`
}).join("\n")}
Uploaded : ${data[0].uploaded.split("•")[1].trim()}

Description :
${mainDescription}

Synopsis :
${synopsis}
`.trim()
            await conn.sendFile(v, data[0].imageUrl, null, caption, null)
        }
    }
}

async function checkGempa() {
    let chat = global.db.data.chats
    let bot = global.db.data.bots
    let now = new Date().getTime()
    let apiResponse = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json')
    let gempa = apiResponse.data.Infogempa.gempa
    if (gempa.DateTime !== bot.gempaDateTime) {
        bot.gempaDateTime = gempa.DateTime
        let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce && !chat.isCommunity && !chat.isCommunityAnnounce && !chat?.metadata?.isCommunity && !chat?.metadata?.isCommunityAnnounce).map(v => v[0])
        for (let number of groups) {
            if (chat[number].notifgempa && gempa.DateTime !== chat[number].gempaDateTime) {
                chat[number].gempaDateTime = gempa.DateTime
                let caption = `
*BMKG Notif Gempa!*

Koordinat: ${gempa.Coordinates}
Magnitude: ${gempa.Magnitude}
Kedalaman: ${gempa.Kedalaman}

_Wilayah: ${gempa.Wilayah}, Potensi: ${gempa.Potensi}_

_Dihimbau untuk warga yang berada di wilayah *${gempa.Dirasakan}* untuk selalu berhati-hati!_
`.trim()
                await conn.sendFile(number, 'https://data.bmkg.go.id/DataMKG/TEWS/' + gempa.Shakemap, 'map.jpg', caption, false)
            }
        }
    }
}

async function checkSewa() {
    let chat = global.db.data.chats
    let data = Object.keys(chat).filter(v => chat[v].expired > 0 && new Date() * 1 - chat[v].expired > 0)
    for (let number of data) {
        try {
            let groupMetadata = await conn.groupMetadata(number)
            await conn.reply(number, `Waktunya *${conn.user.name}* Untuk Meninggalkan Group\nJangan lupa sewa lagi ya!`, null)
            await conn.sendContact(number, global.config.owner, null)
            await conn.groupLeave(number)

            chat[number].expired = 0
        } catch {
            chat[number].expired = 0
        }
    }
}

async function checkPremium() {
    let user = global.db.data.users
    let data = Object.keys(global.db.data.users).filter(v => user[v].premiumTime > 0 && new Date() * 1 - user[v].premiumTime > 0)
    for (let number of data) {
        await conn.reply(number, `Halo ${global.db.data.users[number].registered ? global.db.data.users[number].name: conn.getName(number)} \nWaktu premium kamu sudah habis, jika ingin perpanjang silahkan chat nomor owner dibawah ya!`, null)
        await conn.sendContact(number, global.config.owner, null)

        user[number].premiumTime = 0
        user[number].premium = false
    }
}

async function updateSaham() {
    let bot = global.db.data.bots
    let persen = [0.01, 0.001]

    let saham = Object.entries(bot.saham.item)

    for (let [name, value] of saham) {
        let volNaik = value.rise.filter(v => v === 'naik').length
        let volTurun = value.rise.filter(v => v === 'turun').length

        if ((value.volumeBuy / 100) - (value.volumeSell / 100) > 1000 && volNaik === 1) {
            value.rise.push('naik')
        } else if ((value.volumeSell / 100) - (value.volumeBuy / 100) > 1000 && volTurun === 1) {
            value.rise.push('turun')
        } else if ((value.volumeBuy / 100) - (value.volumeSell / 100) < 1000 && volNaik === 2) {
            let indexNaik = value.rise.indexOf('naik')
            if (indexNaik !== -1) {
                value.rise.splice(indexNaik, 1)
            }
        } else if ((value.volumeSell / 100) - (value.volumeBuy / 100) < 1000 && volTurun === 2) {
            let indexTurun = value.rise.indexOf('turun')
            if (indexTurun !== -1) {
                value.rise.splice(indexTurun, 1)
            }
        }

        let isPersen = persen[Math.floor(Math.random() * persen.length)]
        let onePercent = parseInt((value.harga * isPersen).toFixed(0)) // Using 2 decimal places for precision
        let isRise = value.rise[Math.floor(Math.random() * value.rise.length)]

        if (isRise === "naik") {
            value.harga += onePercent
        } else if (isRise === "turun") {
            value.harga -= onePercent
        }
    }
}

function clearTmp() {
	let __dirname = global.__dirname(import.meta.url)
	let tmp = [os.tmpdir(), path.join(__dirname, '../tmp')]
	let filenames = []
	tmp.forEach(dirname => {
		try {
			fs.readdirSync(dirname).forEach(file => filenames.push(path.join(dirname, file)))
		} catch (err) {
			console.error(`Error reading directory ${dirname}:`, err)
		}
	})

	filenames.forEach(file => {
		try {
			let stats = fs.statSync(file)
			if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 5)) {
				fs.unlinkSync(file)
			}
		} catch (err) {
			console.error(`Error processing file ${file}:`, err)
		}
	})
}

async function updateCrypto() {
    let bot = global.db.data.bots
    let persen = [0.01, 0.02]

    let invest = Object.entries(bot.invest.item)

    for (let [name, value] of invest) {
        let volNaik = value.rise.filter(v => v === 'naik').length
        let volTurun = value.rise.filter(v => v === 'turun').length

        if (value.volumeBuy - value.volumeSell > 10000 && volNaik === 1) {
            value.rise.push('naik')
        } else if (value.volumeSell - value.volumeBuy > 10000 && volTurun === 1) {
            value.rise.push('turun')
        } else if (value.volumeBuy - value.volumeSell < 10000 && volNaik === 2) {
            let indexNaik = value.rise.indexOf('naik')
            if (indexNaik !== -1) {
                value.rise.splice(indexNaik, 1)
            }
        } else if (value.volumeSell - value.volumeBuy < 10000 && volTurun === 2) {
            let indexTurun = value.rise.indexOf('turun')
            if (indexTurun !== -1) {
                value.rise.splice(indexTurun, 1)
            }
        }

        let isPersen = persen[Math.floor(Math.random() * persen.length)]
        let onePercent = parseInt((value.harga * isPersen).toFixed(0)) // Using 2 decimal places for precision
        let isRise = value.rise[Math.floor(Math.random() * value.rise.length)]

        if (isRise === "naik") {
            value.harga += onePercent
        } else if (isRise === "turun") {
            value.harga -= onePercent
        }
    }
}

async function checkSholat() {
    let bot = global.db.data.bots
    let chat = global.db.data.chats
    let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce && !chat.isCommunity && !chat.isCommunityAnnounce && !chat?.metadata?.isCommunity && !chat?.metadata?.isCommunityAnnounce).map(v => v[0])
    let jadwalsholat = Object.keys(bot.jadwalsholat.list)

    for (let i = 0; i < jadwalsholat.length; i++) {
        let currentPrayer = jadwalsholat[i]
        let prayerTime = bot.jadwalsholat.list[currentPrayer]
        let now = getTime()

        if (prayerTime === now && bot.jadwalsholat.now !== currentPrayer) {
            bot.jadwalsholat.now = currentPrayer
            let audioUrl = currentPrayer === "Shubuh" ? 
                "https://pomf2.lain.la/f/ly4t9rxt.opus" : 
                "https://pomf2.lain.la/f/k0dsbnsp.opus"

            for (let chatId of groups) {
                if (chat[chatId].notifazan && chat[chatId]?.sholatNow !== currentPrayer) {
                    chat[chatId].sholatNow = currentPrayer

                    await conn.sendFile(chatId, audioUrl, "", "", null, null, {
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: false,
                                mediaType: 1,
                                title: `Azan ${currentPrayer} Sudah Berkumandang`,
                                body: "Untuk wilayah Jakarta dan sekitarnya.",
                                thumbnail: (await conn.getFile("https://pomf2.lain.la/f/8joxeij1.jpg")).data,
                                renderLargerThumbnail: true,
                                mediaUrl: "",
                                sourceUrl: ""
                            }
                        }
                    })
                }
            }
        }
    }
}

async function checkDeposit() {
    conn.transaction = conn.transaction || {}
    let data = Object.keys(conn.transaction)
    for (let v of data) {
        let user = global.db.data.users[v]
        let name = user.registered ? user.name : await conn.getName(v)
        let { chat, trxId, nominal, RCode, type, time, expired } = conn.transaction[v]
        let response = await fetch(`https://gateway.okeconnect.com/api/mutasi/qris/${global.config.OK.ID}/${global.config.OK.Apikey}`, requestOptions)
        let result = await response.json()
        if (!Array.isArray(result.data)) return
        let transaksi = result.data.find(v => parseInt(v.amount) === (nominal + RCode) && v.date.split(" ")[0] === formattedDate(time).split(" ")[0])
        if (transaksi) {
            let caption = `
*TRANSAKSI BERHASIL!*

Id : ${trxId}
Nominal : Rp.${toRupiah(nominal + RCode)} ( ${transaksi.brand_name} )
Type : ${capitalize(type)}
${capitalize(type)} : +Rp.${toRupiah(nominal)}
${capitalize(type)} Sekarang : Rp.${toRupiah(user[type] + nominal)}
Waktu Penyelesaian : ${formattedDate(Date.now())}

_Terimakasih sudah ${type === "donasi" ? "Berdonasi": "Mendeposit"} ke *${conn.user.name}* dan terimakasih atas kepercayaannya!_
`.trim()
            await conn.adReply(chat, caption, `Halo ${name}, ${wish()}`, global.config.watermark, "https://pomf2.lain.la/f/5zstjgs.jpg", global.config.website, false)
            user[type] += nominal
            user.historyTrx.push({
                    trxId,
                    nominal,
                    type,
                    time
            })
            clearTimeout(expired)
            delete conn.transaction[v]
        }
    }
}

async function quickPurchase() {
    if (!conn.quickPurchase) conn.quickPurchase = {}
    let purchaseKeys = Object.keys(conn.quickPurchase)

    for (let key of purchaseKeys) {
        let user = global.db.data.users[key]
        let name = user.registered ? user.name: await conn.getName(key)
        let { chat, trxId, itemID, number, harga, produk, image, time, expired } = conn.quickPurchase[key]

        try {
            let response = await fetch(`https://gateway.okeconnect.com/api/mutasi/qris/${global.config.OK.ID}/${global.config.OK.Apikey}`)
            let result = await response.json()

            if (!Array.isArray(result.data)) return

            let transaksi = result.data.find(transaction =>
                transaction.amount === harga && transaction.date.split(" ")[0] === formattedDate(time).split(" ")[0]
            )

            if (transaksi) {
                if (/prem/i.test(itemID)) {
                    let hari = itemID.replace("prem", "")
                    hari = /permanen/i.test(hari) ? 9999 : +hari
                    let caption = `
*PEMBELIAN BERHASIL!*

RefID : ${trxId}
Pembelian : Premium
Harga : ${toRupiah(harga)}
Status : Berhasil
Waktu : ${formattedDate(Date.now())}

_Terimakasih sudah bertransaksi di ${conn.user.name}!_
`.trim()
                    await conn.adReply(key, caption, `Halo ${user.name}, ${wish()}`, global.config.watermark, fs.readFileSync("./media/thumbnail.jpg"), global.config.website, null)
                    user.historyTrx.push({
                        refId: trxId,
                        nominal: harga,
                        type: "Premium",
                        time: Date.now()
                    })

                    let jumlahHari = 86400000 * hari
                    let now = Date.now()
                    user.premiumTime = now < user.premiumTime ? user.premiumTime + jumlahHari : now + jumlahHari
                    user.premium = true
                    let timers = user.premiumTime - now
                    await conn.reply(global.config.owner[0][0] + "@s.whatsapp.net", `
✔️ Success
📛 *Name:* ${user.name}
📆 *Days:* ${hari} days
📉 *Countdown:* ️ ${msToTime(timers)}
`.trim(), null)
                } else {
                    let signature = generateSignature(global.config.OK.ID, itemID, number, trxId, global.config.OK.Pin, global.config.OK.Pass)

                    let { data } = await axios.get(`https://h2h.okeconnect.com/trx`, {
                            params: {
                                memberID: global.config.OK.ID,
                                pin: global.config.OK.Pin,
                                password: global.config.OK.Pass,
                                product: itemID,
                                dest: number,
                                refId: trxId,
                                sign: signature
                            }
                        })

                    let captionSuccess = `
*PEMBELIAN BERHASIL!*

RefID : ${trxId}
Pembelian : ${produk}
Harga : ${toRupiah(+harga)}
Status : Berhasil
Waktu : ${formattedDate(Date.now())}

_Terimakasih sudah bertransaksi di ${conn.user.name}!_
`.trim()

                    if (!/GAGAL/i.test(data)) {
                        await conn.adReply(chat, captionSuccess, `Halo ${name}, ${wish()}`, global.config.watermark, image, global.config.website, false)
                        user.historyTrx.push({
                            refId: trxId,
                            nominal: +harga,
                            type: produk,
                            time: Date.now()
                        })
                    } else {
                        let captionFail = `
*PEMBELIAN GAGAL!*

RefID : ${trxId}
Pembelian : ${produk}
Harga : Rp.${toRupiah(+harga)}
Status : Gagal
Waktu : ${formattedDate(Date.now())}

_Uang kamu telah di convert menjadi saldo deposit bot!_
`.trim()

                        await conn.adReply(chat, captionFail, `Halo ${name}, ${wish()}`, global.config.watermark, image, global.config.website, false)
                        user.historyTrx.push({
                            refId: trxId,
                            nominal: +harga,
                            type: "refund",
                            time: Date.now()
                        })
                        user.deposit += +harga
                    }
                }
                clearTimeout(expired)
                delete conn.quickPurchase[purchaseKeys]
            }
        } catch (error) {
            console.error(`Error processing quick purchase for user ${key}:`, error)
        }
    }
}

export {
    resetSahamPrice,
    resetCryptoPrice,
    resetLimit,
    resetChat,
    resetCommand,
    Backup,
    resetVolumeSaham,
    resetVolumeCrypto,
    clearMemory,
    checkGempa,
    updateSaham,
    checkPremium,
    checkSewa,
    clearTmp,
    updateCrypto,
    checkSholat,
    checkDeposit,
    quickPurchase
}
