let buatall = 1
let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
    
    conn.casino = conn.casino ? conn.casino : {}
    if (m.chat in conn.casino) return m.reply ('Masih ada yang melakukan casino disini, tunggu sampai selesai!!')
    else conn.casino[m.chat] = true
    try {
        let randomaku = `${Math.floor(Math.random() * 101)}`.trim()
        let randomkamu = `${Math.floor(Math.random() * 81)}`.trim()                            
        let Aku = (randomaku * 1)
        let Kamu = (randomkamu * 1)
        let count = args[0]
        count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / buatall) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
        count = Math.max(1, count)
        if (args.length < 1) return conn.reply(m.chat, usedPrefix + 'casino <jumlah>\n ' + usedPrefix + 'casino 1000', m)
        if (global.db.data.users[m.sender].exp >= count * 1) {
            global.db.data.users[m.sender].exp -= count * 1
                                              
            if (Aku > Kamu) {
                conn.reply(m.chat, `💰 Casino 💰\n*Kamu:* ${Kamu} Point\n*Computer:* ${Aku} Point\n\n*You LOSE*\nKamu kehilangan ${toRupiah(count)} Uang(xp)`.trim(), m)
            } else if (Aku < Kamu) {
                global.db.data.users[m.sender].exp += count * 2
                conn.reply(m.chat, `💰 Casino 💰\n*Kamu:* ${Kamu} Point\n*Computer:* ${Aku} Point\n\n*You Win*\nKamu mendapatkan ${toRupiah(count * 2)} Uang(xp)`.trim(), m)
            } else {
                global.db.data.users[m.sender].exp += count * 1
                conn.reply(m.chat, `💰 Casino 💰\n*Kamu:* ${Kamu} Point\n*Computer:* ${Aku} Point\n\n*SERI*\nKamu mendapatkan ${toRupiah(count * 1)} Uang(xp)`.trim(), m)
            }
        } else conn.reply(m.chat, `Uang(xp) kamu tidak mencukupi untuk Casino silahkan *#kerja* terlebih dahulu!`.trim(), m)
    } catch (e) {
        throw e
    } finally {
        delete conn.casino[m.chat]
    }
}
    
handler.help = ['casino']
handler.tags = ['rpg']
handler.command = /^(casino)$/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler 

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/gi, ".")
