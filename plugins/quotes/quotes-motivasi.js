let handler = async(m) => {
let motivasii = pickRandom(motivasi)
    m.reply(`"${motivasii}"`)
}
handler.help = ['motivasi']
handler.tags = ['quotes']
handler.command = /^(motivasi)$/i

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const motivasi = [
"jangan bicara, bertindak saja. jangan katakan, tunjukkan saja. jangan janji, buktikan saja.",
"jangan pernah berhenti melakukan yang terbaik hanya karena seseorang tidak memberi anda penghargaan.",
"bekerja saat mereka tidur. belajar saat mereka berpesta. hemat sementara mereka menghabiskan. hiduplah seperti mimpi mereka.",
"kunci sukses adalah memusatkan pikiran sadar kita pada hal-hal yang kita inginkan, bukan hal-hal yang kita takuti.",
"jangan takut gagal. ketakutan berada di tempat yang sama tahun depan seperti anda saat ini.",
"jika kita terus melakukan apa yang kita lakukan, kita akan terus mendapatkan apa yang kita dapatkan.",
"jika anda tidak dapat mengatasi stres, anda tidak akan mengelola kesuksesan.",
"bersikap keras kepala tentang tujuan anda dan fleksibel tentang metode anda.",
"kerja keras mengalahkan bakat ketika bakat tidak bekerja keras.",
"ingatlah bahwa pelajaran terbesar dalam hidup biasanya dipelajari dari saat-saat terburuk dan dari kesalahan terburuk.",
"hidup bukan tentang menunggu badai berlalu, tetapi belajar menari di tengah hujan.",
"jika rencananya tidak berhasil, ubah rencananya bukan tujuannya.",
"jangan takut kalau hidupmu akan berakhir; takutlah kalau hidupmu tak pernah dimulai.",
"orang yang benar-benar hebat adalah orang yang membuat setiap orang merasa hebat.",
"pengalaman adalah guru yang berat karena dia memberikan tes terlebih dahulu, kemudian pelajarannya.",
"mengetahui seberapa banyak yang perlu diketahui adalah awal dari belajar untuk hidup.",
"sukses bukanlah akhir, kegagalan tidak fatal. yang terpenting adalah keberanian untuk melanjutkan.",
"lebih baik gagal dalam orisinalitas daripada berhasil meniru.",
"berani bermimpi, tapi yang lebih penting, berani melakukan tindakan di balik impianmu.",
"tetapkan tujuan anda tinggi-tinggi, dan jangan berhenti sampai anda mencapainya.",
"kembangkan kesuksesan dari kegagalan. keputusasaan dan kegagalan adalah dua batu loncatan paling pasti menuju sukses.",
"jenius adalah satu persen inspirasi dan sembilan puluh sembilan persen keringat.",
"sukses adalah tempat persiapan dan kesempatan bertemu.",
"ketekunan gagal 19 kali dan berhasil pada kesempatam yang ke-20.",
"jalan menuju sukses dan jalan menuju kegagalan hampir persis sama.",
"sukses biasanya datang kepada mereka yang terlalu sibuk mencarinya.",
"jangan tunda pekerjaanmu sampai besok, sementara kau bisa mengerjakannya hari ini.",
"20 tahun dari sekarang, kau mungkin lebih kecewa dengan hal-hal yang tidak sempat kau lakukan alih-alih yang sudah.",
"jangan habiskan waktumu memukuli tembok dan berharap bisa mengubahnya menjadi pintu.",
"kesempatan itu mirip seperti matahari terbit. kalau kau menunggu terlalu lama, kau bisa melewatkannya.",
"hidup ini terdiri dari 10 persen apa yang terjadi padamu dan 90 persen bagaimana caramu menyikapinya.",
"ada tiga cara untuk mencapai kesuksesan tertinggi: cara pertama adalah bersikap baik. cara kedua adalah bersikap baik. cara ketiga adalah menjadi baik.",
"alasan nomor satu orang gagal dalam hidup adalah karena mereka mendengarkan teman, keluarga, dan tetangga mereka.",
"waktu lebih berharga daripada uang. kamu bisa mendapatkan lebih banyak uang, tetapi kamu tidak bisa mendapatkan lebih banyak waktu.",
"penetapan tujuan adalah rahasia masa depan yang menarik.",
"saat kita berusaha untuk menjadi lebih baik dari kita, segala sesuatu di sekitar kita juga menjadi lebih baik.",
"pertumbuhan dimulai ketika kita mulai menerima kelemahan kita sendiri.",
"janganlah pernah menyerah ketika anda masih mampu berusaha lagi. tidak ada kata berakhir sampai anda berhenti mencoba.",
"kemauan adalah kunci sukses. orang-orang sukses, berusaha keras apa pun yang mereka rasakan dengan menerapkan keinginan mereka untuk mengatasi sikap apatis, keraguan atau ketakutan.",
"janganlah pernah menyerah ketika anda masih mampu berusaha lagi. tidak ada kata berakhir sampai anda berhenti mencoba.",
"kemauan adalah kunci sukses. orang-orang sukses, berusaha keras apa pun yang mereka rasakan dengan menerapkan keinginan mereka untuk mengatasi sikap apatis, keraguan atau ketakutan.",
"hal pertama yang dilakukan orang sukses adalah memandang kegagalan sebagai sinyal positif untuk sukses.",
"ciri khas orang sukses adalah mereka selalu berusaha keras untuk mempelajari hal-hal baru.",
"sukses adalah mendapatkan apa yang kamu inginkan, kebahagiaan menginginkan apa yang kamu dapatkan.",
"orang pesimis melihat kesulitan di setiap kesempatan. orang yang optimis melihat peluang dalam setiap kesulitan.",
"keraguan membunuh lebih banyak mimpi daripada kegagalan.",
"lakukan apa yang harus kamu lakukan sampai kamu dapat melakukan apa yang ingin kamu lakukan.",
"optimistis adalah salah satu kualitas yang lebih terkait dengan kesuksesan dan kebahagiaan daripada yang lain.",
"penghargaan paling tinggi bagi seorang pekerja keras bukanlah apa yang dia peroleh dari pekerjaan itu, tapi seberapa berkembang ia dengan kerja kerasnya itu.",
"cara terbaik untuk memulai adalah dengan berhenti berbicara dan mulai melakukan.",
"kegagalan tidak akan pernah menyusul jika tekad untuk sukses cukup kuat."
]