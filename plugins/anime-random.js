/* DATABASE : KAZUKO & NEVT & REY
Follow Github Mereka
1) Kazuko: https://github.com/kazuko
2) Nevt: https://github.com/NevtBotz
3) Rey: https://github.com/inirey
*/
import fetch from 'node-fetch'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (command == 'akira') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/akira.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'akiyama') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/akiyama.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'anna') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/ana.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'asuna') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/asuna.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'ayuzawa') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/ayuzawa.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'boruto') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/boruto.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'chitanda') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/chitanda.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'chitoge') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/chitoge.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'deidara') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/deidara.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'doraemon') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/doraemon.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'elaina') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/elaina.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'emilia') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/emilia.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'asuna') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/asuna.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'erza') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/erza.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'gremory') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/gremory.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'hestia') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/hestia.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'hinata') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/hinata.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'inori') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/inori.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'isuzu') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/isuzu.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'itachi') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/itachi.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'itori') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/itori.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'kaga') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/kaga.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'kagura') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/kagura.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'kakasih') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/kakasih.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'kaori') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/kaori.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'kaneki') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/kaneki.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'kosaki') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/kosaki.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'kotori') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/kotori.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'kuriyama') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/kuriyama.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'kuroha') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/kuroha.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'kurumi') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/kurumi.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'loli') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/loli.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'madara') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/madara.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'mikasa') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/mikasa.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'miku') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/miku.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'minato') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/minato.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'naruto') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/naruto.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'natsukawa') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/natsukawa.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'neko2') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/neko.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'nekohime') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/nekohime.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'nezuko') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/nezuko.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'nishimiya') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/nishimiya.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'onepiece') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/onepiece.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'pokemon') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/pokemon.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'rem') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/rem.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'rize') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/rize.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'sagiri') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/sagiri.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'sakura') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/sakura.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'sasuke') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/sasuke.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'shina') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/shina.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'shinka') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/shinka.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'shizuka') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/shizuka.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'shota') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/shota.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'tomori') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/tomori.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'toukachan') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/toukachan.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'tsunade') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/tsunade.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'yatogami') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/yatogami.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
if (command == 'yuki') {
let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/yuki.json`)).json()
let cita = res[Math.floor(Math.random() * res.length)]
await conn.sendButtonImg(m.chat, cita, `Nihh ${command} nya @${m.sender.split('@')[0]}`, wm, `Next`, `${usedPrefix}${command}`, m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
}
handler.command = handler.help = [
'akira', 
'akiyama', 
'anna', 
'asuna', 
'ayuzawa', 
'boruto', 
'chitanda', 
'chitoge', 
'deidara', 
'doraemon', 
'elaina', 
'emilia', 
'asuna', 
'erza', 
'gremory', 
'hestia', 
'hinata', 
'inori', 
'itachi', 
'isuzu', 
'itori', 
'kaga', 
'kagura', 
'kakasih', 
'kaori', 
'kaneki', 
'kosaki', 
'kotori', 
'kuriyama', 
'kuroha', 
'kurumi', 
'madara', 
'mikasa', 
'miku', 
'minato', 
'naruto', 
'natsukawa', 
'neko2', 
'nekohime', 
'nezuko', 
'nishimiya', 
'onepiece', 
'pokemon',
'rem', 
'rize',
'sagiri',
'sakura', 
'sasuke',
'shina',
'shinka',
'shizuka',
'shota',
'tomori',
'toukachan',
'tsunade',
'yatogami',
'yuki'
]
handler.tags = ['anime']

export default handler
