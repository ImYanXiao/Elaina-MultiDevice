let handler = m => m

handler.before = async function (m) {
    let user = global.db.data.users[m.sender]                              
    if (new Date() - user.premiumTime > 0) {
            user.premiumTime = 0
            user.premium = false
        }
    }

export default handler
