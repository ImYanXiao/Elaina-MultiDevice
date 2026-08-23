import fs from 'fs'
export async function before(m) {
    conn.dungeon = conn.dungeon ? conn.dungeon : {}
    let room = Object.values(conn.dungeon).find(room => room.id.startsWith('dungeon-') && [room.game.player1, room.game.player2, room.game.player3, room.game.player4].includes(m.sender) && room.state == 'WAITING')
    if (room) {

        let p1 = room.game.player1 || ''
        let p2 = room.game.player2 || ''
        let p3 = room.game.player3 || ''
        let p4 = room.game.player4 || ''
        let c1 = room.player1 || ''
        let c2 = room.player2 || ''
        let c3 = room.player3 || ''
        let c4 = room.player4 || ''

        let PLAYER = [room.game.player1]
        if (room.game.player2) PLAYER.push(room.game.player2)
        if (room.game.player3) PLAYER.push(room.game.player3)
        if (room.game.player4) PLAYER.push(room.game.player4)
        let P = data(PLAYER)
        if (/^(sendiri|dewean)$/i.test(m.text.toLowerCase())) {
            let lmao = '! ʏᴏᴜ ᴄᴀɴ\'ᴛ ᴘʟᴀʏ sᴏʟᴏ ʙᴇᴄᴀᴜsᴇ ʏᴏᴜ ᴀʟʀᴇᴀᴅʏ ʜᴀᴠᴇ ᴀ ᴘᴀʀᴛɴᴇʀ\n➞ ᴘʟᴇᴀsᴇ ᴛʏᴘᴇ *gass* ᴛᴏ ᴘʟᴀʏ ᴡɪᴛʜ ᴏᴛʜᴇʀ ᴘᴀʀᴛɴᴇʀs...'
            if (room.player2 || room.player3 || room.player4) return conn.reply(m.chat, lmao, false, {
            quoted: m
        })
            room.state = 'PLAYING'
            let str = `
*➞ ʀᴏᴏᴍ ɪᴅ:* ${room.id}
*👩‍🏫 ᴘʟᴀʏᴇʀ:*
${P}
`.trim()
            m.reply(str, room.player1, {
                contextInfo: {
                    mentionedJid: this.parseMention(str)
                }
            })

            setTimeout(async () => {
                let users = global.db.data.users[p1]
                let { health, sword } = room.less
                let { exp, money, sampah, potion, diamond, iron, kayu, batu, string, common, uncommon, mythic, legendary, pet, petfood } = room.price
                let str2 = `
*• ʜᴇᴀʟᴛʜ:* -${health * 1}
*• sᴡᴏʀᴅ ᴅᴜʀᴀʙɪʟɪᴛʏ:* -${sword * 1}
- - - - - - - - - - - - - - - - -

*- ʀ ᴇ ᴡ ᴀ ʀ ᴅ -*
➞ *ᴇxᴘ:* ${exp}
➞ *ᴍᴏɴᴇʏ:* ${money}
➞ *ᴛʀᴀsʜ:* ${sampah}${potion == 0 ? '': '\n*➞ ᴘᴏᴛɪᴏɴ:* ' + potion}${petfood == 0 ? '': '\n*➞ ғᴏᴏᴅᴘᴇᴛ:* ' + petfood * 1}${kayu == 0 ? '': '\n*➞ ᴡᴏᴏᴅ:* ' + kayu}${batu == 0 ? '': '\n*➞ sᴛᴏɴᴇ:* ' + batu}${string == 0 ? '': '\n➞ *sᴛʀɪɴɢ:* ' + string}${iron == 0 ? '': '\n*➞ ɪʀᴏɴ:* ' + iron}${diamond == 0 ? '': '\n*➞ ᴅɪᴀᴍᴏɴᴅ:* ' + diamond}${common == 0 ? '': '\n*➞ ᴄᴏᴍᴍᴏɴ:* ' + common}${uncommon == 0 ? '': '\n*➞ ᴜɴᴄᴏᴍᴍᴏɴ:* ' + uncommon}
`.trim()
                users.health -= health * 1
                users.sworddurability -= sword * 1
                users.money += money * 1
                users.exp += exp * 1
                users.trash += sampah * 1
                users.potion += potion * 1
                users.diamond += diamond * 1
                users.iron += iron * 1
                users.wood += kayu * 1
                users.rock += batu * 1
                users.string += string * 1
                users.common += common * 1
                users.uncommon += uncommon * 1
                users.mythic += mythic * 1
                users.legendary += legendary * 1
                users.pet += pet * 1
                users.petfood += petfood * 1
                users.lastdungeon = new Date * 1
                let dungimg = [ 'dungeon1.jpg', 'dungeon2.jpg', 'dungeon3.jpg' ]
                await conn.adReply(room.player1, str2, '- ᴅ ᴜ ɴ ɢ ᴇ ᴏ ɴ -', '', fs.readFileSync('./media/' + dungimg.getRandom()), global.config.website, m)
                if (mythic > 0) {
                    let str3 = '🎉 ᴄᴏɴɢʀᴀᴛs ʏᴏᴜ ɢᴏᴛ ᴀ ɪᴛᴇᴍs ʀᴀʀᴇ ᴛʜᴀᴛ ɪs *' + mythic + '* ᴍʏᴛʜɪᴄ ᴄʀᴀᴛᴇ'
                    m.reply(str3, room.player1)
                }
                if (legendary > 0 || pet > 0) {
                    let str3 = (mythic > 0 ? 'ᴀɴᴅ': 'ᴄᴏɴɢʀᴀᴛs') + ' ɢᴏᴛ ᴀ ɪᴛᴇᴍs ʀᴀʀᴇ ᴛʜᴀᴛ ɪs ' + (pet > 0 && legendary > 0 ? `*${legendary}* ʟᴇɢᴇɴᴅᴀʀʏ ᴄʀᴀᴛᴇs ᴀɴᴅ *${pet}* ᴘᴇᴛ ᴛᴏᴋᴇɴ`: pet > 0 && legendary < 1 ? `*${pet}* ᴘᴇᴛ ᴛᴏᴋᴇɴ`: legendary > 0 && pet < 1 ? `*${legendary}* ʟᴇɢᴇɴᴅᴀʀʏ ᴄʀᴀᴛᴇs`: '')
                    m.reply(str3, room.player1)
                }
                if ((users.health * 1) < 1 || (users.sworddurability * 1) < 1) {
                    let sword1 = (users.sworddurability * 1) < 1 && (users.sword * 1) == 1
                    let _sword1 = (users.sworddurability * 1) < 1 && (users.sword * 1) > 1
                    let __sword1 = (users.sworddurability * 1) < 1 && (users.sword * 1) > 0
                    let health1 = (users.health * 1) < 1
                    if (__sword1) {
                        users.sword -= 1
                        users.sworddurability = 0
                    }
                    let str3 = `${__sword1 ? `➞ ʏᴏᴜʀ sᴡᴏʀᴅ ${_sword1 ? ` ᴛʜᴇ ʟᴇᴠᴇʟ ɪs ʀᴇᴅᴜᴄᴇᴅ ʙʏ 1 ᴅᴜᴇ ᴛᴏ ᴅᴇsᴛᴜᴄᴛɪᴏɴ`: ` ᴅᴇsᴛʀᴏʏᴇᴅ, ᴘʟᴇᴀsᴇ ᴄʀᴀғᴛ ᴀ sᴡᴏʀᴅ ᴀɢᴀɪɴ ʙʏ ᴛʏᴘɪɴɢ`}craft sword`: ''} ${health1 ? `${__sword1 ? 'ᴀɴᴅ ': ''}ʏᴏᴜʀ ʟɪғᴇ ɪs ᴏᴠᴇʀ, ᴘʟᴇᴀsᴇ ғɪʟʟ ᴀɢᴀɪɴ ʙʏ ᴛʏᴘɪɴɢ #heal`: ''}`
                    m.reply(str3, room.player1, {
                        contextInfo: {
                            mentionedJid: this.parseMention(str3)
                        }
                    })
                }
                delete conn.dungeon[room.id]
            }, pickRandom([1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000]))
            if (conn.dungeon && room.state == 'PLAYING') delete conn.dungeon[room.id]

        } else if (/^(gass?s?s?s?.?.?.?|mulai)$/i.test(m.text.toLowerCase())) {
            let str = `
➞ *ʀᴏᴏᴍ ɪᴅ:* ${room.id}
👩‍🏫 *ᴘʟᴀʏᴇʀ:*
${P}
`.trim()
            m.reply(str, c1, {
                contextInfo: {
                    mentionedJid: this.parseMention(str)
                }
            })
            if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str, c2, {
                contextInfo: {
                    mentionedJid: this.parseMention(str)
                }
            })
            if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str, c3, {
                contextInfo: {
                    mentionedJid: this.parseMention(str)
                }
            })
            if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str, c4, {
                contextInfo: {
                    mentionedJid: this.parseMention(str)
                }
            })

            for (let _p of PLAYER) {
                room.price.money += (Math.floor(Math.random() * 41)) * 1
                room.price.exp += (Math.floor(Math.random() * 76)) * 1
                room.game.sampah += (Math.floor(Math.random() * 16)) * 1
                room.price.string += (pickRandom([0, 0, 5, 10, 3, 4, 0, 1, 0, 0, 0, 0, 0, 0])) * 1
                room.price.kayu += (pickRandom([0, 0, 0, 1, 10, 4, 5, 0, 0, 0, 0, 0, 0])) * 1
                room.price.batu += (pickRandom([0, 0, 0, 5, 10, 3, 4, 1, 0, 0, 0, 0, 0, 0])) * 1
                room.game.common += (pickRandom([0, 0, 0, 3, 4, 6, 1, 0, 0, 0, 0, 0, 0, 0, 0])) * 1
            }

            let users = global.db.data.users
            let orang = PLAYER.length
            let { health, sword } = room.less
            let { exp,
                money,
                sampah,
                potion,
                diamond,
                iron,
                kayu,
                batu,
                string,
                common,
                uncommon,
                mythic,
                legendary,
                pet,
                petfood } = room.price

            setTimeout(async () => {
                let str2 = `👩‍🏫 *ᴘʟᴀʏᴇʀs:*
${P}

*ʜᴇᴀʟᴛʜ:* -${health * 1}
*sᴡᴏʀᴅ ᴅᴜʀᴀʙɪʟɪᴛʏ:* -${sword * 1}
- - - - - - - - - - - - - - - - - -

*- ʀ ᴇ ᴡ ᴀ ʀ ᴅ -*
*➞ ᴇxᴘ:* ${exp * orang}
*➞ ᴍᴏɴᴇʏ:* ${money * orang}
*➞ ᴛʀᴀsʜ:* ${sampah * orang}${potion == 0 ? '': '\n*➞ ᴘᴏᴛɪᴏɴ:* ' + potion * orang}${petfood == 0 ? '': '\n*➞ ғᴏᴏᴅᴘᴇᴛ:* ' + petfood * orang}${kayu == 0 ? '': '\n*➞ ᴡᴏᴏᴅ:* ' + kayu * orang}${batu == 0 ? '': '\n*➞ sᴛᴏɴᴇ:* ' + batu * orang}${string == 0 ? '': '\n*➞ sᴛᴏɴᴇ:* ' + string * orang}${iron == 0 ? '': '\n*➞ ɪʀᴏɴ:* ' + iron * orang}${diamond == 0 ? '': '\n*➞ ᴅɪᴀᴍᴏɴᴅ:* ' + diamond * orang}${common == 0 ? '': '\n*➞ ᴄᴏᴍᴍᴏɴ:* ' + common * orang}${uncommon == 0 ? '': '\n*➞ ᴜɴᴄᴏᴍᴍᴏɴ:* ' + uncommon * orang}
`.trim()
                let dungimg = [ 'dungeon1.jpg', 'dungeon2.jpg', 'dungeon3.jpg' ]
                await conn.adReply(c1, str2, '- ᴅ ᴜ ɴ ɢ ᴇ ᴏ ɴ -', '', fs.readFileSync('./media/' + dungimg.getRandom()), global.config.website, m)
                if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str2, c2, {
                    contextInfo: {
                        mentionedJid: this.parseMention(str2)
                    }
                })
                if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str2, c3, {
                    contextInfo: {
                        mentionedJid: this.parseMention(str2)
                    }
                })
                if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str2, c4, {
                    contextInfo: {
                        mentionedJid: this.parseMention(str2)
                    }
                })
            }, pickRandom([1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000]))
            for (let i = 0; i < PLAYER.length; i++) {
                let p = PLAYER[i]
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
                }, i * 1500)
            }

                                  
            if (mythic > 0) {
                let str3 = '🎉 ᴄᴏɴɢʀᴀᴛs 🎉\n ' + P + '\nʏᴏᴜ ɢᴇᴛ ᴀs ᴍᴀɴʏ ʀᴀʀᴇ ɪᴛᴇᴍs ᴀs *' + mythic * orang + '* ᴍʏᴛʜɪᴄ ᴄʀᴀᴛᴇ'
                m.reply(str3, c1, {
                    contextInfo: {
                        mentionedJid: this.parseMention(str3)
                    }
                })
                if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
                    contextInfo: {
                        mentionedJid: this.parseMention(str3)
                    }
                })
                if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
                    contextInfo: {
                        mentionedJid: this.parseMention(str3)
                    }
                })
                if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
                    contextInfo: {
                        mentionedJid: this.parseMention(str3)
                    }
                })
            }

                                  
            if (legendary > 0 || pet > 0) {
                let str3 = (mythic > 0 ? 'ᴀɴᴅ': 'ᴄᴏɴɢʀᴀᴛs ' + P + ' ʏᴏᴜ') + ' ɢᴇᴛ ᴀs ᴍᴀɴʏ ᴇᴘɪᴄ ɪᴛᴇᴍs ᴀs ' + (pet > 0 && legendary > 0 ? `*${legendary * orang}* ʟᴇɢᴇɴᴅᴀʀʏ ᴄʀᴀᴛᴇ ᴀɴᴅ *${pet * orang}* ᴘᴇᴛ ᴛᴏᴋᴇɴ`: pet > 0 && legendary < 1 ? `*${pet * orang}* ᴘᴇᴛ ᴛᴏᴋᴇɴ`: legendary > 0 && pet < 1 ? `*${legendary * orang}* ʟᴇɢᴇɴᴅᴀʀʏ ᴄʀᴀᴛᴇ`: '')
                m.reply(str3, c1, {
                    contextInfo: {
                        mentionedJid: this.parseMention(str3)
                    }
                })
                if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
                    contextInfo: {
                        mentionedJid: this.parseMention(str3)
                    }
                })
                if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
                    contextInfo: {
                        mentionedJid: this.parseMention(str3)
                    }
                })
                if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
                    contextInfo: {
                        mentionedJid: this.parseMention(str3)
                    }
                })
            }

                                
            let _1 = users && p1 && users[p1] ? users[p1]: {}
            let _2 = users && p2 && users[p2] ? users[p2]: {}
            let _3 = users && p3 && users[p3] ? users[p3]: {}
            let _4 = users && p4 && users[p4] ? users[p4]: {}
            let _H1 = _1 && _1.health ? (_1.health * 1): 100
            let _H2 = _2 && _2.health ? (_2.health * 1): 100
            let _H3 = _3 && _3.health ? (_3.health * 1): 100
            let _H4 = _4 && _4.health ? (_4.health * 1): 100

                                      
            let _sd1 = _1 && _1.sworddurability ? (_1.sworddurability * 1): 100
            let _sd2 = _2 && _2.sworddurability ? (_2.sworddurability * 1): 100
            let _sd3 = _3 && _3.sworddurability ? (_3.sworddurability * 1): 100
            let _sd4 = _4 && _4.sworddurability ? (_4.sworddurability * 1): 100

                                                                         
            if ((_H1 || _H2 || _H3 || _H4 || _sd1 || _sd2 || _sd3 || _sd4) < 1) {

                                                  
                let s1 = _sd1 ? (_sd1 * 1) < 1: false
                let s2 = _sd2 ? (_sd2 * 1) < 1: false
                let s3 = _sd3 ? (_sd3 * 1) < 1: false
                let s4 = _sd4 ? (_sd4 * 1) < 1: false

                                                
                let HEALT = []
                SDH = []
                SDM1L = []
                for (let siapa in PLAYER) {
                    if ((users[siapa].health * 1) < 1) HEALT.push(siapa)
                    if ((users[siapa].sworddurability * 1) < 1 && (users[siapa].sword * 1) == 1) SDH.push(siapa)
                    if ((users[siapa].sworddurability * 1) < 1 && (users[siapa].sword * 1) !== 1) SDM1L.push(siapa)
                }

                                          
                let sI = data(SDH)
                let sH = data(SDM1L)
                let H = data(HEALT)

                let str3 = `${((SDH || SDH.length > 0) || (SDM1L || SDM1L.length > 0)) ? `⚔️Sword ${((SDH || SDH.length > 0 ? sI + ' Hancur, silahkan crafting ⚔️Sword kembali dengan mengetik *#craft sword*': '') + (SDM1L || SDM1L.length > 0 ? (SDH || SDH.length > 0 ? ', Sedangkan ⚔️Sword ': '') + sH + ' Hancur, dan Menurun *1* Level': ''))}`: ''}${HEALT || HEALT.length > 0 ? `❤️Nyawa ${H} habis, silahkan isi ❤️Nyawa dengan mengetik #heal`: ''}`
                m.reply(str3, c1, {
                    contextInfo: {
                        mentionedJid: this.parseMention(str3)
                    }
                })
                if (c2 && ![c1, c3, c4].includes(c2)) m.reply(str3, c2, {
                    contextInfo: {
                        mentionedJid: this.parseMention(str3)
                    }
                })
                if (c3 && ![c1, c2, c4].includes(c3)) m.reply(str3, c3, {
                    contextInfo: {
                        mentionedJid: this.parseMention(str3)
                    }
                })
                if (c4 && ![c1, c2, c3].includes(c4)) m.reply(str3, c4, {
                    contextInfo: {
                        mentionedJid: this.parseMention(str3)
                    }
                })
            }
            delete conn.dungeon[room.id]
        }
        if (conn.dungeon && room.state == 'PLAYING') delete conn.dungeon[room.id]                                    
    }
    return
}


   
                       
                     
            
  
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
