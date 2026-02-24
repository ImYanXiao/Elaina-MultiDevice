import axios from 'axios'

let handler = async(m, { conn, text, usedPrefix }) => {

    if (!text) return conn.reply(m.chat, 'Contoh penggunaan: ' + usedPrefix + 'chord hanya rindu', m)
    axios.get(`https://docs-jojo.herokuapp.com/api/chord?q=` + text)
        .then((res) => {
          let hasil = `*• Chord Lagu ${text} :*\n${res.data.result}`
            conn.reply(m.chat, hasil, m)
        })
        .catch(_ => m.reply('Chord Lagu Tidak Ditemukan!'))
}
handler.help = ['chord <judul lagu>']
handler.tags = ['tools']
handler.command = /^(chord)$/i
handler.limit = true

export default handler 
