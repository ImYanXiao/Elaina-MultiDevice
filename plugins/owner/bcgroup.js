let handler = async (m, { conn, isROwner, text }) => {
    const delay = time => new Promise(res => setTimeout(res, time))
    let getGroups = await conn.groupFetchAllParticipating()
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
    let anu = groups.map(v => v.id)
    var pesan = m.quoted && m.quoted.text ? m.quoted.text : text
    if(!pesan) throw 'teksnya?'
    m.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai ${anu.length * 0.5 } detik`)
    for (let i of anu) {
    await delay(500)
    conn.relayMessage(i, {
extendedTextMessage:{
                text: pesan, 
                contextInfo: {
                     externalAdReply: {
                        title: wm,
                        body: 'ʙʀᴏᴀᴅᴄᴀsᴛɢʀᴏᴜᴘs', 
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: 'https://files.catbox.moe/bj5gk1.jpg',
                        sourceUrl: 'uncooming web Elaina - MultiDevice', 
                        showAdAttribution: true
                    }
                }, mentions: [m.sender]
}}, {}).catch(_ => _)
    }
  m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
handler.help = ['bcgcbot <teks>']
handler.tags = ['owner']
handler.command = /^(broadcastgroup|brosdcastgroupbot|bcgc|bcgcbot)$/i
handler.owner = true
export default handler