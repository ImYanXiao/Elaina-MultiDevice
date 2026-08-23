let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        if (!args[0]) return m.reply(`Masukan username tiktok \n\nContoh: \n${usedPrefix + command} undefined9364`)
        await global.loading(m, conn)
        args = args[0].startsWith('@') ? args[0].replace('@', '') : args[0]
        let res = await global.fetch(API('lol', '/api/stalktiktok/' + args, false, 'apikey'))
        let { result } = await res.json()
        let caption = `
❃ Nickname: ${result.nickname}
❃ Username: ${result.username}
❃ Followers: ${result.followers}
❃ Following: ${result.followings}
❃ Likes: ${result.likes}
❃ Upload: ${result.video}

❃ Bio: ${result.bio}
`.trim()
        await conn.sendFile(m.chat, result.user_picture, '', caption, m)
    } catch {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['tiktokstalk']
handler.tags = ['tools']
handler.command = /^((tt|tiktok)stalk|stalk(tt|tiktok))$/i
handler.limit = true
export default handler