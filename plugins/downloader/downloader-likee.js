import axios from "axios"
import cheerio from "cheerio"
const regex = /https:\/\/l\.likee\.video\/v\/[A-Za-z0-9]+/i
let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) {
            return m.reply(`Masukan Link! \n\nContoh: \n${usedPrefix + command} https://l.likee.video/v/X1taJ3`)
        }
        if (!text.match(regex)) {
            return m.reply("Itu bukan link Likee!")
        }
        await global.loading(m, conn)
        let result = await LikeDown(text)
        if (result.status !== 200) {
            return m.reply("Error :)")
        }
        await conn.sendFile(m.chat, result.no_watermark, null, result.title, m)
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ["likee"]
handler.tags = ["downloader"]
handler.command = /^(like(e)?)$/i
handler.limit = true
export default handler

async function LikeDown(url) {
    return new Promise(async (resolve, reject) => {
        const { data } = await axios.request("https://likeedownloader.com/process",
            {
                method: "post",
                data: new URLSearchParams(Object.entries({
                    id: url, locale: "en"
                })),
                headers: {
                    cookie:
                    "_ga=GA1.2.553951407.1656223884 _gid=GA1.2.1157362698.1656223884 __gads=ID=0fc4d44a6b01b1bc-22880a0efed2008c:T=1656223884:RT=1656223884:S=ALNI_MYp2ZXD2vQmWnXc2WprkU_p6ynfug __gpi=UID=0000069517bf965e:T=1656223884:RT=1656223884:S=ALNI_Map47wQbMbbf7TaZLm3TvZ1eI3hZw PHPSESSID=e3oenugljjabut9egf1gsji7re _gat_UA-3524196-10=1",
                    "user-agent":
                    "Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                },
            },
        )
        const $ = cheerio.load(data.template)
        result = {
            status: 200,
            title: $("p.infotext").eq(0).text().trim(),
            thumbnail: $(".img_thumb img").attr("src"),
            watermark: $(".with_watermark").attr("href"),
            no_watermark: $(".without_watermark").attr("href"),
        }
        resolve(result)
    })
}