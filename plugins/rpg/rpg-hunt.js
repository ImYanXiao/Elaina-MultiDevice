let handler = async (m, { conn, text }) => {
    let monsters = [
        { area: 1, name: "Goblin" },
        { area: 1, name: "Slime" },
        { area: 1, name: "Wolf" },
        { area: 2, name: "Nymph" },
        { area: 2, name: "Skeleton" },
        { area: 2, name: "Wolf" },
        { area: 3, name: "Baby Demon" },
        { area: 3, name: "Ghost" },
        { area: 3, name: "Zombie" },
        { area: 4, name: "Imp" },
        { area: 4, name: "Witch" },
        { area: 4, name: "Zombie" },
        { area: 5, name: "Ghoul" },
        { area: 5, name: "Giant Scorpion" },
        { area: 5, name: "Unicorn" },
        { area: 6, name: "Baby Robot" },
        { area: 6, name: "Sorcerer" },
        { area: 6, name: "Unicorn" },
        { area: 7, name: "Cecaelia" },
        { area: 7, name: "Giant Piranha" },
        { area: 7, name: "Mermaid" },
        { area: 8, name: "Giant Crocodile" },
        { area: 8, name: "Nereid" },
        { area: 8, name: "Mermaid" },
        { area: 9, name: "Demon" },
        { area: 9, name: "Harpy" },
        { area: 9, name: "Killer Robot" },
        { area: 10, name: "Dullahan" },
        { area: 10, name: "Manticore" },
        { area: 10, name: "Killer Robot" },
        { area: 11, name: "Baby Dragon" },
        { area: 11, name: "Young Dragon" },
        { area: 11, name: "Scaled Baby Dragon" },
        { area: 12, name: "Kid Dragon" },
        { area: 12, name: "Not so young Dragon" },
        { area: 12, name: "Scaled Kid Dragon" },
        { area: 13, name: "Definitely not so young Dragon" },
        { area: 13, name: "Teen Dragon" },
        { area: 13, name: "Scaled Teen Dragon" },
    ]

    let player = global.db.data.users[m.sender]
    let timeSinceLastHunt = new Date() - player.lasthunt
    let cdMinutes = Math.floor(timeSinceLastHunt / 60000) % 60
    let cdSeconds = Math.floor(timeSinceLastHunt / 1000) % 60
    let remainingMinutes = Math.ceil(2 - cdMinutes)
    let remainingSeconds = Math.ceil(60 - cdSeconds)

    if (timeSinceLastHunt > 120000) {
        let areaMonster = monsters[Math.floor(Math.random() * monsters.length)]
        let monster = areaMonster.name
        let monsterName = monster.toUpperCase()
        let coins = Math.floor(Math.random() * 401)
        let exp = Math.floor(Math.random() * 601)
        let sum = 82
        let damage = player.sword * 5 + player.armor * 5 - sum
        damage = damage < 0 ? Math.abs(damage) : 0

        player.health -= damage
        player.lasthunt = new Date().getTime()                      

        if (player.health < 0) {
            player.health = 100
            player.level = Math.max(0, player.level - 1)
            let deathMessage = `*@${m.sender.split("@")[0]}* Anda Mati Dibunuh Oleh ${monsterName}`
            if (player.level > 0) {
                deathMessage += `\nLevel Anda Turun 1 Karena Mati Saat Berburu!`
            }
            m.reply(deathMessage)
            return
        }

        player.money += coins
        player.exp += exp

        let message = `*@${m.sender.split("@")[0]}* Menemukan Dan Membunuh *${monsterName}*\nMendapatkan ${new Intl.NumberFormat('en-US').format(coins)} coins & ${new Intl.NumberFormat('en-US').format(exp)} XP\nBerkurang -${damage}Hp, Tersisa ${player.health}/100`
        await conn.reply(m.chat, message, m, { mentions: [m.sender] })
    } else {
        m.reply(`Silahkan tunggu *00:0${remainingMinutes}:${remainingSeconds}* untuk hunting lagi.`)
    }
}

handler.help = ['hunt']
handler.tags = ['rpg']
handler.command = /^(hunt(ing)?)$/i
handler.register = true
handler.group = true
handler.rpg = true
handler.energy = 5
export default handler

function formatMinutes(ms) {
    let m = isNaN(ms) ? '02' : Math.floor(ms / 60000) % 60
    return [m].map(v => v.toString().padStart(2, 0)).join(':')
}

function formatSeconds(ms) {
    let s = isNaN(ms) ? '60' : Math.floor(ms / 1000) % 60
    return [s].map(v => v.toString().padStart(2, 0)).join(':')
}
