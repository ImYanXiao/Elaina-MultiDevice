let handler = async (m, { usedPrefix, command, text }) => {
    if (!text) return m.reply(`Masukan Tanggal Lahir Kamu \n\nContoh :\n${usedPrefix + command} 2002 02 25`)

    let date = new Date(text)
    if (date == 'Invalid Date') return m.reply(date)
    let d = new Date()
    let [tahun, bulan, tanggal] = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
    let birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    
    let zodiac = getZodiac(birth[1], birth[2])
    let ageD = new Date(d - date)
    let age = ageD.getFullYear() - new Date(1970, 0, 1).getFullYear()

    let birthday = [tahun + (+ new Date(1970, bulan - 1, tanggal) > + new Date(1970, birth[1] - 1, birth[2])), ...birth.slice(1)]
    let cekusia = bulan === birth[1] && tanggal === birth[2] ? `Selamat ulang tahun yang ke-${age} ðŸ¥³` : age

    let teks = `
Lahir : ${birth.join('-')}
Ultah Mendatang : ${birthday.join('-')}
Usia : ${cekusia}
Zodiak : ${zodiac}
`.trim()
    await m.reply(teks)
}
handler.help = ['zodiac']
handler.tags = ['primbon']
handler.command = /^zodia[kc]$/i

export default handler 

let zodiak = [
    ["Capricorn", new Date(1970, 0, 1)],
    ["Aquarius", new Date(1970, 0, 20)],
    ["Pisces", new Date(1970, 1, 19)],
    ["Aries", new Date(1970, 2, 21)],
    ["Taurus", new Date(1970, 3, 21)],
    ["Gemini", new Date(1970, 4, 21)],
    ["Cancer", new Date(1970, 5, 22)],
    ["Leo", new Date(1970, 6, 23)],
    ["Virgo", new Date(1970, 7, 23)],
    ["Libra", new Date(1970, 8, 23)],
    ["Scorpio", new Date(1970, 9, 23)],
    ["Sagittarius", new Date(1970, 10, 22)],
    ["Capricorn", new Date(1970, 11, 22)]
].reverse()

function getZodiac(month, day) {
    let d = new Date(1970, month - 1, day)
    return zodiak.find(([_,_d]) => d >= _d)[0]
}