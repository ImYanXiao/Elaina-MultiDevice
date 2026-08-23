let handler = async (m) => {
    let bacaan = JSON.stringify(bacaanshalat)
    let json = JSON.parse(bacaan)
    let data = json.result.map((v, i) => `${i + 1}. ${v.name}\n${v.arabic}\n${v.latin}\n*Artinya:*\n_"${v.terjemahan}"_`).join('\n\n')
    let contoh = `*「 Bacaan Shalat 」*\n\n`
    m.reply(contoh + data)
}
handler.help = ['bacaanshalat']
handler.tags = ['quran']
handler.command = /^(bacaansh?[ao]lat)$/i
handler.register = true

handler.fail = null
handler.limit = false

export default handler

const bacaanshalat = {
  "result": [
    {
      "id": 1,
      "name": "Bacaan Iftitah",
      "arabic": "اللَّهُ أَكْبَرُ كَبِيرًا وَالْحَمْدُ لِلَّهِ كَثِيرًا وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلاً , إِنِّى وَجَّهْتُ وَجْهِىَ لِلَّذِى فَطَرَ السَّمَوَاتِ وَالأَرْضَ حَنِيفًا وَمَا أَنَا مِنَ الْمُشْرِكِينَ إِنَّ صَلاَتِى وَنُسُكِى وَمَحْيَاىَ وَمَمَاتِى لِلَّهِ رَبِّ الْعَالَمِينَ لاَ شَرِيكَ لَهُ وَبِذَلِكَ أُمِرْتُ وَأَنَا أَوَّلُ الْمُسْلِمِينَ",
      "latin": "Alloohu akbar kabiirow wal hamdu lillaahi katsiiroo wasubhaanalloohi bukrotaw wa-ashiilaa, Innii wajjahtu wajhiya lilladzii fathoros samaawaati wal ardlo haniifaa wamaa ana minal musyrikiin. Inna sholaatii wa nusukii wamahyaa wa mamaatii lillaahi robbil &lsquo;aalamiin. Laa syariikalahu wa bidzaalika umirtu wa ana awwalul muslimiin",
      "terjemahan": "Allah Maha Besar dengan sebesar-besarnya, segala puji bagi Allah dengan pujian yang banyak. Mahasuci Allah pada waktu pagi dan petang, Sesungguhnya aku hadapkan wajahku kepada Allah yang telah menciptakan langit dan bumi dalam keadaan tunduk dan aku bukanlah dari golongan orang-orang musyrik. Sesungguhnya shalatku, sembelihanku, hidupku dan matiku hanya untuk Allah Tuhan semesta alam. Tidak ada sekutu bagiNya. Dan dengan yang demikian itu lah aku diperintahkan. Dan aku adalah orang yang pertama berserah diri"
    },
    {
      "id": 2,
      "name": "Al Fatihah",
      "arabic": "بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ ﴿١﴾الْحَمْدُ لِلَّـهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَـٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا   الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧",
      "latin": "1. Bismillahirrahmanirrahim, 2. Alhamdulillahi rabbil alamin, 3. Arrahmaanirrahiim, 4. Maaliki yaumiddiin, 5. Iyyaka nabudu waiyyaaka nastaiin, 6. Ihdinashirratal mustaqim, 7. shiratalladzina an&rsquo;amta alaihim ghairil maghduubi alaihim waladhaalin",
      "terjemahan": "1. Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang, 2. Segala puji bagi Allah, Tuhan semesta alam, 3. Maha Pemurah lagi Maha Penyayang, 4. Yang menguasai di Hari Pembalasan, 5. Hanya Engkaulah yang kami sembah, dan hanya kepada Engkaulah kami meminta pertolongan, 6. Tunjukilah kami jalan yang lurus, 7. (yaitu) Jalan orang-orang yang telah Engkau beri nikmat kepada mereka; bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) mereka yang sesat"
    },
    {
      "id": 3,
      "name": "Bacaan Ruku",
      "arabic": "(3x) سُبْحَانَ رَبِّيَ الْعَظِيْمِ وَبِحَمْدِهِ",
      "latin": "Subhana Rabbiyal Adzimi Wabihamdih (3x)",
      "terjemahan": "Maha Suci Tuhanku Yang Maha Agung Dan Dengan Memuji-Nya"
    },
    {
      "id": 4,
      "name": "Bacaan Sujud",
      "arabic": "(3x) سُبْحَانَ رَبِّىَ الْأَعْلَى وَبِحَمْدِهِ",
      "latin": "Subhaana robbiyal a'la wabihamdih (3x)",
      "terjemahan": "Mahasuci Tuhanku yang Mahatinggi dan segala puji bagiNya"
    },
    {
      "id": 5,
      "name": "Bacaan Duduk Diantara Dua Sujud",
      "arabic": "رَبِّ اغْفِرْلِيْ وَارْحَمْنِيْ وَاجْبُرْنِيْ وَارْفَعْنِيْ وَارْزُقْنِيْ وَاهْدِنِيْ وَعَافِنِيْ وَاعْفُ عَنِّيْ",
      "latin": "Rabbighfirli Warhamni Wajburnii Warfaknii Wazuqnii Wahdinii Wa'aafinii Wa'fuannii",
      "terjemahan": "Ya Allah,ampunilah dosaku,belas kasihinilah aku dan cukuplah segala kekuranganku da angkatlah derajatku dan berilah rezeki kepadaku,dan berilah aku petunjuk dan berilah kesehatan padaku dan berilah ampunan kepadaku"
    },
    {
      "id": 6,
      "name": "Duduk Tasyahud Awal",
      "arabic": "اَلتَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ ِللهِ، السَّلاَمُ عَلَيْكَ اَيُّهَا النَّبِيُّ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِاللهِ الصَّالِحِيْنَ، أَشْهَدُ اَنْ لآ إِلَهَ إِلاَّاللهُ وَاَشْهَدُ أَنَّ مُحَمَّدًا رَسُوْلُ اللهُ، اَللهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ",
      "latin": "Attahiyyaatul mubaarokaatush sholawaatuth thoyyibaatu lillaah. Assalaamualaika ayyuhan nabiyyu wa rohmatulloohi wa barokaatuh. Assalaaamualainaa wa alaa ibaadillaahish shoolihiin. Asyhadu allaa ilaaha illallooh wa asyhadu anna Muhammadar rosuulullooh. Allahummasholli ala Sayyidina Muhammad",
      "terjemahan": "Segala penghormatan, keberkahan, shalawat dan kebaikan hanya bagi Allah. Semoga salam sejahtera selalu tercurahkan kepadamu wahai Nabi, demikian pula rahmat Allah dan berkahNya dan semoga salam sejahtera selalu tercurah kepada kami dan hamba-hamba Allah yang shalih. Aku bersaksi bahwa tiada ilah kecuali Allah dan aku bersaksi bahwa Muhammad adalah utusan Allah. Ya Tuhan kami, selawatkanlah ke atas Nabi Muhammad"
    },
    {
      "id": 7,
      "name": "Duduk Tasyahud Akhir",
      "arabic": "اَلتَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ ِللهِ، السَّلاَمُ عَلَيْكَ اَيُّهَا النَّبِيُّ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِاللهِ الصَّالِحِيْنَ، أَشْهَدُ اَنْ لآ إِلَهَ إِلاَّاللهُ وَاَشْهَدُ أَنَّ مُحَمَّدًا رَسُوْلُ اللهُ، اَللهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى سَيِّدِنَا اِبْرَاهِيْمَ وَعَلَى آلِ سَيِّدِنَا اِبْرَاهِيْمَ وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا بَرَكْتَ عَلَى سَيِّدِنَا اِبْرَاهِيْمَ وَعَلَى آلِ سَيِّدِنَا اِبْرَاهِيْمَ فِى الْعَالَمِيْنَ إِنَّكَ حَمِيْدٌ مَجِيْدٌ",
      "latin": "Attahiyyaatul mubaarokaatush sholawaatuth thoyyibaatu lillaah. Assalaamualaika ayyuhan nabiyyu wa rohmatulloohi wa barokaatuh. Assalaaamualainaa wa alaa ibaadillaahish shoolihiin. Asyhadu allaa ilaaha illallooh wa asyhadu anna Muhammadar rosuulullooh. Allahumma Shalli Ala Sayyidina Muhammad Wa Ala Ali Sayyidina Muhammad. Kama Shollaita Ala Sayyidina Ibrahim wa alaa aali sayyidina Ibrahim, wabaarik ala Sayyidina Muhammad Wa Alaa Ali Sayyidina Muhammad, Kama barokta alaa Sayyidina Ibrahim wa alaa ali Sayyidina Ibrahim, Fil aalamiina innaka hamiidummajid",
      "terjemahan": "Segala penghormatan yang berkat solat yang baik adalah untuk Allah. Sejahtera atas engkau wahai Nabi dan rahmat Allah serta keberkatannya. Sejahtera ke atas kami dan atas hamba-hamba Allah yang soleh. Aku bersaksi bahwa tiada Tuhan melainkan Allah dan aku bersaksi bahwasanya Muhammad itu adalah pesuruh Allah. Ya Tuhan kami, selawatkanlah ke atas Nabi Muhammad dan ke atas keluarganya. Sebagaimana Engkau selawatkan ke atas Ibrahim dan atas keluarga Ibrahim. Berkatilah ke atas Muhammad dan atas keluarganya sebagaimana Engkau berkati ke atas Ibrahim dan atas keluarga Ibrahim di dalam alam ini. Sesungguhnya Engkau Maha Terpuji lagi Maha Agung"
    },
    {
      "id": 8,
      "name": "Salam",
      "arabic": "اَلسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ",
      "latin": "Assalamualaikum Warohmatullahi Wabarokatuh",
      "terjemahan": "Semoga keselamatan, rohmat dan berkah ALLAH selalu tercurah untuk kamu sekalian."
    }
  ]
}