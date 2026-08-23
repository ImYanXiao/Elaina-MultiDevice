import { areJidsSameUser } from '@rexxhayanasi/elaina-baileys'
import { resolveJid } from '../../lib/resolvejid.js'

let handler = async (m, { conn, isOwner, isAdmin, command }) => {
    if (!m.isGroup)
        return dfail('group', m, conn)

    if (!(isOwner || isAdmin))
        return dfail('admin', m, conn)

    let jid = await resolveJid(conn, m)
    if (!jid)
        return m.reply('Tag anggota yang ingin diproses.')

    if (areJidsSameUser(jid, conn.user.id))
        return m.reply('Aku tidak bisa mengubah jabatanku sendiri.')

    let metadata = await conn.groupMetadataPn(m.chat)
    let target = metadata.participants.find(p =>
        areJidsSameUser(p.jid, jid)
    )

    if (!target)
        return m.reply('Anggota tidak ditemukan di grup ini.')

    let action
    let text

    if (command === 'promote') {
        if (target.admin)
            return m.reply('Dia sudah menjadi admin.')

        action = 'promote'
        text = `@${jid.split('@')[0]} sekarang adalah Admin.`
    }

    if (command === 'demote') {
        if (!target.admin)
            return m.reply('Dia memang bukan admin.')

        action = 'demote'
        text = `@${jid.split('@')[0]} bukan admin lagi.`
    }

    await conn.groupParticipantsUpdate(m.chat, [jid], action)
    await m.reply(text, { mentions: [jid] })
}

handler.help = ['promote @tag', 'demote @tag']
handler.tags = ['group']
handler.command = /^(promote|demote)$/i

handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler