let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Format salah!\n\nTambah money: addmoney <tag orang> <jumlah money>\nKurangi money: removemoney <tag orang> <jumlah money>'
    
                                                                              
    let [who, moneyValue] = text.split(' ')
    if (!who) throw 'Tag orang yang akan diubah moneynya!'
    if (isNaN(moneyValue)) throw 'Jumlah money harus angka!'

                                        
    moneyValue = parseInt(moneyValue)

    let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let users = global.db.data.users

                                                                                   
    if (!users[user]) users[user] = { money: 0 }

                                                                      
    if (command === 'addmoney') {
                                                           
        users[user].money += moneyValue
        conn.reply(m.chat, `Berhasil menambahkan ${moneyValue} money untuk @${user.split('@')[0]}!`, m)
    } else if (command === 'removemoney') {
        if (moneyValue > users[user].money) {
                                                                                                        
            users[user].money = 0
            conn.reply(m.chat, `Berhasil mengurangi money untuk @${user.split('@')[0]}. Money kini menjadi 0!`, m)
        } else {
                                                                   
            users[user].money -= moneyValue
            conn.reply(m.chat, `Berhasil mengurangi ${moneyValue} money untuk @${user.split('@')[0]}!`, m)
        }
    }
}

handler.help = ['addmoney', 'remmoney']
handler.tags = ['owner']
handler.command = /^(add|rem)money$/i
handler.rowner = true
handler.owner = true

export default handler
