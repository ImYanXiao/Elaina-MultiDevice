export async function all(m) {
    let user = global.db.data.users
    let chat = global.db.data.chats

    let dataUser = Object.keys(user).filter(v => new Date() - user[v].bannedTime > 0 && user[v].bannedTime != 17 && user[v].banned)
    if (dataUser.length > 0) {
        for (var i = 0; i < dataUser.length; i++) {
            user[dataUser[i]].banned = false
            user[dataUser[i]].bannedTime = 0
        }
    }

    let dataChat = Object.keys(chat).filter(v => new Date() - chat[v].isBannedTime > 0 && chat[v].isBannedTime != 17 && chat[v].isBanned)
    if (dataChat.length > 0) {
        chat[dataChat[i]].isBanned = false
        chat[dataChat[i]].isBannedTime = 0
    }
}