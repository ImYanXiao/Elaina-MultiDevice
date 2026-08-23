import { Aki } from 'aki-api'
import fs from 'fs'
let handler = async (m, { conn, usedPrefix, command, args, isPrems }) => {
    conn.akinator = conn.akinator ? conn.akinator : {}
    let room = conn.akinator
    switch (args[0]) {
        case 'end':
            if (!(m.sender in room)) return m.reply('Anda tidak sedang dalam sesi Akinator')
            delete conn.akinator[m.sender]
            m.reply('Berhasil keluar dari sesi Akinator.')
            break
        case 'start':
            if (m.sender in room) return conn.reply(m.chat, 'Anda masih berada dalam sesi Akinator', m)
            room[m.sender] = new Aki({ region: 'id' })
            await room[m.sender].start()
            let { question } = room[m.sender]
            let txt = `🎮 *Akinator* 🎮\n\n@${m.sender.split('@')[0]}\n${question}\n\n`
            txt += '🎮 _*Silahkan Jawab Dengan Cara:*_\n'
            txt += `_*Ya* - ${usedPrefix}answer 0_\n`
            txt += `_*Tidak* - ${usedPrefix}answer 1_\n`
            txt += `_*Saya Tidak Tahu* - ${usedPrefix}answer 2_\n`
            txt += `_*Mungkin* - ${usedPrefix}answer 3_\n`
            txt += `_*Mungkin Tidak* - ${usedPrefix}answer 4_\n\n`
            txt += `*${usedPrefix + command} end* untuk keluar dari sesi Akinator`
            room[m.sender].chat = await conn.reply(m.chat, txt, m, { mentions: [m.sender] })
            room[m.sender].waktu = setTimeout(() => {
                conn.reply(m.chat, `Waktu Memilih Akinator Habis`, room[m.sender].chat)
                delete conn.akinator[m.sender]
            }, 60000)
            break
        default:
            let cap = 'Akinator adalah sebuah permainan dan aplikasi perangkat bergerak yang berupaya menebak secara rinci dan pasti isi pikiran pengguna permainan ini melalui serentetan pertanyaan.\n\n'
            cap += '🎮 _*Cara Bermain:*_\n'
            cap += `${usedPrefix + command} start ~ Untuk Memulai Permainan\n`
            cap += `${usedPrefix + command} end ~ Untuk Menghapus Sesi Permainan\n`
            cap += `${usedPrefix}answer ~ Untuk Menjawab Pertanyaan`
            return conn.adReply(m.chat, cap, m.sender in room ? 'Kamu Masih Berada Didalam Sesi Akinator': '', '', fs.readFileSync('./media/akinator.jpg'), '', m)
    }
}
handler.help = ['akinator']
handler.tags = ['game']
handler.command = /^(akinator)$/i
handler.limit = true
handler.onlyprem = true
handler.game = true
export default handler