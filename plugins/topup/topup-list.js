import moment from 'moment-timezone'
import fs from 'fs'
import axios from "axios"

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        await global.loading(m, conn)
        let user = global.db.data.users[m.sender]
        let name = user.registered ? user.name : await conn.getName(m.sender)
        let hwaifu = JSON.parse(fs.readFileSync('./json/hwaifu.json', 'utf-8'))

        let adReply = {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    mediaType: 1,
                    title: `Halo ${name}, ${wish()}`,
                    body: global.config.watermark,
                    thumbnail: (await conn.getFile(image[text] || "https://files.catbox.moe/t9ekiw.jpg")).data,
                    renderLargerThumbnail: true,
                    mediaUrl: hwaifu.getRandom(),
                    sourceUrl: global.config.website
                }
            }
        }

        const productActions = {
            'gopay': 'Top Up Saldo GO-JEK Customer',
            'valoran': 'TPG Valoran Points',
            'stumble': 'TPG Stumble Guys',
            'honkai3d': 'TPG Honkai Impact Crystals',
            'aov': 'TPG Arena of Valor',
            'dana': 'Top Up Saldo DANA',
            'codm': 'TPG Call Of Duty',
            'fifa': 'TPG Fifa Mobile',
            'hok': 'TPG Honor of Kings',
            'genshin': 'TPG Genshin Impact Crystals',
            'mlbb': 'TPG Diamond Mobile Legends',
            'ml': 'TPG Diamond Mobile Legends',
            'undawn': 'TPG Undawn'
        }

        if (productActions[text]) {
            let { data } = await axios.get("https://www.okeconnect.com/harga/json?id=905ccd028329b0a")
            let filteredData = data.filter(v => new RegExp(productActions[text], 'i').test(v.produk) && v.harga > 0)
            filteredData.sort((a, b) => a.harga - b.harga)
            let list = filteredData.map((v, i) => {
                let harga = countProfit(v.harga)
                return [`${usedPrefix}topup-${text} ${v.kode}`, (i + 1).toString(), `${v.keterangan} \nHarga : ${toRupiah(harga)} \nStatus : ${v.status == "1" ? "Ready" : "Tidak Ready"}`]
            })
            await conn.textList(m.chat, `Saldo Deposit Anda : Rp.${toRupiah(user.deposit)}`, false, list, m, adReply)
            return
        }

        const specialCases = {
            'freefire': ["TPG Diamond Free Fire", "TPG Free Fire Denom Unik"],
            'pubg': ["TPG Game Mobile PUBG", "TPG Game Mobile PUBG Global", "TPG PUBG New State"],
            'pulsa': ["Axis", "Three", "XL - Axis", "Indosat", "Telkomsel", "Smartfren", "By U"]
        }

        if (specialCases[text]) {
            let list = specialCases[text].map((v, i) => {
                return [`${usedPrefix}topup-${text} ${v}`, (i + 1).toString(), `${v}`]
            })
            await conn.textList(m.chat, `Terdapat *${specialCases[text].length} Produk*`, false, list, m, adReply)
            return
        }

        let caption = `${conn.user.name} Store`.trim()
        listCommand.sort((a, b) => a.split("-")[1].localeCompare(b.split("-")[1]))
        let list = listCommand.map((v, i) => {
            let nameParts = v.split("-")
            return [`${usedPrefix + v}`, (i + 1).toString(), `${capitalize(nameParts[0])} ${capitalize(nameParts[1])}`]
        })
        await conn.textList(m.chat, caption, false, list, m, adReply)

    } finally {
        await global.loading(m, conn, true)
    }
}

handler.help = ["topup"]
handler.tags = ["topup"]
handler.command = /^(topup)$/i
export default handler

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substring(1)
}

function wish() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    if (time >= 0 && time < 4) return 'Selamat Malam'
    if (time >= 4 && time < 11) return 'Selamat Pagi'
    if (time >= 11 && time < 15) return 'Selamat Siang'
    if (time >= 15 && time < 18) return 'Selamat Sore'
    return 'Selamat Malam'
}

let toRupiah = number => parseInt(number).toLocaleString('id-ID')

let image = {
    codm: "https://pomf2.lain.la/f/xq2fucfi.jpg",
    dana: "https://pomf2.lain.la/f/w76shbtv.jpg",
    gopay: "https://pomf2.lain.la/f/4krj9qi7.jpg",
    freefire: "https://pomf2.lain.la/f/gk2m5bit.jpg",
    genshin: "https://pomf2.lain.la/f/rf0j9l4.jpg",
    mlbb: "https://pomf2.lain.la/f/6hvqhbpv.jpg",
    ml: "https://pomf2.lain.la/f/6hvqhbpv.jpg",
    pubg: "https://pomf2.lain.la/f/xdwng3vs.jpg",
    pulsa: "https://pomf2.lain.la/f/zf0vlr.jpg",
    hok: "https://pomf2.lain.la/f/teuvkvux.jpg",
    fifa: "https://pomf2.lain.la/f/4eob0b8.jpg",
    aov: "https://pomf2.lain.la/f/e9bunbh0.jpg",
    honkai3d: "https://pomf2.lain.la/f/hd30r204.jpg",
    stumble: "https://pomf2.lain.la/f/70pm8dg.jpg",
    valoran: "https://pomf2.lain.la/f/vr61drde.jpg",
    undawn: "https://pomf2.lain.la/f/e40jpnvu.jpg"
}

function countProfit(jumlahAwal) {
    jumlahAwal = +jumlahAwal
    let keuntungan = jumlahAwal * 0.05
    return (jumlahAwal + (keuntungan > 1000 ? 1000 : keuntungan)).toFixed(0)
}

let listCommand = ["topup-undawn", "topup-dana", "topup-gopay", "topup-aov", "topup-honkai3d", "topup-stumble", "topup-valoran", "topup-freefire", "topup-fifa", "topup-pubg", "topup-codm", "topup-genshin", "topup-mlbb", "topup-hok", "topup-pulsa"]