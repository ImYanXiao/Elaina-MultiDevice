import fetch from 'node-fetch'
let handler = async(m, { conn }) => {
    try {
        await global.loading(m, conn)
        let res = await(await fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json')).json()
        let data = res.Infogempa.gempa
        let teks = `乂 *Info Gempa*

❃ *Waktu:* ${data.DateTime}
❃ *Coordinates:* ${data.Coordinates}
❃ *Magnitude:* ${data.Magnitude}
❃ *Kedalaman:* ${data.Kedalaman}
❃ *Wilayah:* ${data.Wilayah}
❃ *Potensi:* ${data.Potensi}
        `.trim()
        conn.sendFile(m.chat, 'https://data.bmkg.go.id/DataMKG/TEWS/' + data.Shakemap, 'map.jpg', teks.trim(), m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['infogempa']
handler.tags = ['internet']
handler.command = /^(infogempa)$/i
handler.limit = true
export default handler