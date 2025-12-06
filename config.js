// Rewritten by RexxHayanasi

/* =============== Thanks to ===========*/
/*
+ Xnuvers007
+ ImYanXiao
+ RexxHayanasi
+ Api Developer 
+ Pengguna Elaina - Multi Device 
*/

/*[!] Jangan Lupa Ganti Bagian global.config.owner
dan tambahkan nomer bot di global.config.pairingNumber
*/

import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import moment from 'moment-timezone'

/*============= WAKTU =============*/
let wibh = moment.tz('Asia/Jakarta').format('HH')
let wibm = moment.tz('Asia/Jakarta').format('mm')
let wibs = moment.tz('Asia/Jakarta').format('ss')
let wktuwib = `${wibh} H ${wibm} M ${wibs} S`

let d = new Date(new Date().getTime() + 3600000)
let locale = 'id'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})

global.ucapan = function() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  if (time >= 4 && time < 10) return '🌤️ Selamat Pagi'
  if (time >= 10 && time < 15) return '🌞 Selamat Siang'
  if (time >= 15 && time < 18) return '🌇 Selamat Sore'
  if (time >= 18 || time < 4) return '🌙 Selamat Malam'
  return '🪷 Selamat Dinihari'
}

global.config = {
  /*============== INFO AUTO UPDATE GITHUB ==============*/
    cekupdate: false,
    /*============== INFO LINK ==============*/
    instagram: 'https://instagram.com/',
    github: 'https://github.com/',
    group: 'https://chat.whatsapp.com/',
    website: 'https://Elaina-MultiDevice.vercel.app/',

    /*============== PAYMENT ==============*/
    dana: '',
    ovo: '',
    gopay: '',
    pulsa: '',

    /*============== STAFF ==============*/
    owner: [
[ '6285282530851', 'RexxHayanasiDEV', true ] // Ganti Nomer Lu Sama Nama Lu
],


    /*============== BOT ==============*/
    namebot: "Elaina - MultiDevice",
    
    /*============== PAIRING ==============*/
    pairingNumber: "-", // Nomor Bot yang mau di pairing
    pairingAuth: true, // False kalau mau via QR Code [ Ga disaranin Jadiin False ]

    /*============== API ==============*/
    APIs: {
        lol: 'https://api.lolhuman.xyz',
        rose: 'https://api.itsrose.rest',
        xzn: 'https://skizo.tech',
    },

    APIKeys: {
        'https://api.lolhuman.xyz': '-',
        'https://api.itsrose.rest': '-',
        'https://skizo.tech': '-'
    },

    /*============== TEXT ==============*/
    watermark: 'Elaina - MultiDevice',
    author: 'ImYanXiao',
    loading: 'Silahkan ditunggu...',
    errorMsg: 'Error :)',

    stickpack: 'Made With',
    stickauth: 'Elaina-BOT',

    // Untuk fitur topup [ Need IP VPS ] & pembayaran premium otomatis,
    OK: {
        ID: "", // Okeconnect Merchant ID
        Pin: "", // Okeconnect PIN
        Pass: "", // Okeconnect Password
        Apikey: "" // Okeconnect Apikey
    }
}


/*============== WATERMARK ==============*/
global.wm = '                「 Elaina 𝙱𝙾𝚃 汉  」' // wm1
global.wm2 = '꒷︶꒷꒥꒷ ‧₊˚ ꒰ฅ˘ᴇʟᴀɪɴᴀ˘ฅ ꒱ ‧₊˚꒷︶꒷꒥꒷' // wm2
global.wm3 = '• elaina ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ' // wm3
global.namedoc = 'sᴀɴsᴍᴀʜɪʀᴜ' // nama document
global.titlebot = '🎋 ┊ sɪᴍᴘʟᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ'
global.botdate = `• ᴅᴀʏ's: ${week} ${date}`
global.bottime = `ᴛɪᴍᴇ: ${wktuwib}`
global.author = global.wm
global.versielaina = '1.0.0'

/*============== THUMB ==============*/
global.elaina = 'https://telegra.ph/file/ccfab120681cd8bff3245.jpg'

/*============== LOGO ==============*/
global.thumb = 'https://telegra.ph/file/cce9ab4551f7150f1970d.jpg' // thumbnail
global.thumb2 = 'https://telegra.ph/file/26b515d170f1e599f78a7.jpg'
global.thumbbc = 'https://telegra.ph/file/05f874dc87f7e27fa8127.jpg' // broadcast
global.giflogo = 'https://telegra.ph/file/a46ab7fa39338b1f54d5a.mp4'
global.thumblvlup = 'https://telegra.ph/file/a3e66e0fa840b08236c75.jpg'
global.hwaifu = [
    'https://telegra.ph/file/af8c2b354ce1504d2c907.jpg',
    'https://telegra.ph/file/f9a7f842e5e25efca9420.jpg',
    'https://telegra.ph/file/058b2f68f05b46b74ad32.jpg',
    'https://telegra.ph/file/6989f6ad4258aecf81e97.jpg',
    'https://telegra.ph/file/29715ca81c75e0d1d5012.jpg',
    'https://telegra.ph/file/b3edba5f8618dc47e73d1.jpg'
]

global.wait = '🚩 ʟᴏᴀᴅɪɴɢ ᴘʟᴇᴀsᴇ ᴡᴀɪᴛ... '
global.eror = '```404 error```'
global.dtu = 'ɪɴꜱᴛᴀɢʀᴀᴍ'
global.dtc = 'ᴄᴀʟʟ ᴏᴡɴᴇʀ'
global.phn = '+62 851-7727-3730'

global.loading = (m, conn, back = false) => {
    if (!back) {
        return conn.sendReact(m.chat, "🕒", m.key)
    } else {
        return conn.sendReact(m.chat, "", m.key)
    }
}

/*============== EMOJI ==============*/
global.rpg = {
    emoticon(string) {
        string = string.toLowerCase()
        let emot = {
            level: '📊',
            limit: '🎫',
            health: '❤️',
            exp: '✨',
            atm: '💳',
            money: '💰',
            bank: '🏦',
            potion: '🥤',
            diamond: '💎',
            common: '📦',
            uncommon: '🛍️',
            mythic: '🎁',
            legendary: '🗃️',
            superior: '💼',
            pet: '🔖',
            trash: '🗑',
            armor: '🥼',
            sword: '⚔️',
            pickaxe: '⛏️',
            fishingrod: '🎣',
            wood: '🪵',
            rock: '🪨',
            string: '🕸️',
            horse: '🐴',
            cat: '🐱',
            dog: '🐶',
            fox: '🦊',
            robo: '🤖',
            petfood: '🍖',
            iron: '⛓️',
            gold: '🪙',
            emerald: '❇️',
            upgrader: '🧰',
            bibitanggur: '🌱',
            bibitjeruk: '🌿',
            bibitapel: '☘️',
            bibitmangga: '🍀',
            bibitpisang: '🌴',
            anggur: '🍇',
            jeruk: '🍊',
            apel: '🍎',
            mangga: '🥭',
            pisang: '🍌',
            botol: '🍾',
            kardus: '📦',
            kaleng: '🏮',
            plastik: '📜',
            gelas: '🧋',
            chip: '♋',
            umpan: '🪱',
            skata: '🧩',
            bitcoin: '☸️',
            polygon: '☪️',
            dogecoin: '☯️',
            etherium: '⚛️',
            solana: '✡️',
            memecoin: '☮️',
            donasi: '💸',
            ammn: '⚖️',
            bbca: '💵',
            bbni: '💴',
            cuan: '🧱',
            bbri: '💶',
            msti: '📡',
            steak: '🥩',
            ayam_goreng: '🍗',
            ribs: '🍖',
            roti: '🍞',
            udang_goreng: '🍤',
            bacon: '🥓',
            gandum: '🌾',
            minyak: '🥃',
            garam: '🧂',
            babi: '🐖',
            ayam: '🐓',
            sapi: '🐮',
            udang: '🦐'
        }
        if (typeof emot[string] !== 'undefined') {
            return emot[string]
        } else {
            return ''
        }
    }
}



//------ JANGAN DIUBAH -----
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'config.js'"))
    import(`${file}?update=${Date.now()}`)
})
