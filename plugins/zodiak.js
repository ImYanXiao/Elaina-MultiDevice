const zodiak = [
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
].reverse();

function getZodiac(month, day) {
    let d = new Date(1970, month - 1, day);
    return zodiak.find(([_, _d]) => d >= _d)[0];
}

const handler = (m, { usedPrefix, command, text }) => {
    if (!text) throw `contoh:\n${usedPrefix + command} Tahun Bulan Tanggal\n\n${usedPrefix + command} 2002 02 25`;

    const date = new Date(text);
    if (date == 'Invalid Date') throw date;
    const d = new Date();
    const [tahun, bulan, tanggal] = [d.getFullYear(), d.getMonth() + 1, d.getDate()];
    const birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()];

    const zodiac = getZodiac(birth[1], birth[2]);
    const ageD = new Date(d - date);
    const age = ageD.getFullYear() - new Date(1970, 0, 1).getFullYear();

    const birthday = [tahun + (+ new Date(1970, bulan - 1, tanggal) > + new Date(1970, birth[1] - 1, birth[2])), ...birth.slice(1)];
    const cekusia = bulan === birth[1] && tanggal === birth[2] ? `Selamat ulang tahun yang ke-${age} 🥳` : age;

    const nextBirthday = new Date(tahun, birth[1] - 1, birth[2]);
    nextBirthday.setFullYear(tahun + (nextBirthday < d));
    // pake kode dibawah jika pakai VPS lokal indonesia
    // const timeUntilNextBirthday = nextBirthday - d;
    const timeUntilNextBirthday = nextBirthday - d - 7 * 60 * 60 * 1000;
  
    const daysUntilNextBirthday = Math.floor(timeUntilNextBirthday / (1000 * 60 * 60 * 24));
    const monthsUntilNextBirthday = Math.floor(daysUntilNextBirthday / 30);
  
    const hoursUntilNextBirthday = Math.floor(timeUntilNextBirthday / (1000 * 60 * 60));

    const minutesUntilNextBirthday = Math.floor((timeUntilNextBirthday % (1000 * 60 * 60)) / (1000 * 60));

    const secondsUntilNextBirthday = Math.floor((timeUntilNextBirthday % (1000 * 60)) / 1000);

    const currentHours = d.getHours();
    const currentMinutes = d.getMinutes();
    const currentSeconds = d.getSeconds();

    const newTime = new Date(d.getTime() + 7 * 60 * 60 * 1000);
    const newHours = newTime.getHours();
    const newMinutes = newTime.getMinutes();
    const newSeconds = newTime.getSeconds();

    const WaktuSekarangReplit = `${newHours}:${newMinutes}:${newSeconds}`
    // Pake kode dibawah kalo pake VPS
    // const WaktuSekarang = `${currentHours}:${currentMinutes}:${currentSeconds}`

    const teks = `
Lahir : ${birth.join('-')}
Ultah Mendatang : ${birthday.join('-')}
Usia sekarang : ${cekusia}
Usia Ultah nanti : ${cekusia + 1}
Zodiak : ${zodiac}
Waktu Sekarang : ${WaktuSekarangReplit}
${monthsUntilNextBirthday} bulan ${daysUntilNextBirthday % 30} hari lagi anda ulang tahun 🎂
${hoursUntilNextBirthday} jam ${minutesUntilNextBirthday} menit ${secondsUntilNextBirthday} detik menuju ulang tahun 🎉
`.trim();
    m.reply(teks);
};

handler.help = ['zodiac *2002 02 25*'];
handler.tags = ['tools'];
handler.command = /^(zodia[kc]|jodiak|rasi|rasibintang)$/i;

export default handler;
