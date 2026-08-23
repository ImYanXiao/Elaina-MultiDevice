let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan nama chara!\n\nExample\n${usedPrefix + command} Bronya`)
        await global.loading(m, conn)
        let name = text.toLowerCase()
        switch (name) {
            case 'trailblazer':
            case 'trail':
            case 'blazer':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Fire%20Trailblazer.jpg', name + '.jpg', '', m)
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Physical%20Trailblazer.jpg', name + '.jpg', '', m)
                break
            case 'bailu':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Bailu.jpg', name + '.jpg', '', m)
                break
            case 'bronya':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Bronya.jpg', name + '.jpg', '', m)
                break
            case 'blade':
                m.reply('Coming Soon...')
                break
            case 'clara':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Clara.jpg', name + '.jpg', '', m)
                break
            case 'fu xuan':
            case 'fuxuan':
            case 'fu':
            case 'xuan':
                m.reply('Coming Soon...')
                break
            case 'gepard':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Gepard.jpg', name + '.jpg', '', m)
                break
            case 'himeko':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Himeko.jpg', name + '.jpg', '', m)
                break
            case 'jing yuan':
            case 'jingyuan':
            case 'jing':
            case 'yuan':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Jing%20Yuan.jpg', name + '.jpg', '', m)
                break
            case 'kafka':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Kafka.jpg', name + '.jpg', '', m)
                break
            case 'luocha':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Luocha.jpg', name + '.jpg', '', m)
                break
            case 'seele':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Seele.jpg', name + '.jpg', '', m)
                break
            case 'silver wolf':
            case 'silverwolf':
            case 'silver':
            case 'wolf':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Silver%20Wolf.jpg', name + '.jpg', '', m)
                break
            case 'welt':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Welt.jpg', name + '.jpg', '', m)
                break
            case 'yanqing':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Yanqing.jpg', name + '.jpg', '', m)
                break
            case 'arlan':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Arlan.jpg', name + '.jpg', '', m)
                break
            case 'asta':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Asta.jpg', name + '.jpg', '', m)
                break
            case 'dan henk':
            case 'danhenk':
            case 'dan':
            case 'henk':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Dan%20Heng.jpg', name + '.jpg', '', m)
                break
            case 'herta':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Herta.jpg', name + '.jpg', '', m)
                break
            case 'hook':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Hook.jpg', name + '.jpg', '', m)
                break
            case 'march 7th':
            case 'march7th':
            case 'march':
            case '7th':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/March%207th.jpg', name + '.jpg', '', m)
                break
            case 'natasha':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Natasha.jpg', name + '.jpg', '', m)
                break
            case 'pela':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Pela.jpg', name + '.jpg', '', m)
                break
            case 'qingque':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Qingque.jpg', name + '.jpg', '', m)
                break
            case 'sampo':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Sampo.jpg', name + '.jpg', '', m)
                break
            case 'serval':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Serval.jpg', name + '.jpg', '', m)
                break
            case 'sushang':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Sushang.jpg', name + '.jpg', '', m)
                break
            case 'tingyun':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Tingyun.jpg', name + '.jpg', '', m)
                break
            case 'yukong':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Yukong.jpg', name + '.jpg', '', m)
                break
            case 'luka':
                await conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/HSR/main/sheet/Luka.jpg', name + '.jpg', '', m)
                break
            default:
                return conn.reply(m.chat, `Character "${text}" Tidak Di Temukan :(\nMau Coba Kata Kunci Lain?`, m)
        }
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['buildhsr']
handler.tags = ['tools']
handler.command = /^(buildhsr)$/
handler.limit = true
export default handler