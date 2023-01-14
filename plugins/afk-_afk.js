export function before(m) {
    var user = global.db.data.users[m.sender]
    var name = await conn.getName(m.sender) 
    if (user.afk > -1) {
        conn.sendButtonDoc(m.chat,`
  Kamu berhenti AFK${user.afkReason ? ' setelah ' + user.afkReason : ''}
  Selama ${(new Date - user.afk).toTimeString()}
  `,wm, name, 'Hai Kak','Ya',m,fakeig)
        user.afk = -1
        user.afkReason = ''
    }
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
        let user = global.db.data.users[jid]
        if (!user)
            continue
        let afkTime = user.afk
        if (!afkTime || afkTime < 0)
            continue
        let reason = user.afkReason || ''
        conn.sendButtonDoc(m.chat,`
  Jangan tag dia!
  Dia sedang AFK ${reason ? 'dengan alasan ' + reason : 'tanpa alasan'}
  Selama ${(new Date - afkTime).toTimeString()}
  `,wm, name, 'Maaf Kak','Ya',m,fakeig)
    }
    return true
}
