let handler = async(m, { conn }) => {
    let { arabic, arti } = islami.getRandom()
    m.reply(`${arabic}\n${arti}`)
}
handler.help = ['islami']
handler.tags = ['quotes']
handler.command = /^(quotesislami|islami)$/i
handler.limit = true
export default handler

const islami = [
   {
      "id": "1",
      "arabic": "مَنْ سَارَ عَلىَ الدَّرْبِ وَصَلَ",
      "arti": "Barang siapa berjalan pada jalannya, maka dia akan sampai (pada tujuannya)."
   },
   {
      "id": "2",
      "arabic": "مَنْ صَبَرَ ظَفِرَ",
      "arti": "Barang siapa bersabar, maka dia akan beruntung."
   },
   {
      "id": "3",
      "arabic": "مَنْ جَدَّ وَجَـدَ",
      "arti": "Barang siapa bersungguh-sungguh, maka dia akan meraih (kesuksesan)."
   },
   {
      "id": "4",
      "arabic": "جَالِسْ أَهْلَ الصِّدْقِ وَالوَفَاءِ",
      "arti": "Bergaulah bersama orang-orang yang jujur dan menepati janji."
   },
   {
      "id": "5",
      "arabic": "مَنْ قَلَّ صِدْقُهُ قَلَّ صَدِيْقُهُ",
      "arti": "Barang siapa sedikit kejujurannya, maka sedikit pulalah temannya."
   },
   {
      "id": 6,
      "arabic": "مَوَدَّةُ الصَّدِيْقِ تَظْهَرُ وَقْتَ الضِّيْقِ",
      "arti": "Kecintaan seorang teman itu akan terlihat pada waktu kesempitan."
   },
   {
      "id": "7",
      "arabic": "الصَّبْرُ يُعِيْنُ عَلَى كُلِّ عَمَلٍ",
      "arti": "Kesabaran akan menolong segala pekerjaan."
   },
   {
      "id": "8",
      "arabic": "وَمَا اللَّذَّةُ إِلاَّ بَعْدَ التَّعَبِ",
      "arti": "Tidak ada kenikmatan kecuali setelah kepayahan."
   },
   {
      "id": "9",
      "arabic": "جَرِّبْ وَلاَحِظْ تَكُنْ عَارِفًا",
      "arti": "Coba dan perhatikanlah, maka engkau akan menjadi orang yang tahu."
   },
   {
      "id": "10",
      "arabic": "بَيْضَةُ اليَوْمِ خَيْرٌ مِنْ دَجَاجَةِ الغَدِ",
      "arti": "Telur hari ini lebih baik daripada ayam esok hari."
   },
   {
      "id": "11",
      "arabic": "أُطْلُبِ الْعِلْمَ مِنَ الْمَهْدِ إِلَى الَّلحْدِ",
      "arti": "Carilah ilmu sejak dari buaian hingga liang lahat."
   },
   {
      "id": "12",
      "arabic": "الوَقْتُ أَثْمَنُ مِنَ الذَّهَبِ",
      "arti": "Waktu itu lebih berharga daripada emas."
   },
   {
      "id": "13",
      "arabic": "لاَ خَيْرَ فيِ لَذَّةٍ تَعْقِبُ نَدَماً",
      "arti": "Tak ada kebaikan bagi kenikmatan yang diiringi dengan penyesalan."
   },
   {
      "id": "14",
      "arabic": "أَخِي لَنْ تَنَالَ العِلْمَ إِلاَّ بِسِتَّةٍ سَأُنْبِيْكَ عَنْ تَفْصِيْلِهَا بِبَيَانٍ: ذَكَاءٌ وَحِرْصٌ وَاجْتِهَادٌ وَدِرْهَمٌ وَصُحْبَةُ أُسْتَاذٍ وَطُوْلُ زَمَانٍ",
      "arti": "Wahai saudaraku, Kamu tidak akan memperoleh ilmu kecuali dengan enam perkara, akan aku sampaikan rinciannya dengan jelas; 1) Kecerdasan, 2) Ketamaan (terhadap ilmu), 3) Kesungguhan, 4) Harta benda (sebagai bekal), 5) Bergaul dengan guru, 6) Waktu yang lama."
   },
   {
      "id": "15",
      "arabic": "لاَ تَكُنْ رَطْباً فَتُعْصَرَ وَلاَ يَابِسًا فَتُكَسَّرَ",
      "arti": "Janganlah kamu bersikap lemah, sehingga kamu mudah diperas. Dan janganlah kamu bersikap keras, sehingga kamu mudah dipatahkan."
   },
   {
      "id": "16",
      "arabic": "لِكُلِّ مَقَامٍ مَقَالٌ وَلِكُلِّ مَقَالٍ مَقَامٌ",
      "arti": "Setiap tempat memiliki perkataannya masing-masing, dan setiap perkataan memiliki tempatnya masing-masing."
   },{
      "id": "17",
      "arabic": "خَيْرُ النَّاسِ أَحْسَنُهُمْ خُلُقاً وَأَنْفَعُهُمْ لِلنَّاسِ",
      "arti": "Sebaik-baik manusia adalah yang paling baik budi pekertinya dan yang paling bermanfaat bagi manusia lainnya."
   },
   {
      "id": "18",
      "arabic": "خَيْرُ جَلِيْسٍ في الزّمانِ كِتابُ",
      "arti": "Sebaik-baik teman duduk di setiap waktu adalah buku."
   },
   {
      "id": "19",
      "arabic": "مَنْ يَزْرَعْ يَحْصُدْ",
      "arti": "Barang siapa menanam, pasti ia akan memetik (mengetam)."
   },
   {
      "id": "20",
      "arabic": "لَوْلاَ العِلْمُ لَكَانَ النَّاسُ كَالبَهَائِمِ",
      "arti": "Kalaulah tidak karena ilmu, niscaya manusia itu seperti binatang."
   },
   {
      "id": "21",
      "arabic": "سَلاَمَةُ الإِنْسَانِ فيِ حِفْظِ اللِّسَانِ",
      "arti": "Keselamatan manusia itu terletak pada penjagaan lidahnya (perkataannya)."
   },
   {
      "id": "22",
      "arabic": "الرِّفْقُ بِالضَّعِيْفِ مِنْ خُلُقِ الشَّرِيْفِ",
      "arti": "Berlaku lemah lembut kepada orang yang lemah itu termasuk akhlak orang yang mulia (terhormat)."
   },
   {
      "id": "23",
      "arabic": "وَعَامِلِ النَّاسَ بِمَا تُحِبُّ مِنْهُ دَائِماً",
      "arti": "Dan bergaullah dengan manusia dengan sikap yang kamu juga suka diperlakukan seperti itu."
   },
   {
      "id": "24",
      "arabic": "لَيْسَ الجَمَالُ بِأَثْوَابٍ تُزَيِّنُنُا إِنَّ الجَمَالَ جمَاَلُ العِلْمِ وَالأَدَبِ",
      "arti": "Kecantikan bukanlah dengan pakaian yang melekat menghiasi diri kita, sesungguhnya kecantikan ialah kecantikan dengan ilmu dan budi pekerti."
   },
   {
      "id": "25",
      "arabic": "مَنْ أَعاَنَكَ عَلىَ الشَّرِّ ظَلَمَكَ",
      "arti": "Barang siapa membantumu dalam kejahatan, maka sesungguhnya ia telah berbuat aniaya terhadapmu."
   }
]