// Rewritten by RexxHayanasi

/* =============== Thanks to ===========*/
/*
+ Xnevereus07
+ ImYanXiao
+ RexxHayanasi
+ Api Developer 
+ Pengguna Elaina - Multi Device 
*/

//[!] Jangan Lupa Ganti Bagian global.config.owner dan tambahkan nomer bot di global.config.pairing

import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import moment from 'moment-timezone'

/*============= WAKTU & TANGGAL =============*/
    let wktuwib = moment.tz('Asia/Jakarta').format('HH:mm:ss') + ' WIB';
    let wktuwita = moment.tz('Asia/Makassar').format('HH:mm:ss') + ' WITA';
    let wktuwit = moment.tz('Asia/Jayapura').format('HH:mm:ss') + ' WIT';

    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

//PROSES REFACTOR BOT ELAINA - MULTIDEVICE | CONFIGURATION
global.config = {
  // --- KONFIGURASI UMUM ---
  pairing: "628xxxxxxxxxx", // Taruh nomer pairing bot mu
  autoClearSession: true, // Akan auto clear sesi setelah waktu ditentukan
  autoClearSessionMinutes: 10,
  multiplier: 38, // The higher, The harder levelup
  
  // --- SOSIAL MEDIA & KONTAK ---
  sig: 'https://instagram.com/Xiao_yan_21', // Link Instagram
  sgh: 'https://github.com/ImYanXiao', // Link Github
  sgc: 'https://chat.whatsapp.com/DyBMXDw1IshFM9z0ZHZNlR',
  sdc: '-', // Link Discord
  //snh: 'https://nhentai.net/', // Hmmm, Ini boleh kalian isi terserah :v

  // --- PEMBAYARAN ---
  pdana: '-', // Nomor Dana
  ppulsa: '-', // Nomor SimCard Yang Kamu Pake
  psaweria: 'https://saweria.com/XiaoYan021', // Link Saweria


  // --- STAFF & AKSES ---
  owner: [
    ['-', 'Developer Owner', true] // Ganti jd nomormu sama Namamu
    // [number, dia creator/owner?, dia developer?] ex= [62123456789, "siapa kek", false]
  ],
  mods: [], // Want some help?
  prems: [], // Premium user bukan disini nambahinnya, ketik .addprem @user 10
  moderatorgh: [ '085282530851', 'RexxHayanasi', true],
  // Note moderatorgh: Jangan diganti jika bot mu ada error tinggal .report aja

  // --- API ---
  APIs: { // API Prefix
    nrtm: 'https://nurutomo.herokuapp.com',
    lol: 'https://api.lolhuman.xyz'
  },
  APIKeys: { // APIKey Here
    'https://api.lolhuman.xyz': 'Apikeymu'
  },

  // --- WATERMARK & TAMPILAN ---
  wm: '                「 Elaina 𝙱𝙾𝚃 汉  」', // Main Watermark
  wm2: '꒷︶꒷꒥꒷ ‧₊˚ ꒰ฅ˘Elaina - Chan˘ฅ ꒱ ‧₊˚꒷︶꒷꒥꒷',
  wm3: '⫹⫺ Elaina 𝙱𝙾𝚃',
  namedoc: 'Elaina`s Bot', // Main Name Menu Document
  botdate: `⫹⫺ Day's: ${week} ${date}\nWeton: ${weton}`,
  bottime: `⫹⫺TIME: \nWIB: ${wktuwib}\nWITA: ${wktuwita}\nWIT: ${wktuwit}`,
  titlebot: '🎋 ┊ Simple WhatsApp Bot',
  author: 'Elaina`s Bot', // Menggunakan namedoc default
  gabung: wktuwib+'\n'+wktuwita+'\n'+wktuwit,

  // --- LOGO & THUMBNAIL ---
  thumb: 'https://telegra.ph/file/cce9ab4551f7150f1970d.jpg', // Main Thumbnail
  thumb2: 'https://telegra.ph/file/26b515d170f1e599f78a7.jpg',
  thumbbc: 'https://telegra.ph/file/05f874dc87f7e27fa8127.jpg', // For broadcast
  giflogo: 'https://telegra.ph/file/a46ab7fa39338b1f54d5a.mp4',
  thumblvlup: 'https://telegra.ph/file/a3e66e0fa840b08236c75.jpg',
  thumbdoc: 'https://telegra.ph/file/6e45318d7c76f57e4a8bd.jpg',

  // --- TEKS RESPON ---
  wait: '```「▰▰▰▱▱▱▱▱▱▱」Loading...```',
  eror: '```404 error```',
  
  // --- TYPE DOCUMENT ---
  dpptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ddocx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  dxlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  dpdf: 'application/pdf',
  drtf: 'text/rtf',
  djson: 'application/json',

  // --- FAKE SIZE ---
  fsizedoc: '99999999999999', // default 10TB
  fpagedoc: '999',

  // --- HIASAN MENU ---
  // DEFAULT MENU
  dmenut: 'ଓ═┅═━–〈', // top
  dmenub: '┊↬', // body
  dmenub2: '┊', // body for info cmd on Default menu
  dmenuf: '┗––––––––––✦', // footer

  // COMMAND MENU
  dashmenu: '┅━━━═┅═❏ *ღ 𝘿𝘼𝙎𝙃𝘽𝙊𝘼𝙍𝘿 ღ* ❏═┅═━━━┅',
  cmenut: '❏––––––『', // top
  cmenuh: '』––––––', // header
  cmenub: '┊❀', // body
  cmenuf: '┗━═┅═━––––––๑\n', // footer
  cmenua: '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     ', // after
  pmenus: '┊', // pembatas menu selector

  htki: '––––––『', // Hiasan Titile (KIRI)
  htka: '』––––––', // Hiasan Title  (KANAN)
  lopr: 'Ⓟ', // LOGO PREMIUM ON MENU.JS
  lolm: 'Ⓛ', // LOGO LIMIT/FREE ON MENU.JS
  htjava: '⫹⫺',    // hiasan Doang :v
  hsquere: ['⛶','❏','⫹⫺'],

  // --- STICKER WM ---
  stickpack: '.',
  packname: `☂︎\n𝗘\nl\na\ni\nn\na\n-\n𝗕\n𝗢\n𝗧\n✦\n\n⫹⫺ Whatsapp BOT\nwa.me/-`, // Perlu diupdate jika nomor bot diisi
  requestpack: 'Sticker Request By '
};

/*============== EMOJI RPG (TETAP DI LUAR AGAR MUDAH DIAKSES) ==============*/
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
