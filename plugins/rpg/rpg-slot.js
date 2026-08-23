let handler = async (m, { conn, command, args, usedPrefix }) => {
    if (args.length < 1) return m.reply(`Gunakan format *${usedPrefix}${command} [jumlah]* \ncontoh *${usedPrefix}${command} 10*`)
    let total = Math.floor(isNumber(args[0]) ? Math.min(Math.max(parseInt(args[0]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
    let user = global.db.data.users[m.sender]
    if (user.money < total) return m.reply('Money kamu kurang untuk bermain')

    let _spin1 = pickRandom(['1', '2', '3', '4', '5'])
    let _spin2 = pickRandom(['1', '2', '3', '4', '5'])
    let _spin3 = pickRandom(['1', '2', '3', '4', '5'])
    let _spin4 = pickRandom(['1', '2', '3', '4', '5'])
    let _spin5 = pickRandom(['1', '2', '3', '4', '5'])
    let _spin6 = pickRandom(['1', '2', '3', '4', '5'])
    let _spin7 = pickRandom(['1', '2', '3', '4', '5'])
    let _spin8 = pickRandom(['1', '2', '3', '4', '5'])
    let _spin9 = pickRandom(['1', '2', '3', '4', '5'])
    let spin1 = (_spin1 * 1)
    let spin2 = (_spin2 * 1)
    let spin3 = (_spin3 * 1)
    let spin4 = (_spin4 * 1)
    let spin5 = (_spin5 * 1)
    let spin6 = (_spin6 * 1)
    let spin7 = (_spin7 * 1)
    let spin8 = (_spin8 * 1)
    let spin9 = (_spin9 * 1)
    let spins1 = (spin1 == 1 ? '🍊' : spin1 == 2 ? '🍇' : spin1 == 3 ? '🍉' : spin1 == 4 ? '🍌' : spin1 == 5 ? '🍍' : '')
    let spins2 = (spin2 == 1 ? '🍊' : spin2 == 2 ? '🍇' : spin2 == 3 ? '🍉' : spin2 == 4 ? '🍌' : spin2 == 5 ? '🍍' : '')
    let spins3 = (spin3 == 1 ? '🍊' : spin3 == 2 ? '🍇' : spin3 == 3 ? '🍉' : spin3 == 4 ? '🍌' : spin3 == 5 ? '🍍' : '')
    let spins4 = (spin4 == 1 ? '🍊' : spin4 == 2 ? '🍇' : spin4 == 3 ? '🍉' : spin4 == 4 ? '🍌' : spin4 == 5 ? '🍍' : '')
    let spins5 = (spin5 == 1 ? '🍊' : spin5 == 2 ? '🍇' : spin5 == 3 ? '🍉' : spin5 == 4 ? '🍌' : spin5 == 5 ? '🍍' : '')
    let spins6 = (spin6 == 1 ? '🍊' : spin6 == 2 ? '🍇' : spin6 == 3 ? '🍉' : spin6 == 4 ? '🍌' : spin6 == 5 ? '🍍' : '')
    let spins7 = (spin7 == 1 ? '🍊' : spin7 == 2 ? '🍇' : spin7 == 3 ? '🍉' : spin7 == 4 ? '🍌' : spin7 == 5 ? '🍍' : '')
    let spins8 = (spin8 == 1 ? '🍊' : spin8 == 2 ? '🍇' : spin8 == 3 ? '🍉' : spin8 == 4 ? '🍌' : spin8 == 5 ? '🍍' : '')
    let spins9 = (spin9 == 1 ? '🍊' : spin9 == 2 ? '🍇' : spin9 == 3 ? '🍉' : spin9 == 4 ? '🍌' : spin9 == 5 ? '🍍' : '')
    user.money -= total * 1
    let WinOrLose,
    Hadiah
    if (spin1 == spin2 && spin2 == spin3 && spin3 == spin4 && spin4 == spin5 && spin5 == spin6 && spin6 == spin7 && spin7 == spin8 && spin8 == spin9) {
        WinOrLose = 'BIG JACKPOT🥳🥳'
        Hadiah = `+${total * 4}`
        user.money += total * 4
    } else if (spin4 == spin5 && spin5 == spin6) {
        WinOrLose = 'JACKPOT🥳'
        Hadiah = `+${total * 2}`
        user.money += total * 2
    } else if ((spin1 == spin2 && spin2 == spin3) || (spin7 == spin8 && spin8 == spin9)) {
        Hadiah = `-${total * 1}`
        WinOrLose = 'DIKIT LAGI!!'
    } else {
        Hadiah = `-${total * 1}`
        WinOrLose = 'YOU LOSE'
    }
    m.reply(`
*🎰VIRTUAL SLOTS🎰*
${spins1}|${spins2}|${spins3}
${spins4}|${spins5}|${spins6} <<==
${spins7}|${spins8}|${spins9}
*${WinOrLose}* *${toRupiah(Hadiah)}*
`)
}
handler.help = ['slot', 'jackpot']
handler.tags = ['rpg']
handler.command = /^slot?|jac?kpot$/i
handler.rpg = true
handler.group = true
export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/gi, ".")