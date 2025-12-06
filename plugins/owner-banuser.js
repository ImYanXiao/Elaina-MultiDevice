import { areJidsSameUser } from '@rexxhayanasi/elaina-bail'

let handler = async (m, { conn, isOwner, isAdmin, args }) => {
  // Hanya Owner (lebih aman). Ubah ke (isOwner || isAdmin) jika mau admin juga.
  if (!isOwner) return m.reply('Command ini hanya dapat digunakan oleh *Owner* !!')

  if (!args.length && !m.mentionedJid && !m.quoted)
    return m.reply('Tolong sebutkan user/nomor yang ingin dibanned.\nContoh: #ban 62812xxxxx 3')

  // Ambil durasi (hari) dari argumen terakhir jika angka
  let days = 0
  if (args.length) {
    const last = args[args.length - 1]
    if (/^\d+$/.test(last)) {
      days = parseInt(last)
      args.pop()
    }
  }

  // Helper normalisasi JID (mengikuti handler.js)
  const nz = global.normalizeJid
    ? (v) => global.normalizeJid(v)
    : (v) => {
        if (!v) return ''
        v = String(v).trim()
        if (/@(s\.whatsapp\.net|lid\.whatsapp\.net|g\.us)$/.test(v)) return v
        if (/^\d{5,}$/.test(v)) return v + '@s.whatsapp.net'
        return ''
      }

  const groupMetadata = m.isGroup ? (conn.chats[m.chat]?.metadata || await conn.groupMetadata(m.chat).catch(() => null)) : null
  const resolveFromParticipants = (key) => {
    if (!groupMetadata) return key
    // Cari peserta berdasarkan id/lid/jid lalu pakai .jid yang “real”
    const p = groupMetadata.participants?.find(
      x => x.id === key || x.lid === key || x.jid === key
    )
    return p?.jid || key
  }

  let targets = []

  // Dari tag
  if (m.mentionedJid?.length) targets.push(...m.mentionedJid)

  // Dari quoted
  if (m.quoted?.sender) targets.push(m.quoted.sender)

  // Dari args: dukung "lid:12345", angka polos, JID penuh
  for (const a of args) {
    if (/^lid:\d+$/.test(a)) {
      // ubah ke bentuk akun LID WA
      const lidKey = a.replace(/^lid:/, '') + '@lid.whatsapp.net'
      targets.push(lidKey)
      continue
    }

    // normalizeJid versi handler.js paham angka & JID
    const j = nz(a)
    if (j) targets.push(j)
  }

  // Bersihkan & hindari memban bot sendiri
  targets = [...new Set(targets)]
    .map(j => resolveFromParticipants(j))
    .filter(j => j && !areJidsSameUser(j, conn.user?.jid || conn.user?.id))

  if (!targets.length) return m.reply('Tidak ada ID pengguna yang valid.')

  // Pastikan db path sesuai handler.js
  if (!global.db.data) global.db.data = {}
  if (!global.db.data.users) global.db.data.users = {}

  const now = Date.now()
  const until = days > 0 ? (now + days * 24 * 60 * 60 * 1000) : 0 // 0 = permanen

  for (const jid of targets) {
    if (!global.db.data.users[jid]) global.db.data.users[jid] = {}
    const user = global.db.data.users[jid]
    user.banned = true
    user.bannedTime = until
  }

  await m.reply(
    `✅ Sukses banned ${targets.map(u => '@' + u.split('@')[0]).join(', ')}${days ? ` selama ${days} hari` : ' permanen'}`,
    false,
    { mentions: targets }
  )
}

handler.help = ['ban', 'banuser']
handler.tags = ['owner']
handler.command = /^(ban|banuser)$/i
handler.rowner = true

export default handler