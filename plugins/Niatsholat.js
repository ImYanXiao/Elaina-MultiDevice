let handler = async (m) => {
    let niatsolat = JSON.stringify(global.niatsolat)
    let json = JSON.parse(niatsolat)
    let data = json.result.data.map((v, i) => `${i + 1}. ${v.niat}\n${v.arabic}\n${v.latin}\n${v.translation_id}`).join('\n\n')
   const contoh = `*Niat Sholat*\n\n`
   const anjuran = `\n\nSuatu ibadah akan diterima bila memenuhi dua hal, yaitu niat dan contoh dari rasulullah saw: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ ...[رواه البخاري ومسلم]رَ"
Artinya: "Sesungguhnya (sahnya) amal itu tergantung kepada niat ... [Hadits Riwayat al-Bukhari dan Muslim]".`
    m.reply(contoh + data + anjuran)
}
handler.help = ['niatsholat']
handler.tags = ['quran']
handler.command = /^(niatsh[ao]lat)$/i
handler.register = true
export default handler

global.niatsolat = {
    "result": {
        "data": [
            {
                "index": "1",
                "niat": "Niat Sholat Subuh",
                "arabic": "اُصَلِّى فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً ِللهِ تَعَالَى",
                "latin": "Ushalli fardhosh shubhi rok'ataini mustaqbilal qiblati adaa-an lillaahi ta'aala",
                "translation_id": "Aku berniat shalat fardhu Shubuh dua raka'at menghadap kiblat karena Allah Ta'ala"
            },
            {
                "index": "2",
                "niat": "Niat Sholat Dzuhur",
                "arabic": "اُصَلِّى فَرْضَ الظُّهْرِاَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً ِللهِ تَعَالَى",
                "latin": "Ushalli fardhodl dhuhri arba'a raka'aatim mustaqbilal qiblati adaa-an lillaahi ta'aala",
                "translation_id": "Aku berniat shalat fardhu Dzuhur empat raka'at menghadap kiblat karena Allah Ta'ala"
            },
            {
                "index": "3",
                "niat": "Niat Sholat Ashar",
                "arabic": "اُصَلِّى فَرْضَ الْعَصْرِاَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً ِللهِ تَعَالَى",
                "latin": "Ushalli fardhol 'ashri arba'a raka'aatim mustaqbilal qiblati adaa-an lillaahi ta'aala", 
                "translation_id": "Aku berniat shalat fardhu 'Ashar empat raka'at menghadap kiblat karena Allah Ta'ala"
            },
            {
                "index": "4",
                "niat": "Niat Sholat Maghrib",
                "arabic": "اُصَلِّى فَرْضَ الْمَغْرِبِ ثَلاَثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً ِللهِ تَعَالَى",
                "latin": "Ushalli fardhol maghribi tsalaata raka'aatim mustaqbilal qiblati adaa-an lillaahi ta'aala",
                "translation_id": "Aku berniat shalat fardhu Maghrib tiga raka'at menghadap kiblat karena Allah Ta'ala"
            },
            {
                "index": "5",
                "niat": "Niat Sholat Isya",
                "arabic": "اُصَلِّى فَرْضَ الْعِشَاءِ اَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً ِللهِ تَعَالَى",
                "latin": "Ushalli fardhol 'isyaa-i arba'a raka'aatim mustaqbilal qiblati adaa-an lillaahi ta'aala",
                "translation_id": "Aku berniat shalat fardhu Isya empat raka'at menghadap kiblat karena Allah Ta'ala"
            }
        ]
    }
}
