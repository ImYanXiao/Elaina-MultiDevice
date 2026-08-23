import { canLevelUp, xpRange } from '../../lib/levelling.js'
import moment from 'moment-timezone'
import canvafy from "canvafy"
import fs from "fs"

let handler = async (m, { conn }) => {
    try {
        let user = global.db.data.users
        if (!canLevelUp(user[m.sender].level, user[m.sender].exp, 38)) {
            let { min, xp, max } = xpRange(user[m.sender].level, 38)
            return m.reply(`
Level ${user[m.sender].level} 📊
*${user[m.sender].exp - min} / ${xp}*
Kurang *${max - user[m.sender].exp}* lagi! ✨
`.trim())
        }
        await global.loading(m, conn)
        let before = user[m.sender].level * 1
        while (canLevelUp(user[m.sender].level, user[m.sender].exp, 38)) user[m.sender].level++
        if (before !== user[m.sender].level) {
            let str = `
*🎉 C O N G R A T S 🎉*
*${before}* ➔ *${user[m.sender].level}* [ *${user[m.sender].role}* ]

*Note:* _Semakin sering berinteraksi dengan bot Semakin Tinggi level kamu_
`.trim()
            let member = Object.keys(user).filter(v => user[v].level > 0).sort((a, b) => {
                const totalA = user[a].level
                const totalB = user[b].level
                return totalB - totalA;
            })
            let { min, xp, max } = xpRange(user[m.sender].level, 38)
            const pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => fs.readFileSync('./src/avatar_contact.png'))
            const name = user[m.sender].registered ? user[m.sender].name: conn.getName(m.sender)
            try {
                let img = await canvafyRank(pp, name, "online", user[m.sender].level, member.indexOf(m.sender), user[m.sender].exp - min, xp)
                await conn.sendFile(m.chat, img, 'levelup.jpg', str, m)
            } catch (e) {
                let img = await canvafyRank(pp, name, "online", user[m.sender].level, member.indexOf(m.sender), user[m.sender].exp - min, xp)
                await conn.sendFile(m.chat, img, 'levelup.jpg', str, m)
            }
        }
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}

handler.help = ['levelup']
handler.tags = ['xp']
handler.command = /^level(|up)$/i

export default handler

async function canvafyRank(avatar, username, status, level, rank, cxp, rxp) {
    const background = ["https://pomf2.lain.la/f/tjkwx2ro.jpg", "https://pomf2.lain.la/f/unw8fo6l.jpg", "https://pomf2.lain.la/f/kw2o7unm.jpg", "https://pomf2.lain.la/f/2kjrz5ho.jpg", "https://pomf2.lain.la/f/g3d4id5i.jpg"]
    const rankBuffer = await new canvafy.Rank()
    .setAvatar(avatar)
    .setBackground("image", background.getRandom())
    .setUsername(username)
    .setBorder("#FF00F1")
    .setBarColor("#FF00F1")
    .setStatus("online")
    .setLevel(level)
    .setRank(rank)
    .setCurrentXp(cxp)
    .setRequiredXp(rxp)
    .build();
    return rankBuffer
}