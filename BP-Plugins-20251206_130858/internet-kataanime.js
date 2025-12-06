import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  try {
    let res = await (await fetch('https://katanime.vercel.app/api/getrandom'))
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.result) throw json
    let data = ""
    for (let i = 0; i < json.result.length; i++) {
      let { id, english, indo, character, anime } = json.result[i]
      data += `English: ${english}\n*Indo: ${indo}*\nCharacter: ${character} (${anime})\n\n`
    }
    m.reply(data)
  } catch (e) {
    console.log(e)
    m.reply('Maaf, gagal mengambil data')
  }
}

handler.help = ['katanime']
handler.tags = ['internet']
handler.command = /^(katanime|kataanime)$/i

export default handler
