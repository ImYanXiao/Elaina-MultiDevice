import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import moment from 'moment-timezone'

                                     
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

global.config = {
                                               
    instagram: 'https://instagram.com/',
    github: 'https://github.com/',
    group: 'https://chat.whatsapp.com/',
    website: 'https://test.app/',

                                             
    dana: '',
    ovo: '',
    gopay: '',
    pulsa: '',

                                           
    owner: [
        ['6285924647929', 'RexxHayanasi', true]

],
                                         
    namebot: "Elaina - MultiDevice",

                                              
                                                                          
                                                                             
                                                                          
                                                                   
                                             
    pairingNumber: "6285282530851",
    pairingAuth: true,

                                          
    watermark: 'Elaina - MultiDevice',
    author: 'Rexx Hayanasi',
    loading: 'Silahkan ditunggu...',
    errorMsg: 'Error :)',

    stickpack: 'Made With',
    stickauth: 'Elaina-MultiDevice'
}


                                           
global.wm = 'Elaina MultiDevice'       
global.wm2 = '꒷︶꒷꒥꒷ ‧₊˚ ꒰ฅ˘ᴇʟᴀɪɴᴀ˘ฅ ꒱ ‧₊˚꒷︶꒷꒥꒷'       
global.wm3 = '• elaina ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ'       
global.namedoc = 'ʀᴇxxzynxd'                 
global.titlebot = '🎋 ┊ sɪᴍᴘʟᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ'
global.botdate = `• ᴅᴀʏ's: ${week} ${date}`
global.bottime = `ᴛɪᴍᴇ: ${wktuwib}`
global.author = global.wm
global.versielaina = '1.0.0'

                                       
global.elaina = 'https://telegra.ph/file/ccfab120681cd8bff3245.jpg'

                                      
global.thumb = 'https://telegra.ph/file/cce9ab4551f7150f1970d.jpg'             
global.thumb2 = 'https://telegra.ph/file/26b515d170f1e599f78a7.jpg'
global.thumbbc = 'https://telegra.ph/file/05f874dc87f7e27fa8127.jpg'             
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
global.phn = '+62 852-8253-0851'

global.loading = (m, conn, back = false) => {
    if (!back) {
        return conn.sendReact(m.chat, "🕒", m.key)
    } else {
        return conn.sendReact(m.chat, "", m.key)
    }
}

                                       
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

                            
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'config.js'"))
    import(`${file}?update=${Date.now()}`)
})
