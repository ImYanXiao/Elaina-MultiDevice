const handler = async (m, { args }) => {
    const user = args[0]
    if (!user) return m.reply('Masukkan username GitHub.')
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(user)}`, {
        headers: {
            accept: 'application/vnd.github+json',
            'user-agent': 'Elaina-Bot'
        }
    })
    if (!response.ok) {
        if (response.status === 404) return m.reply('User GitHub tidak ditemukan.')
        throw new Error(`GitHub API error: ${response.status}`)
    }
    const u = await response.json()
    const txt = `
🐱 *GitHub Stalk*

👤 ${u.login}
📝 ${u.name || '-'}
📍 ${u.location || '-'}
📦 Public Repos: ${u.public_repos}
👥 Followers: ${u.followers}
    `.trim()
    return m.reply(txt)
}

handler.command = /^ghstalk$/i
export default handler
