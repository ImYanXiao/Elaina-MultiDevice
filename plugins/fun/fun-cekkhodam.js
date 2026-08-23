let handler = async (m, { conn, usedPrefix, command, text }) => {
    conn.khodam = conn.khodam || {}
    if (!text) return m.reply(`Masukan Nama kamu! \n\nContoh: \n${usedPrefix + command} Rizki`)
    let kodam = conn.khodam?.[text] ? conn.khodam[text] : khodam.getRandom()
    await m.reply(`Nama : ${text} \n\nKhodam kamu adalah *${kodam}*`)
    conn.khodam[text] = kodam
}
handler.help = ["cekkhodam"]
handler.tags = ["fun"]
handler.command = /^(cek(khodam|kodam)|kodam|khodam)$/i
export default handler

let khodam = [
    "Kosong",
    "Kosong",
    "Kosong",
    "Kucing Rawa",
    "Biawak Samudra",
    "Kipas Angis",
    "Farhan Kebab",
    "Rossi Becak",
    "Karyawan Indomaret",
    "Peti Harta",
    "Kuntilanak Lucu",
    "Pocong berkepala 3",
    "Kapal karam",
    "Pace Yunus",
    "Ciput",
    "Kepala casan",
    "Bando kucing",
    "Pisang Hijau",
    "Pinguin Alaskar",
    "Zebra Merah",
    "Gondoruwo",
    "Ikan Mas",
    "Biawak",
    "Singa",
    "Zebra",
    "Ikan Sepat",
    "Ikan Gabus",
    "Ular Piton", 
    "Ular Kobra",
    "Harimau",
    "Macan",
    "Handuk basah",
    "Suster ngesot",
    "Tuyul",
    "Titid kuda",
    "Torpedo kambing",
    "Sapi",
    "Kerbau",
    "Domba",
    "Serigala",
    "Elang",
    "Cacing",
    "Ulat bulu",
    "Pace",
    "Siimut dari jawa",
    "Mama",
    "Papa",
    "Adek",
    "Nenek",
    "Pinokio",
    "Cinderela",
    "Agus",
    "Rusdi Boti",
    "Listrik Kejut",
    "Naruto",
    "Biawak Sumatera",
    "Semut Hitam",
    "Pinokio",
    "Naga Merah",
    "Barbie"
]