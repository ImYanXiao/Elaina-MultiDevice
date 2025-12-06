import axios from 'axios'
var handler = async(m, { conn, text }) => {

  if (!text) return conn.reply(m.chat, 'Harap Masukan Username', m)

  await m.reply('Searching...')
  let request = await githubstalk(text) 
    let { username, following, followers, type, bio, company, blog, location, email, public_repo, public_gists, profile_pic, created_at, updated_at, html_url, name } = request
    let thumb = await getBuffer(profile_pic)
    let hasil = `*── 「 GITHUB STALK 」 ──*\n
➸ *Username*: ${username} (${name})
➸ *LINK*: ${html_url}
➸ *Link Gists:* https://gist.github.com/${username}/
➸ *Bio*: ${bio}
➸ *Perusahaan*: ${company}
➸ *Email:* ${email}
➸ *Blog:* ${blog}
➸ *Repo Publik:* ${public_repo}
➸ *Gists Publik:* ${public_gists}
➸ *Follower:* ${followers}
➸ *Following:* ${following}
➸ *Lokasi:* ${location}
➸ *Type:* ${type}
➸ *Akun Dibuat sejak:* ${created_at}
➸ *Akun Diupdate sejak:* ${updated_at}
`

    conn.sendFile(m.chat, thumb, 'githubstalk.jpg', hasil, m)
}
handler.help = ['githubstalk'].map(v => v + ' <query>')
handler.tags = ['internet']
handler.command = /^(githubstalk)$/i

export default handler

async function githubstalk(user) {
    return new Promise((resolve, reject) => {
        axios.get('https://api.github.com/users/'+user)
        .then(({ data }) => {
            let hasil = {
                username: data.login,
                name: data.name,
                bio: data.bio,
                id: data.id,
                nodeId: data.node_id,
                profile_pic: data.avatar_url,
                html_url: data.html_url,
                type: data.type,
                admin: data.site_admin,
                company: data.company,
                blog: data.blog,
                location: data.location,
                email: data.email,
                public_repo: data.public_repos,
                public_gists: data.public_gists,
                followers: data.followers,
                following: data.following,
                created_at: data.created_at,
                updated_at: data.updated_at
            }
            resolve(hasil)
        })
    })
}
