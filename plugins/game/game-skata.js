import { sKata, cKata } from '../../lib/sambung-kata.js'
const game = `
╔══「 *Kata Bersambung* 」
╟ Game Kata Bersambung adalah
║  permainan yang dimana setiap
║  pemainnya diharuskan membuat
║  kata dari akhir kata yang
║  berasal dari kata sebelumnya.
╚═════`.trim()
const rules = `
╔══「 *PERATURAN* 」
╟ Jawaban merupakan kata dasar
║  yaitu tidak mengandung
║  spasi dan imbuhan (me-, -an, dll).
╟ Pemain yang bertahan akan
║  menang dan mendapatkan
║  500xp X jumlah pemain
╟ .skata start untuk memulai
╚═════`.trim()
let poin = 500
let handler = async (m, { conn, text, isPrems, isROwner, usedPrefix, command }) => {
    let isDebug = /debug/i.test(command) && isROwner
    conn.skata = conn.skata ? conn.skata : {}
    let id = m.chat
    let kata = await genKata()
    let room_all = Object.values(conn.skata).find(room => room.id !== id && room.player.includes(m.sender))
    if (room_all) return m.reply(`Kamu sedang bermain sambung kata di chat lain, selesaikan game kamu terlebih dahulu`)
    if (id in conn.skata) {
        let room = conn.skata[id]
        let member = room.player
        if (room.status == 'play') {
            if (!room.waktu._destroyed && !room.diam) return conn.reply(m.chat, `Hii @${m.sender.split`@`[0]}, Masih ada game berlangsung di chat ini\nTunggu hingga game berakhir\nLalu ikut bergabung`, room.chat, { contextInfo: { mentionedJid: [m.sender] } })
            delete conn.skata[id]
        }
        if (text == 'start' && room.status == 'wait') {
            if (!member.includes(m.sender)) return m.reply('Kamu belum ikut')
            if (member.length < 2) return m.reply(`Minimal 2 orang`)
            room.curr = member[0]
            room.status = 'play'
            room.chat = await conn.reply(m.chat, `Saatnya @${member[0].split`@`[0]}\nMulai : *${(room.kata).toUpperCase()}*\n*${room.filter(room.kata).toUpperCase()}... ?*\n*Reply untuk menjawab!*\n"nyerah" untuk menyerah\nTotal: ${member.length} Player`, m, { contextInfo: { mentionedJid: member } })
            room.win_point = 100
            for (let i of room.player) {
                let user = global.db.data.users[i]
                if (!('skata' in user)) user.skata = 0
            }
            clearTimeout(room.waktu_list)
            room.waktu = setTimeout(() => {
                conn.reply(m.chat, `Waktu jawab habis\n@${room.curr.split`@`[0]} tereliminasi`, room.chat, { contextInfo: { mentionedJid: member } }).then(_ => {
                    room.eliminated.push(room.curr)
                    let index = member.indexOf(room.curr)
                    member.splice(index, 1)
                    room.curr = member[0]
                    if (room.player.length == 1 && room.status == 'play') {
                        global.db.data.users[member[0]].exp += room.win_point
                        conn.reply(m.chat, `@${member[0].split`@`[0]} Menang\n+${room.win_point}XP`, room.chat, { contextInfo: { mentionedJid: member } }).then(_ => {
                            delete conn.skata[id]
                            return !0
                        })
                    }
                    room.diam = true
                    room.new = true
                    let who = room.curr
                    conn.preSudo('nextkata', who, m).then(async _ => {
                        conn.ev.emit('messages.upsert', _)
                    })
                })
            }, 45000)

        } else if (room.status == 'wait') {
            if (member.includes(m.sender)) return m.reply(`Kamu sudah ikut di list`)
            member.push(m.sender)
            clearTimeout(room.waktu_list)
            room.waktu_list = setTimeout(() => {
                conn.reply(m.chat, `Sambung kata tidak dimulai (Cancel)`, room.chat).then(() => { delete conn.skata[id] })
            }, 120000)
            let caption = `
╔═〘 Daftar Player 〙
${member.map((v, i) => `╟ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
╚════
Sambung kata akan dimainkan sesuai urutan player ( *Bergiliran* )
Dan hanya bisa dimainkan oleh player yang terdaftar
`.trim()
            room.chat = await conn.reply(m.chat, `${caption}\n\nKetik\n*${usedPrefix + command}* untuk join/ikut\n*${usedPrefix + command} start* untuk memulai`, m, { contextInfo: { mentionedJid: conn.parseMention(caption) } })
        }
    } else {
        conn.skata[id] = {
            id,
            player: isDebug ? ([owner[0] + '@s.whatsapp.net', conn.user.jid, owner[0] + '@s.whatsapp.net']) : [],
            status: 'wait',
            eliminated: [],
            basi: [],
            diam: false,
            win_point: 0,
            curr: '',
            kata,
            filter,
            genKata,
            chat: conn.reply(m.chat, `${game}\n${rules}`, m),
            waktu: false

        }
    }
}
handler.help = ['sambungkata']
handler.tags = ['game']
handler.command = /^s(ambung)?kata(debug)?$/i
handler.group = true
handler.game = true
export default handler

async function genKata() {
    let json = await sKata()
    let result = json.kata
    while (result.length < 3 || result.length > 7) {
        json = await sKata()
        result = json.kata
    }
    return result
}

function filter(text) {
    let mati = ["q", "w", "r", "t", "y", "p", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"]
    let misah
    if (text.length < 3) return text
            
    if (/([qwrtypsdfghjklzxcvbnm][qwrtypsdfhjklzxcvbnm])$/.test(text)) {
        let mid = /([qwrtypsdfhjklzxcvbnm])$/.exec(text)[0]
        return mid
    }

                                                    

    if (/([qwrtypsdfghjklzxcvbnm][aiueo]ng)$/.test(text)) {
        let mid = /([qwrtypsdfghjklzxcvbnm][aiueo]ng)$/.exec(text)[0]
        return mid
    }
                                                              
    else if (/([aiueo][aiueo]([qwrtypsdfghjklzxcvbnm]|ng)?)$/i.test(text)) {
        if (/(ng)$/i.test(text)) return text.substring(text.length - 3)                          
        else if (/([qwrtypsdfghjklzxcvbnm])$/i.test(text)) return text.substring(text.length - 2)
        else return text.substring(text.length - 1)
    }
                                                        
    else if (/n[gy]([aiueo]([qwrtypsdfghjklzxcvbnm])?)$/.test(text)) {
        let nyenye = /n[gy]/i.exec(text)[0]
        misah = text.split(nyenye)
        return nyenye + misah[misah.length - 1]
    }
                                               
    else {
        let res = Array.from(text).filter(v => mati.includes(v))
        let resu = res[res.length - 1]
        for (let huruf of mati) {
            if (text.endsWith(huruf)) {
                resu = res[res.length - 2]
            }
        }
        misah = text.split(resu)
        if (text.endsWith(resu)) {
            return resu + misah[misah.length - 2] + resu
        }
        return resu + misah[misah.length - 1]
    }
}
