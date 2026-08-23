import axios from 'axios'

let handler = async (m, { conn }) => {
  try {
    const { data } = await axios.get('https://api.ipify.org')
    conn.reply(m.chat, `IP kamu adalah ${data}`, m)
  } catch (e) {
    conn.reply(m.chat, 'Terjadi kesalahan saat memproses permintaan.', m)
    console.log(e)
  }
}

handler.help = ['myip']
handler.tags = ['owner']
handler.command = /^myip$/i
handler.owner = true;
handler.register = true
handler.limit = true

export default handler