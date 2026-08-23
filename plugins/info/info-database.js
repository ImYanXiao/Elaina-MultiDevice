let handler = async (m) => {
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let untotalreg = Object.values(global.db.data.users).filter(user => user.registered == false).length
    m.reply(`List Jumlah User:\nRegister: ${rtotalreg}\nUnRegister: ${untotalreg}\nTotalUser: ${totalreg}`)
}
handler.help = ['database']
handler.tags = ['info']
handler.command = /^(database|jumlahdatabase|user)$/i

export default handler
