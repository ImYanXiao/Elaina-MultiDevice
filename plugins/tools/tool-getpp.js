import fs from "fs"

let handler = async (m, { conn, args }) => {
    try {
        await global.loading(m, conn)

        let who
        if (m.isGroup) {
            if (m.mentionedJid && m.mentionedJid[0]) {
                who = m.mentionedJid[0]
            } else if (args[0]) {
                let nomor = args[0].replace(/[^0-9]/g, '')                   
                who = nomor.includes('@s.whatsapp.net') ? nomor : nomor + '@s.whatsapp.net'
            } else {
                who = m.sender
            }
        } else {
            who = m.sender
        }

        let pp
        try {
            pp = await conn.profilePictureUrl(who, 'image')
        } catch (e) {
            pp = fs.readFileSync('./src/avatar_contact.png')                              
        }

        await conn.sendFile(
            m.chat,
            pp,
            'profile.jpg',
            `@${who.split('@')[0]}`,
            m,
            null,
            { mentions: [who] }
        )

    } catch (e) {
        console.error(e)
        m.reply("❌ Tidak dapat mengambil foto profil.")
    } finally {
        await global.loading(m, conn, true)
    }
}

handler.help = ['getpp', 'getprofile']
handler.tags = ['tools']
handler.command = /^(get(pp|profile))$/i

handler.group = true
handler.limit = true

export default handler
