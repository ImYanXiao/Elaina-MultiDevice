import fetch from 'node-fetch'
import fs from 'fs'
let handler = async(m, { conn, usedPrefix, command, text }) => {
    conn.dungeon = conn.dungeon ? conn.dungeon: {}
    let user = global.db.data.users[m.sender]
    let SWORD = user.sword < 1
    let ARMOR = user.armor < 1
    let HEALT = user.health < 90
    if (SWORD || ARMOR || HEALT) {
        let lmao = item(user.sword * 1, user.armor * 1, user.health * 1, usedPrefix)
        return conn.reply(m.chat, lmao, m)                           
    }
    if (Object.values(conn.dungeon).find(room => room.id.startsWith('dungeon') && [room.game.player1, room.game.player2, room.game.player3, room.game.player4].includes(m.sender))) return m.reply('Kamu masih di dalam Dungeon')                               
    let timing = (new Date - (user.lastdungeon * 1)) * 1
    if (timing < 600000) return m.reply(`*––––––『 COOLDOWN 』––––––*\nʏᴏᴜ ʜᴀᴠᴇ ɢᴏɴᴇ ᴛᴏ ᴛʜᴇ ᴅᴜɴɢᴇᴏɴ, please wait...\n➞ ${clockString(600000 - timing)}`)            
    let room = Object.values(conn.dungeon).find(room => room.state === 'WAITING' && (text ? room.name === text: true))
    if (room) {
                         
        let p1 = room.game.player1 || ''
        let p2 = room.game.player2 || ''
        let p3 = room.game.player3 || ''
        let p4 = room.game.player4 || ''
        let c1 = room.player1 || ''
        let c2 = room.player2 || ''
        let c3 = room.player3 || ''
        let c4 = room.player4 || ''

        if (!p2) {
            room.player2 = m.chat
            room.game.player2 = m.sender
        } else if (!p3) {
            room.player3 = m.chat
            room.game.player3 = m.sender
        } else if (!p4) {
            room.player4 = m.chat
            room.game.player4 = m.sender
            room.state = 'PLAYING'
        }

        let lmao = `${!room.game.player4 ? `[• • •] ᴡᴀɪᴛɪɴɢ ${!room.game.player3 && !room.game.player4 ? '2': '1'} ᴘʟᴀʏᴇʀ ᴀɢᴀɪɴ... ${room.name ? `\n➞ ᴛʏᴘᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ғᴏʀ ᴊᴏɪɴ *${usedPrefix}${command} ${room.name}*`: ''}`: 'ᴀʟʟ ᴘʟᴀʏᴇʀ ᴀʀᴇ ᴄᴏᴍᴘʟᴀᴛᴇ...'}`
        m.reply(`*––––––『 DUNGEON 』––––––* \n ${lmao}`)
        if (room.game.player1 && room.game.player2 && room.game.player3 && room.game.player4) {

                                      
            room.price.money += (Math.floor(Math.random() * 10000)) * 1
            room.price.exp += (Math.floor(Math.random() * 5001)) * 1
            room.price.iron += (pickRandom([0, 1, 0, 0, 1, 1, 0, 0])) * 1
            room.game.diamond += (pickRandom([0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0])) * 1
            room.game.trash += (Math.floor(Math.random() * 1001)) * 1
            room.price.string += (Math.floor(Math.random() * 5)) * 1
            room.price.wood += (Math.floor(Math.random() * 10)) * 1
            room.price.rock += (Math.floor(Math.random() * 10)) * 1
            room.game.petfood += (pickRandom([0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0])) * 1
            room.game.common += (pickRandom([0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0])) * 1
            room.game.uncommon += (pickRandom([0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0])) * 1

            let str = `
➞ *ʀᴏᴏᴍ ɪᴅ:* ${room.id}
👩‍🏫 *ᴘʟᴀʏᴇʀs:*
▸ ${M(p1)}
▸ ${M(p2)}
▸ ${M(p3)}
▸ ${M(p4)}`.trim()

            await m.reply(str, c1, {
                contextInfo: {
                    mentionedJid: conn.parseMention(str)
                }
            })
            if (![c1, c3, c4].includes(c2)) m.reply(str, c2, {
                contextInfo: {
                    mentionedJid: conn.parseMention(str)
                }
            })
            if (![c1, c2, c4].includes(c3)) m.reply(str, c3, {
                contextInfo: {
                    mentionedJid: conn.parseMention(str)
                }
            })
            if (![c1, c2, c3].includes(c4)) m.reply(str, c4, {
                contextInfo: {
                    mentionedJid: conn.parseMention(str)
                }
            })

            setTimeout(async () => {
                let users = global.db.data.users
                let player = [p1, p2, p3, p4]
                let { health, sword } = room.less
                let { exp, money, sampah, potion, diamond, iron, kayu, batu, string, common, uncommon, mythic, legendary, pet, petfood } = room.price
                let str2 = `
👩‍🏫 *ᴘʟᴀʏᴇʀs:*
• *${M(p1)}*
• *${M(p2)}*
• *${M(p3)}*
• *${M(p4)}*
- - - - - - - - - - - -
*ʜᴇᴀʟᴛʜ:* -${health * 1}
*ᴅᴜʀᴀʙɪʟɪᴛʏ sᴡᴏʀᴅ:* -${sword * 1}

*- ʀ ᴇ ᴡ ᴀ ʀ ᴅ -*
*➞ ᴇxᴘ:* ${exp * 4}
*➞ ᴍᴏɴᴇʏ:* ${money * 4}
*➞ ᴛʀᴀsʜ:* ${sampah * 4}${potion == 0 ? '': '\n*➞ ᴘᴏᴛɪᴏɴ:* ' + potion * 4}${petfood == 0 ? '': '\n*➞ ғᴏᴏᴅᴘᴇᴛ:* ' + petfood * 4}${kayu == 0 ? '': '\n*➞ ᴡᴏᴏᴅ:* ' + kayu * 4}${batu == 0 ? '': '\n*➞ sᴛᴏɴᴇ:* ' + batu * 4}${string == 0 ? '': '\n*➞ sᴛʀɪɴɢ:* ' + string * 4}${iron == 0 ? '': '\n*➞ ɪʀᴏɴ:* ' + iron * 4}${diamond == 0 ? '': '\n*➞ ᴅɪᴀᴍᴏɴᴅ:* ' + diamond * 4}${common == 0 ? '': '\n*➞ ᴄᴏᴍᴍᴏɴ:* ' + common * 4}${uncommon == 0 ? '': '\n*➞ ᴜɴᴄᴏᴍᴍᴏɴ:* ' + uncommon * 4}
`.trim()
                for (let i = 0; i < player.length; i++) {
                    let p = player[i]
                    setTimeout(() => {
                        users[p].health -= health * 1
                        users[p].sworddurability -= sword * 1
                        users[p].money += money * 1
                        users[p].exp += exp * 1
                        users[p].trash += sampah * 1
                        users[p].potion += potion * 1
                        users[p].diamond += diamond * 1
                        users[p].iron += iron * 1
                        users[p].wood += kayu * 1
                        users[p].rock += batu * 1
                        users[p].string += string * 1
                        users[p].common += common * 1
                        users[p].uncommon += uncommon * 1
                        users[p].mythic += mythic * 1
                        users[p].legendary += legendary * 1
                        users[p].pet += pet * 1
                        users[p].petfood += petfood * 1
                        users[p].lastdungeon = new Date * 1

                        if ((users[p].health * 1) < 1) users[p].health = 0
                        if ((users[p].sworddurability * 1) < 1) {
                            users[p].sword -= 1
                            users[p].sworddurability = (users[p].sword * 1) * 50
                        }
                    }, (i * 1) * 1500)
                }
                let dungimg = [ 'dungeon1.jpg', 'dungeon2.jpg', 'dungeon3.jpg']
                await conn.adReply(c1, str2, '- ᴅ ᴜ ɴ ɢ ᴇ ᴏ ɴ -', '', fs.readFileSync('./media/' + dungimg.getRandom()), global.config.website, m)
                if (![c1, c3, c4].includes(c2)) m.reply(str2, c2, {
                    contextInfo: {
                        mentionedJid: conn.parseMention(str2)
                    }
                })
                if (![c1, c2, c4].includes(c3)) m.reply(str2, c3, {
                    contextInfo: {
                        mentionedJid: conn.parseMention(str2)
                    }
                })
                if (![c1, c2, c3].includes(c4)) m.reply(str2, c4, {
                    contextInfo: {
                        mentionedJid: conn.parseMention(str2)
                    }
                })

                if (mythic > 0) {
                    let str3 = '🎉 *ᴄᴏɴɢʀᴀᴛs !* 🎉\n• ' + M(p1) + '\n• ' + M(p2) + '\n• ' + M(p3) + '\n• ' + M(p4) +'\nyou get as many Rare items as *' + mythic * 4 + '* ᴍʏᴛʜɪᴄ ᴄʀᴀᴛᴇs !'
                    await m.reply(str3, c1, {
                        contextInfo: {
                            mentionedJid: conn.parseMention(str3)
                        }
                    })
                    if (![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
                        contextInfo: {
                            mentionedJid: conn.parseMention(str3)
                        }
                    })
                    if (![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
                        contextInfo: {
                            mentionedJid: conn.parseMention(str3)
                        }
                    })
                    if (![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
                        contextInfo: {
                            mentionedJid: conn.parseMention(str3)
                        }
                    })
                }

                if (legendary > 0 || pet > 0) {
                    let str3 = (mythic > 0 ? 'ᴀɴᴅ ': 'ᴄᴏɴɢʀᴀᴛs ' + M(p1) + '\n• ' + M(p2) + '\n• ' + M(p3) + '\n• ' + M(p4) + ' ʏᴏᴜ') + 'ɢᴇᴛ ᴀs ᴍᴀɴʏ ᴇᴘɪᴄ ɪᴛᴇᴍs ᴀs: ' + (pet > 0 && legendary > 0 ? `\n➞ *${legendary * 4}* ʟᴇɢᴇɴᴅᴀʀʏ ᴄʀᴀᴛᴇs\n➞ *${pet * 4}* ᴘᴇᴛ ᴛᴏᴋᴇɴ`: pet > 0 && legendary < 1 ? `\n➞ *${pet * 4}* ᴘᴇᴛ ᴛᴏᴋᴇɴ`: legendary > 0 && pet < 1 ? `\n➞ *${legendary * 4}* ʟᴇɢᴇɴᴅᴀʀʏ ᴄʀᴀᴛᴇ`: '')
                    await m.reply(str3, c1, {
                        contextInfo: {
                            mentionedJid: conn.parseMention(str3)
                        }
                    })
                    if (![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
                        contextInfo: {
                            mentionedJid: conn.parseMention(str3)
                        }
                    })
                    if (![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
                        contextInfo: {
                            mentionedJid: conn.parseMention(str3)
                        }
                    })
                    if (![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
                        contextInfo: {
                            mentionedJid: conn.parseMention(str3)
                        }
                    })
                }

                                    
                let _1 = users[p1]
                let _2 = users[p2]
                let _3 = users[p3]
                let _4 = users[p4]
                let _H1 = (_1.health * 1)
                let _H2 = (_2.health * 1)
                let _H3 = (_3.health * 1)
                let _H4 = (_4.health * 1)

                                          
                let _sd1 = (_1.sworddurability * 1)
                let _sd2 = (_2.sworddurability * 1)
                let _sd3 = (_3.sworddurability * 1)
                let _sd4 = (_4.sworddurability * 1)

                                                                             
                if ((_H1 || _H2 || _H3 || _H4 || _sd1 || _sd2 || _sd3 || _sd4) < 1) {

                                                      
                    let s1 = (_sd1 * 1) < 1
                    let s2 = (_sd2 * 1) < 1
                    let s3 = (_sd3 * 1) < 1
                    let s4 = (_sd4 * 1) < 1

                                                    
                    let HEALT = [],
                    SDH = [],
                    SDM1L = []
                    for (let siapa in player) {
                        if ((users[siapa].health * 1) < 1) HEALT.push(siapa)
                        if ((users[siapa].sworddurability * 1) < 1 && (users[siapa].sword * 1) == 1) SDH.push(siapa)
                        if ((users[siapa].sworddurability * 1) < 1 && (users[siapa].sword * 1) !== 1) SDM1L.push(siapa)
                    }

                    let sI = data(SDH)
                    let sH = data(SDM1L)
                    let H = data(HEALT)

                    let str3 = `${((SDH || SDH.length > 0) || (SDM1L || SDM1L.length > 0)) ? `⚔️Sword ${((SDH || SDH.length > 0 ? sI + ' Hancur, silahkan crafting ⚔️Sword kembali dengan mengetik *' + usedPrefix + 'craft sword*': '') + (SDM1L || SDM1L.length > 0 ? (SDH || SDH.length > 0 ? ', Sedangkan ⚔️Sword ': '') + sH + ' Hancur, dan Menurun *1* Level': ''))}`: ''}${HEALT || HEALT.length > 0 ? `❤️Nyawa ${H} habis, silahkan isi ❤️Nyawa dengan mengetik ${usedPrefix}heal`: ''}`
                    await m.reply(str3, c1, {
                        contextInfo: {
                            mentionedJid: conn.parseMention(str3)
                        }
                    })
                    if (![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
                        contextInfo: {
                            mentionedJid: conn.parseMention(str3)
                        }
                    })
                    if (![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
                        contextInfo: {
                            mentionedJid: conn.parseMention(str3)
                        }
                    })
                    if (![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
                        contextInfo: {
                            mentionedJid: conn.parseMention(str3)
                        }
                    })
                }

                                                              
                delete conn.dungeon[room.id]

            }, pickRandom([1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000]))
            if (conn.dungeon && room.state == 'PLAYING') delete conn.dungeon[room.id]                                              
        }
    } else {
        room = {
            id: 'dungeon-' + (+ new Date),
            player1: m.chat,
            player2: '',
            player3: '',
            player4: '',
            state: 'WAITING',
            game: {
                player1: m.sender,
                player2: '',
                player3: '',
                player4: '',
            },
            price: {
                money: (Math.floor(Math.random() * 1001)) * 1,
                exp: (Math.floor(Math.random() * 3001)) * 1,
                sampah: (Math.floor(Math.random() * 1001)) * 1,
                potion: (Math.floor(Math.random() * 5)) * 1,
                diamond: (pickRandom([0, 0, 0, 0, 1, 1, 1, 5, 3, 0, 0])) * 1,
                iron: (Math.floor(Math.random() * 10)) * 1,
                kayu: (Math.floor(Math.random() * 12)) * 1,
                batu: (Math.floor(Math.random() * 10)) * 1,
                string: (Math.floor(Math.random() * 10)) * 1,
                common: (pickRandom([0, 0, 0, 3, 2, 4, 1, 0, 0])) * 1,
                uncommon: (pickRandom([0, 0, 0, 1, 2, 1, 3, 0, 0, 0])) * 1,
                mythic: (pickRandom([0, 0, 0, 1, 2, 1, 1, 0, 0, 0, 0, 0])) * 1,
                legendary: (pickRandom([0, 0, 0, 2, 3, 1, 0, 0, 0, 0, 0, 0, 0])) * 1,
                pet: (pickRandom([0, 0, 0, 1, 3, 5, 2, 4, 0, 0, 0, 0, 0, 0])) * 1,
                petfood: (pickRandom([0, 0, 0, 1, 4, 3, 6, 0, 0, 0, 0])) * 1,
            },
            less: {
                health: (Math.floor(Math.random() * 101)) * 1,
                sword: (Math.floor(Math.random() * 50)) * 1,
            }
        }
        if (text) room.name = text
        let lmao = '[ • • • ] ᴡᴀɪᴛɪɴɢ ᴘʟᴀʏᴇʀ ' + (text ? `ᴛʏᴘᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ
*${usedPrefix}${command} ${text}*`: '') + '\nᴏʀ ᴛʏᴘᴇ *sendiri* ᴛᴏ ᴘʟᴀʏ sᴏʟᴏ'
        m.reply(`*––––––『 DUNGEON 』––––––* \n${lmao}`)
        conn.dungeon[room.id] = room
    }
}
handler.help = ['dungeon']
handler.tags = ['rpg']
handler.command = /^(dungeon)$/i
handler.level = 15
handler.rpg = true
handler.group = true
export default handler

   
                       
                     
            
  
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
   }

   
                                       
                       
                       
                       
                            
                 
  
function item(sword, armor, health, usedPrefix) {
    let sw = (sword * 1) < 1
    let a = (armor * 1) < 1
    let h = (health * 1) < 90
    let str = `
${sw ? '➞ ʏᴏᴜ ᴅᴏɴ\'ᴛ ʜᴀᴠᴇ ᴀ sᴡᴏʀᴅ ʏᴇᴛ': ''}${sw && a && h ? ',': sw && a ? ' ᴀɴᴅ ': ''} ${a ? 'ᴀʀᴍᴏʀ !': ''}${sw && a && h ? '\n➞ ʏᴏᴜʀ ʜᴇᴀʟᴛʜ ᴍᴜsᴛ ʙᴇ ᴀᴛ ʟᴇᴀsᴛ 90': h ? '\n➞ ʏᴏᴜʀ ʜᴇᴀʟᴛʜ ᴍᴜsᴛ ʙᴇ ᴀᴛ ʟᴇᴀsᴛ 90': ''}\n- - - - - - - - - - - - - - - \n${sw ? `\n「🗡️」• ᴛᴏ ɢᴇᴛ sᴡᴏʀᴅ, ᴛʏᴘᴇ: *#craft sword*`: ''}${a ? `\n「🥼」• ᴛᴏ ɢᴇᴛ ᴀʀᴍᴏʀ, ᴛʏᴘᴇ: *#craft armor*`: ''}${h ? `\n「❤️」• ᴛᴏ ɪɴᴄʀᴇᴀsᴇ, ᴛʏᴘᴇ: *#heal*`: ''}
`.trim()
    return str
}

   
              
                     
                 
  
function M(jid) {
    return '@' + jid.split('@')[0]
}

   
          
                    
                 
  
function clockString(ms) {
    let d = isNaN(ms) ? '--': Math.floor(ms / 86400000)
    let h = isNaN(ms) ? '--': Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--': Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--': Math.floor(ms / 1000) % 60
    return ['\n' + d, ' *Days ☀️*\n ', h, ' *Hours 🕐*\n ', m, ' *Minute ⏰*\n ', s, ' *Second ⏱️* '].map(v => v.toString().padStart(2, 0)).join('')
}

   
                   
                                                  
                 
  
function data(DATA) {
    let panjang = DATA.length * 1
    let msg = ''
    DATA.forEach(player => {
        if (panjang == 1) msg += `*${M(player)}*`
        else {
            if (DATA.indexOf(player) !== (panjang - 1)) msg += `*${M(player)}*, `
            else msg += `ᴀɴᴅ *${M(player)}*`
        }
    })
    return msg
}
