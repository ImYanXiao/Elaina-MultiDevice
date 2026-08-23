import fetch from 'node-fetch'
import moment from 'moment-timezone'
const cooldown = 300000
let ct = ['AF','AX','AL','DZ','AS','AD','AO','AI','AQ','AG','AR','AM','AW','AU','AT','AZ','BS','BH','BD','BB','BY','BE','BZ','BJ','BM','BT','BO','BQ','BA','BW','BV','BR','IO','BN','BG','BF','BI','KH','CM','CA','CV','KY','CF','TD','CL','CN','CX','CC','CO','KM','CG','CD','CK','CR','CI','HR','CU','CW','CY','CZ','DK','DJ','DM','DO','EC','EG','SV','GQ','ER','EE','ET','FK','FO','FJ','FI','FR','GF','PF','TF','GA','GM','GE','DE','GH','GI','GR','GL','GD','GP','GU','GT','GG','GN','GW','GY','HT','HM','VA','HN','HK','HU','IS','IN','ID','IR','IQ','IE','IM','IL','IT','JM','JP','JE','JO','KZ','KE','KI','KP','KR','XK','KW','KG','LA','LV','LB','LS','LR','LY','LI','LT','LU','MO','MK','MG','MW','MY','MV','ML','MT','MH','MQ','MR','MU','YT','MX','FM','MD','MC','MN','ME','MS','MA','MZ','MM','NA','NR','NP','NL','AN','NC','NZ','NI','NE','NG','NU','NF','MP','NO','OM','PK','PW','PS','PA','PG','PY','PE','PH','PN','PL','PT','PR','QA','RS','RE','RO','RU','RW','BL','SH','KN','LC','MF','PM','VC','WS','SM','ST','SA','SN','CS','SC','SL','SG','SX','SK','SI','SB','SO','ZA','GS','SS','ES','LK','SD','SR','SJ','SZ','SE','CH','SY','TW','TJ','TZ','TH','TL','TG','TK','TO','TT','TN','TR','XT','TM','TC','TV','UG','UA','AE','GB','US','UM','UY','UZ','VU','VE','VN','VG','VI','WF','EH','YE','ZM','ZW']
let handler = async (m, { conn, usedPrefix }) => {
    try {
        let ke = await fetch(`https://api.worldbank.org/v2/country/${ct.getRandom()}?format=json`)
        let kt = await ke.json()
        let user = global.db.data.users[m.sender]
        let timers = (cooldown - (new Date - user.lastadventure))
        if (user.health < 80) {
            return m.reply(`Your health is below 80!\nPlease heal ❤ first to adventure again.`)
        }
        if (new Date - user.lastadventure <= cooldown) {
            return m.reply(`You've already adventured, please wait until cooldown finishes.\n⏱️ ${timers.toTimeString()}`)
        }
        let rewards = await reward(user)
        let text = `🔖 Adventure to *${kt[1][0].name}*\n❏––––––『\n┊☃︎  *ID:* ${kt[1][0].id}\n┊☃︎  *City:* ${kt[1][0].capitalCity}\n┊☃︎  *Longitude:* ${kt[1][0].longitude}\n┊☃︎  *Latitude:* ${kt[1][0].latitude}\n┗━═┅═━––––––๑\nAdventure finish (. ❛ ᴗ ❛.)\n`
        for (const lost in rewards.lost) if (user[lost]) {
            const total = rewards.lost[lost].getRandom()
            user[lost] -= total * 1
            if (total) text += `\n${global.rpg.emoticon(lost)}${lost}: -${toRupiah(total)}`
        }
        text += '\n\n🔖 Adventure reward received:'
        for (const rewardItem in rewards.reward) if (rewardItem in user) {
            const total = rewards.reward[rewardItem].getRandom()
            user[rewardItem] += total * 1
            if (total) text += `\n➠ ${global.rpg.emoticon(rewardItem)}${rewardItem}: ${toRupiah(total)}`
        }
        await conn.adReply(m.chat, text, 'Adventure', '', `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`, `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`, m)
        user.lastadventure = new Date * 1
    } catch {
        try {
            let ke = await fetch(`https://api.worldbank.org/v2/country/${ct.getRandom()}?format=json`)
            let kt = await ke.json()
            let user = global.db.data.users[m.sender]
            let timers = (cooldown - (new Date - user.lastadventure))
            if (user.health < 80) {
                return m.reply(`Your health is below 80!\nPlease heal ❤ first to adventure again.`)
            }
            if (new Date - user.lastadventure <= cooldown) {
                return m.reply(`You've already adventured, please wait until cooldown finishes.\n⏱️ ${timers.toTimeString()}`)
            }
            let rewards = await reward(user)
            let text = `🔖 Adventure to *${kt[1][0].name}*\n❏––––––『\n┊☃︎  *ID:* ${kt[1][0].id}\n┊☃︎  *City:* ${kt[1][0].capitalCity}\n┊☃︎  *Longitude:* ${kt[1][0].longitude}\n┊☃︎  *Latitude:* ${kt[1][0].latitude}\n┗━═┅═━––––––๑\nAdventure finish (. ❛ ᴗ ❛.)\n`
            for (const lost in rewards.lost) if (user[lost]) {
                const total = rewards.lost[lost].getRandom()
                user[lost] -= total * 1
                if (total) text += `\n${global.rpg.emoticon(lost)}${lost}: -${toRupiah(total)}`
            }
            text += '\n\n🔖 Adventure reward received:'
            for (const rewardItem in rewards.reward) if (rewardItem in user) {
                const total = rewards.reward[rewardItem].getRandom()
                user[rewardItem] += total * 1
                if (total) text += `\n➠ ${global.rpg.emoticon(rewardItem)}${rewardItem}: ${toRupiah(total)}`
            }
            await conn.adReply(m.chat, text, 'Adventure', '', `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`, `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`, m)
            user.lastadventure = new Date * 1
        } catch {
            try {
                let ke = await fetch(`https://api.worldbank.org/v2/country/${ct.getRandom()}?format=json`)
                let kt = await ke.json()
                let user = global.db.data.users[m.sender]
                let timers = (cooldown - (new Date - user.lastadventure))
                if (user.health < 80) {
                    return m.reply(`Your health is below 80!\nPlease heal ❤ first to adventure again.`)
                }
                if (new Date - user.lastadventure <= cooldown) {
                    return m.reply(`You've already adventured, please wait until cooldown finishes.\n⏱️ ${timers.toTimeString()}`)
                }
                let rewards = await reward(user)
                let text = `🔖 Adventure to *${kt[1][0].name}*\n❏––––––『\n┊☃︎  *ID:* ${kt[1][0].id}\n┊☃︎  *City:* ${kt[1][0].capitalCity}\n┊☃︎  *Longitude:* ${kt[1][0].longitude}\n┊☃︎  *Latitude:* ${kt[1][0].latitude}\n┗━═┅═━––––––๑\nAdventure finish (. ❛ ᴗ ❛.)\n`
                for (const lost in rewards.lost) if (user[lost]) {
                    const total = rewards.lost[lost].getRandom()
                    user[lost] -= total * 1
                    if (total) text += `\n${global.rpg.emoticon(lost)}${lost}: -${toRupiah(total)}`
                }
                text += '\n\n🔖 Adventure reward received:'
                for (const rewardItem in rewards.reward) if (rewardItem in user) {
                    const total = rewards.reward[rewardItem].getRandom()
                    user[rewardItem] += total * 1
                    if (total) text += `\n➠ ${global.rpg.emoticon(rewardItem)}${rewardItem}: ${toRupiah(total)}`
                }
                await conn.adReply(m.chat, text, 'Adventure', '', `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`, `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`, m)
                user.lastadventure = new Date * 1
            } catch {
                try {
                    let ke = await fetch(`https://api.worldbank.org/v2/country/${ct.getRandom()}?format=json`)
                    let kt = await ke.json()
                    let user = global.db.data.users[m.sender]
                    let timers = (cooldown - (new Date - user.lastadventure))
                    if (user.health < 80) {
                        return m.reply(`Your health is below 80!\nPlease heal ❤ first to adventure again.`)
                    }
                    if (new Date - user.lastadventure <= cooldown) {
                        return m.reply(`You've already adventured, please wait until cooldown finishes.\n⏱️ ${timers.toTimeString()}`)
                    }
                    let rewards = await reward(user)
                    let text = `🔖 Adventure to *${kt[1][0].name}*\n❏––––––『\n┊☃︎  *ID:* ${kt[1][0].id}\n┊☃︎  *City:* ${kt[1][0].capitalCity}\n┊☃︎  *Longitude:* ${kt[1][0].longitude}\n┊☃︎  *Latitude:* ${kt[1][0].latitude}\n┗━═┅═━––––––๑\nAdventure finish (. ❛ ᴗ ❛.)\n`
                    for (const lost in rewards.lost) if (user[lost]) {
                        const total = rewards.lost[lost].getRandom()
                        user[lost] -= total * 1
                        if (total) text += `\n${global.rpg.emoticon(lost)}${lost}: -${toRupiah(total)}`
                    }
                    text += '\n\n🔖 Adventure reward received:'
                    for (const rewardItem in rewards.reward) if (rewardItem in user) {
                        const total = rewards.reward[rewardItem].getRandom()
                        user[rewardItem] += total * 1
                        if (total) text += `\n➠ ${global.rpg.emoticon(rewardItem)}${rewardItem}: ${toRupiah(total)}`
                    }
                    await conn.adReply(m.chat, text, 'Adventure', '', `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`, `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`, m)
                    user.lastadventure = new Date * 1
                } catch {
                    try {
                        let ke = await fetch(`https://api.worldbank.org/v2/country/${ct.getRandom()}?format=json`)
                        let kt = await ke.json()
                        let user = global.db.data.users[m.sender]
                        let timers = (cooldown - (new Date - user.lastadventure))
                        if (user.health < 80) {
                            return m.reply(`Your health is below 80!\nPlease heal ❤ first to adventure again.`)
                        }
                        if (new Date - user.lastadventure <= cooldown) {
                            return m.reply(`You've already adventured, please wait until cooldown finishes.\n⏱️ ${timers.toTimeString()}`)
                        }
                        let rewards = await reward(user)
                        let text = `🔖 Adventure to *${kt[1][0].name}*\n❏––––––『\n┊☃︎  *ID:* ${kt[1][0].id}\n┊☃︎  *City:* ${kt[1][0].capitalCity}\n┊☃︎  *Longitude:* ${kt[1][0].longitude}\n┊☃︎  *Latitude:* ${kt[1][0].latitude}\n┗━═┅═━––––––๑\nAdventure finish (. ❛ ᴗ ❛.)\n`
                        for (const lost in rewards.lost) if (user[lost]) {
                            const total = rewards.lost[lost].getRandom()
                            user[lost] -= total * 1
                            if (total) text += `\n${global.rpg.emoticon(lost)}${lost}: -${toRupiah(total)}`
                        }
                        text += '\n\n🔖 Adventure reward received:'
                        for (const rewardItem in rewards.reward) if (rewardItem in user) {
                            const total = rewards.reward[rewardItem].getRandom()
                            user[rewardItem] += total * 1
                            if (total) text += `\n➠ ${global.rpg.emoticon(rewardItem)}${rewardItem}: ${toRupiah(total)}`
                        }
                        await conn.adReply(m.chat, text, 'Adventure', '', `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`, `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`, m)
                        user.lastadventure = new Date * 1
                    } catch {
                        try {
                            let ke = await fetch(`https://api.worldbank.org/v2/country/${ct.getRandom()}?format=json`)
                            let kt = await ke.json()
                            let user = global.db.data.users[m.sender]
                            let timers = (cooldown - (new Date - user.lastadventure))
                            if (user.health < 80) {
                                return m.reply(`Your health is below 80!\nPlease heal ❤ first to adventure again.`)
                            }
                            if (new Date - user.lastadventure <= cooldown) {
                                return m.reply(`You've already adventured, please wait until cooldown finishes.\n⏱️ ${timers.toTimeString()}`)
                            }
                            let rewards = await reward(user)
                            let text = `🔖 Adventure to *${kt[1][0].name}*\n❏––––––『\n┊☃︎  *ID:* ${kt[1][0].id}\n┊☃︎  *City:* ${kt[1][0].capitalCity}\n┊☃︎  *Longitude:* ${kt[1][0].longitude}\n┊☃︎  *Latitude:* ${kt[1][0].latitude}\n┗━═┅═━––––––๑\nAdventure finish (. ❛ ᴗ ❛.)\n`
                            for (const lost in rewards.lost) if (user[lost]) {
                                const total = rewards.lost[lost].getRandom()
                                user[lost] -= total * 1
                                if (total) text += `\n${global.rpg.emoticon(lost)}${lost}: -${toRupiah(total)}`
                            }
                            text += '\n\n🔖 Adventure reward received:'
                            for (const rewardItem in rewards.reward) if (rewardItem in user) {
                                const total = rewards.reward[rewardItem].getRandom()
                                user[rewardItem] += total * 1
                                if (total) text += `\n➠ ${global.rpg.emoticon(rewardItem)}${rewardItem}: ${toRupiah(total)}`
                            }
                            await conn.adReply(m.chat, text, 'Adventure', '', `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`, `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`, m)
                            user.lastadventure = new Date * 1
                        } catch {
                        	try {
                            	let ke = await fetch(`https://api.worldbank.org/v2/country/${ct.getRandom()}?format=json`)
                            	let kt = await ke.json()
                        		let user = global.db.data.users[m.sender]
                            	let timers = (cooldown - (new Date - user.lastadventure))
                            	if (user.health < 80) {
                                	return m.reply(`Your health is below 80!\nPlease heal ❤ first to adventure again.`)
                            	}
                            	if (new Date - user.lastadventure <= cooldown) {
                                	return m.reply(`You've already adventured, please wait until cooldown finishes.\n⏱️ ${timers.toTimeString()}`)
                            	}
                            	let rewards = await reward(user)
                            	let text = `🔖 Adventure to *${kt[1][0].name}*\n❏––––––『\n┊☃︎  *ID:* ${kt[1][0].id}\n┊☃︎  *City:* ${kt[1][0].capitalCity}\n┊☃︎  *Longitude:* ${kt[1][0].longitude}\n┊☃︎  *Latitude:* ${kt[1][0].latitude}\n┗━═┅═━––––––๑\nAdventure finish (. ❛ ᴗ ❛.)\n`
                            	for (const lost in rewards.lost) if (user[lost]) {
                                	const total = rewards.lost[lost].getRandom()
                                	user[lost] -= total * 1
                                	if (total) text += `\n${global.rpg.emoticon(lost)}${lost}: -${toRupiah(total)}`
                            	}
                            	text += '\n\n🔖 Adventure reward received:'
                            	for (const rewardItem in rewards.reward) if (rewardItem in user) {
                                	const total = rewards.reward[rewardItem].getRandom()
                                	user[rewardItem] += total * 1
                                	if (total) text += `\n➠ ${global.rpg.emoticon(rewardItem)}${rewardItem}: ${toRupiah(total)}`
                            	}
                            	await conn.adReply(m.chat, text, 'Adventure', '', `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`, `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${kt[1][0].longitude},${kt[1][0].latitude}&z=12&l=map&size=600,300`, m)
                            	user.lastadventure = new Date * 1
                        	} catch {
                        		m.reply("Terjadi error!")
                        	}
                        }
                    }
                }
            }
        }
    }
}
handler.help = ['adventure']
handler.tags = ['rpg']
handler.command = /^adv(entur(es?)?)?$/i

handler.register = true
handler.group = true
handler.rpg = true

export default handler

function reward(user = {}) {
    let rewards = {
        reward: {
            money: 1027,
            exp: 9251,
            trash: 101,
            potion: 2,
            rock: 2,
            wood: 2,
            string: 2,
            common: [91, 5, 34, 56, 12],
            uncommon: [5, 1, 18, 1, 3],
            mythic: [9, 0, 4, 0, 0, 1, 0, 2, 0],
            legendary: [0, 3, 0, 0, 5, 0, 0, 1, 0, 9],
            emerald: [0, 1, 0, 0, 0],
            pet: [0, 1, 0, 0, 0],
            iron: [0, 0, 0, 1, 0, 0],
            gold: [0, 0, 0, 0, 0, 1, 0],
            diamond: [9, 4, 0, 0, 1, 0, 1, 0],
        },
        lost: {
            health: 101 - [8, 10, 11, 1],
            armordurability: (15 - user.armor) * 7
        }
    }
    return rewards
}

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/gi, ".")