let handler = async (m, { conn, command, args, usedPrefix }) => {
    let type = (args[0] || '').toLowerCase()
    let users = global.db.data.users[m.sender]
    let time = users.lastkerja + 300000
    let __timers = (new Date - users.lastkerja)
    let _timers = (0 - __timers)
    let timers = clockString(_timers)

    let penumpang = pickRandom(['mas mas', 'bapak bapak', 'cewe sma', 'bocil epep', 'emak emak'])
    let dagangan = pickRandom(['wortel', 'sawi', 'selada', 'tomat', 'seledri', 'cabai', 'daging', 'ikan', 'ayam'])
    let pasien = pickRandom(['sakit kepala', 'cedera', 'luka bakar', 'patah tulang'])
    let cosplay = pickRandom(['menuju event jejepangan', 'mengikuti lomba coswalk','solo performance','menjadi MC Event jejepangan','Menjadi special guest star'])
    let panen = pickRandom(['Wortel', 'Kubis', 'stowbery', 'teh', 'padi', 'jeruk', 'pisang', 'semangka', 'durian', 'rambutan'])
    let bengkel = pickRandom(['mobil', 'motor', 'becak', 'bajai', 'bus', 'angkot', 'becak', 'sepeda'])
    let rumah = pickRandom(['Membangun Rumah', 'Membangun Gedung', 'Memperbaiki Rumah', 'Memperbaiki Gedung', 'Membangun Fasilitas Umum', 'Memperbaiki Fasilitas Umum'])

    let vtuberJobs = ['Streaming Game', 'Live Chat', 'Virtual Concert', 'Voice Acting', 'Content Creation']
    let tiktokersJobs = ['Dance Video', 'Comedy Skit', 'Challenge Video', 'Tutorial', 'Vlog']
    let youtuberJobs = ['Daily Vlog', 'Gaming Video', 'Product Review', 'Tutorial', 'Live Stream']
    let hololiveJobs = ['Virtual Concert', 'Fan Interaction', 'Collaboration Stream', 'Game Playthrough', 'Voice Acting']
    let maha5Jobs = ['Virtual Event', 'Brand Promotion', 'Live Stream', 'Content Creation', 'Fan Engagement']

    if (/kerja/i.test(command)) {
        if (new Date - users.lastkerja < 300000) return m.reply(`Kamu sudah bekerja\nSaatnya istirahat selama ${clockString(time - new Date())}`)

        let hasil
        let min, max

        switch (type) {
            case 'ojek':
                min = 100000
                max = 300000
                hasil = Math.floor(Math.random() * (max - min + 1) + min)
                m.reply(`Kamu Sudah Mengantarkan *${penumpang}* 🚗\nDan mendapatkan uang senilai *Rp ${toRupiah(hasil)} ${global.rpg.emoticon('money')}*`).then(() => {
                    users.money += hasil
                    users.lastkerja = new Date * 1
                })
                break
            case 'pedagang':
                min = 150000
                max = 350000
                hasil = Math.floor(Math.random() * (max - min + 1) + min)
                m.reply(`Ada pembeli yg membeli *${dagangan}* 🛒\nDan mendapatkan uang senilai *Rp ${toRupiah(hasil)} ${global.rpg.emoticon('money')}*`).then(() => {
                    users.money += hasil
                    users.lastkerja = new Date * 1
                })
                break
            case 'petani':
                min = 150000
                max = 250000
                hasil = Math.floor(Math.random() * (max - min + 1) + min)
                m.reply(`${panen} Sudah Panen !🌽 Dan menjualnya 🧺\nDan mendapatkan uang senilai Rp *${toRupiah(hasil)} ${global.rpg.emoticon('money')}*`).then(() => {
                    users.money += hasil
                    users.lastkerja = new Date * 1
                })
                break
            case 'montir':
                min = 200000
                max = 400000
                hasil = Math.floor(Math.random() * (max - min + 1) + min)
                m.reply(`Kamu Baru saja mendapatkan pelanggan dan memperbaiki *${bengkel} 🔧*\nDan kamu mendapatkan uang senilai *Rp ${toRupiah(hasil)}* ${global.rpg.emoticon('money')}`).then(() => {
                    users.money += hasil
                    users.lastkerja = new Date * 1
                })
                break
            case 'kuli':
                min = 150000
                max = 300000
                hasil = Math.floor(Math.random() * (max - min + 1) + min)
                m.reply(`Kamu baru saja selesai ${rumah} 🔨\nDan mendapatkan uang senilai *Rp ${toRupiah(hasil)} ${global.rpg.emoticon('money')}*`).then(() => {
                    users.money += hasil
                    users.lastkerja = new Date * 1
                })
                case 'dokter':
                min = 170000
                max = 500000
                hasil = Math.floor(Math.random() * (max - min + 1) + min)
                m.reply(`Kamu baru saja selesai mengobati seseorang yang sedang ${pasien} 💉\nDan mendapatkan uang senilai *Rp ${toRupiah(hasil)} ${global.rpg.emoticon('money')}*`).then(() => {
                    users.money += hasil
                    users.lastkerja = new Date * 1
                })
                break
                case 'cosplayer':
                min = 100000
                max = 350000
                hasil = Math.floor(Math.random() * (max - min + 1) + min)
                m.reply(`Kamu baru saja selesai menjadi seseorang cosplayer yang  ${cosplay} ✨\nDan mendapatkan uang senilai *Rp ${toRupiah(hasil)} ${global.rpg.emoticon('money')}*`).then(() => {
                    users.money += hasil
                    users.lastkerja = new Date * 1
                })
                break
            case 'vtuber':
                if (users.level < 45) return m.reply(`Kamu harus mencapai level 45 untuk menjadi VTuber`)
                min = 200000
                max = 500000
                hasil = Math.floor(Math.random() * (max - min + 1) + min)
                m.reply(`Kamu bekerja sebagai VTuber dengan aktivitas *${pickRandom(vtuberJobs)}* 🎤\nDan mendapatkan uang senilai *Rp ${toRupiah(hasil)} ${global.rpg.emoticon('money')}*`).then(() => {
                    users.money += hasil
                    users.lastkerja = new Date * 1
                })
                break
            case 'tiktokers':
                if (users.level < 45) return m.reply(`Kamu harus mencapai level 45 untuk menjadi TikTokers`)
                min = 200000
                max = 500000
                hasil = Math.floor(Math.random() * (max - min + 1) + min)
                m.reply(`Kamu bekerja sebagai TikTokers dengan aktivitas *${pickRandom(tiktokersJobs)}* 🎥\nDan mendapatkan uang senilai *Rp ${toRupiah(hasil)} ${global.rpg.emoticon('money')}*`).then(() => {
                    users.money += hasil
                    users.lastkerja = new Date * 1
                })
                break
            case 'youtuber':
                if (users.level < 45) return m.reply(`Kamu harus mencapai level 45 untuk menjadi YouTuber`)
                min = 200000
                max = 500000
                hasil = Math.floor(Math.random() * (max - min + 1) + min)
                m.reply(`Kamu bekerja sebagai YouTuber dengan aktivitas *${pickRandom(youtuberJobs)}* 🎬\nDan mendapatkan uang senilai *Rp ${toRupiah(hasil)} ${global.rpg.emoticon('money')}*`).then(() => {
                    users.money += hasil
                    users.lastkerja = new Date * 1
                })
                break
            case 'hololive':
                if (users.level < 45) return m.reply(`Kamu harus mencapai level 45 untuk bergabung dengan Hololive`)
                min = 300000
                max = 600000
                hasil = Math.floor(Math.random() * (max - min + 1) + min)
                m.reply(`Kamu bekerja dengan agensi Hololive dalam aktivitas *${pickRandom(hololiveJobs)}* 🌟\nDan mendapatkan uang senilai *Rp ${toRupiah(hasil)} ${global.rpg.emoticon('money')}*`).then(() => {
                    users.money += hasil
                    users.lastkerja = new Date * 1
                })
                break
            case 'maha5':
                if (users.level < 45) return m.reply(`Kamu harus mencapai level 45 untuk bergabung dengan MAHA5`)
                min = 300000
                max = 600000
                hasil = Math.floor(Math.random() * (max - min + 1) + min)
                                m.reply(`Kamu bekerja dengan agensi MAHA5 dalam aktivitas *${pickRandom(maha5Jobs)}* 🌐\nDan mendapatkan uang senilai *Rp ${toRupiah(hasil)} ${global.rpg.emoticon('money')}*`).then(() => {
                    users.money += hasil
                    users.lastkerja = new Date * 1
                })
                break
            default:
                return m.reply(`_*Pilih Pekerjaan Yang Kamu Inginkan*_\n\n_• Kuli_ \n_• Montir_ \n_• Petani_ \n_• Dokter_ \n_• Pedagang_\n• Cosplayer \n_• Ojek_ \n_• VTuber_ \n_• TikTokers_ \n_• YouTuber_ \n_• Hololive_ \n_• MAHA5_ \n\nContoh Penggunaan :\n${usedPrefix}kerja Kuli`)
        }
    }
}
handler.help = ['kerja']
handler.tags = ['rpg']
handler.command = /^(kerja|work)$/i
handler.register = true
handler.group = true
handler.rpg = true
handler.energy = 5
export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}

const toRupiah = number => parseInt(number).toLocaleString().replace(/,/gi, ".")