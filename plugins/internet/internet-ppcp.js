import fetch from "node-fetch"
let handler = async (m, { conn }) => {
    try {
        await global.loading(m, conn)
        let data = await (await fetch('https://raw.githubusercontent.com/KazukoGans/database/main/anime/ppcouple.json')).json()
        let cita = data[Math.floor(Math.random() * data.length)]

        let cowi = await(await fetch(cita.cowo)).buffer()
        await conn.sendFile(m.chat, cowi, '', '♂️', m)
        let ciwi = await(await fetch(cita.cewe)).buffer()
        await conn.sendFile(m.chat, ciwi, '', '♀️', m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['ppcouple']
handler.tags = ['internet']
handler.command = /^(pp(cp|couple))$/i
handler.limit = true

export default handler