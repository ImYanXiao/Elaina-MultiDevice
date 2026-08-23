let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`"${pickRandom(quotes)}"`, m)
}
handler.help = ['quotes','katabijak']
handler.tags = ['quotes']
handler.command = /^(quotes|katabijak)$/i

export default handler 

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const quotes = [
"Keyakinan merupakan suatu pengetahuan di dalam hati, jauh tak terjangkau oleh bukti.",
"Rasa bahagia dan tak bahagia bukan berasal dari apa yang kamu miliki, bukan pula berasal dari siapa diri kamu, atau apa yang kamu kerjakan. Bahagia dan tak bahagia berasal dari pikiran kamu.",
"Sakit dalam perjuangan itu hanya sementara. Bisa jadi kamu rasakan dalam semenit, sejam, sehari, atau setahun. Namun jika menyerah, rasa sakit itu akan terasa selamanya.",
"Hanya seseorang yang takut yang bisa bertindak berani. Tanpa rasa takut itu tidak ada apapun yang bisa disebut berani.",
"Jadilah diri kamu sendiri. Siapa lagi yang bisa melakukannya lebih baik ketimbang diri kamu sendiri?",
"Kesempatan kamu untuk sukses di setiap kondisi selalu dapat diukur oleh seberapa besar kepercayaan kamu pada diri sendiri.",
"Kebanggaan kita yang terbesar adalah bukan tidak pernah gagal, tetapi bangkit kembali setiap kali kita jatuh.",
"Suatu pekerjaan yang paling tak kunjung bisa diselesaikan adalah pekerjaan yang tak kunjung pernah dimulai.",
"Pikiran kamu bagaikan api yang perlu dinyalakan, bukan bejana yang menanti untuk diisi.",
"Kejujuran adalah batu penjuru dari segala kesuksesan. Pengakuan adalah motivasi terkuat. Bahkan kritik dapat membangun rasa percaya diri saat disisipkan di antara pujian.",
"Segala sesuatu memiliki kesudahan, yang sudah berakhir biarlah berlalu dan yakinlah semua akan baik-baik saja.",
"Setiap detik sangatlah berharga karena waktu mengetahui banyak hal, termasuk rahasia hati.",
"Jika kamu tak menemukan buku yang kamu cari di rak, maka tulislah sendiri.",
"Jika hatimu banyak merasakan sakit, maka belajarlah dari rasa sakit itu untuk tidak memberikan rasa sakit pada orang lain.",
"Hidup tak selamanya tentang pacar.",
"Rumah bukan hanya sebuah tempat, tetapi itu adalah perasaan.",
"Pilih mana: Orang yang memimpikan kesuksesan atau orang yang membuatnya menjadi kenyataan?",
"Kamu mungkin tidak bisa menyiram bunga yang sudah layu dan berharap ia akan mekar kembali, tapi kamu bisa menanam bunga yang baru dengan harapan yang lebih baik dari sebelumnya.",
"Bukan bahagia yang menjadikan kita bersyukur, tetapi dengan bersyukurlah yang akan menjadikan hidup kita bahagia.",
"Aku memang diam. Tapi aku tidak buta.",
]