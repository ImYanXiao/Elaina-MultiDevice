import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
    try {
        await global.loading(m, conn)
        let ne = await (await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt')).text()
        let nek = ne.split('\n')
        let neko = pickRandom(nek)
        conn.sendFile(m.chat, neko, false, 'Nih Neko nya 🐾💗', m, false)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['neko']
handler.tags = ['anime']
handler.command = /^(neko)$/i
handler.limit = true
export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}