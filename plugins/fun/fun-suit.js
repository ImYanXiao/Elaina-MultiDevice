let handler = async (m, { text, usedPrefix }) => {
    let salah = `Pilihan Yang Tersedia\n\nGunting, Kertas, Batu\n\n${usedPrefix}suit gunting\n\nKasih Spasi!`
    if (!text) return m.reply(salah)
    var astro = Math.random()

    if (astro < 0.34) {
        astro = 'batu' 
    } else if (astro > 0.34 && astro < 0.67) {
        astro = 'gunting' 
    } else {
        astro = 'kertas'
    }

                      
    if (text == astro) {
        m.reply(`Seri!\nkamu: ${text}\nBot: ${astro}`)
    } else if (text == 'batu') {
        if (astro == 'gunting') {
            global.db.data.users[m.sender].money += 1000
            m.reply(`Kamu Menang!\n+1000 Money\nKamu: ${text}\nFangz Bot: ${astro}`)
        } else {
            m.reply(`Kamu Kalah!\nKamu: ${text}\nBot: ${astro}`)
        }
    } else if (text == 'gunting') {
        if (astro == 'kertas') {
            global.db.data.users[m.sender].money += 1000
            m.reply(`Kamu Menang!\n+1000 Money\nKamu: ${text}\nFangz Bot: ${astro}`)
        } else {
            m.reply(`Kamu Kalah!\nKamu: ${text}\nBot: ${astro}`)
        }
    } else if (text == 'kertas') {
        if (astro == 'batu') {
            global.db.data.users[m.sender].money += 1000
            m.reply(`Kamu Menang! \n+1000 Money\nKamu: ${text}\nFangz Bot: ${astro}`)
        } else {
            m.reply(`Kamu Kalah!\nKamu: ${text}\nBot: ${astro}`)
        }
    } else {
        m.reply(salah)
    }
}
handler.help = ['suit']
handler.tags = ['fun']
handler.command = /^(suit)$/i
export default handler 
