let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    if (!user.tiktok?.username) return m.reply('Kamu belum memiliki profil TikTok. Buat terlebih dahulu dengan perintah *!createtiktok*')

                              
    const formatNumber = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    try {
                                                                              
        const pp = await conn.profilePictureUrl(m.sender, 'image').catch(() => './src/avatar_contact.png')
        
                         
        const caption = `
╭───〔 📱 TIKTOK PROFILE 〕───⭓
│• 👤 Username: ${user.tiktok.username || '-'}
│• 🎂 Tanggal Lahir: ${user.tiktok.birthdate || '-'}
│• ⭐ Followers: ${formatNumber(user.follower || 0)}
│• 🎥 Konten: ${formatNumber(user.konten || 0)}
│• 💰 Uang: Rp ${formatNumber(user.money)}
│• ⏱️ Terakhir Upload: ${user.lasttiktokkonten ? new Date(user.lasttiktokkonten).toLocaleString('id-ID') : 'Belum pernah'}
╰─────────────────────⭓

Terus buat konten untuk menambah followers dan uang!
`.trim()

                                    
        await conn.sendMessage(m.chat, {
            image: { url: pp },
            caption: caption
        }, { quoted: m })

    } catch (e) {
        console.error(e)
                                          
        await conn.reply(m.chat, caption, m)
    }
}

handler.command = /^profiletiktok$/i
handler.help = ['profiletiktok']
handler.tags = ['rpg']
handler.register = true
handler.group = true
handler.rpg = true
export default handler
