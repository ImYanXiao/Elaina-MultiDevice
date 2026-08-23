let handler = async (m, { conn, usedPrefix, command, text }) => {
    let user = global.db.data.users
    let sender = m.sender
    let pacar = user[sender].tembak

                                                  
    if (user[sender].ditembak) {
        return m.reply("Kamu sedang dalam proses menembak seseorang. Harap tunggu hingga keputusan diambil.")
    }

                                                  
    if (pacar === "") {
        return m.reply("Saat ini tidak ada yang menembak kamu.")
    }

                                                          
    if (pacar === sender) {
        return m.reply(`Kamu tidak bisa menjawab permintaanmu sendiri.`)
    }

                                      
    if (!user[sender].ditembak) {
        return m.reply("Permintaan tidak valid atau telah dibatalkan sebelumnya.")
    }

                                              
    user[sender].tembak = ""
    user[pacar].tembak = ""
    user[pacar].ditembak = false

                                
    await m.reply(`Terima kasih @${pacar.split("@")[0]} atas niat baikmu. Saat ini, aku merasa belum siap untuk melanjutkan. Semoga kamu menemukan seseorang yang tepat. Semangat selalu!`, false, { mentions: [pacar] })
}

handler.help = ["ikhlas"]
handler.tags = ["fun"]
handler.command = /^(ikhlas)$/i
export default handler

const delay = time => new Promise(res => setTimeout(res, time))
