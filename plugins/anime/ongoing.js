import axios from 'axios';
import cheerio from 'cheerio';

                                        
export let handler = async (m, { conn, text, usedPrefix, command }) => {
  let anime = await livecharttba();
  let hasil = anime
    .map(
      (a, i) =>
        `*${i + 1}.* ${a.judul.toUpperCase()}\n*• Genre :* ${a.tags.map((a) => a).join(" ")}\n*• Studio :* ${a.studio}\n*• Adaption :* ${a.adaptasi}\n*• Image :* ${a.image}`,
    )
    .join("\n\n");

                     
  const thumbnail = 'https://files.catbox.moe/jkz9vm.jpg';                                
  conn.sendFile(m.chat, thumbnail, 'thumbnail.png', hasil, m, false);

};

                                                    
handler.help = ["ongoing *[get latest anime]*"];
handler.tags = ["anime"];
handler.command = ["ongoing"];

export default handler;

                                                          
export async function livecharttba() {
  try {
    let { data } = await axios.get("https://www.livechart.me/tba/tv");
    const $ = cheerio.load(data);
    const Result = [];
    $("#content > main > article:nth-child(n)").each((i, e) => {
      const judul = $(e).find("div > h3 > a").text();
      const image = $(e).find("div > div.poster-container > img").attr("src");
      const studio = $(e).find("div > div.anime-info > ul > li > a").text();
      const adaptasi =
        "Di adaptasi dari " +
        $(e)
          .find("div > div.anime-info > div.anime-metadata > div.anime-source")
          .text();
      const rilisDate = $(e).find("div > div.poster-container > time").text();
      const tags = [];
      $(e)
        .find("div > ol > li:nth-child(n)")
        .each((i, b) => {
          const a = $(b).find("a").text();
          tags.push(a);
        });
      Result.push({
        judul,
        tags,
        image,
        studio,
        adaptasi,
        rilisDate,
      });
    });
    return Result;
  } catch (error) {
    console.error("Error fetching ongoing anime:", error);
    return [];                                       
  }
}
