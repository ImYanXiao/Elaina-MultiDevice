import fetch from 'node-fetch'
let handler = async (m, { text, command, usedPrefix }) => {
    if (!text) return m.reply(`Masukan query! \n\nContoh:\n${usedPrefix + command} stikerinbot`)
    let res = await fetch(API('https://api.github.com', '/search/repositories', { q: text } ))
    let json = await res.json()
    let str = json.items.map((repo, index) => {
        return `>      「 ${ 1 + index } 」       <
Repo Name : ${repo.name}
By : ${repo.owner.login}
Forked : ${repo.fork ? 'True' : 'False'}
Private : ${repo.private ? 'True': 'False'}

➔ Create On : ${formatDate(repo.created_at)}
➔ Last Update On : ${formatDate(repo.updated_at)}
👁  ${repo.watchers}   🍴  ${repo.forks}   ⭐  ${repo.stargazers_count}
❗ Issue : ${repo.open_issues} ${repo.description ? `
📚 Description :
${repo.description}` : ''}

⑂ Clone :
$ git clone ${repo.clone_url}
`.trim()
    }).join('\n— — — — — — — — — — — — — —\n')
    conn.reply(m.chat, str, m)
}
handler.help = ['githubsearch']
handler.tags = ['search']
handler.command = /^g(ithub|h)s(earch)?$/i
handler.limit = true

export default handler

function formatDate(n, locale = 'id') {
    let d = new Date(n)
    return d.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })
}