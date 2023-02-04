import axios from 'axios'
import cheerio from 'cheerio'
var handler = async (m, { conn, args}) => {
  if (!args[0]) throw 'Uhm...url nya mana?'
    const { thumbnail, video, audio } = await tiktokdl(args[0])
    const url = video
    if (!url) throw 'Can\'t download video!'
    await conn.sendMessage(m.chat, { video: { url: url }},m) 
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^t(iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i

export default handler 

async function tiktokdl (url) {
    if (!/tiktok/.test(url)) return error.link;
    const gettoken = await axios.get("https://tikdown.org/id");
    const $ = cheerio.load(gettoken.data);
    const token = $("#download-form > input[type=hidden]:nth-child(2)").attr(
        "value"
    );
    const param = {
        url: url,
        _token: token,
    };
    const {
        data
    } = await axios.request("https://tikdown.org/getAjax?", {
        method: "post",
        data: new URLSearchParams(Object.entries(param)),
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36",
        },
    });
    var getdata = cheerio.load(data.html);
    if (data.status) {
        return {
            status: true,
            thumbnail: getdata("img").attr("src"),
            video: getdata("div.download-links > div:nth-child(1) > a").attr("href"),
            audio: getdata("div.download-links > div:nth-child(2) > a").attr("href"),
        };
    } else
        return {
            status: false,
        };
};
