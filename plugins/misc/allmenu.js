import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fs from 'fs'
import fetch from 'node-fetch'

import { generateWAMessageFromContent, proto } from '@rexxhayanasi/elaina-baileys'

let handler = async (m, { conn, usedPrefix: _p }) => {
                     
  let Styles = (text, style = 1) => {
    const xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('')
    const yStr = Object.freeze({
      1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
    })
    const replacer = xStr.map((v, i) => ({
      original: v,
      convert: yStr[style].split('')[i]
    }))
    
    return text.toLowerCase().split('').map(v => {
      const find = replacer.find(x => x.original === v)
      return find ? find.convert : v
    }).join('')
  }

                      
  let loadd = [
    "□□■■■■■■■■\n             𝟷𝟶％",
    "■■□□■■■■■■\n             𝟹𝟶％",
    "■■■■□□■■■■\n             𝟻𝟶％",
    "■■■■■■□□■■\n             𝟾𝟶％",
    "■■■■■■■■□□\n             𝟷𝟶𝟶％",
    "ʟ ᴏ ᴀ ᴅ ɪ ɴ ɢ  ᴄ ᴏ ᴍ ᴘ ʟ ᴇ ᴛ ᴇ. . ."
  ]

                                 
  let { key } = await conn.sendMessage(m.chat, { 
    text: 'ʟ ᴏ ᴀ ᴅ ɪ ɴ ɢ. . .',
    contextInfo: {
      externalAdReply: {
        showAdAttribution: false,
        mediaType: 1,
        title: "ＡＫＳＥＳ ＤＩＴＯＬＡＫ",
        body: global.config.watermark,
        thumbnail: fs.readFileSync("./media/denied.jpg"),
        renderLargerThumbnail: false,
        sourceUrl: global.config.website
      }
    }
  })

                            
  for (let i = 0; i < loadd.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 850))
    await conn.sendMessage(m.chat, { text: loadd[i], edit: key })
  }

                        
  let apalah = fs.readFileSync('./vn/menuall.mp3')
  let bjir = 'https://telegra.ph/file/27f6aaef7ac56daffda9e.jpg'

                                                               
  let memek = {
    key: {
      remoteJid: 'status@broadcast',
      participant: '0@s.whatsapp.net'
    },
    message: {
      orderMessage: {
        itemCount: 9999999999,
        status: 1,
        thumbnail: await getBuffer(bjir),                                            
        surface: 1,
        message: 'Elaina ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ',
        orderTitle: wm,
        sellerJid: '0@s.whatsapp.net'
      }
    }
  }

              
  let user = `@${m.sender.split('@')[0]}`
  let tags = {}

  const defaultMenu = {
    before: `Haloo、Haii %name 🍁
aku、Elaina、Yang、Siap membantu kamu dalam keperluan sehari hari ╮⁠(⁠＾⁠▽⁠＾⁠)⁠╭。 

乂  『S T A T I S T I C』

『 _*❏ I N F O  B O T  E L A I N A*_ 』
|▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬
| ɴᴀᴍᴇ *_Bot_* : *_Elaina AI_* |
| *ɴᴀᴍᴇ* :: %name              |
|... Baca Ini ...              |
|▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭
|┊⿻ [ *ʀᴜɴᴛɪᴍᴇ* :: %muptime] . .
|┊⿻ [ *ᴘʀᴇғɪx* :: <%p>] . .
|┊⿻ [ *ᴅᴀᴛᴀʙᴀsᴇ* :: %totalreg] . .
|┊⿻ [ *ᴅᴀᴛᴇ* :: %date]. . 
|┊⿻ [ *ᴘʟᴀᴛғᴏʀᴍ* :: %platform]. . 
|┊⿻ [ *ʟɪʙʀᴀʀʏ* :: @rexxhayanasi/elaina-baileys]
|┊⿻ [ *ᴄʀᴇᴀᴛᴏʀ* :: 『Rexx Hayanasi』
|┊⿻ [✿『Elaina - Multidevice © 2024 』]
▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭

Elaina AI、Diupgrade Dengan Fitur- Fitur baru Dan akan terus update 、Jadi Tunggu saja yakk ✧ (⁠づ⁠｡⁠◕⁠‿⁠‿⁠◕⁠｡⁠)⁠づ⁠✧。
%readmore`.trim(),
    
    header: '▬▭▬▭₍⫹⫺₎❝┊ *%category*▬▭▬▭',
    body: `⋄ ┊⿻   %cmd %islimit %isPremium `,
    footer: '▬▭▬▭▬▭▬▭▬▭▬▭▬▭ –',
    after: `Elaina ᴀɪ ʙʏ ʀᴇxxzynX ${global.version}`,
  }

  try {
                    
    let name = m.pushName || conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta'
    })
    let time = d.toLocaleTimeString(locale, { timeZone: 'Asia/Jakarta' }).replace(/[.]/g, ':')

                         
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }

    let _uptime = process.uptime() * 1000
    let totalreg = Object.keys(global.db.data.users).length
    let platform = os.platform()
    let muptime = clockString(_uptime)
    let uptime = clockString(_muptime)

                       
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })

                       
    for (let plugin of help) {
      if (plugin && 'tags' in plugin) {
        for (let tag of plugin.tags) {
          if (!(tag in tags) && tag) tags[tag] = tag
        }
      }
    }

                         
    conn.menu = conn.menu || {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || defaultMenu.after

                         
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag].toUpperCase()) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Ⓛ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')

    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''

                           
    let replace = {
      '%': '%',
      p: _p, 
      uptime, 
      muptime,
      me: conn.getName(conn.user.jid),
      name, 
      date, 
      time, 
      platform, 
      _p, 
      totalreg,
      readmore: readMore
    }

    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), 
      (_, name) => '' + replace[name])

                      
    await conn.sendMessage(m.chat, {
      video: fs.readFileSync('./menuvid/elaina.mp4'),
      mimetype: 'video/mp4',
      fileLength: 1000000,
      caption: Styles(text),
      gifPlayback: true,
      gifAttribution: 5,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          forwardingScore: 2023,
          title: ' _*❏ I N F O  B O T  E L A I N A*_',
          thumbnailUrl: bjir,
          sourceUrl: 'https://rexxzyn.vercel.app',
          mediaType: 1,
          renderLargerThumbnail: true,
          mentionedJid: [m.sender]
        }
      }
    }, { quoted: memek })

                      
    await conn.sendFile(m.chat, apalah, 'menu.mp3', null, m, true, {
      type: 'audioMessage',
      ptt: true,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: false,
        externalAdReply: {
          title: 'Elaina ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ',
          body: wm,
          sourceUrl: 'https://whatsapp.com/channel/',
          thumbnail: await (await fetch(bjir)).buffer(),
        }
      }
    })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '⚠️ Maaf, menu sedang error.', m)
  }
}

handler.command = /^(allmenu|menuall|menunya)$/i
handler.register = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

async function getBuffer(url) {
  let res = await fetch(url)
  return await res.buffer()
}
