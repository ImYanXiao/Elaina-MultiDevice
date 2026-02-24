var handler = async (m) => {
    let res = await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt')
    let txt = await res.text()
    let arr = txt.split('\n')
    let cita = arr[Math.floor(Math.random() * arr.length)]
    let thumb = await(await fetch(cita)).buffer()

let tqto = `*▸ - - - —「 BIG THANKS TO 」— - - - ◂*
*❉ Adiwajshing:*
https://github.com/adiwajshing
*❉ Nurutomo:*
https://github.com/Nurutomo
*❉ Istikmal:* 
https://github.com/BochilGaming
*❉ Ariffb:*
https://github.com/Ariffb25
*❉ Ilman:*
https://github.com/ilmanhdyt
*❉ Amirul:*
https://github.com/amiruldev20
*❉ Rasel:*
https://github.com/raselcomel
*❉ Fatur:*
https://github.com/Ftwrr
*❉ Rominaru:*
https://github.com/Rominaru
*❉ Kannachann:*
https://github.com/Kannachann
*❉ The.sad.boy01:*
https://github.com/kangsad01
*❉ Ameliascrf:*
https://github.com/Ameliascrf
*❉ Fokus ID:*
https://github.com/Fokusdotid
*❉ Johannes:*
https://github.com/Johannes2803
*❉ BrunoSobrino:*
https://github.com/BrunoSobrino
*❉ Krisna:*
https://github.com/NevtBotz
*❉ LitRHap:*
https://github.com/LitRHap
*❉ Rlxfly:*
https://github.com/Rlxfly
*❉ Aine:*
https://github.com/Aiinne
*❉ Papah-Chan:*
https://github.com/FahriAdison
*▸ - - - —「 Penulis Ulang ✏️」— - - - ◂*
*❉ ImYanXiao:*
https://github.com/ImYanXiao
*▸ - - - —「 Special Thanks 🙏」— - - - ◂*
*❉ Kangsad01:*
*❉ Papah-Chan:*
*❉ Johannes:*
*❉ Krisna:*
*❉ Rlxfly:*

`
conn.createThumbnail(m.chat, tqto, m, { ads: false, 
     large: true,
         thumbnail: await getBuffer(global.img), 
                url:social}) 
}
handler.help = ['tqto']
handler.tags = ['main','info']
handler.command = /^(credits|credit|thanks|thanksto|tqto)$/i
export default handler