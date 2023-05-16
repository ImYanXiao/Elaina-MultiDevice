import fetch from 'node-fetch';
import axios from 'axios';
import cheerio from 'cheerio';

async function igstalk(Username) {
  try {
    const trResponse = await axios.get(`https://tr.deployers.repl.co/igstalk?user=${Username}`);
    if (trResponse.status === 200) {
      return trResponse.data;
    } else {
      throw new Error('Failed to fetch Instagram profile');
    }
  } catch (error) {
    try {
      const dumpoirResponse = await axios.get(`https://dumpoir.com/v/${Username}`, {
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0'
        }
      });

      const $ = cheerio.load(dumpoirResponse.data);
      const result = {
        bio: $('#user-page > div.user > div > div.col-md-5.my-3 > div').text().trim(),
        credits: 'Xnuvers007 (https://github.com/Xnuvers007)',
        followers: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(2)')
          .text()
          .replace(' Followers', '')
          .trim(),
        following: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(3)')
          .text()
          .replace(' Following', '')
          .trim(),
        fullname: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > a > h1').text().trim(),
        post: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(1)')
          .text()
          .replace(' Posts', '')
          .trim(),
        profile: $('#user-page > div.user > div.row > div > div.user__img')
          .attr('style')
          .replace(/(background-image: url\(\'|\'\);)/gi, '')
          .trim(),
        status: 200,
        url: `https://www.instagram.com/${Username.replace('@', '')}`,
        username: `@${Username}`
      };

      return result;
    } catch (e) {
      if (e.response?.status === 404) {
        throw new Error('Error: Akun tidak ditemukan');
      } else if (e.response?.status === 403) {
        throw new Error('Error: Akunnya Di Private');
      } else {
        throw new Error('Error: Failed to fetch Instagram profile');
      }
    }
  }
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Example use ${usedPrefix}${command} username`;

  try {
    let res = await igstalk(args[0]);

    let username = res.username;
    let fullname = res.fullname;
    let post = res.post;
    let followe = res.followers;
    let followi = res.following;
    let bio = res.bio;
    let pepe = res.profile;
    let url = res.url;
    let credits = res.credits;

    let data = `
💌 ᴜsᴇʀɴᴀᴍᴇ » 「 ${username} 」
📧 ғᴜʟʟɴᴀᴍᴇ » 「 ${fullname} 」
🎏 ${followe}  ғᴏʟʟᴏᴡᴇʀs
🎀 ${followi} ғᴏʟʟᴏᴡɪɴɢ
📝 ᴘᴏsᴛ ${post}
📑 Bɪᴏ: ${bio}
☣ url ${url}
☣ Credits By ${credits}
`.trim();

if (pepe) {
  let pp = await (await fetch(pepe)).buffer();
  conn.sendFile(m.chat, pp, 'profile.jpg', data, m);
} else {
  conn.reply(m.chat, data, m);
}
} catch (error) {
conn.reply(m.chat, error.message, m);
}
};

handler.help = ['igstalk'].map(v => v + ' <username>');
handler.tags = ['tools'];
handler.command = /^(igstalk)$/i;

export default handler;
