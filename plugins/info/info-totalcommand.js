let handler = async (m, { conn, groupMetadata }) => {
    let user = global.db.data.users
    let member = Object.keys(user).filter(v => typeof user[v].commandTotal != 'undefined' && v != conn.user.jid).sort((a, b) => {
        const totalA = user[a].command
        const totalB = user[b].command
        return totalB - totalA
    })
    let nomor = 1
    let commandToday = 0
    let commandTotal = 0
    for (let number of member) {
        commandToday += user[number].command
        commandTotal += user[number].commandTotal
    }
    let head = `Total command user hari ini: ${toRupiah(commandToday)} \nTotal semua command: ${toRupiah(commandTotal)} \n\n`
    let caption = ''
    for (let i = 0; i < member.length; i++) {
        if (typeof user[member[i]] != 'undefined' && nomor != 21) {
            caption += `*${nomor++}.* ${conn.getName(member[i])}\n`
            caption += `Chat Today : ${toRupiah(user[member[i]].command)}\n`
            caption += `Total Chat : ${toRupiah(user[member[i]].commandTotal)}\n`
            caption += `Last Chat : ${getTime(user[member[i]].lastseen)}\n\n`
        }
    }
    await m.reply(head + caption.trim())
}
handler.help = ['totalcommand']
handler.tags = ['info']
handler.command = /^(totalcommand(all)?)$/i
export default handler

export function parseMs(ms) {
    if (typeof ms !== 'number') throw 'Parameter must be filled with number'
    return {
        days: Math.trunc(ms / 86400000),
        hours: Math.trunc(ms / 3600000) % 24,
        minutes: Math.trunc(ms / 60000) % 60,
        seconds: Math.trunc(ms / 1000) % 60,
        milliseconds: Math.trunc(ms) % 1000,
        microseconds: Math.trunc(ms * 1000) % 1000,
        nanoseconds: Math.trunc(ms * 1e6) % 1000
    }
}

export function getTime(ms) {
    let now = parseMs(+new Date() - ms)
    if (now.days) return `${now.days} days ago`
    else if (now.hours) return `${now.hours} hours ago`
    else if (now.minutes) return `${now.minutes} minutes ago`
    else return `a few seconds ago`
}

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/gi, ".")