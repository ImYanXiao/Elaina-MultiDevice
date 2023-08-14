import fetch from 'node-fetch';

let handler = async (m, { text, command, usedPrefix }) => {
    if (!text) throw `Contoh:\n${usedPrefix + command} stikerinbot`;
    try {
        let res = await fetch(global.API('https://api.github.com', '/search/repositories', {
            q: text
        }));
        if (!res.ok) throw 'Eror';
        let json = await res.json();

        let repoDetails = json.items.map((repo, index) => {
            return `
            >      「 ${1 + index} 」       <
            ɴᴀᴍᴇ ʀᴇᴘᴏ : ${repo.name}
            ʙʏ : ${repo.owner.login}
            ғᴏʀᴋᴇᴅ : ${repo.fork ? 'True' : 'False'}
            ᴘʀɪᴠᴀᴛᴇ : ${repo.private ? 'True' : 'False'}

            ➔ ᴄʀᴇᴀᴛᴇᴅ ᴏɴ : ${formatDate(repo.created_at)}
            ➔ ʟᴀsᴛ ᴜᴘᴅᴀᴛᴇ ᴏɴ : ${formatDate(repo.updated_at)}
            👁  ${repo.watchers}   🍴  ${repo.forks}   ⭐  ${repo.stargazers_count}
            ❗ ɪssᴜᴇ : ${repo.open_issues}${repo.description ? `\n📚 ᴅᴇsᴄʀɪᴘᴛɪᴏɴ:\n${repo.description}` : ''}
            
            ⑂ ᴄʟᴏɴᴇ :
            $ git clone ${repo.clone_url}
            `.trim();
        }).join('\n— — — — — — — — — — — — — —\n');

        let replyText = `*${htki} ɢɪᴛʜᴜʙ sᴇᴀʀᴄʜ ${htka}*\n${repoDetails}`;
        conn.reply(m.chat, replyText, m);

    } catch (error) {
        console.error(error);
    }
};

handler.help = ['githubsearch'].map(v => v + ' <pencarian>');
handler.tags = ['internet', 'downloader'];
handler.command = /^g(ithub|h)s(earch)?$/i;

export default handler;

function formatDate(n, locale = 'id') {
    let d = new Date(n);
    return d.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
}
