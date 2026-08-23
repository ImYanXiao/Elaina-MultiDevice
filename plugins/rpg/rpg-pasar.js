const Skepiting = 7000
const Slobster = 7000
const Sudang = 7000
const Scumi = 7000
const Sgurita = 7000
const Sbuntal = 7000
const Sdory = 7000
const Sorca = 7000
const Slumba = 7000
const Spaus = 7000
const Sikan = 7000
const Shiu = 7000
const Sbanteng = 9000
const Sharimau = 9000
const Sgajah = 9000
const Skambing = 9000
const Spanda = 9000
const Sbuaya = 9000
const Skerbau = 9000
const Ssapi= 9000
const Smonyet = 9000
const Sbabihutan = 9000
const Sbabi = 9000
const Sayam = 9000
const Sbotol = 100
const Skardus = 100
const Skaleng = 100
const Sgelas = 100
const Splastik = 100
let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
    const user = global.db.data.users[m.sender]
    const _armor = user.armor
    const armor = (_armor == 0 ? 20000 : '' || _armor == 1 ? 49999 : '' || _armor == 2 ? 99999 : '' || _armor == 3 ? 149999 : '' || _armor == 4 ? 299999 : '')
    let type = (args[0] || '').toLowerCase()
    let _type = (args[1] || '').toLowerCase()
    let jualbeli = (args[0] || '').toLowerCase()
    const Kchat = `
╍╌╌╍╌╌╍╌╌╍╌╌┅═━––––––๑
*🛒 Hewan Laut   | 💲 Harga Jual*
═┅═━––––––━––––––๑
🦀 Kepiting: ${Skepiting}
🦞 Lobster: ${Slobster}
🦐 Udang: ${Sudang}
🦑 Cumi: ${Scumi}
🐙 Gurita: ${Sgurita}
🐡 Buntal: ${Sbuntal}
🐠 Dory: ${Sdory}
🐳 Orca: ${Sorca}
🐬 Lumba: ${Slumba}
🐋 Paus: ${Spaus}
🦈 Hiu: ${Shiu}
╍╌╌╍╌╌╍╌╌╍╌╌┅═━––––––๑
*🛒 Hewan Darat   | 💲 Harga Jual*
═┅═━––––––━––––––๑
🐃 Banteng: ${Sbanteng}
🐅 Harimau: ${Sharimau}
🐘 Gajah: ${Sgajah}
🐐 Kambing: ${Skambing}
🐼 Panda: ${Spanda}
🐃 Kerbau: ${Skerbau}
🐊 Buaya: ${Sbuaya}
🐂 Sapi: ${Ssapi}
🐒 Monyet: ${Smonyet}
🐗 Babi Hutan: ${Sbabihutan}
🐖 Babi: ${Sbabi}
🐔 Ayam: ${Sayam}
╍╌╌╍╌╌╍╌╌╍╌╌┅═━––––––๑
📌 *Contoh penggunaan :*
═┅═━––––––━––––––๑
#pasar jual ayam [Jumlah]
#jual ayam [Jumlah]
`.trim()
    try {
        if (/pasar|toko/i.test(command)) {
           const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count)
            const sampah = user.sampah
            switch (jualbeli) {
            case 'jual': 
                switch (_type) {
                     case 'banteng':
                        if (user.banteng >= count * 1) {
                            user.money += Spaus * count
                            user.banteng -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Banteng Dengan Harga ${toRupiah(Sbanteng * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Banteng Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'harimau':
                        if (user.harimau >= count * 1) {
                            user.money += Sharimau * count
                            user.harimau -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Harimau Dengan Harga ${toRupiah(Sharimau * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Harimau Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'gajah':
                        if (user.gajah >= count * 1) {
                            user.money += Sgajah * count
                            user.gajah -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Gajah Dengan Harga ${toRupiah(Sgajah * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Gajah Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'kambing':
                        if (user.kambing >= count * 1) {
                            user.money += Skambing * count
                            user.kambing -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Kambing Dengan Harga ${toRupiah(Skambing * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Kambing Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'panda':
                        if (user.panda >= count * 1) {
                            user.money += Spanda * count
                            user.panda -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Panda Dengan Harga ${toRupiah(Sbuaya * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Panda Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'buaya':
                        if (user.buaya >= count * 1) {
                            user.money += Sbuaya * count
                            user.buaya -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Buaya Dengan Harga ${toRupiah(Sbuaya * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Buaya Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'kerbau':
                        if (user.kerbau >= count * 1) {
                            user.money += Skerbau * count
                            user.kerbau -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Kerbau Dengan Harga ${toRupiah(Skerbau * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Kerbau Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'sapi':
                        if (user.sapi >= count * 1) {
                            user.money += Ssapi * count
                            user.sapi -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Sapi Dengan Harga ${toRupiah(Ssapi * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Sapi Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'monyet':
                        if (user.monyet >= count * 1) {
                            user.money += Smonyet * count
                            user.monyet -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Monyet Dengan Harga ${toRupiah(Smonyet * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Monyet Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'babi':
                        if (user.babi >= count * 1) {
                            user.money += Skepiting * count
                            user.babi -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Babi Dengan Harga ${toRupiah(Sbabi * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Babi Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'babihutan':
                        if (user.babihutan >= count * 1) {
                            user.money += Sbabihutan * count
                            user.babihutan -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Babi Hutan Dengan Harga ${toRupiah(Sbabihutan * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Babi Hutan Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'ayam':
                        if (user.ayam >= count * 1) {
                            user.money += Sayam * count
                            user.ayam -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Ayam Dengan Harga ${toRupiah(Sayam * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Ayam Kamu Tidak Cukup`.trim(), m)
                        break
                                 
                        case 'kepiting':
                        if (user.kepiting >= count * 1) {
                            user.money += Skepiting * count
                            user.kepiting -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Kepiting Dengan Harga ${toRupiah(Skepiting * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Kepiting Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'ikan':
                        if (user.ikan >= count * 1) {
                            user.money += Skepiting * count
                            user.ikan -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Ikan Dengan Harga ${toRupiah(Sikan * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Ikan Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'dory':
                        if (user.dory >= count * 1) {
                            user.money += Sdory * count
                            user.dory -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Ikan Dory Dengan Harga ${toRupiah(Sdory * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Ikan Dory Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'gurita':
                        if (user.gurita >= count * 1) {
                            user.money += Skepiting * count
                            user.gurita -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Gurita Dengan Harga ${toRupiah(Sgurita * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Gurita Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'buntal':
                        if (user.buntal >= count * 1) {
                            user.money += Sbuntal * count
                            user.buntal -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Ikan Buntal Dengan Harga ${toRupiah(Sbuntal * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Ikan Buntal Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'hiu':
                        if (user.hiu >= count * 1) {
                            user.money += Shiu * count
                            user.hiu -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Hiu Dengan Harga ${toRupiah(Shiu * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Hiu Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'orca':
                        if (user.orca >= count * 1) {
                            user.money += Sorca * count
                            user.orca -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Paus Orca Dengan Harga ${toRupiah(Sorca * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Paus Orca Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'lumba':
                        if (user.lumba >= count * 1) {
                            user.money += Skepiting * count
                            user.lumba -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Lumba Lumba Dengan Harga ${toRupiah(Slumba * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Lumba Lumba Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'paus':
                        if (user.paus >= count * 1) {
                            user.money += Spaus * count
                            user.paus -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Paus Dengan Harga ${toRupiah(Spaus * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Paus Kamu Tidak Cukup`.trim(), m)
                        break
                  case 'lobster':
                        if (user.lobster >= count * 1) {
                            user.money += Slobster * count
                            user.lobster -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Lobster Dengan Harga ${toRupiah(Slobster * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Lobster Kamu Tidak Cukup`.trim(), m)
                        break
                     case 'udang':
                        if (user.udang >= count * 1) {
                            user.money += Sudang * count
                            user.udang -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Udang Dengan Harga ${toRupiah(Sudang * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Udang Kamu Tidak Cukup`.trim(), m)
                        break
                      case 'cumi':
                        if (user.cumi >= count * 1) {
                            user.money += Scumi * count
                            user.cumi -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Cumi Dengan Harga ${toRupiah(Scumi * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Cumi Kamu Tidak Cukup`.trim(), m)
                         break
                        case 'botol':
                        if (user.botol >= count * 1) {
                            user.money += Sbotol * count
                            user.botol -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Cumi Dengan Harga ${toRupiah(Sbotol * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Botol Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'kaleng':
                        if (user.kaleng >= count * 1) {
                            user.money += Skaleng * count
                            user.kaleng -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Kaleng Dengan Harga ${toRupiah(Skaleng * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Kaleng Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'kardus':
                        if (user.kardus >= count * 1) {
                            user.money += Skardus * count
                            user.kardus -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Kardus Dengan Harga ${toRupiah(Skardus * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Kardus Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'gelas':
                        if (user.gelas >= count * 1) {
                            user.money += Sgelas * count
                            user.gelas -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Gelas Dengan Harga ${toRupiah(Sgelas * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Gelas Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'plastik':
                        if (user.plastik >= count * 1) {
                            user.money += Splastik * count
                            user.plastik -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Plastik Dengan Harga ${toRupiah(Splastik * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Plastik Kamu Tidak Cukup`.trim(), m)
                        break
                    default:
                        return m.reply(Kchat)
                }
                break
            default:
                return m.reply(Kchat)
            }
        } else if (/sell|jual|/i.test(command)) {
            const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
            switch (type) { 
                       case 'banteng':
                        if (user.banteng >= count * 1) {
                            user.money += Spaus * count
                            user.banteng -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Banteng Dengan Harga ${toRupiah(Sbanteng * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Banteng Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'harimau':
                        if (user.harimau >= count * 1) {
                            user.money += Sharimau * count
                            user.harimau -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Harimau Dengan Harga ${toRupiah(Sharimau * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Harimau Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'gajah':
                        if (user.gajah >= count * 1) {
                            user.money += Sgajah * count
                            user.gajah -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Gajah Dengan Harga ${toRupiah(Sgajah * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Gajah Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'kambing':
                        if (user.kambing >= count * 1) {
                            user.money += Skambing * count
                            user.kambing -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Kambing Dengan Harga ${toRupiah(Skambing * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Kambing Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'panda':
                        if (user.panda >= count * 1) {
                            user.money += Spanda * count
                            user.panda -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Panda Dengan Harga ${toRupiah(Sbuaya * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Panda Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'buaya':
                        if (user.buaya >= count * 1) {
                            user.money += Sbuaya * count
                            user.buaya -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Buaya Dengan Harga ${toRupiah(Sbuaya * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Buaya Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'kerbau':
                        if (user.kerbau >= count * 1) {
                            user.money += Skerbau * count
                            user.kerbau -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Kerbau Dengan Harga ${toRupiah(Skerbau * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Kerbau Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'sapi':
                        if (user.sapi >= count * 1) {
                            user.money += Ssapi * count
                            user.sapi -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Sapi Dengan Harga ${toRupiah(Ssapi * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Sapi Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'monyet':
                        if (user.monyet >= count * 1) {
                            user.money += Smonyet * count
                            user.monyet -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Monyet Dengan Harga ${toRupiah(Smonyet * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Monyet Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'babi':
                        if (user.babi >= count * 1) {
                            user.money += Sbabi * count
                            user.babi -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Babi Dengan Harga ${toRupiah(Sbabi * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Babi Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'babihutan':
                        if (user.babihutan >= count * 1) {
                            user.money += Sbabihutan * count
                            user.babihutan -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Babi Hutan Dengan Harga ${toRupiah(Sbabihutan * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Babi Hutan Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'ayam':
                        if (user.ayam >= count * 1) {
                            user.money += Sayam * count
                            user.ayam -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Ayam Dengan Harga ${toRupiah(Sayam * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Ayam Kamu Tidak Cukup`.trim(), m)
                        break
                                 
                        case 'kepiting':
                        if (user.kepiting >= count * 1) {
                            user.money += Skepiting * count
                            user.kepiting -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Kepiting Dengan Harga ${toRupiah(Skepiting * count)} * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Kepiting Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'ikan':
                        if (user.ikan >= count * 1) {
                            user.money += Skepiting * count
                            user.ikan -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Ikan Dengan Harga ${toRupiah(Sikan * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Ikan Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'dory':
                        if (user.dory >= count * 1) {
                            user.money += Sdory * count
                            user.dory -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Ikan Dory Dengan Harga ${toRupiah(Sdory * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Ikan Dory Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'gurita':
                        if (user.gurita >= count * 1) {
                            user.money += Skepiting * count
                            user.gurita -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Gurita Dengan Harga ${toRupiah(Sgurita * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Gurita Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'buntal':
                        if (user.buntal >= count * 1) {
                            user.money += Sbuntal * count
                            user.buntal -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Ikan Buntal Dengan Harga ${toRupiah(Sbuntal * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Ikan Buntal Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'hiu':
                        if (user.hiu >= count * 1) {
                            user.money += Shiu * count
                            user.hiu -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Hiu Dengan Harga ${toRupiah(Shiu * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Hiu Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'orca':
                        if (user.orca >= count * 1) {
                            user.money += Sorca * count
                            user.orca -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Paus Orca Dengan Harga ${toRupiah(Sorca * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Paus Orca Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'lumba':
                        if (user.lumba >= count * 1) {
                            user.money += Skepiting * count
                            user.lumba -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Lumba Lumba Dengan Harga ${toRupiah(Slumba * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Lumba Lumba Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'paus':
                        if (user.paus >= count * 1) {
                            user.money += Spaus * count
                            user.paus -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Paus Dengan Harga ${toRupiah(Spaus * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Paus Kamu Tidak Cukup`.trim(), m)
                        break
                  case 'lobster':
                        if (user.lobster >= count * 1) {
                            user.money += Slobster * count
                            user.lobster -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Lobster Dengan Harga ${toRupiah(Slobster * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Lobster Kamu Tidak Cukup`.trim(), m)
                        break
                     case 'udang':
                        if (user.udang >= count * 1) {
                            user.money += Sudang * count
                            user.udang -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Udang Dengan Harga ${toRupiah(Sudang * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Udang Kamu Tidak Cukup`.trim(), m)
                        break
                      case 'cumi':
                        if (user.cumi >= count * 1) {
                            user.money += Scumi * count
                            user.cumi -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Cumi Dengan Harga ${toRupiah(Scumi * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Cumi Kamu Tidak Cukup`.trim(), m)
                         break
                        case 'botol':
                        if (user.botol >= count * 1) {
                            user.money += Sbotol * count
                            user.botol -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Botol Dengan Harga ${toRupiah(Sbotol * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Botol Kamu Tidak Cukup`.trim(), m)
                        break         
                        case 'kaleng':
                        if (user.kaleng >= count * 1) {
                            user.money += Skaleng * count
                            user.kaleng -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Kaleng Dengan Harga ${toRupiah(Skaleng * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Kaleng Kamu Tidak Cukup`.trim(), m)
                        break        
                        case 'kardus':
                        if (user.kardus >= count * 1) {
                            user.money += Skardus * count
                            user.kardus -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Kardus Dengan Harga ${toRupiah(Skardus * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Kardus Kamu Tidak Cukup`.trim(), m)
                        break
                         case 'gelas':
                        if (user.gelas >= count * 1) {
                            user.money += Sgelas * count
                            user.gelas -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Gelas Dengan Harga ${toRupiah(Sgelas * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Gelas Kamu Tidak Cukup`.trim(), m)
                        break
                        case 'plastik':
                        if (user.plastik >= count * 1) {
                            user.money += Splastik * count
                            user.plastik -= count * 1
                            conn.reply(m.chat, `Sukses Menjual ${toRupiah(count)} Plastik Dengan Harga ${toRupiah(Splastik * count)} Money `.trim(), m)
                        } else conn.reply(m.chat, `Plastik Kamu Tidak Cukup`.trim(), m)
                        break       
                default:
                    return m.reply(Kchat)
            }
        }
    } catch (e) {
        conn.reply(m.chat, Kchat, m)
        console.log(e)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, { text: 'shop.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*' })
            }
        }
    }
}

handler.help = ['pasar']
handler.tags = ['rpg']
handler.command = /^(pasar|jual)$/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler 


const toRupiah = number => parseInt(number).toLocaleString().replace(/,/gi, ".")
