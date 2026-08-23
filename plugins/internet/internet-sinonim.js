import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`Masukan Kata! \n\nContoh : \n${usedPrefix + command} keren`)
    let kata = await sinonim(text)
    m.reply(kata.result.join('\n'))
}
handler.help = ['sinonim']
handler.tags = ['internet']
handler.command = /^(sinonim)$/i

export default handler


async function sinonim(kata) {
    const html = await axios.get("https://m.persamaankata.com/search.php?q=" + kata)
    const $ = cheerio.load(html.data)
    const h = []
    $("div.word_thesaurus > a").each(function(e, a) {
        h.push($(a).text());
    })
    const image = $("img#visual_synonym_img").attr("src")
    return {
        image: image,
        result: h
    }
}