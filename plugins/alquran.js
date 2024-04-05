import fetch from 'node-fetch';

const maxRetries = 3;
const retryDelay = 10000; // jeda 10 detik

let handler = async (m, { args, usedPrefix, command }) => {
    const daftarsurah = `contoh:
.alquran 1 2

maka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, & ayatnya 1 saja

Nama-nama Surah:
1. Surat الفاتحة (Surah Al-Fatihah (Pembukaan The Opening)), 7 ayat | مكة
Surat Al Faatihah (Pembukaan) yang diturunkan di Mekah dan terdiri dari 7 ayat adalah surat yang pertama-tama diturunkan dengan lengkap  diantara surat-surat yang ada dalam Al Quran dan termasuk golongan surat Makkiyyah. Surat ini disebut Al Faatihah (Pembukaan), karena dengan surat inilah dibuka dan dimulainya Al Quran. Dinamakan Ummul Quran (induk Al Quran) atau Ummul Kitaab (induk Al Kitaab) karena dia merupakan induk dari semua isi Al Quran, dan karena itu diwajibkan membacanya pada tiap-tiap sembahyang. Dinamakan pula As Sab'ul matsaany (tujuh yang berulang-ulang) karena ayatnya tujuh dan dibaca berulang-ulang dalam sholat.

2. Surat البقرة (Surah Al-Baqarah (Sapi The Cow)), 286 ayat | مدينة
Surat Al Baqarah yang 286 ayat itu turun di Madinah yang sebahagian besar diturunkan pada permulaan tahun Hijrah, kecuali ayat 281 diturunkan di Mina pada Hajji wadaa' (hajji Nabi Muhammad s.a.w. yang terakhir). Seluruh ayat dari surat Al Baqarah termasuk golongan Madaniyyah, merupakan surat yang terpanjang di antara surat-surat Al Quran yang di dalamnya terdapat pula ayat yang terpancang (ayat 282). Surat ini dinamai Al Baqarah karena di dalamnya disebutkan kisah penyembelihan sapi betina yang diperintahkan Allah kepada Bani Israil (ayat 67 sampai dengan 74), dimana dijelaskan watak orang Yahudi pada umumnya. Dinamai Fusthaatul-Quran (puncak Al Quran) karena memuat beberapa hukum yang tidak disebutkan dalam surat yang lain. Dinamai juga surat  alif-laam-miim karena surat ini dimulai dengan Alif-laam-miim.

3. Surat آل عمران (Surah Ali 'Imran (Keluarga Imran The Family of Imraan)), 200 ayat | مدينة
Surat Ali 'Imran yang terdiri dari 200 ayat ini adalah surat Madaniyyah.  Dinamakan Ali 'Imran karena memuat kisah keluarga 'Imran yang di dalam kisah itu disebutkan kelahiran Nabi Isa a.s., persamaan kejadiannya dengan Nabi Adam a. s., kenabian dan beberapa mukjizatnya, serta disebut pula kelahiran Maryam puteri 'Imran, ibu dari Nabi Isa a.s. Surat Al Baqarah dan Ali 'Imran ini dinamakan Az Zahrawaani (dua yang cemerlang), karena kedua surat ini menyingkapkan hal-hal yang disembunyikan oleh para Ahli Kitab, seperti kejadian dan kelahiran Nabi Isa a.s., kedatangan Nabi Muhammad s.a.w. dan sebagainya.

4. Surat النساء (Surah An-Nisa' (Wanita The Women)), 176 ayat | مدينة
Surat An Nisaa' yang terdiri dari 176 ayat itu, adalah surat Madaniyyah yang terpanjang sesudah surat Al Baqarah. Dinamakan An Nisaa' karena dalam surat ini banyak dibicarakan hal-hal yang berhubungan dengan wanita serta merupakan surat yang paling membicarakan hal itu dibanding dengan surat-surat yang lain. Surat yang lain banyak juga yang membicarakan tentang hal wanita ialah surat Ath Thalaq. Dalam hubungan ini biasa disebut surat An Nisaa' dengan sebutan: Surat An Nisaa' Al Kubraa (surat An Nisaa' yang besar), sedang  surat Ath Thalaq disebut dengan sebutan: Surat An Nisaa' Ash Shughraa (surat An Nisaa' yang kecil).

5. Surat المائدة (Surah Al-Ma'idah (Hidangan The Table)), 120 ayat | مدينة
Surat Al Maa'idah terdiri dari 120 ayat; termasuk golongan surat Madaniyyah. Sekalipun ada ayatnya yang turun di Mekah, namun ayat ini diturunkan sesudah Nabi Muhammad s.a.w. hijrah ke Medinah, yaitu di waktu haji wadaa'. Surat ini dinamakan Al Maa'idah (hidangan) karena memuat kisah pengikut-pengikut setia Nabi Isa a.s. meminta kepada Nabi Isa a.s. agar Allah menurunkan untuk mereka Al Maa'idah (hidangan makanan) dari langit (ayat 112). Dan dinamakan Al Uqud (perjanjian), karena kata itu terdapat pada ayat pertama surat ini, dimana Allah menyuruh agar hamba-hamba-Nya memenuhi janji prasetia terhadap Allah dan perjanjian-perjanjian yang mereka buat sesamanya. Dinamakan juga Al Munqidz (yang menyelamatkan), karena akhir surat ini mengandung kisah tentang Nabi Isa a.s. penyelamat pengikut-pengikut setianya dari azab Allah.

6. Surat الأنعام (Surah Al-An'am (Binatang Ternak The Cattle)), 165 ayat | مكة
Surat Al An'aam (binatang ternak: unta, sapi, biri-biri dan kambing) yang terdiri atas 165 ayat, termasuk golongan surat Makkiyah, karena hampur seluruh ayat-ayat-Nya diturunkan di Mekah dekat sebelum hijrah. Dinamakan Al An'aam karena di dalamnya disebut kata An'aam dalam hubungan dengan adat-istiadat kaum musyrikin, yang menurut mereka binatang-binatang ternak itu dapat dipergunakan untuk mendekatkan diri kepada tuhan mereka. Juga dalam surat ini disebutkan hukum-hukum yang berkenaan dengan binatang ternak itu.

7. Surat الأعراف (Surah Al-A'raf (Tempat Tertinggi The Heights)), 206 ayat | مكة
Surat Al A'raaf yang berjumlah 206 ayat termasuk golongan surat Makkiyah, diturunkan sebelum turunnya surat Al An'aam dan termasuk golongan surat Assab 'uththiwaal (tujuh surat yang panjang). Dinamakan Al A'raaf karena perkataan Al A'raaf terdapat dalam ayat 46 yang mengemukakan tentang keadaan orang-orang yang berada di atas Al A'raaf yaitu: tempat yang tertinggi di batas surga dan neraka.

8. Surat الأنفال (Surah Al-Anfal (Rampasan Perang The Spoils of War)), 75 ayat | مدينة
Surat Al Anfaal terdiri atas 75 ayat dan termasuk golongan surat-surat Madaniyyah, karena seluruh ayat-ayatnya diturunkan di Madinah. Surat ini dinamakan Al Anfaal yang berarti harta rampasan perang berhubung kata Al Anfaal terdapat pada permulaan surat ini dan juga persoalan yang menonjol dalam surat ini ialah tentang harta rampasan perang, hukum perang dan hal-hal yang berhubungan dengan peperangan pada umumnya. Menurut riwayat Ibnu Abbas r.a. surat ini diturunkan berkenaan dengan perang Badar Kubra yang terjadi pada tahun kedua hijrah. Peperangan ini sangat penting artinya, karena dialah yang menentukan jalan sejarah Perkembangan Islam. Pada waktu itu umat Islam dengan berkekuatan kecil untuk pertama kali dapat mengalahkan kaum musyrikin yang berjumlah besar, dan berperlengkapan yang cukup, dan mereka dalam peperangan ini memperoleh harta rampasan perang yang tidak sedikit. Oleh sebab itu timbullah masalah bagaimana membagi harta-harta rampasan perang itu, maka kemudian Allah menurunkan ayat pertama dari surat ini.

9. Surat التوبة (Surah At-Taubah (Pengampunan The Repentance)), 129 ayat | مدينة
Surat At Taubah terdiri atas 129 ayat termasuk golongan surat-surat Madaniyyah. Surat ini dinamakan At Taubah yang berarti pengampunan berhubung kata At Taubah berulang kali disebut dalam surat ini. Dinamakan juga dengan Baraah yang berarti berlepas diri yang di sini maksudnya pernyataan pemutusan perhubungan, disebabkan kebanyakan pokok pembicaraannya tentang pernyataan pemutusan perjanjian damai dengan kaum musyrikin.  Di samping kedua nama yang masyhur itu ada lagi beberapa nama yang lain yang merupakan sifat dari surat ini.  Berlainan dengan surat-surat yang lain, maka pada permulaan surat ini tidak terdapat basmalah, karena surat ini adalah pernyataan perang dengan arti bahwa segenap kaum muslimin dikerahkan untuk memerangi seluruh kaum musyrikin, sedangkan basmalah bernafaskan perdamaian dan cinta kasih Allah.  Surat ini diturunkan sesudah Nabi Muhammad s.a.w. kembali dari peperangan Tabuk yang terjadi pada tahun 9 H. Pengumuman ini disampaikan oleh Saidina 'Ali r.a. pada musim haji tahun itu juga.

10. Surat يونس (Surah Yunus (Yunus Jonas)), 109 ayat | مكة
Surat Yunus terdiri atas 109 ayat, termasuk golongan surat-surat Makkiyyah kecuali ayat 40, 94, 95, yang diturunkan pada masa Nabi Muhmmad s.a.w. berada di Madinah. Surat ini dinamai surat Yunus karena dalam surat ini terutama ditampilkan kisah Nabi Yunus a.s. dan pengikut-pengikutnya yang teguh imannya.

11. Surat هود (Surah Hud (Hud Hud)), 123 ayat | مكة
Surat Huud termasuk golongan surat-surat Makkiyyah, terdiri dari 123 ayat diturunkan sesudah surat Yunus. Surat ini dinamai surat Huud karena ada hubungan dengan terdapatnya kisah Nabi Huud a.s. dan kaumnya dalam surat ini terdapat juga kisah-kisah Nabi yang lain, seperti kisah Nuh a.s., Shaleh a.s., Ibrahim a.s., Luth a.s., Syu'aib a.s. dan Musa a.s.

12. Surat يوسف (Surah Yusuf (Yusuf Joseph)), 111 ayat | مكة
Surat Yusuf ini terdiri atas 111 ayat, termasuk golongan surat-surat Makkiyyah karena diturunkan di Mekah sebelum hijrah. Surat ini dinamakan surat Yusuf adalah karena titik berat dari isinya mengenai riwayat Nabi Yusuf a.s.  Riwayat tersebut salah satu di antara cerita-cerita ghaib yang diwahyukan kepada Nabi Muhammad s.a.w. sebagai mukjizat bagi beliau, sedang beliau sebelum diturunkan surat ini tidak mengetahuinya.  Menurut riwayat Al Baihaqi dalam kitab Ad Dalail bahwa segolongan orang Yahudi masuk agama Islam sesudah mereka mendengar cerita Yusuf a.s. ini, karena sesuai dengan cerita-cerita yang mereka ketahui. Dari cerita Yusuf a.s. ini, Nabi Muhammad s.a.w. mengambil pelajaran-pelajaran yang banyak dan merupakan penghibur terhadap beliau dalam menjalankan tugasnya.

13. Surat الرعد (Surah Ar-Ra'd (Guruh The Thunder)), 43 ayat | مدينة
Surat Ar Ra'd ini terdiri atas 43 ayat termasuk golongan surat-surat Madaniyyah. Surat ini dinamakan Ar Ra'd yang berarti guruh karena dalam ayat 13 Allah berfirman yang artinya Dan guruh itu bertasbih sambil memuji-Nya, menunjukkan sifat kesucian dan kesempurnaan Allah s.w.t.  Dan lagi sesuai dengan sifat Al Quran yang mengandung ancaman dan harapan, maka demikian pulalah halnya bunyi guruh itu menimbulkan kecemasan dan harapan kepada manusia. Isi yang terpenting dari surat ini ialah bahwa bimbingan Allah kepada makhluk-Nya bertalian erat dengan hukum sebab dan akibat. Bagi Allah s.w.t. tidak ada pilih kasih dalam menetapkan hukuman. Balasan atau hukuman adalah akibat dan ketaatan atau keingkaran terhadap hukum Allah.

14. Surat ابراهيم (Surah Ibrahim (Ibrahim Abraham)), 52 ayat | مكة
Surat Ibrahim ini terdiri atas 52 ayat, termasuk golongan surat-surat Makkiyyah karena diturunkan di Mekah sebelum Hijrah. Dinamakan Ibrahim, karena surat ini mengandung doa Nabi Ibrahim a.s. yaitu ayat 35 sampai dengan 41. Do'a ini isinya antara lain: permohonan agar keturunannya mendirikan shalat, dijauhkan dari menyembah berhala-berhala dan agar Mekah dan daerah sekitarnya menjadi daerah yang aman dan makmur. Doa Nabi Ibrahim a.s. ini telah diperkenankan oleh Allah s.w.t. sebagaimana telah terbukti keamanannya sejak dahulu sampai sekarang. Do'a tersebut dipanjatkan beliau ke hadirat Allah s.w.t. sesudah selesai membina Ka'bah bersama puteranya Ismail a.s., di dataran tanah Mekah yang tandus.

15. Surat الحجر (Surah Al-Hijr (Hijr The Rock)), 99 ayat | مكة
Surat ini terdiri atas 99 ayat, termasuk golongan surat-surat Makkiyyah,  karena diturunkan di Mekah sebelum hijrah. Al Hijr  adalah nama  sebuah daerah  pegunungan yang didiami zaman dahulu  oleh kaum  Tsamud terletak  di  pinggir  jalan antara Madinah dan Syam (Syria). Nama surat ini diambil dari nama daerah pegunungan itu, berhubung nasib  penduduknya yaitu  kaum Tsamud  diceritakan pada ayat  80 sampai  dengan 84,  mereka  telah  dimusnahkan Allah  s.w.t.,  karena  mendustakan  Nabi  Shaleh  a.s.  dan berpaling   dari ayat-ayat  Allah. Dalam  surat ini terdapat juga kisah-kisah  kaum yang lain yang telah dibinasakan oleh Allah seperti  kaum Luth  a.s. dan kaum Syu'aib a.s. Dari ke semua kisah-kisah  itu dapat  diambil pelajaran bahwa orang-orang  yang  menentang  ajaran  rasul-rasul  akan  mengalami kehancuran.

16. Surat النحل (Surah An-Nahl (Lebah The Bee)), 128 ayat | مكة
Surat ini terdiri atas 128 ayat, termasuk golongan surat-surat Makkiyyah. Surat ini dinamakan An Nahl yang berarti lebah karena di dalamnya, terdapat firman Allah s.w.t. ayat 68 yang artinya : "Dan Tuhanmu mewahyukan kepada lebah." Lebah adalah makhluk Allah yang banyak memberi manfaat  dan kenikmatan kepada manusia. Ada persamaan antara madu yang dihasilkan oleh lebah dengan Al Quranul Karim. Madu berasal dari bermacam-macam sari bunga dan dia menjadi obat bagi bermacam-macam penyakit manusia (lihat ayat 69). Sedang Al Quran mengandung inti sari dari kitab-kitab yang telah diturunkan kepada Nabi-nabi zaman dahulu ditambah dengan ajaran-ajaran yang diperlukan oleh semua bangsa sepanjang masa untuk mencapai kebahagiaan dunia dan akhirat. (Lihat surat (10) Yunus ayat 57 dan surat (17) Al Isra' ayat  82). Surat ini dinamakan pula "An Ni'am" artinya nikmat-nikmat, karena di dalamnya Allah menyebutkan pelbagai macam nikmat untuk hamba-hamba-Nya.

17. Surat الإسراء (Surah Al-Isra' (Memperjalankan Malam Hari The Night Journey)), 111 ayat | مكة
Surat ini terdiri atas 111 ayat, termasuk golongan surat-surat Makkiyyah. Dinamakan dengan Al Israa' yang berarti memperjalankan di malam hari, berhubung peristiwa Israa' Nabi Muhammad s.a.w. di Masjidil Haram di Mekah ke Masjidil Aqsha di Baitul Maqdis dicantumkan pada ayat pertama dalam surat ini. Penuturan cerita Israa' pada permulaan surat ini, mengandung isyarat bahwa Nabi Muhammad s.a.w. beserta umatnya kemudian hari akan mencapai martabat yang tinggi dan akan menjadi umat yang besar. Surat ini dinamakan pula dengan Bani Israil artinya keturunan Israil berhubung dengan permulaan surat ini, yakni pada ayat kedua sampai dengan ayat kedelapan dan kemudian dekat akhir surat yakni pada ayat 101 sampai dengan ayat 104, Allah menyebutkan tentang Bani Israil yang setelah menjadi bangsa yang kuat lagi besar lalu menjadi bangsa yang terhina karena menyimpang dari ajaran Allah s.w.t. Dihubungkannya kisah Israa' dengan riwayat Bani Israil pada surat ini, memberikan peringatan bahwa umat Islam akan mengalami keruntuhan, sebagaimana halnya Bani Israil, apabila mereka juga meninggalkan ajaran-ajaran agamanya.

18. Surat الكهف (Surah Al-Kahf (Goa The Cave)), 110 ayat | مكة
Surat  ini terdiri atas 110 ayat, termasuk  golongan  surat-surat Makkiyyah. Dinamai Al-Kahfi artinya Gua dan Ashhabul Kahfi yang artinya Penghuni-Penghuni Gua. Kedua nama ini diambil dari cerita yang terdapat dalam surat ini pada ayat 9 sampai dengan 26, tentang beberapa orang pemuda yang tidur dalam gua bertahun-tahun lamanya. Selain cerita tersebut, terdapat pula beberapa buah cerita dalam surat ini, yang kesemuanya mengandung i'tibar dan pelajaran-pelajaran yang amat berguna bagi kehidupan manusia. Banyak hadist-hadist Rasulullah s.a.w. yang menyatakan keutamaan membaca surat ini.

19. Surat مريم (Surah Maryam (Maryam Mary)), 98 ayat | مكة
Surat Maryam terdiri atas 98 ayat, termasuk golongan surat-surat Makkiyyah, karena hampir seluruh ayatnya diturunkan sebelum Nabi Muhammad s.a.w. hijrah ke Madinah, bahkan sebelum sahabat-sahabat beliau hijrah ke negeri Habsyi. Menurut riwayat Ibnu Mas'ud, Ja'far bin Abi Thalib membacakan permulaan surat Maryam ini kepada raja Najasyi dan pengikut-pengikutnya di waktu ia ikut hijrah bersama-sama sahabat-sahabat yang lain ke negeri Habsyi.Surat ini dinamai Maryam, karena surat ini mengandung kisah Maryam, ibu Nabi Isa a.s. yang serba ajaib, yaitu melahirkan puteranya lsa a.s., sedang ia sebelumnya belum pernah dikawini atau dicampuri oleh seorang laki-laki pun. Kelahiran Isa a.s. tanpa bapa, merupakan suatu bukti kekuasaan Allah s.w.t.  Pengutaraan kisah Maryam sebagai kejadian yang luar biasa dan ajaib dalam surat ini, diawali dengan kisah kejadian yang luar biasa dan ajaib pula, yaitu dikabulkannya doa Zakaria a.s. oleh Allah s.w.t., agar beliau dianugerahi seorang putera sebagai pewaris dan pelanjut cita-cita dan kepercayaan beliau, sedang usia beliau sudah sangat tua dan isteri beliau seorang yang mandul yang menurut ukuran ilmu biologi tidak mungkin akan terjadi.

20. Surat طه (Surah Taha (Taha Taa-Haa)), 135 ayat | مكة
Surat Thaahaa terdiri atas 135 ayat, diturunkan sesudah diturunkannya surat Maryam, termasuk golongan surat-surat Makkiyyah. Surat ini dinamai Thaahaa, diambil dari perkataan yang berasal dan ayat pertama surat ini. Sebagaimana yang lazim terdapat pada surat-surat yang memakai huruf-huruf abjad pada permulaannya, di mana huruf tersebut seakan-akan merupakan pemberitahuan Allah kepada orang-orang yang membacanya, bahwa sesudah huruf itu akan dikemukakan hal-hal yang  sangat penting diketahui, maka demikian pula halnya dengan ayat-ayat yang terdapat sesudah huruf thaahaa dalam surat ini. Allah menerangkan bahwa Al Quran merupakan peringatan bagi manusia, wahyu dari Allah, Pencipta semesta alam. Kemudian Allah menerangkan kisah beberapa orang nabi; akibat-akibat yang telah ada akan dialami oleh orang-orang yang percaya kepada Allah dan orang-orang yang mengingkari-Nya, baik di dunia maupun di akhirat. Selain hal-hal tersebut di atas, maka surat ini mengandung pokok-pokok isi sebagai berikut:

21. Surat الأنبياء (Surah Al-Anbiya' (Para Nabi The Prophets)), 112 ayat | مكة
Surat Al Anbiyaa' yang terdiri atas 112 ayat, termasuk golongan surat Makkiyyah. Dinamai surat ini dengan al anbiyaa'(nabi-nabi), karena surat ini mengutarakan kisah beberapa orang nabi. Permulaan surat Al Anbiyaa' menegaskan bahwa manusia lalai dalam menghadapi hari berhisab, kemudian berhubung adanya pengingkaran kaum musyrik Mekah terhadap wahyu yang dibawa Nabi Muhammad s.a.w. maka ditegaskan Allah, kendatipun nabi-nabi itu manusia biasa, akan tetapi masing-masing mereka adalah manusia yang membawa wahyu yang pokok ajarannya adalah tauhid, dan keharusan manusia menyembah Allah Tuhan Penciptanya. Orang yang tidak mau mengakui kekuasaan Allah dan mengingkari ajaran yang dibawa oleh nabi-nabi itu, akan diazab Allah didunia dan di akhirat nanti. Kemudian dikemukakan kisah beberapa orang nabi dengan umatnya. Akhirnya surat itu ditutup dengan seruan agar kaum musyrik Mekah percaya kepada ajaran yang dibawa Muhammad s.a.w supaya tidak mengalami apa yang telah dialami oleh umat-umat yang dahulu.

22. Surat الحج (Surah Al-Hajj (Haji The Pilgrimage)), 78 ayat | مدينة
Surat Al Hajj, termasuk golongan surat-surat Madaniyyah, terdiri atas 78 ayat, sedang menurut pendapat sebahagian ahli tafsir termasuk golongan surat-surat Makkiyah. Sebab perbedaan ini ialah karena sebahagian ayat-ayat surat ini ada yang diturunkan di Mekah dan sebahagian lagi diturunkan di Madinah. Dinamai surat ini Al Hajj, karena surat ini mengemukakan hal-hal yang berhubungan dengan ibadat haji, seperti ihram, thawaf, sa'i, wuquf di Arafah, mencukur rambut, syi'ar-syi'ar Allah, faedah-faedah dan hikmah-hikmah disyari'atkannya haji. Ditegaskan pula bahwa ibadat haji itu telah disyari'atkan di masa Nabi Ibrahim a.s., dan Ka'bah didirikan oleh Nabi Ibrahim a.s. bersama puteranya Ismail a.s.Menurut Al Ghaznawi, surat Al Hajj termasuk di antara surat- surat yang ajaib, diturunkan di malam dan di siang hari, dalam musafir dan dalam keadaan tidak musafir, ada ayat-ayat yang diturunkan di Mekah dan ada pula yang diturunkan di Madinah, isinya ada yang berhubungan dengan peperangan dan ada pula yang berhubungan dengan perdamaian, ada ayat-ayatnya yang muhkam dan ada pula yang mutasyabihaat.

23. Surat المؤمنون (Surah Al-Mu'minun (Orang-Orang Mukmin The Believers)), 118 ayat | مكة
Surat Al Mu'minuun terdiri atas 118 ayat, termasuk golongan surat-surat Makkiyyah. Dinamai Al Mu'minuun, karena permulaan ayat ini manerangkan bagaimana seharusnya sifat-sifat orang mukmin yang menyebabkan keberuntungan mereka di akhirat dan ketenteraman jiwa mereka di dunia. Demikian tingginya sifat-sifat itu, hingga ia telah menjadi akhlak bagi Nabi Muhammad s.a.w.

24. Surat النور (Surah An-Nur (Cahaya The Light)), 64 ayat | مدينة
Surat An Nuur terdiri atas 64 ayat, dan termasuk golongan surat-surat Madaniyah. Dinamai An Nuur yang berarti Cahaya, diambil dari kata An Nuur yang terdapat pada ayat ke 35. Dalam ayat ini, Allah s.w.t. menjelaskan tentang Nuur Ilahi, yakni Al Quran yang mengandung petunjuk-petunjuk. Petunjuk-petunjuk Allah itu, merupakan cahaya yang terang benderang menerangi alam semesta. Surat ini sebagian besar isinya memuat petunjuk- petunjuk Allah yang berhubungan dengan soal kemasyarakatan dan rumah tangga.

25. Surat الفرقان (Surah Al-Furqan (Pembeda The Criterion)), 77 ayat | مكة
Surat ini terdiri atas 77 ayat, termasuk golongan surat-surat Makkiyah. Dinamai Al Furqaan yang artinya pembeda, diambil dari kata Al Furqaan yang terdapat pada ayat pertama surat ini. Yang dimaksud dengan Al Furqaan dalam ayat ini ialah Al Quran. Al Quran dinamakan Al Furqaan karena dia membedakan antara yang haq dengan yang batil. MAka pada surat ini pun terdapat ayat-ayat yang membedakan antara kebenaran ke-esaan Allah s.w.t. dengan kebatilan kepercayaan syirik.

26. Surat الشعراء (Surah Asy-Syu'ara' (Para Penyair The Poets)), 227 ayat | مكة
Surat ini terdiri dari 227 ayat termasuk golongan surat-surat Makkiyyah. Dinamakan Asy Syu'araa' (kata jamak dari Asy Syaa'ir yang berarti penyair) diambil dari kata Asy Syuaraa' yang terdapat pada ayat 224, yaitu pada bagian terakhir surat ini, di kala Allah s.w.t. secara khusus menyebutkan kedudukan penyair- penyair. Para penyair-penyair itu mempunyai sifat-sifat yang jauh berbeda dengan para rasul-rasul; mereka diikuti oleh orang-orang yang sesat dan mereka suka memutar balikkan lidah dan mereka tidak mempunyai pendirian, perbuatan mereka tidak sesuai dengan tidak mempunyai pendirian, perbuatan mereka tidak sesuai dengan apa yang mereka ucapkan. Sifat-sifat yang demikian tidaklah sekali-kali terdapat pada rasul-rasul. Oleh karena demikian tidak patut bila Nabi Muhammad s.a.w. dituduh sebagai penyair, dan Al Quran dituduh sebagai syair, Al Quran adalah wahyu Allah, bukan buatan manusia.

27. Surat النمل (Surah An-Naml (Semut-semut The Ant)), 93 ayat | مكة
Surat An Naml terdiri atas 98 ayat, termasuk golongan surat- surat Makkiyyah dan diturunkan sesudah surat Asy Syu'araa'. Dinamai dengan An Naml, karena pada ayat 18 dan 19 terdapat perkataan An Naml (semut), di mana raja semut mengatakan kepada anak buahnya agar masuk sarangnya masing-masing, supaya jangan terpijak oleh Nabi Sulaiman a.s. dan tentaranya yang akan lalu di tempat itu. Mendengar perintah raja semut kepada anak buahnya itu, Nabi Sulaiman tersenyum dan ta'jub atas keteraturan kerajaan semut itu dan beliau mengucapkan syukur kepada Tuhan Yang Maba Kuasa yang telah melimpahkan nikmat kepadanya, berupa kerajaan, kekayaan, memahami ucapan-ucapan binatang, mempunyai tentara yang terdiri atas jin, manusia, burung dan sebagainya. Nabi Sulaiman a.s. yang telah diberi Allah nikmat yang besar itu tidak merasa takabur dan sombong dan sebagai seorang hamba Allah mohon agar Allah memasukkannya ke dalam golongan orang-orang yang saleh. Allah s.w.t. menyebut binatang semut dalam surat ini agar manusia mengambil pelajaran dari kehidupan semut itu. Semut adalah binatang yang hidup berkelompok di dalam tanah, membuat liang dan ruang yang bertingkat-tingkat sebagai rumah dan gudang tempat menyimpan makanan musim dingin. Kerapian dan kedisiplinan yang terdapat dalam kerajaan semut ini, dinyatakan Allah dalam ayat ini dengan bagaimana rakyat semut mencari perlindungan segera agar jangan terpijak oleh Nabi Sulaiman a.s dan tentaranya, setelah menerima peringatan dari rajanya. Secara tidak langsung Allah mengingatkan juga kepada manusia agar dalam berusaha untuk mencukupkan kebutuhan sehari-hari, mementingkan pula kemaslahatan bersama dan sebagainya, rakyat semut mempunyai organisasi dan kerja sama yang baik pula. Dengan mengisahkan kisah Nabi Sulaiman a.s. dalam surat ini Allah mengisyaratkan hari depan dan kebesaran Nabi Muhammad s.a.w. Nabi Sulaiman a.s. sebagai seorang nabi, rasul dan raja yang dianugerahi kekayaan yang melimpah ruah, begitu pula Nabi Muhammad s.a.w. sebagai seorang nabi, rasul dan seoramg kepala negara yang ummi' dan miskin akan berhasil membawa dan memimpin umatnya ke jalan Allah.

28. Surat القصص (Surah Al-Qasas (Kisah-Kisah The Stories)), 88 ayat | مكة
Surat Al Qashash terdiri atas 88 ayat termasuk golongan surat-surat Makkiyyah. Dinamai dengan Al Qashash, karena pada ayat 25 surat ini terdapat kata Al Qashash yang berarti cerita. Ayat ini menerangkan bahwa setelah Nabi Musa a.s. bertemu dengan Nabi Syua'ib a.s. ia menceritakan cerita yang berhubungan  dengan dirinya sendiri, yakni pengalamannya dengan Fir'aun, sampai waktu ia diburu oleh Fir'aun karena membunuh seseorang dari bangsa Qibthi tanpa disengaja, Syua'ib a.s. menjawab bahwa Musa a.s. telah selamat dari pengejaran  orang-orang zalim. Turunnya ayat 25 surat ini amat besar artinya bagi Nabi Muhammad s.a.w. dan bagi sahabat-sahabat yang melakukan hijrah ke Madinah, yang menambah keyakinan mereka, bahwa akhirnya orang-orang Islamlah yang menang, sebab ayat ini menunjukkan bahwa barangsiapa yang berhijrah dari tempat musuh untuk mempertahankan keimanan, pasti akan berhasil dalam perjuangannya menghadapi musuh-musuh agama. Kepastian kemenangan bagi kaum muslimin itu, ditegaskan pada bagian akhir surat ini yang mengandung bahwa setelah hijrah ke Madinah kaum muslimin akan kembali ke Mekah sebagai pemenang dan penegak agama Allah. Surat Al Qashash ini adalah surat yang paling lengkap memuat cerita Nabi Musa a.s. sehingga menurut suatu riwayat, surat ini dinamai juga dengan surat Musa.

29. Surat العنكبوت (Surah Al-'Ankabut (Laba-Laba The Spider)), 69 ayat | مكة
Surat Al 'Ankabuut terdiri atas 69 ayat, termasuk golongan surat-surrat Makkiyah. Dinamai Al 'Ankabuut berhubung terdapatnya perkataan Al 'Ankabuut yang berarti laba-laba pada ayat 41 surat ini, dimana Allah mengumpamakan penyembah-penyembah berhala-berhala itu, dengan laba-laba yang percaya kepada kekuatan rumahnya sebagai tempat ia berlindung dan tempat ia menjerat mangsanya, padahal kalau dihembus angin atau ditimpa oleh suatu barang yang kecil saja, rumah itu akan hancur. Begitu pula halnya dengan kaum musyrikin yang percaya kepada kekuatan sembahan-sembahan mereka sebagai tempat berlindung dan tempat meminta sesuatu yang mereka ingini, padahal sembahan-sembahan mereka itu tidak mampu sedikit juga menolong mereka dari azab Allah waktu di dunia, seperti yang terjadi pada kaum Nuh, kaum Ibrahim, kaum Luth, kaum Syu'aib, kaum Saleh, dan lain-lain. Apalagi menghadapi azab Allah di akhirat nanti, sembahan-sembahan mereka itu lebih tidak mampu menghindarkan dan melindungi mereka.

30. Surat الروم (Surah Ar-Rum (Romawi The Romans)), 60 ayat | مكة
Surat Ar Ruum terdiri atas 60 ayat, termasuk golongan surat-surat Makkiyah diturunkan sesudah ayat Al Insyiqaq. Dinamakan Ar Ruum karena pada permulaan surat ini, yaitu ayat 2, 3 dan 4 terdapat pemberitaan bangsa Rumawi yang pada mulanya dikalahkan oleh bangsa Persia, tetapi setelah beberapa tahun kemudian kerajaan Ruum dapat menuntut balas dan mengalahkan kerajaan Persia kembali. Ini adalah suatu mukjizat Al Quran, yaitu memberitakan hal-hal yang akan terjadi di masa yang akan datang. Dan juga suatu isyarat bahwa kaum muslimin yang demikian lemahnya di waktu itu akan menang dan dapat menghancurkan kaum musyrikin. Isyarat ini terbukti pertama kali pada perang Badar.

31. Surat لقمان (Surah Luqman (Luqman Luqman)), 34 ayat | مكة
Surat  Luqman  terdiri   dari   34   ayat,   termasuk   golongan   surat-surat Makkiyyah, diturunkan sesudah surat Ash Shaffaat. Dinamai Luqman karena pada  ayat  12   disebutkan   bahwa   Luqman   telah diberi   oleh   Allah   nikmat   dan   ilmu   pengetahuan,  oleh sebab itu dia bersyukur kepadaNya atas nikmat yang  diberikan  itu.   Dan   pada   ayat   13 sampai 19 terdapat nasihat-nasihat Luqman kepada anaknya.Ini adalah sebagai  isyarat   daripada   Allah   supaya   setiap   ibu   bapak melaksanakan  pula terhadap anak-anak mereka sebagai yang telah dilakukan oleh Luqman.

32. Surat السجدة (Surah As-Sajdah (Sajdah The Prostration)), 30 ayat | مكة
Surat As Sajdah terdiri atas 30 ayat termasuk golongan surat Makkiyah diturunkan sesudah surat Al Mu'minuun. Dinamakan As Sajdah berhubung pada surat ini terdapat ayat sajdah, yaitu ayat yang kelima belas.

33. Surat الأحزاب (Surah Al-Ahzab (Golongan Yang Bersekutu The Clans)), 73 ayat | مدينة
Surat Al Ahzab terdiri atas 73 ayat, termasuk golongan surat-surat Madaniyah, diturunkan sesudah surat Ali'Imran. Dinamai Al Ahzab yang berarti golongan-golongan yang bersekutu karena dalam surat ini terdapat beberapa ayat, yaitu ayat 9 sampai dengan ayat 27 yang berhubungan dengan peperangan Al Ahzab, yaitu peperangan yang dilancarkan oleh orang-orang Yahudi, kaum munafik dan orang-orang musyrik terhadap orang-orang mukmin di Medinah. Mereka telah mengepung rapat orang- orang mukmin sehingga sebahagian dari mereka telah berputus asa dan menyangka bahwa mereka akan dihancurkan oleh musuh-musuh mereka itu. Ini adalah suatu ujian yang berat dari Allah untuk menguji sampai dimana teguhnya keimanan mereka. Akhirnya Allah mengirimkan bantuan berupa tentara yang tidak kelihatan dan angin topan, sehingga musuh-musuh itu menjadi kacau balau dan melarikan diri.

34. Surat سبإ (Surah Saba' (Saba' Sheba)), 54 ayat | مكة
Surat Saba' terdiri atas 54 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Luqman. Dinamakan Saba' karena didalamnya terdapat kisah kaum Saba'. Saba' adalah nama suatu kabilah dari kabilah-kabilah Arab yang tinggal di daerah Yaman sekarang ini. Mereka mendirikan kerajaan yang terkenal dengan nama kerajaan Sabaiyyah, ibukotanya Ma'rib; telah dapat membangun suatu bendungan raksasa, yang bernama Bendungan Ma'rib, sehingga negeri meka subur dan makmur. Kemewahan dan kemakmuran ini menyebabkan kaum Saba' lupa dan ingkar kepada Allah yang telah melimpahkan nikmatnya kepada mereka, serta mereka mengingkari pula seruan para rasul. Karena keingkaran mereka ini, Allah menimpahkan kepada mereka azab berupa sailul 'arim (banjir yang besar) yang ditimbulkan oleh bobolnya bendungan Ma'rib. Setelah bendungan ma'rib bobol negeri Saba' menjadi kering dan kerajaan mereka hancur.

35. Surat فاطر (Surah Fatir (Maha Pencipta The Originator)), 45 ayat | مكة
Surat Faathir terdiri atas 45 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al Furqaan dan merupakan surat akhir dari urutan surat-surat dalam Al Quran yang dimulai dengan Alhamdulillah. Dinamakan Faathir (pencipta) ada hubungannya dengan perkataan Faathir yang terdapat pada ayat pertama pada surat ini. Pada ayat tersebut diterangkan bahwa Allah adalah Pencipta langit dan bumi, Pencipta malaikat-malaikat, Pencipta semesta alam yang semuanya itu adalah sebagai bukti atas kekuasaan dan kebesaran-Nya. Surat ini dinamai juga dengan surat Malaikat karena pada ayat pertama disebutkan bahwa Allah telah menjadikan malaikat-malaikat sebagai utusan-Nya  yang mempunyai beberapa sayap.

36. Surat يس (Surah Yasin (Yasin Yaseen)), 83 ayat | مكة
Surat Yaasiin terdiri atas 83 ayat, termasuk golongan surat-surat Makkiyyah,  diturunkan sesudah surat Jin. Dinamai Yaasiin karena dimulai dengan huruf Yaasiin. Sebagaimana halnya arti huruf-huruf abjad yang terletak pada permulaan beberapa surat Al Quran, maka demikian pula arti Yaasiin yang terdapat pada ayat permulaan surat ini, yaitu Allah mengisyaratkan bahwa sesudah huruf tersebut akan dikemukakan hal-hal yang penting antara lain: Allah bersumpah dengan Al Quran bahwa Muhammad s.a.w. benar-benar seorang rasul yang diutus-Nya kepada kaum yang belum pernah diutus kepada mereka rasul-rasul.

37. Surat الصافات (Surah As-Saffat (Barisan-Barisan Those drawn up in Ranks)), 182 ayat | مكة
Surat Ash Shaaffaat terdiri atas 182 ayat termasuk golongan surat Makkiyyah diturunkan sesudah surat Al An'aam. Dinamai dengan Ash Shaaffaat (yang bershaf-shaf) ada hubungannya dengan perkataan Ash Shaaffaat yang terletak pada ayat permulaan surat ini yang mengemukakan bagaimana para malaikat yang berbaris di hadapan Tuhannya yang bersih jiwanya, tidak dapat digoda oleh syaitan. Hal ini hendaklah menjadi i'tibar bagi manusia dalam menghambakan dirinya kepada Allah.

38. Surat ص (Surah Sad (Sad The letter Saad)), 88 ayat | مكة
Surat Shaad  terdiri atas  88 ayat  termasuk golongan  surat Makkiyyah, diturunkan sesudah surat Al Qamar. Dinamai  dengan  Shaad  karena surat  ini  dimulai  dengan Shaad (selanjutnya lihat no. [10)). Dalam surat  ini Allah  bersumpah dengan  Al Quran,   untuk menunjukkan bahwa Al Quran itu suatu  kitab yang  agung dan bahwa siapa saja yang  mengikutinya  akan mendapat  kebahagiaan  dunia  dan akhirat dan untuk menunjukkan bahwa Al Quran ini adalah mukjizat Nabi Muhammad s.a.w. yang  menyatakan kebenarannya dan ketinggian akhlaknya.

39. Surat الزمر (Surah Az-Zumar (Rombongan The Groups)), 75 ayat | مكة
Surat Az Zumar terdiri ataz 75 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Saba'. Dinamakan Az Zumar (Rombongan-rombongan) karena perkataan Az Zumar yang terdapat pada ayat 71 dan 73 ini. Dalam ayat-ayat tersebut diterangkan keadaan manusia di hari kiamat setelah mereka dihisab, di waktu itu mereka terbagi atas dua rombongan; satu rombongan dibawa ke neraka dan satu rombongan lagi dibawa ke syurga. Masing- masing rombongan memperoleh balasan dari apa yang mereka kerjakan di dunia dahulu. Surat ini dinamakan juga Al Ghuraf (kamar-kamar) berhubung perkataan ghuraf yang terdapat pada ayat 20, dimana diterangkan keadaan kamar-kamar dalam syurga yang diperoleh orang-orang yang bertakwa.

40. Surat غافر (Surah Gafir (Maha Pengampun The Forgiver)), 85 ayat | مكة
Surat Al Mu'min terdiri atas 85 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Az Zumar. Dinamai Al Mu'min (Orang yang beriman), berhubung dengan perkataan mukmin yang terdapat pada ayat 28 surat ini. Pada ayat 28 diterangkan bahwa salah seorang dari kaum Fir'aun telah beriman kepada Nabi Musa a.s. dengan menyembunyikan imannya kepada kaumnya, setelah mendengar keterangan dan melihat mukjizat yang dikemukakan oleh Nabi Musa a.s. Hati kecil orang ini mencela Fir'aun dan kaumnya yang tidak mau beriman kepada Nabi Musa a.s., sekalipun telah dikemukakan keterangan dan mukjizat yang diminta mereka.Dinamakan pula Ghafir (yang mengampuni), karena ada hubungannya dengan kalimat Ghafir yang terdapat pada ayat 3 surat ini. Ayat ini mengingatkan bahwa Maha Pengampun dan Maha Penerima Taubat adalah sebagian dari sifat-sifat Allah, karena itu hamba-hamba Allah tidak usah khawatir terhadap  perbuatan-perbuatan dosa yang telah terlanjur mereka lakukan, semuanya itu akan diampuni Allah asal benar-benar memohon ampun dan bertaubat kepada-Nya dan berjanji tidak akan mengerjakan  perbuatan-perbuatan dosa itu lagi. Dan surat ini dinamai Dzit Thaul (Yang Mempunyai Kurnia) karena perkataan tersebut terdapat pada ayat 3.

41. Surat فصلت (Surah Fussilat (Yang Dijelaskan Explained in detail)), 54 ayat | مكة
Surat Fushshilat terdiri atas 54 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al Mu'min. Dinamai Fushshilat (yang dijelaskan) karena ada hubungannya dengan perkataan Fushshilat yang terdapat pada permulaan surat ini yang berarti yang dijelaskan. Maksudnya ayat-ayatnya diperinci dengan jelas tentang hukum-hukum, keimanan, janji dan ancaman, budi pekerti, kisah, dan sebagainya. Dinamai juga dengan Haa Miim dan As Sajdah karena surat ini dimulai dengan Haa Miim dan dalam surat ini terdapat ayat Sajdah.

42. Surat الشورى (Surah Asy-Syura (Musyawarah Consultation)), 53 ayat | مكة
Surat Asy Syuura terdiri atas 53 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Fushshilat. Dinamai dengan Asy Syuura (musyawarat) diambil dari perkataan Syuura yang terdapat pada ayat 38 surat ini. Dalam ayat tersebut diletakkan salah satu dari dasar-dasar pemerintahan Islam ialah musyawarat. Dinamai juga Haa Miim 'Ain Siin Qaaf karena surat ini dimulai dengan huruf-huruf hijaiyah itu.

43. Surat الزخرف (Surah Az-Zukhruf (Perhiasan Ornaments of gold)), 89 ayat | مكة
Surat Az Zukhruf terdiri atas 89 ayat, termasuk golongan  surat-surat Makkiyyah, diturunkan sesudah surat Asy Syuura. Dinamai Az Zukhruf (Perhiasan) diambil dari perkataan Az Zukhruf yang terdapat pada ayat 35 surat ini.  Orang-orang musyrik mengukur tinggi rendahnya derajat seseorang tergantung kepada perhiasan dan harta benda yang ia punyai, karena Muhammad s.a.w. adalah seorang anak yatim lagi miskin, ia tidak pantas diangkat Allah sebagai seorang rasul dan nabi.  Pangkat rasul dan nabi harus diberikan kepada orang yang kaya.  Ayat ini menegaskan bahwa harta tidak dapat dijadikan dasar untuk mengukur tinggi rendahnya derajat seseorang, karena harta itu merupakan hiasan kehidupan duniawi, bukan berarti kesenangan akhirat.

44. Surat الدخان (Surah Ad-Dukhan (Kabut The Smoke)), 59 ayat | مكة
Surat Ad Dukhaan terdiri atas 59 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah Az Zukhruf. Dinamai Ad Dukhaan (kabut), diambil dari perkataan Dukhaan yang terdapat pada ayat 10 surat ini.Menurut riwayat Bukhari secara ringkas dapat diterangkan sebagai berikut: Orang-orang kafir Mekah dalam menghalang-halangi agama Islam dan menyakiti serta mendurhakai Nabi Muhammad s.a.w. sudah melewati batas, karena itu Nabi mendoa kepada Allah agar diturunkan azab sebagaimana yang telah diturunkan kepada orang-orang yang durhaka kepada Nabi Yusuf yaitu musim kemarau yang panjang.  Do'a Nabi itu dikabulkan Allah sampai orang-orang kafir memakan tulang dan bangkai, karena kelaparan.  Mereka selalu menengadah ke langit mengharap pertolongan Allah.  Tetapi tidak satupun yang mereka lihat kecuali kabut yang menutupi pandangan mereka.Akhirnya mereka datang kepada Nabi agar Nabi memohon kepada Allah supaya hujan diturunkan.  Setelah Allah mengabulkan doa Nabi, dan hujan di turunkan, mereka kembali kafir seperti semula; karena itu Allah menyatakan bahwa nanti mereka akan diazab dengan azab yang pedih.

45. Surat الجاثية (Surah Al-Jasiyah (Berlutut Crouching)), 37 ayat | مكة
Surat Al Jaatsiyah terdiri atas 37 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Ad Dukhaan. Dinamai dengan Al Jaatsiyah (yang berlutut) diambil dari perkataan Jaatsiyah yang terdapat pada ayat 28 surat ini. Ayat tersebut menerangkan tentang keadaan manusia pada hari kiamat, yaitu semua manusia dikumpulkan ke hadapan mahkamah Allah Yang Maha Tinggi yang memberikan keputusan terhadap perbuatan yang telah mereka lakukan di dunia. Pada hari itu semua manusia berlutut di hadapan Allah. Dinamai juga dengan Asy Syari'ah diambil dari perkataan Syari'ah (Syari'at) yang terdapat pada ayat 18 surat ini.

46. Surat الأحقاف (Surah Al-Ahqaf (Bukit Pasir The Dunes)), 35 ayat | مكة
Surat Al Ahqaaf terdiri dari 35 ayat termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al Jaatsiyah. Dinamai Al Ahqaaf  (bukit-bukit pasir) dari perkataan Al Ahqaaf yang terdapat pada ayat 21 surat ini.Dalam ayat tersebut dan ayat-ayat sesudahnya diterangkan bahwa Nabi Hud a.s. telah menyampaikan risalahnya kepada kaumnya di Al Ahqaaf yang sekarang dikenal dengan Ar Rab'ul Khaali, tetapi kaumnya tetap ingkar sekalipun mereka telah diberi peringatan pula oleh rasul-rasul yang sebelumnya.  Akhirnya Allah menghancurkan mereka dengan tiupan angin kencang.  Hal ini adalah sebagai isyarat dari Allah kepada kaum musyrikin Quraisy bahwa mereka akan dihancurkan bila mereka tidak mengindahkan seruan Rasul.

47. Surat محمد (Surah Muhammad (Muhammad Muhammad)), 38 ayat | مدينة
Surat Muhammad terdiri atas 38 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Al Hadiid. Nama Muhammad sebagai nama surat ini diambil dari perkataan Muhammad yang terdapat pada ayat 2 surat ini. Pada ayat 1, 2, dan 3 surat ini, Allah membandingkan antara hasil yang diperoleh oleh orang-orang yang tidak percaya kepada apa yang diturunkan kepada Nabi Muhammad s.a.w dan hasil yang diperoleh oleh orang-orang yang tidak percaya kepadanya. Orang-orang yang percaya kepada apa yang dibawa oleh Muhammad s.a.w merekalah orang-orang yang beriman dan mengikuti yang hak, diterima Allah semua amalnya, diampuni segala kesalahannya. Adapun orang-orang yang tidak percaya kepada Muhammad s.a.w adalah orang-orang yang mengikuti kebatilan, amalnya tidak diterima, dosa mereka tidak diampuni, kepada mereka dijanjikan azab di dunia dan di akhirat.Dinamai juga dengan Al Qital (peperangan), karena sebahagian besar surat ini mengutarakan tentang peperangan dan pokok-pokok hukumnya, serta bagaimana seharusnya sikap orang-orang mukmin terhadap orang-orang kafir.

48. Surat الفتح (Surah Al-Fath (Kemenangan The Victory)), 29 ayat | مدينة
Surat Al Fath terdiri atas 29 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Al Jum'ah. Dinamakan Al Fath (kemenangan) diambil dari perkataan Fat-han yang terdapat pada ayat pertama surat ini. Sebagian besar dari ayat-ayat surat ini menerangkan hal-hal yang berhubungan dengan kemenangan yang dicapai Nabi Muhammad s.a.w. dalam peperangan-peperangannya. Nabi Muhammad s.a.w. sangat gembira dengan turunnya ayat pertama surat ini. Kegembiraan ini dinyatakan dalam sabda beliau yang diriwayatkan Bukhari; Sesungguhnya telah diturunkan kepadaku satu surat, yang surat itu benar-benar lebih aku cintai dari seluruh apa yang disinari matahari. Kegembiraan Nabi Muhammad s.a.w. itu ialah karena ayat-ayatnya menerangkan tentang kemenangan yang akan diperoleh Muhammad s.a.w. dalam perjuangannya dan tentang kesempurnaan nikmat Allah kepadanya.

49. Surat الحجرات (Surah Al-Hujurat (Kamar-Kamar The Inner Apartments)), 18 ayat | مدينة
Surat Al Hujuraat terdiri atas 18 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Al Mujaadalah. Dinamai Al Hujuraat diambil dari perkataan Al Hujuraat yang terdapat pada ayat 4 surat ini. Ayat tersebut mencela para sahabat yang memanggil Nabi Muhammad SAW yang sedang berada di dalam kamar rumahnya bersama isterinya. Memanggil Nabi Muhammad SAW dengan cara dan dalam keadaan yang demikian menunjukkan sifat kurang hormat kepada beliau dan mengganggu ketenteraman beliau.

50. Surat ق (Surah Qaf (Qaf The letter Qaaf)), 45 ayat | مكة
Surat Qaaf terdiri atas 45 ayat, termasuk golongan surat-surat Makkiyah diturunkan sesudah surat Al Murssalaat. Dinamai Qaaf karena surat ini dimulai dengan huruf Qaaf. Menurut hadits yang diriwayatkan Imam Muslim, bahwa Rasulullah SAW senang membaca surat ini pada rakaat pertama sembahyang subuh dan pada shalat hari raya. Sedang menurut riwayat Abu Daud, Al Baihaqy dan Ibnu Majah bahwa Rasulullah SAW membaca surat ini pada tiap-tiap membaca Khutbah pada hari Jum'at. Kedua riwayat ini menunjukkan bahwa surat QAAF sering dibaca Nabi Muhammad SAW di tempat-tempat umum, untuk memperingatkan manusia tentang kejadian mereka dan nikmat-nikmat yang diberikan kepadanya, begitu pula tentang hari berbangkit, hari berhisab, syurga, neraka, pahala, dosa, dsb. Surat ini dinamai juga Al Baasiqaat, diambil dari perkataan Al- Baasiqaat yang terdapat pada ayat 10 surat ini.

51. Surat الذاريات (Surah Az-Zariyat (Angin yang Menerbangkan The Winnowing Winds)), 60 ayat | مكة
Surat Adz Dzaariyaat terdiri atas 60 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat Al Ahqaaf. Dinamai Adz Dzaariyaat (angin yang menerbangkan), diambil dari perkataan Adz Dzaariyaat yang terdapat pada ayat pertama surat ini. Allah bersumpah dengan angin, mega, bahtera, dan malaikat yang menjadi sumber kesejahteraan dan pembawa kemakmuran. Hal ini meng- isyaratkan inayat Allah kepada hamba-hamba-Nya.

52. Surat الطور (Surah At-Tur (Bukit Tursina The Mount)), 49 ayat | مكة
Surat Ath Thuur terdiri atas 49 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat As Sajdah. Dinamai Ath Thuur (Bukit) diambil dari perkataan Ath Thuur yang terdapat pada ayat pertama surat ini. Yang dimaksud dengan bukit di sini ialah bukit Thursina yang terletak di semenanjung Sinai, tempat Nabi Musa menerima wahyu dari Tuhannya.

53. Surat النجم (Surah An-Najm (Bintang The Star)), 62 ayat | مكة
Surat An Najm terdiri atas 62 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al Ikhlash. Nama An Najm (bintang), diambil dari perkataan  An Najm yang terdapat pada ayat pertama surat ini. Allah bersumpah dengan An Najm (bintang) adalah karena bintang-bintang yang timbul dan tenggelam, amat besar manfaatnya bagi manusia, sebagai pedoman bagi manusia dalam melakukan pelayaran di lautan, dalam perjalanan di padang pasir, untuk menentukan peredaran musim dan sebagainya.

54. Surat القمر (Surah Al-Qamar (Bulan The Moon)), 55 ayat | مكة
Surat Al Qamar terdiri atas 55 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesedah surat Ath Thaariq. Nama Al Qamar (bulan) diambil dari perkataan Al Qamar yang terdapat pada ayat pertama surat ini. Pada ayat ini diterangkan tentang terbelahnya bulan sebagai mukjizat Nabi Muhammad s.a.w.

55. Surat الرحمن (Surah Ar-Rahman (Maha Pengasih The Beneficent)), 78 ayat | مدينة
Surat Ar Rahmaan terdiri atas 78 ayat, termasuk golongan surat- surat Madaniyyah, diturunkan sesudah surat Ar Ra'du. Dinamai Ar Rahmaan (Yang Maha Pemurah), diambil dari perkataan Ar Rahmaan yang terdapat pada ayat pertama surat ini. Ar Rahmaan adalah salah satu dari nama-nama Allah. Sebagian besar dari surat ini menerangkan kepemurahan Allah s.w.t. kepada hamba-hamba-Nya, yaitu dengan memberikan nikmat-nikmat yang tidak terhingga baik di dunia maupun di akhirat nanti.

56. Surat الواقعة (Surah Al-Waqi'ah (Hari Kiamat The Inevitable)), 96 ayat | مكة
Surat Al Waaqi'ah terdiri atas 96 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat Thaa Haa. 	Dinamai dengan Al Waaqi'ah (Hari Kiamat), diambil dari perkataan Al Waaqi'ah yang terdapat pada ayat pertama surat ini.

57. Surat الحديد (Surah Al-Hadid (Besi The Iron)), 29 ayat | مدينة
Surat Al Hadiid terdiri atas 29 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Az Zalzalah. Dinamai Al Hadiid (Besi), diambil dari perkataan Al Hadiid yang terdapat pada ayat 25 surat ini.

58. Surat المجادلة (Surah Al-Mujadalah (Gugatan The Pleading Woman)), 22 ayat | مدينة
Surat Al Mujaadilah terdiri atas 22 ayat, termasuk golongan surat Madaniyyah, diturunkan sesudah surat Al Munaafiquun. Surat ini dinamai dengan Al Mujaadilah (wanita yang mengajukan gugatan) karena pada awal surat ini disebutkan bantahan seorang perempuan, menurut riwayat bernama Khaulah binti Tsa'labah terhadap sikap suaminya yang telah menzhiharnya. Hal ini diadukan kepada Rasulullah s.a.w. dan ia menuntut supaya beliau memberikan putusan yang adil dalam persoalan itu. Dinamai juga Al Mujaadalah yang berarti perbantahan.

59. Surat الحشر (Surah Al-Hasyr (Pengusiran The Exile)), 24 ayat | مدينة
Surat Al Hasyr terdiri atas 24 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Al Bayyinah. 	Dinamai surat Al Hasyr (pengusiran) diambil dari perkataan Al-Hasyr yang terdapat pada ayat 2 surat ini. Di dalam surat ini disebutkan  kisah pengusiran suatu suku Yahudi yang bernama Bani Nadhir yang berdiam  di sekitar kota Madinah.

60. Surat الممتحنة (Surah Al-Mumtahanah (Wanita Yang Diuji She that is to be examined)), 13 ayat | مدينة
Surat Al Mumtahanah terdiri atas 13 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Al Ahzab. Dinamai Al Mumtahanah (wanita yang diuji), diambil dari kata "Famtahinuuhunna" yang berarti maka ujilah mereka, yang terdapat pada ayat 10 surat ini.

61. Surat الصف (Surah As-Saff (Barisan The Ranks)), 14 ayat | مدينة
Surat Ash Shaff terdiri atas 14 ayat termasuk golongan surat-surat Madaniyyah. Dinamai dengan Ash Shaff, karena pada ayat 4 surat ini terdapat kata Shaffan yang berarti satu barisan. Ayat ini menerangkan apa yang diridhai Allah sesudah menerangkan apa yang dimurkai-Nya. Pada ayat 3 diterangkan bahwa Allah murka kepada orang yang hanya pandai berkata saja tetapi tidak melaksanakan apa yang diucapkannya. Dan pada ayat 4 diterangkan bahwa Allah menyukai orang yang mempraktekkan apa yang diucapkannya yaitu orang-orang yang berperang pada jalan Allah dalam satu barisan.

62. Surat الجمعة (Surah Al-Jumu'ah (Jumat Friday)), 11 ayat | مدينة
Surat Al Jumu'ah ini terdiri atas 11 ayat, termasuk golongan-golongan surat-surat Madaniyyah dan diturunkan sesudah surat Ash Shaf. Nama surat Al Jumu'ah diambil dari kata Al Jumu'ah yang terdapat pada ayat 9 surat ini yang artinya: hari Jum'at.

63. Surat المنافقون (Surah Al-Munafiqun (Orang-Orang Munafik The Hypocrites)), 11 ayat | مدينة
Surat ini terdiri atas 11 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Al Hajj. Surat ini dinamai Al-Munaafiquun  yang artinya orang-orang munafik, karena surat ini mengungkapkan  sifat-sifat orang-orang munafik.

64. Surat التغابن (Surah At-Tagabun (Pengungkapan Kesalahan Mutual Disillusion)), 18 ayat | مدينة
Surat ini terdiri atas 18 ayat, termasuk golongan surat-surat Madaniyyah dan diturunkan sesudah surat At Tahrim. Nama At Taghaabun diambil dari kata At Taghaabun yang terdapat pada ayat ke 9 yang artinya hari dinampakkan kesalahan-kesalahan.

65. Surat الطلاق (Surah At-Talaq (Talak Divorce)), 12 ayat | مدينة
Surat ini terdiri atas 12 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Al Insaan. Dinamai surat Ath Thalaaq karena kebanyakan ayat-ayatnya mengenai masalah talak dan yang berhubungan dengan masalah itu.

66. Surat التحريم (Surah At-Tahrim (Pengharaman The Prohibition)), 12 ayat | مدينة
Surat ini terdiri atas 12 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Al Hujuraat. Dinamai surat At Tahrim karena pada awal surat ini terdapat kata tuharrim yang kata asalnya adalah Attahrim yang berarti mengharamkan.

67. Surat الملك (Surah Al-Mulk (Kerajaan The Sovereignty)), 30 ayat | مكة
Surat ini terdiri atas 30 ayat, termasuk golongan surat-surat  Makkiyah, diturunkan sesudah Ath Thuur. Nama Al Mulk diambil dari kata Al Mulk yang terdapat pada ayat pertama surat ini yang artinya kerajaan atau kekuasaan. Dinamai pula surat ini dengan At Tabaarak (Maha Suci).

68. Surat القلم (Surah Al-Qalam (Pena The Pen)), 52 ayat | مكة
Surat ini terdiri atas 52 ayat,termasuk golongan surat-surat Makkiyah,diturunkan sesudah surat Al Alaq. Nama Al Qalam diambil dari kata Al Qalam yang terdapat pada ayat pertama surat iniyang artinya pena. Surat ini dinamai pula dengan surat Nun (huruf nun).

69. Surat الحاقة (Surah Al-Haqqah (Hari Kiamat The Reality)), 52 ayat | مكة
Surat ini terdiri atas 52 ayat,termasuk golongan surat-surat Makkiyah,diturunkan sesudah surat Al Mulk.  Nama Al Haaqqah diambil dari kata Al Haaqqah yang terdapat pada ayat pertama surat ini yang artinya hari kiamat

70. Surat المعارج (Surah Al-Ma'arij (Tempat Naik The Ascending Stairways)), 44 ayat | مكة
Surat ini terdiri atas 44 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al Haaqqah.Perkataan Al Ma'arij yang menjadi nama bagi surat ini adalah kata jamak dari Mi'raj, diambil dari perkataan Al Ma'arij yang terdapat pada ayat 3, yang artinya menurut bahasa tempat naik. Sedang para ahli  tafsir memberi arti bermacam-macam, di antaranya langit, nikmat karunia dan derajat atau tingkatan yang diberikan Allah s.w.t kepada ahli surga.

71. Surat نوح (Surah Nuh (Nuh Noah)), 28 ayat | مكة
Surat ini terdiri atas 28 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat An Nahl. Dinamakan dengan surat Nuh karena surat ini seluruhnya menjelaskan da'wah dan doa Nabi Nuh a.s.

72. Surat الجن (Surah Al-Jinn (Jin The Jinn)), 28 ayat | مكة
Surat Al Jin terdiri atas 28 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al A'raaf. Dinamai Al Jin diambil dari perkataan Al Jin yang terdapat  pada ayat pertama surat ini. Pada ayat tersebut dan ayat-ayat berikutnya  diterangkan bahwa Jin sebagai makhluk halus telah mendengar pembacaan  Al Quran dan mereka mengikuti ajaran Al Quran tersebut.

73. Surat المزمل (Surah Al-Muzzammil (Orang Yang Berselimut The Enshrouded One)), 20 ayat | مكة
Surat Al Muzzammil terdiri atas 20 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat Al Qalam.Dinamai Al Muzzammil (orang yang berselimut) diambil dari perkataan Al Muzzammil yang terdapat pada ayat pertama surat ini. Yang dimaksud dengan orang yang berkemul ialah Nabi Muhammad s.a.w.

74. Surat المدثر (Surah Al-Muddassir (Orang Yang Berkemul The Cloaked One)), 56 ayat | مكة
Surat Al Muddatstsir terdiri atas 56 ayat, termasuk golongan  surat-surat Makkiyah, diturunkan sesudah surat Al Muzzammil. 	Dinamai Al Muddatstsir (orang yang berkemul) diambil dari perkataan Al Muddatstsir yang terdapat pada ayat pertama surat ini.

75. Surat القيامة (Surah Al-Qiyamah (Hari Kiamat The Resurrection)), 40 ayat | مكة
Surat Al Qiyaamah terdiri atas 40 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat Al Qaari'ah. Dinamai Al Qiyaamah (hari kiamat) diambil dari perkataan Al Qiyaamah yang terdapat pada ayat pertama surat ini.

76. Surat الانسان (Surah Al-Insan (Manusia Man)), 31 ayat | مدينة
Surat Al Insaan terdiri atas 31 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Ar Rahmaan. Dinamai al Insaan (manusia) diambil dari perkataan Al Insaan yang terdapat pada ayat pertama surat ini.

77. Surat المرسلات (Surah Al-Mursalat (Malaikat Yang Diutus The Emissaries)), 50 ayat | مكة
Surat Al Mursalaat terdiri atas 50 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat Al Humazah. Dinamai Al Mursalaat (Malaikat-Malaikat yang diutus), diambil dari perkataan Al Mursalaat yang terdapat pada ayat pertama surat ini. Dinamai juga Amma yatasaa aluun diambil dari perkataan Amma yatasaa aluun yang terdapat pada ayat 1 surat ini.

78. Surat النبإ (Surah An-Naba' (Berita Besar The Announcement)), 40 ayat | مكة
Surat An Naba´ terdiri atas 40 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat Al Ma´aarij. Dinamai An Naba´ (berita besar) diambil dari perkataan An Naba´ yang terdapat pada ayat 2 surat ini. Dinamai juga Amma yatasaa aluun diambil dari perkataan Amma yatasaa aluun yang terdapat pada ayat 1 surat ini.

79. Surat النازعات (Surah An-Nazi'at (Malaikat Yang Mencabut Those who drag forth)), 46 ayat | مكة
Surat An Naazi´aat terdiri atas 46 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat An Naba´. Dinamai An Naazi´aat diambil dari perkataan An Naazi´aat yang terdapat pada ayat pertama surat ini. Dinamai pula as Saahirah yang diambil dari ayat 14, dinamai juga Ath Thaammah diambil dari ayat 34.

80. Surat عبس (Surah 'Abasa (Bermuka Masam He frowned)), 42 ayat | مكة
Surat 'Abasa terdiri atas 42 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat An Najm. Dinamai 'Abasa  diambil dari perkataan 'Abasa yang terdapat pada ayat pertama surat ini. Menurut riwayat, pada suatu ketika Rasulullah s.a.w. menerima dan berbicara dengan pemuka-pemuka Quraisy yang beliau harapkan agar mereka masuk Islam. Dalam pada itu datanglah Ibnu Ummi Maktum, seorang sahabat yang buta yang mengharap agar Rasulullah s.a.w. membacakan kepadanya ayat- ayat Al Quran yang telah diturunkan Allah. tetapi Rasulullah s.a.w. bermuka masam dan memalingkan muka dari Ibnu Ummi Maktum yang buta itu, lalu Allah menurunkan surat ini sebagai teguran atas sikap Rasulullah terhadap ibnu Ummi Maktum itu.

81. Surat التكوير (Surah At-Takwir (Penggulungan The Overthrowing)), 29 ayat | مكة
Surat At Takwir terdiri atas 29 ayat dan termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat Al Masadd. Kata At Takwir (terbelah) yang menjadi nama bagi surat ini adalah dari kata asal (mashdar) dari kata kerja kuwwirat (digulung) yang terdapat pada ayat pertama surat ini.

82. Surat الإنفطار (Surah Al-Infitar (Terbelah The Cleaving)), 19 ayat | مكة
Surat ini terdiri atas 19 ayat, termasuk golongan surat-surat Makkiyah dan diturunkan sesudah surat An Naazi'aat. Al Infithaar yang dijadikan  nama untuk surat ini adalah kata asal dari kata Infatharat (terbelah)  yang terdapat pada ayat pertama.

83. Surat المطففين (Surah Al-Mutaffifin (Orang-Orang Curang Defrauding)), 36 ayat | مكة
Surat ini terdiri atas 36 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al 'Ankabuut dan merupakan  surat yang terakhir di Mekkah sebelum hijrah. Al Muthaffifiin  yang dijadikan nama bagi surat ini diambil dari kata  Al Muthaffifiin yang terdapat pada ayat pertama.

84. Surat الإنشقاق (Surah Al-Insyiqaq (Terbelah The Splitting Open)), 25 ayat | مكة
Surat Al Insyiqaaq, terdiri atas 25 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat Al Infithaarr. Dinamai Al Insyiqaaq (terbelah), diambil dari perkataan Insyaqqat yang terdapat pada permulaan surat ini, yang pokok katanya ialah insyiqaaq.

85. Surat البروج (Surah Al-Buruj (Gugusan Bintang The Constellations)), 22 ayat | مكة
Surat Al Buruuj terdiri atas 22 ayat, termasuk golongan surat-surat Makkiyyah diturunkan sesudah surat Asy-Syams.Dinamai Al Buruuj (gugusan bintang) diambil dari perkataan Al Buruuj yang terdapat pada ayat 1 surat ini.

86. Surat الطارق (Surah At-Tariq (Yang Datang Di Malam Hari The Morning Star)), 17 ayat | مكة
Surat Ath Thaariq terdiri atas 17 ayat, termasuk golongan surat-surat Makkiyah,  diturunkan sesudah surat Al Balad.  Dinamai Ath Thaariq (yang datang di malam hari) diambil dari  perkataan Ath Thaariq yang terdapat pada ayat 1 surat ini.

87. Surat الأعلى (Surah Al-A'la (Maha Tinggi The Most High)), 19 ayat | مكة
Surat ini terdiri atas 19 ayat, termasuk golongan surat-surat Makkiyyah, dan diturunkan sesudah surat At Takwiir. Nama Al A´laa diambil dari kata Al A´laa yang terdapat pada ayat pertama, berarti Yang Paling Tinggi. Muslim meriwayatkan dalam kitab Al Jumu'ah, dan diriwayatkan pula oleh Ashhaabus Sunan, dari Nu'man ibnu Basyir bahwa Rasulullah s.a.w. pada shalat dua hari Raya (Fitri dan Adha) dan shalat Jum'at membaca surat Al A´laa pada rakaat pertama, dan surat Al Ghaasyiyah pada rakaat kedua.

88. Surat الغاشية (Surah Al-Gasyiyah (Hari Kiamat The Overwhelming)), 26 ayat | مكة
Surat ini terdiri atas 26 ayat, termasuk surat-surat Makkiyah, diturunkan sesudah surat Adz Dzaariat. Nama Ghaasyiyah diambil dari kata Al Ghaasyiyah yang terdapat pada ayat pertama surat ini yang  artinya peristiwa yang dahsyat, tapi yang dimaksud adalah hari kiamat. Surat ini adalah surat yang kerap kali dibaca Nabi pada rakaat kedua  pada shalat hari-hari Raya dan shalat Jum'at

89. Surat الفجر (Surah Al-Fajr (Fajar The Dawn)), 30 ayat | مكة
Surat ini terdiri atas 30 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al Lail. Nama Al Fajr diambil dari kata Al Fajr yang terdapat pada ayat pertama surat ini yang artinya fajar.

90. Surat البلد (Surah Al-Balad (Negeri The City)), 20 ayat | مكة
Surat Al Balad terdiri atas 20 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Qaaf. Dinamai Al Balad, diambil dari perkataan Al Balad yang terdapat  pada ayat pertama surat ini. Yang dimaksud dengan kota di sini ialah kota Mekah.

91. Surat الشمس (Surah Asy-Syams (Matahari The Sun)), 15 ayat | مكة
Surat Asy Syams terdiri atas 15 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al Qadar.  Dinamai Asy Syams (matahari) diambil dari perkataan Asy Syams yang terdapat pada ayat permulaan surat ini.

92. Surat الليل (Surah Al-Lail (Malam The Night)), 21 ayat | مكة
Surat ini terdiri atas 21 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat Al A'laa. Surat ini dinamai Al Lail (malam), diambil dari perkataan Al Lail yang terdapat pada ayat pertama surat ini

93. Surat الضحى (Surah Ad-Duha (Duha The Morning Hours)), 11 ayat | مكة
Surat ini terdiri atas 11 ayat, termasuk golongan surat Makiyyah dan diturunkan sesudah surat Al Fajr. Nama Adh Dhuhaa diambil dari kata yang terdapat pada ayat pertama, artinya : waktu matahari sepenggalahan naik.

94. Surat الشرح (Surah Asy-Syarh (Lapang The Consolation)), 8 ayat | مكة
Surat ini terdiri atas 8 ayat, termasuk golongan surat-surat Makkiyah dan diturunkan sesudah surat Adh Dhuhaa. Nama Alam Nasyrah diambil dari kata Alam Nasyrah yang terdapat pada ayat pertama, yang berarti: bukankah Kami telah melapangkan.

95. Surat التين (Surah At-Tin (Buah Tin The Fig)), 8 ayat | مكة
Surat ini terdiri atas 8 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat Al Buruuj. Nama At Tiin diambil dari kata At Tiin yang terdapat pada ayat pertama surat ini yang artinya buah Tin.

96. Surat العلق (Surah Al-'Alaq (Segumpal Darah The Clot)), 19 ayat | مكة
Surat Al 'Alaq terdiri atas 19 ayat, termasuk golongan surat-surat Makkiyah. Ayat 1 sampai dengan 5 dari surat ini adalah ayat-ayat Al Quran yang pertama sekali diturunkan, yaitu di waktu Nabi Muhammad s.a.w. berkhalwat di gua Hira'. Surat ini dinamai Al 'Alaq (segumpal darah), diambil dari perkataan Alaq yang terdapat pada ayat 2 surat ini. Surat ini dinamai juga dengan Iqra atau Al Qalam.

97. Surat القدر (Surah Al-Qadr (Kemuliaan The Power, Fate)), 5 ayat | مكة
Surat Al Qadr terdiri atas 5 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat 'Abasa. Surat ini dinamai Al Qadr (kemuliaan), diambil dari perkataan Al Qadr yang terdapat pada ayat pertama surat ini.

98. Surat البينة (Surah Al-Bayyinah (Bukti Nyata The Evidence)), 8 ayat | مدينة
Surat Al Bayyinah terdiri atas 8 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Ath Thalaq. Dinamai Al Bayyinah (bukti yang nyata) diambil dari perkataan Al Bayyinah yang terdapat pada ayat pertama surat ini.

99. Surat الزلزلة (Surah Az-Zalzalah (Guncangan The Earthquake)), 8 ayat | مدينة
Surat ini terdiri atas 8 ayat, termasuk golongan surat-surat Madaniyyah diturunkan sesudah surat An Nisaa'. Nama Al Zalzalah diambil dari kata: Zilzaal yang terdapat pada ayat pertama surat ini yang berarti goncangan.

100. Surat العاديات (Surah Al-'Adiyat (Kuda Yang Berlari Kencang The Chargers)), 11 ayat | مكة
Surat ini terdiri atas 11 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al'Ashr. Nama Al 'Aadiyaat diambil dari kata Al 'Aadiyaat yang terdapat pada ayat pertama surat ini, artinya yang berlari kencang.

101. Surat القارعة (Surah Al-Qari'ah (Hari Kiamat The Calamity)), 11 ayat | مكة
Surat ini terdiri atas 11 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Quraisy. Nama Al Qaari'ah diambil dari kata Al Qaari'ah yang terdapat pada ayat pertama, artinya mengetok dengan keras, kemudian kata ini dipakai untuk nama hari kiamat.

102. Surat التكاثر (Surah At-Takasur (Bermegah-Megahan Competition)), 8 ayat | مكة
Surat At Takaatsur terdiri atas 8 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al Kautsar. Dinamai At Takaatsur (bermegah-megahan) diambil dari perkataan At Takaatsur yang terdapat pada ayat pertama surat ini.

103. Surat العصر (Surah Al-'Asr (Asar The Declining Day, Epoch)), 3 ayat | مكة
Surat Al 'Ashr terdiri atas 3 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Alam Nasyrah. Dinamai Al 'Ashr (masa) diambil dari perkataan Al 'Ashr yang terdapat pada ayat pertama surat ini.

104. Surat الهمزة (Surah Al-Humazah (Pengumpat The Traducer)), 9 ayat | مكة
Surat Al Humazah terdiri atas 9 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al Qiyaamah. Dinamai Al Humazah (pengumpat) diambil dari perkataan Humazah yang terdapat pada ayat pertama surat ini.

105. Surat الفيل (Surah Al-Fil (Gajah The Elephant)), 5 ayat | مكة
Surat ini terdiri atas 5 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al Kaafirun. Nama Al Fiil diambil dari kata Al Fiil yang terdapat pada ayat pertama surat ini, artinya gajah. Surat Al Fiil mengemukakan cerita pasukan bergajah dari Yaman yang dipimpin oleh Abrahah yang ingin meruntuhkan Ka'bah di Mekah. Peristiwa ini terjadi pada tahun Nabi Muhammad s.a.w. dilahirkan.

106. Surat قريش (Surah Quraisy (Quraisy Quraysh)), 4 ayat | مكة
Surat ini terdiri atas 4 ayat, termasuk golongan surat-surat Makkiyyah dan diturunkan sesudah surat At Tiin. Nama Quraisy diambil dari kata Quraisy yang terdapat pada ayat pertama, artinya suku Quraisy. Suku Quraisy adalah suku yang mendapat  kehormatan untuk memelihara Ka'bah.

107. Surat الماعون (Surah Al-Ma'un (Barang Yang Berguna Almsgiving)), 7 ayat | مكة
Surat ini terdiri atas 7 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat At Taakatsur. Nama Al Maa'uun diambil dari kata Al Maa'uun yang terdapat pada ayat 7, artinya barang-barang yang berguna.

108. Surat الكوثر (Surah Al-Kausar (Pemberian Yang Banyak Abundance)), 3 ayat | مكة
Surat Al Kautsar terdiri atas 3 ayat, termasuk golongan surat-surat  Makkiyyah diturunkan sesudah surat Al 'Aadiyaat. Dinamai Al Kautsar (nikmat yang banyak) diambil dari perkataan Al Kautsar yang terdapat pada ayat pertama surat ini.Surat ini sebagai penghibur hati Nabi Muhammad s.a.w.

109. Surat الكافرون (Surah Al-Kafirun (Orang-Orang kafir The Disbelievers)), 6 ayat | مكة
Surat Al Kaafiruun terdiri atas 6 ayat, termasuk golongan surat-surat  Makkiyyah, diturunkan sesudah surat Al Maa'uun. Dinamai Al Kaafiruun (orang-orang kafir), diambil dari perkataan  Al Kaafiruun yang terdapat pada ayat pertama surat ini.

110. Surat النصر (Surah An-Nasr (Pertolongan Divine Support)), 3 ayat | مدينة
Surat An Nashr terdiri atas 3 ayat, termasuk golongan surat-surat  Madaniyyah yang diturunkan di Mekah sesudah surat At Taubah.  Dinamai An Nashr (pertolongan) diambil dari perkataan Nashr yang  terdapat pada ayat pertama surat ini.

111. Surat المسد (Surah Al-Lahab (Api Yang Bergejolak The Palm Fibre)), 5 ayat | مكة
Surat ini terdiri atas 5 ayat, termasuk golongan surat-surat Makkiyyah,  diturunkan sesudah surat Al Fath. Nama Al Lahab diambil dari kata  Al Lahab yang terdapat pada ayat ketiga surat ini yang artinya gejolak  api. Surat ini juga dinamakan surat Al Masad.

112. Surat الإخلاص (Surah Al-Ikhlas (Ikhlas Sincerity)), 4 ayat | مكة
Surat ini terdiri atas 4 ayat, termasuk golongan surat-surat  Makkiyyah, diturunkan sesudah sesudah surat An Naas. Dinamakan Al Ikhlas karena surat ini sepenuhnya menegaskan kemurnian keesaan Allah s.w.t.

113. Surat الفلق (Surah Al-Falaq (Subuh The Dawn)), 5 ayat | مكة
Surat ini terdiri atas 5 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat Al Fiil. Nama Al Falaq diambil dari kata Al Falaq yang terdapat pada ayat pertama surat ini yang artinya waktu subuh. Diriwayatkan oleh Abu Daud, At Tirmizi dan An Nasa-i dari 'Uqbah bin 'Aamir bahwa Rasulullah s.a.w. bersembahyang dengan membaca surat Al Falaq  dan surat An Naas dalam perjalanan.

114. Surat الناس (Surah An-Nas (Manusia Mankind)), 6 ayat | مكة
Surat ini terdiri atas 6 ayat, termasuk golongan surat-surat Makkiyah,  diturunkan sesudah surat Al Falaq. Nama An Naas diambil dari An Naas yang berulang kali disebut dalam surat ini yang artinya manusia.
`
    if (!(args[0] || args[1])) throw `${daftarsurah}`;
    if (isNaN(args[0]) || isNaN(args[1])) throw `${daftarsurah}`;

    /*
    if (!(args[0] || args[1])) throw `contoh:\n${usedPrefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, & ayatnya 1 saja.`;
    if (isNaN(args[0]) || isNaN(args[1])) throw `contoh:\n${usedPrefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 saja\n`;
    */
    let retries = 0;
    let api;

    while (retries < maxRetries) {
        try {
            const response = await fetch('https://raw.githubusercontent.com/Xnuvers007/Xnuvers007.github.io/master/database/alquran.json');
            if (!response.ok) throw 'Tidak dapat mengambil data Al-Quran.';
            api = await response.json();
            break; // berhenti kalo udah berhasil
        } catch (error) {
            console.error(`Error fetching data (attempt ${retries + 1}):`, error);
            retries++;
            await new Promise(resolve => setTimeout(resolve, retryDelay)); // jeda dulu sebelum coba lagi
        }
    }

    if (retries === maxRetries) {
        throw 'Gagal mengambil data Al-Quran setelah beberapa percobaan.';
    }

    if (!Array.isArray(api)) {
        throw `Data Al-Quran tidak sesuai format yang diharapkan.`;
    }

    /*
    const surahList = api.map(surah => {
        let name = `${surah.asma.id.long} (${surah.asma.translation.id + " " + surah.asma.translation.en})`;
        return `${surah.number}. Surat ${surah.asma.ar.short} (${name}), ${surah.ayahCount + " ayat" + " | " + surah.type.ar}\n${surah.tafsir.id}`;
    }).join('\n\n');

    const listsurah = `Nama-nama Surah:\n${surahList}`;

    if (!(args[0] || args[1])) throw `contoh:\n${usedPrefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, & ayatnya 1 saja\n\n${listsurah}`;
    if (isNaN(args[0]) || isNaN(args[1])) throw `contoh:\n${usedPrefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja\n\n${listsurah}`;
    */

    await m.reply(wait);

    const mes = `
${api[args[0] - 1].ayahs[args[1] - 1].text.ar}
${api[args[0] - 1].ayahs[args[1] - 1].text.read}
        
Indonesia: ${api[args[0] - 1].ayahs[args[1] - 1].translation.id}
English: ${api[args[0] - 1].ayahs[args[1] - 1].translation.en}
( Q.S ${api[args[0] - 1].asma.id.short} (${api[args[0] - 1].asma.ar.short}) : ${api[args[0] - 1].ayahs[args[1] - 1].number.insurah} )
  
*Tafsir: ${api[args[0] - 1].ayahs[args[1] - 1].tafsir.id}*
`.trim();
    await m.reply(mes);
    await conn.sendFile(m.chat, api[args[0] - 1].ayahs[args[1] - 1].audio.url, '', `( Q.S ${api[args[0] - 1].asma.id.short} (${api[args[0] - 1].asma.ar.short}) : ${api[args[0] - 1].ayahs[args[1] - 1].number.insurah} )`, m);
}

handler.help = ['alquran']
handler.tags = ['quran']
handler.command = ['alquran']

export default handler;
