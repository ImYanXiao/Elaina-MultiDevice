// import fs from 'fs'
// import deepai from 'deepai'
// deepai.setApiKey('31c3da72-e27e-474c-b2f4-a1b685722611')

// let handler = async (m) => {
// 	let q = m.quoted ? m.quoted : m
// 	let mime = (q.msg || q).mimetype || ''
// 	if (!mime) throw 'ʀᴇᴘʟʏ ɢᴀᴍʙᴀʀɴʏᴀ ᴋᴀᴋ (～￣▽￣)～'
//     await m.reply(global.wait)
// 	if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`
// 	let img = mime.split('/')[1]
// 	img = Date.now() + '.' + img
// 	fs.writeFileSync(`./${img}`, await q.download())
// 	let resp = await deepai.callStandardApi('waifu2x', {
// 		image: fs.readFileSync(`./${img}`)
// 	})
// 	await conn.sendFile(m.chat, resp.output_url, 'hd.jpg', 'ɪɴɪ ᴋᴀᴋ ʜᴀꜱɪʟɴʏᴀヾ(≧▽≦*)ᴏ', m).then(() => fs.unlinkSync(`./${img}`))
// }
// handler.help = ['hd <caption|reply media>']
// handler.tags = ['tools|anime']
// handler.command = /^(hd|jernih)$/i

// export default handler
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import deepai from 'deepai';

// deepai.setApiKey('31c3da72-e27e-474c-b2f4-a1b685722611');
deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) throw 'ʀᴇᴘʟʏ ɢᴀᴍʙᴀʀɴʏᴀ ᴋᴀᴋ (～￣▽￣)～';
  await m.reply(global.wait);
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Mime ${mime} tidak support`;
  let img = mime.split('/')[1];
  img = Date.now() + '.' + img;
  fs.writeFileSync(`./${img}`, await q.download());
  let form = new FormData();
  form.append('image', fs.createReadStream(`./${img}`));
  let resp = await fetch('https://api.deepai.org/api/torch-srgan', {
    method: 'POST',
    headers: {
      // 'api-key': '31c3da72-e27e-474c-b2f4-a1b685722611',
      'api-key': 'quickstart-QUdJIGlzIGNvbWluZy4uLi4K',
    },
    body: form,
  });
  let data = await resp.json();
  await conn.sendFile(m.chat, data.output_url, 'hd.jpg', 'ɪɴɪ ᴋᴀᴋ ʜᴀꜱɪʟɴʏᴀヾ(≧▽≦*)ᴏ', m);
  fs.unlinkSync(`./${img}`);
};

handler.help = ['hd <caption|reply media>'];
handler.tags = ['tools|anime'];
handler.command = /^(hd|jernih)$/i;

export default handler;
