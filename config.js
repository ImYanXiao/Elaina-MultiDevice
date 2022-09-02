// S C R I P T  O R I  B Y  Bochilgaming 🔭
// Ditulis Ulang Oleh ImYanXiao
// Credits, jangan dihapus atau diubah!

// - - THANKS TO - -
// • Allah SWT
// • Nurutomo
// • Bochilgaming
// • Rominaru
// • Kannachann
// • FahriAdison
// • The.Sad.Boy01
// • Rlxfly
// • Rasel comel
// • ImYanXiao
// • Xtreshe (Beban)
// • Dll

//[!] Jangan Dihapus, mending ditambahin 

import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import moment from 'moment-timezone'

/*============= WAKTU =============*/
let wibh = moment.tz('Asia/Jakarta').format('HH')
    let wibm = moment.tz('Asia/Jakarta').format('mm')
    let wibs = moment.tz('Asia/Jakarta').format('ss')
    let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
    
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
      
    
/*============== SOCIAL ==============*/

// kalo ga punya ketik "-" atau biarin aja biar ada creditsnya :v
global.sig = 'https://instagram.com/Xiao_yan_21' //Link Instagrammu
global.sgh = 'https://github.com/ImYanXiao' //Link Githubmu
global.sgc = 'https://chat.whatsapp.com/DyBMXDw1IshFM9z0ZHZNlR'
global.sdc = '-' //Isi Pake Link Discordmu Kalo Gada Biarin aja
global.snh = 'https://nhentai.net/g/HaramTod🗿' //Hmmm, Ini boleh kalian isi terserah :v

/*============== PAYMENT ==============*/
global.pdana = '085736178354' //Nomor Danamu
global.ppulsa = '085736178354' //Nomor SimCard Yang Kamu Pake
global.psaweria = 'https://saweria.com/XiaoYan021' //Link Saweriamu Kalo Nggada Ketik - aja

/*============== NOMOR ==============*/
global.nomorbot = '6281231079387' //Nomor Bot
global.nomorown = '6285736178354' //Nomor Owner
global.namebot = 'Elaina BOT' //Nama Bot
global.nameown = '𝓧𝓲𝓪𝓸 - 𝓨𝓪𝓷' // Nama Owner


/*============== STAFF ==============*/
global.owner = [
  ['6285736178354', '❦ 𝚇 𝚒 𝚊 𝚘 - 𝚈𝚊𝚗? 🎐', true] //Ganti jd nomormu sama Namamu
  // [number, dia creator/owner?, dia developer?]
] // Put your number here
global.mods = [] // Want some help?
global.prems = [] // Premium user bukan disini nambahinnya, ketik .addprem @user 10


/*============== API ==============*/
global.APIs = { // API Prefix
  // name: 'https://website'
  nrtm: 'https://nurutomo.herokuapp.com',
  xteam: 'https://api.xteam.xyz',
  zahir: 'https://zahirr-web.herokuapp.com',
  lol: 'https://api.lolhuman.xyz',
  ana: 'https://anabotofc.herokuapp.com/',
  amel: 'https://melcanz.com',
  hardianto: 'https://hardianto.xyz',
  adiisus: 'https://adiixyzapi.herokuapp.com',
  violetics : 'https://violetics.pw', 
  males : 'https://malesin.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'Apikeymu',
  'https://anabotofc.herokuapp.com/': 'AnaBot',
  'https://api.lolhuman.xyz': 'Apikeymu',
  'https://zahirr-web.herokuapp.com': 'zahirgans',
  'https://melcanz.com': 'apikeymu',
  'https://hardianto.xyz': 'hardianto',
  'https://violetics.pw': 'beta'
}
// Kata APIKEY itu isi dengan apikey lu sendiri, dengan beli ke website itu

/*============== WATERMARK ==============*/
global.wm = '                「 ᴇʟᴀɪɴᴀ 𝙱𝙾𝚃 汉  」' //Main Watermark
global.wm2 = '꒷︶꒷꒥꒷ ‧₊˚ ꒰ฅ˘ᴇʟᴀɪɴᴀ - ᴄʜᴀɴ˘ฅ ꒱ ‧₊˚꒷︶꒷꒥꒷'
global.wm3 = '⫹⫺ ᴇʟᴀɪɴᴀ 𝙱𝙾𝚃'
global.botdate = `⫹⫺ 𝗛𝗮𝗿𝗶: ${week} ${date}`
global.bottime = `𝗪𝗮𝗸𝘁𝘂 : ${wktuwib}`
global.titlebot = '🎋 ┊ 𝗥𝗣𝗚 ʙᴏᴛ ᴡʜᴀᴛsᴀᴘᴘ'
global.author = global.wm
global.logo = 'https://ibb.co/17RY7x9'


/*============== LOGO ==============*/
global.thumb = 'https://telegra.ph/file/0c6ff83f2adbcf4693314.gif' //Main Thumbnail
global.thumb2 = 'https://telegra.ph/file/26b515d170f1e599f78a7.jpg'
global.thumbbc = 'https://telegra.ph/file/05f874dc87f7e27fa8127.jpg' //For broadcast
global.giflogo = 'https://telegra.ph/file/a46ab7fa39338b1f54d5a.mp4'

global.fla = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text='
global.flaaa = [
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=']

/*============== TEXT ==============*/
global.wait = '```「▰▰▰▱▱▱▱▱▱▱」Loading...```'
global.eror = '```404 error```'

/*=========== TYPE DOCUMENT ===========*/
global.dpptx = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
global.ddocx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.dxlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
global.dpdf = 'application/pdf'
global.drtf = 'text/rtf'
global.djson = 'application/json'

global.thumbdoc = 'https://telegra.ph/file/6e45318d7c76f57e4a8bd.jpg'

/*=========== FAKE SIZE ===========*/
global.fsizedoc = '99999999999999' // default 10TB
global.fpagedoc = '999'

/*=========== HIASAN ===========*/
// DEFAULT MENU
global.dmenut = 'ଓ═┅═━–〈' //top
global.dmenub = '┊↬' //body
global.dmenub2 = '┊' //body for info cmd on Default menu
global.dmenuf = '┗––––––––––✦' //footer

// COMMAND MENU
global.dashmenu = '┅━━━═┅═❏ *ღ 𝘿𝘼𝙎𝙃𝘽𝙊𝘼𝙍𝘿 ღ* ❏═┅═━━━┅'
global.cmenut = '❏––––––『'                       //top
global.cmenuh = '』––––––'                        //header
global.cmenub = '┊❀'                            //body
global.cmenuf = '┗━═┅═━––––––๑\n'                //footer
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     ' //after
global.pmenus = '┊'                              //pembatas menu selector

global.htki = '––––––『' // Hiasan Titile (KIRI)
global.htka = '』––––––' // Hiasan Title  (KANAN)
global.lopr = 'Ⓟ' //LOGO PREMIUM ON MENU.JS
global.lolm = 'Ⓛ' //LOGO LIMIT/FREE ON MENU.JS
global.htjava = '⫹⫺'    //hiasan Doang :v
global.hsquere = ['⛶','❏','⫹⫺']

/*============== STICKER WM ==============*/
global.stickpack = '.'
global.stickauth = `☂︎\n𝗘\nl\na\ni\nn\na\n-\n𝗕\n𝗢\n𝗧\n✦\n\n⫹⫺ Whatsapp BOT\nwa.me/${global.nomorbot}`
global.packname = 'Cʀᴇᴀᴛᴇᴅ Bʏ'

global.multiplier = 38 // The higher, The harder levelup

/*============== EMOJI ==============*/
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = {
      level: '📊',
      limit: '🎫',
      health: '❤️',
      exp: '✨',
      money: '💹',
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
      petFood: '🍖',
      iron: '⛓️',
      gold: '🪙',
      emerald: '❇️',
      upgrader: '🧰'
      
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
    if (!results.length) return ''
    else return emot[results[0][0]]
  }
}

//------ JANGAN DIUBAH -----
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})

//------ FUNCTION
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
