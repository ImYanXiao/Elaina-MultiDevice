//~~~~ Don't Delete For Credit
//~~~~ Made By ImYanXiao
//~~~~ Special Thanks Kazuko & Reysekha For DATABASE
//1) Kazuko: https://github.com/kazuko
//2) Rey: https://github.com/inirey
//JANGAN LUPA UBAH APIKEYNYA DI CONFIG.JS

//------ FUNCTION 
function pickRandom(list) {
     return list[Math.floor(Math.random() * list.length)]
     }

//------- MODULE  
let { MessageType } = (await import('@adiwajshing/baileys')).default
import fetch from 'node-fetch'

//---------------------------------
let handler  = async (m, { conn, command, args, usedPrefix, DevMode, isPrems }) => {
	
	// ------- OTHER ------
  if (global.db.data.chats[m.chat].nsfw == false && m.isGroup) return conn.sendButton(m.chat, '❗ ᴏᴘᴛɪᴏɴs ɴsғᴡ ᴅɪᴄʜᴀᴛ ɪɴɪ ʙᴇʟᴜᴍ ᴅɪɴʏᴀʟᴀᴋᴀɴ ᴏʟᴇʜ ᴀᴅᴍɪɴ ɢʀᴏᴜᴘ',botdate, null, [['ᴇɴᴀʙʟᴇ', '.on nsfw']], m)
  
  let type = (args[0] || '').toLowerCase()
  let _type = (args[0] || '').toLowerCase()
  let ch = db.data.chats[m.chat].premnsfw
  //--------------------------

//---------------------SOURCE

//> Raw Github User
let res1 = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/nsfw/thighs.json`)).json()
let cita1= res1[Math.floor(Math.random() * res1.length)]
let res2 = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/nsfw/tentacles.json`)).json()
let cita2 = res2[Math.floor(Math.random() * res2.length)]
let res3 = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/nsfw/panties.json`)).json()
let cita3 = res3[Math.floor(Math.random() * res3.length)]
let res4 = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/nsfw/masturbation.json`)).json()
let cita4 = res4[Math.floor(Math.random() * res4.length)]
let res5 =await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/nsfw/manga.json`)).json()
let cita5 = res5[Math.floor(Math.random() * res5.length)]
let res6 = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/nsfw/jahy.json`)).json()
let cita6 = res6[Math.floor(Math.random() * res6.length)]
let res7 = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/nsfw/ero.json`)).json()
let cita7 = res7[Math.floor(Math.random() * res7.length)]
let res8 = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/nsfw/ass.json`)).json()
let cita8 = res8[Math.floor(Math.random() * res8.length)]
let res9 = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/nsfw/ahegao.json`)).json()
let cita9 = res9[Math.floor(Math.random() * res9.length)]
let res10 = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/nsfw/bdsm.json`)).json()
let cita10 = res10[Math.floor(Math.random() * res10.length)]
let res11 = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/nsfw/zettai.json`)).json()
let cita11 = res11[Math.floor(Math.random() * res11.length)]
let res12 = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/nsfw/orgy.json`)).json()
let cita12 = res12[Math.floor(Math.random() * res12.length)]
let res13 = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/nsfw/glasses.json`)).json()
let cita13 = res13[Math.floor(Math.random() * res13.length)]
let res14 = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/nsfw/gangbang.json`)).json()
let cita14 = res14[Math.floor(Math.random() * res14.length)]
let res15 = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/nsfw/foot.json`)).json()
let cita15 = res15[Math.floor(Math.random() * res15.length)]
let res16 = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/nsfw/eba.json`)).json()
let cita16 = res16[Math.floor(Math.random() * res16.length)]
let res17 = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/nsfw/cuckold.json`)).json()
let cita17 = res17[Math.floor(Math.random() * res17.length)]

//> Default
let res = 'https://api.lolhuman.xyz/api/random/nsfw/'
let api = '?apikey=' + lolkey

//> Lolhuman
let resl = 'https://api.lolhuman.xyz/api/random2/'
let apil = '?apikey=' + lolkey

//> Xteam //Not Use Xteam
let xres = 'https://api.xteam.xyz/randomimage/'
let xapi = '?APIKEY=' + xkey
//--------------------------------

// ••••••••••••••••• OPTIONS •••••••••••

// > Example :
// OPTIONS
// • false = Free
// • true = premium

let ahegao = false
let anal = false
let ass = true
let blowjob = true
let bsdm = false
let cuckold = false
let cums = true
let eba = false
let ecchi = true
let ero = false
let erofeet = false
let erogirl = false
let holoero = false
let erokitsune = false
let eroneko = false
let eroyuri = true
let feet = true
let femdom = true
let foot = false
let futanari = true
let gangbang = false
let girlsolo = true
let glasses = false
let hentai = true
let holo = false
let jahy = true
let kitsune = true
let kuni = true
let loli = true
let manga = true
let milf = false
let mstrb = false
let neko = false
let panties = false
let pussy = true
let oppai = true
let orgy = false
let spank = true
let tentacles = false
let thighs = false
let tits = true
let trap = true
let waifu = true
let yaoi = true
let yuri = true
let zettai = false

//-------------------------------------

//---------- TEXT -----------
let next = 'ɴ ᴇ x ᴛ'
let fot = botdate
let txtprem = '❗ ɴsғᴡ ɪɴɪ ᴋʜᴜsᴜs ᴜsᴇʀ ᴘʀᴇᴍɪᴜᴍ\nʜᴀʀᴀᴘ ʜᴜʙᴜɴɢɪ ᴏᴡɴᴇʀ ᴜɴᴛᴜᴋ ᴍᴇᴍʙᴇʟɪ ᴘʀᴇᴍɪᴜᴍ ! 📞'
let p = '🅟 | '
let f = 'Ⓕ | '

let tekk = `\`\`\`➩ Random Image Nsfw ${args[0] ? args[0].capitalize() : false}\`\`\` `
  let teks = `┊ 📮 Silahkan Pilih Dibawah!
┊› Atau ketik ${usedPrefix}nsfw neko
❏──···––`
//---------------------------

//--------- BUTTON SELECTIONS ----------
const sections = [
   {
	title: '◤◢◣◥◤◢◣◥◤◢◣◥◤◢◣◥◤◢◣◥◤◢◣◥◤◢◣◥◤◢◣◥',
	rows: [
	{title: `${(ch == true ? false : ahegao) == true ? p : f}` + "A • Ahegao", rowId: ".nsfw ahegao"},
	{title: `${(ch == true ? false : anal) == true ? p:f}` + "A • Anal", rowId: ".nsfw anal"},
	{title: `${(ch == true ? false : ass) == true ? p:f}` + "A • Ass", rowId: ".nsfw ass"},
	{title: `${(ch == true ? false : blowjob) == true ? p:f}` + "B • BlowJob", rowId: ".nsfw blowjob"},
	{title: `${(ch == true ? false : bsdm) == true ? p:f}` + "B • Bsdm", rowId: ".nsfw bsdm"},
	{title: `${(ch == true ? false : cuckold) == true ? p:f}` + "C • Cuckold", rowId: ".nsfw cuckold"},
	{title: `${(ch == true ? false : cums) == true ? p:f}` + "C • Cumsluts", rowId: ".nsfw cums"},
	{title: `${(ch == true ? false : eba) == true ? p:f}` + "E • Eba", rowId: ".nsfw eba"},
	{title: `${(ch == true ? false : ecchi) == true ? p:f}` + "E • Ecchi", rowId: ".nsfw ecchi"},
	{title: `${(ch == true ? false : ero) == true ? p:f}` + "E • Ero", rowId: ".nsfw ero"},
  //{title: `${(ch == true ? false : erofeet) == true ? p:f}` + "E • Ero Feet", rowId: ".nsfw erofeet"},
	{title: `${(ch == true ? false : erogirl) == true ? p:f}` + "E • Ero Girl", rowId: ".nsfw erogirl"},
	{title: `${(ch == true ? false : holoero) == true ? p:f}` + "E • Ero Holo", rowId: ".nsfw holoero"},
  //{title: `${(ch == true ? false : erokitsune) == true ? p:f}` + "E • Ero Kitsune", rowId: ".nsfw erokitsune"},
  //{title: `${(ch == true ? false : eroneko) == true ? p:f}` + "E • Ero Neko", rowId: ".nsfw eroneko"},
    {title: `${(ch == true ? false : eroyuri) == true ? p:f}` + "E • Ero Yuri", rowId: ".nsfw eroyuri"},
	{title: `${(ch == true ? false : feet) == true ? p:f}` + "F • Feet", rowId: ".nsfw feet"},
	{title: `${(ch == true ? false : foot) == true ? p:f}` + "F • Foot", rowId: ".nsfw foot"},
	{title: `${(ch == true ? false : femdom) == true ? p:f}` + "F • Femdom", rowId: ".nsfw femdom"},
	{title: `${(ch == true ? false : futanari) == true ? p:f}` + "F • Futanari", rowId: ".nsfw futanari"},
	{title: `${(ch == true ? false : gangbang) == true ? p:f}` + "G • Gangbang", rowId: ".nsfw gangbang"},
  //{title: `${(ch == true ? false : girlsolo) == true ? p:f}` + "G • Girl Solo", rowId: ".nsfw girlsolo"},
    {title: `${(ch == true ? false : glasses) == true ? p:f}` + "G • Glasses", rowId: ".nsfw glasses"},
	{title: `${(ch == true ? false : hentai) == true ? p:f}` + "H • Hentai", rowId: ".nsfw hentai"},
	{title: `${(ch == true ? false : holo) == true ? p:f}` + "H • Holo", rowId: ".nsfw holo"},
	{title: `${(ch == true ? false : jahy) == true ? p:f}` + "J • Jahy", rowId: ".nsfw jahy"},
  //{title: `${(ch == true ? false : kitsune) == true ? p:f}` + "K • Kitsune", rowId: ".nsfw kitsune"},
  //{title: `${(ch == true ? false : kuni) == true ? p:f}` + "K • Kuni", rowId: ".nsfw kuni"},
	{title: `${(ch == true ? false : loli) == true ? p:f}` + "L • Loli", rowId: ".nsfw loli"},
	{title: `${(ch == true ? false : manga) == true ? p:f}` + "M • Manga", rowId: ".nsfw manga"},
	{title: `${(ch == true ? false : milf) == true ? p:f}` + "M • Milf", rowId: ".nsfw milf"},
	{title: `${(ch == true ? false : mstrb) == true ? p:f}` + "M • Mstrb", rowId: ".nsfw mstrb"},
	{title: `${(ch == true ? false : neko) == true ? p:f}` + "N • Neko", rowId: ".nsfw neko"},
	{title: `${(ch == true ? false : oppai) == true ? p:f}` + "O • Oppai", rowId: ".nsfw oppai"},
	{title: `${(ch == true ? false : orgy) == true ? p:f}` + "O • Orgy", rowId: ".nsfw orgy"},
	{title: `${(ch == true ? false : panties) == true ? p:f}` + "P • Panties", rowId: ".nsfw panties"},
	{title: `${(ch == true ? false : pussy) == true ? p:f}` + "P • Pussy", rowId: ".nsfw pussy"},
    {title: `${(ch == true ? false : spank) == true ? p:f}` + "S • Spank", rowId: ".nsfw spank"},
	{title: `${(ch == true ? false : tentacles) == true ? p:f}` + "T • Tentacles", rowId: ".nsfw tentacles"},
	{title: `${(ch == true ? false : thighs) == true ? p:f}` + "T • Thighs", rowId: ".nsfw thighs"},
    {title: `${(ch == true ? false : tits) == true ? p:f}` + "T • Tits", rowId: ".nsfw tits"},
	{title: `${(ch == true ? false : trap) == true ? p:f}` + "T • Trap", rowId: ".nsfw trap"},
	{title: `${(ch == true ? false : waifu) == true ? p:f}` + "W • Waifu", rowId: ".nsfw waifu"},
	{title: `${(ch == true ? false : yaoi) == true ? p:f}` + "Y • Yaoi", rowId: ".nsfw yaoi"},
	{title: `${(ch == true ? false : yuri) == true ? p:f}` + "Y • Yuri", rowId: ".nsfw yuri"},
	{title: `${(ch == true ? false : zettai) == true ? p:f}` + "Z • Zettai", rowId: ".nsfw zettai"},
	]
    },
]

const listMessage = {
  text: teks,
  footer: '┏- - - - -  INFO - - - - -\n┊ 🅟 = Premium\n┊ Ⓕ = Free\n┗•',
  title: `❏––––[ *NSFW* ]–––`,
  buttonText: "- -NSFW- -",
  sections
}
//--------------------------------


//------------ CASE NSFW ! ------------
  try {
    if (/(nsfw|hentai)/i.test(command)) {
      const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
        switch (type) {
case 'ahegao':
        if ((ch == true ? false : ahegao) == true) { 
	    if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		}
          conn.sendButton(m.chat, tekk, fot, cita9, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
          break
          
case 'anal':
         if ((ch == true ? false : anal) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
         }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(resl + 'anal' + apil)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
           break
            
case 'ass':
         if ((ch == true ? false : ass) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, cita8, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
             
case 'blowjob':
         if ((ch == true ? false : blowjob) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          let bj = await(await fetch(`https://api.waifu.pics/nsfw/blowjob`)).json()
          conn.sendButton(m.chat, tekk, fot, bj.url, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break

case 'bsdm':
         if ((ch == true ? false : bsdm) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, cita10, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break

case 'cuckold':
         if ((ch == true ? false : girlsolo) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, cita17, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'cums':
         if ((ch == true ? false : cums) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(resl + 'cum' + apil)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break

case 'eba':
         if ((ch == true ? false : eba) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, cita16, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'ecchi':
         if ((ch == true ? false : ecchi) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'ecchi' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'ero':
         if ((ch == true ? false : ero) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, cita7, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'erofeet':
         if ((ch == true ? false : eroFeet) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'feet' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'erogirl':
         if ((ch == true ? false : erogirl) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'lewdanimegirls' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'holoero':
         if ((ch == true ? false : holoero) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'holo' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'erokitsune':
         if ((ch == true ? false : erokitsune) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(resl + 'erok' + apil)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'eroneko':
         if ((ch == true ? false : eroneko) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(resl + 'eron' + apil)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'eroyuri':
         if ((ch == true ? false : eroyuri) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'eroYuri' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'feet':
         if ((ch == true ? false : feet) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'feet' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'femdom':
         if ((ch == true ? false : femdom) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'femdom' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break

case 'foot':
         if ((ch == true ? false : foot) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, cita15, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'futanari':
         if ((ch == true ? false : futanari ) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'futanari' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break

case 'gangbang':
         if ((ch == true ? false : gangbang) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, cita14, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'girlsolo':
         if ((ch == true ? false : girlsolo) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(resl + 'solo' + apil)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break

case 'glasses':
         if ((ch == true ? false : glasses) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, cita13, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'hentai':
         if ((ch == true ? false : hentai) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'hentai' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'holo':
         if ((ch == true ? false : holo) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'hololewd' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'jahy':
         if ((ch == true ? false : jahy) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(xres + 'jahy' + xapi)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'kitsune':
         if ((ch == true ? false : kitsune) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'kitsune' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'kuni':
         if ((ch == true ? false : kuni) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(resl + 'kuni' + apil)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'loli':
         if ((ch == true ? false : loli) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'loli' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'manga':
         if ((ch == true ? false : manga) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, cita5, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'milf':
         if ((ch == true ? false : milf) == true) { 
         if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'milf' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'mstrb':
         if ((ch == true ? false : mstrb) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, cita4, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'neko':
         if ((ch == true ? false : neko) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'neko' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'oppai':
         if ((ch == true ? false : oppai) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'sideoppai' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break

case 'orgy':
         if ((ch == true ? false : orgy) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, cita12, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'panties':
         if ((ch == true ? false : panties) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, cita3, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'pussy':
         if ((ch == true ? false : pussy) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(resl + 'pussy' + apil)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'spank':
         if ((ch == true ? false : spank) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'spank' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'tentacles':
         if ((ch == true ? false : tentacles) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, cita2, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'tits':
         if ((ch == true ? false : tits) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'tits' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'thighs':
         if ((ch == true ? false : thighs) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, cita1, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'trap':
         if ((ch == true ? false : trap) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          let tr = await(await fetch(`https://api.waifu.pics/nsfw/trap`)).json()
          conn.sendButton(m.chat, tekk, fot, tr.url, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'waifu':
         if ((ch == true ? false : waifu) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          let wf = await(await fetch(`https://api.waifu.pics/nsfw/waifu`)).json()
          conn.sendButton(m.chat, tekk, fot, wf.url, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'yaoi':
         if ((ch == true ? false : yaoi) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'yaoi' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
case 'yuri':
         if ((ch == true ? false : yuri) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, await(await fetch(res + 'yuri' + api)).buffer(), [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break

case 'zettai':
         if ((ch == true ? false : zettai) == true) { 
	     if (!isPrems) return conn.sendButton(m.chat, txtprem, botdate, [['ʙᴜʏ ᴘʀᴇᴍɪᴜᴍ', '.premium'],['ᴏᴡɴᴇʀ', '.owner nomor']], m)
		 }
          conn.sendButton(m.chat, tekk, fot, cita11, [[next, `${usedPrefix}nsfw ${args[0]}`]],m)
            break
            
default:
         return await conn.sendMessage(m.chat, listMessage, { quoted: m, contextInfo: { mentionedJid: [m.sender] }})
        }
        } else if (/hentong/i.test(command)) {
               const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count)
               switch (_type) {
           case 'A':
               break
           case '':
               break
default:
          return conn.sendButton( m.chat, caption, fot, null, [`⋮☰ Menu`, `.menu`], m)
         }
        }
       } catch (err) {
                      m.reply("Error\n\n\n" + err.stack)
      }
//-----------------------------

}

handler.help = ['nsfw <type>', 'hentai <type>']
handler.tags = ['nsfw', 'premium']
handler.command = /^(nsfw|hentai)/i

export default handler
