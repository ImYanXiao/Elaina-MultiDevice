import fetch from 'node-fetch'
import axios from 'axios'
import cheerio from 'cheerio'

async function igstalk(Username) {
  return new Promise((resolve, reject) => {
    axios.get('https://dumpor.com/v/'+Username, {
      headers: {
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
      }
    }).then(res => {
      const $ = cheerio.load(res.data)
      const result = {
        profile: $('#user-page > div.user > div.row > div > div.user__img').attr('style').replace(/(background-image: url\(\'|\'\);)/gi, ''),
        fullname: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > a > h1').text(),
        username: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > h4').text(),
        post: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(1)').text().replace(' Posts',''),
        followers: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(2)').text().replace(' Followers',''),
        following: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(3)').text().replace(' Following',''),
        bio: $('#user-page > div.user > div > div.col-md-5.my-3 > div').text()
      }
      resolve(result)
    }).catch(e => {
      if (e.response?.status === 404) {
        reject('Error: Akun tidak ditemukan')
      } else if (e.response?.status === 403) {
        reject('Error: Akunnya Di Private')
      } else {
        reject('Error: Failed to fetch Instagram profile')
      }
    })
  })
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Example use ${usedPrefix}${command} username`
  let res = await igstalk(args[0]) 
  
  let username = res.username
  let fullname = res.fullname
  let post = res.post
  let followe = res.followers
  let followi = res.following
  let bio = res.bio
  let pepe = res.profile

let data = `
💌 ᴜsᴇʀɴᴀᴍᴇ » 「 ${username} 」
📧 ғᴜʟʟɴᴀᴍᴇ » 「 ${fullname} 」
🎏 ${followe}  ғᴏʟʟᴏᴡᴇʀs
🎀 ${followi}  ғᴏʟʟᴏᴡɪɴɢ
📝 ᴘᴏsᴛ ${post} 
📑 Bɪᴏ: ${bio}
`.trim();

if (pepe) {
  let pp = await (await fetch(pepe)).buffer();
  conn.sendFile(m.chat, pp, 'profile.jpg', data, m);
} else {
  conn.reply(m.chat, data, m);
}

handler.help = ['igstalk'].map(v => v + ' <username>')
handler.tags = ['internet']

handler.command = /^(igstalk)$/i

export default handler
