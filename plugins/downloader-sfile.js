import * as cheerio from 'cheerio';
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
	if (text.match(/(https:\/\/sfile.mobi\/)/gi)) {
		let res = await sfileDl(text)
		if (!res) throw 'Error :/'
		await m.reply(Object.keys(res).map(v => `*• ${v.capitalize()}:* ${res[v]}`).join('\n') + '\n\n_Sending file..._')
		conn.sendMessage(m.chat, { document: { url: await downloadFile(res.url) }, fileName: res.filename, mimetype: res.mimetype }, { quoted: m })
	} else if (text) {
		let [query, page] = text.split`|`
		let res = await sfileSearch(query, page)
		if (!res.length) throw `Query "${text}" not found :/`
		res = res.map((v) => `*Title:* ${v.title}\n*Size:* ${v.size}\n*Link:* ${v.link}`).join`\n\n`
		m.reply(res)
	} else throw 'Input Query / Sfile Url!'
}
handler.help = handler.alias = ['sfile']
handler.tags = ['downloader']
handler.command = /^(sfile)$/i

export default handler

async function sfileSearch(query, page = 1) {
	let res = await fetch(`https://sfile.mobi/search.php?q=${query}&page=${page}`)
	let $ = cheerio.load(await res.text())
	let result = []
	$('div.list').each(function () {
		let title = $(this).find('a').text()
		let size = $(this).text().trim().split('(')[1]
		let link = $(this).find('a').attr('href')
		if (link) result.push({ title, size: size.replace(')', ''), link })
	})
	return result
}

const URL_ERROR_MESSAGE = 'Input must be a valid sfile.mobi URL!';

function validateSfilemobiUrl(url) {
    const regex = /^(https?:\/\/)?sfile\.mobi/i;
    if (!regex.test(url)) {
        throw new Error(URL_ERROR_MESSAGE);
    }
    try {
        new URL(url); // will throw if the URL is invalid
    } catch {
        throw new Error(URL_ERROR_MESSAGE);
    }
}
async function sfileDl(url) {
    validateSfilemobiUrl(url);

    const response = await fetch(url, {
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9',
            'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
            'sec-ch-ua-mobile': '?0',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
        }
    });

    if (!response.ok) {
        throw new Error(`Error: Received status ${response.status}`);
    }

    const data = await response.text();
    const $ = cheerio.load(data);

    const dlUrl = $('#download').attr('href');
    const filename = $('div.intro-container > img').attr('alt') || $('div.intro-container > h1').text();
    const icon = $('div.intro-container > img').attr('src');
    const type = /\/smallicon\/(.*?)\.svg/.exec(icon)?.[1];
    const $list = $('div.list');
    const mimetype = $list.eq(0).text().split('-')[1]?.trim();
    const uploaded = $list.eq(2).text().split('Uploaded:')[1]?.trim();
    const $upload = $list.eq(1).find('a');
    const uploadby = $upload.eq(0).text();
    const uploadbyUrl = $upload.eq(0).attr('href');
    const uploadon = $upload.eq(1).text();
    const uploadonUrl = $upload.eq(1).attr('href');
    const downloads = parseInt($list.eq(3).text().split('Downloads:')[1]);

    const result = {
        url: dlUrl,
        filename,
        icon,
        type,
        mimetype,
        uploaded,
        uploadby,
        uploadbyUrl,
        uploadon,
        uploadonUrl,
        downloads
    };

    if (!result.url || !result.filename || !result.icon) {
        throw new Error('Invalid result structure');
    }

    return result;
}
async function downloadFile(dlUrl) {
  const response = await fetch(dlUrl, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
      'Referer': 'https://sfile.mobi/',  // Referer harus diatur sesuai halaman sumber
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });

  if (!response.ok) {
    throw new Error(`Error: Received status ${response.status}`);
  }

  // Jika berhasil, unduh file atau proses responsnya
  const fileBuffer = await response.buffer(); // untuk file biner
  return fileBuffer; // Atau kamu bisa menulis file ini ke disk
}