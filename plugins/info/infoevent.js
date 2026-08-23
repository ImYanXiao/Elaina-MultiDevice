import fs from 'fs'

let handler = async (m, { conn }) => {
	let tqto = `⛩️ Next Event :
Wm: Angkringan Event ✨

Grand Japan - Cosplay & Anime Fest 2025*
🗓️𖦹˙ 4-5 January 2025
📍𖦹˙ Grand Metropolitan Mall, Bekasi

*ANIMETOKU CONVENTION 2025*
🗓️𖦹˙ 10-19 January 2025
📍𖦹˙ MOI, Mall Of Indonesia

*Revo Japan Pop Festival 2025*
🗓️𖦹˙ 11-12 January 2025
📍𖦹˙ Revo Mall, Bekasi

*DST*

	
*INFO EVENT LENGKAP SILAHKAN CEK DI WEBSITE RESMI*
_https://archavecommunity.biz.id/eventlist_

*Ayo ajak teman teman kamu bergabung bersama kami dan menjadi bagian dari Archavelian ✨💙*

`;
	await conn.sendMessage(m.chat, { image: { url: 'https://files.catbox.moe/5m62hk.jpg' }, caption: tqto }, m)
	await conn.sendFile(m.chat, './vn/rexxh.mp3', '', null, m, true)
}
handler.help = ['infoevent']
handler.tags = ['info']
handler.command = /^(infoevent)$/i;

export default handler;