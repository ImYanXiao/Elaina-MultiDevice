import fetch from "node-fetch";
import util from "util";

const handler = async (m, { conn, usedPrefix, command, text, args }) => {
    conn.nekopoi = conn.nekopoi ? conn.nekopoi : {};
    
    if (!text) {
      let example =
            "`</> Nekopoi Example Use </>`\n\n" +
            `*Get Latest :*\n> _${usedPrefix+command} latest_\n\n` +
            `*Get Search :*\n> _${usedPrefix+command} <query>_\n> _${usedPrefix+command} overflow_\n\n` +
            `*Get Detail :*\n> _${usedPrefix+command} <number>_\n> _${usedPrefix+command} 1_\n\n`;

      return m.reply(example);
    }
    const nekoCheck = conn.nekopoi[m.sender] ? conn.nekopoi[m.sender] : null;

    if (!nekoCheck && !isNaN(text))
        return m.reply(
            `Your session has expired / does not exist, do another search using the keywords you want.`,
        );

    if (args[0] === "latest") {
        try {
            const response = await fetch("https://api.arifzyn.tech/animanga/nekopoi-latest");
            let json = await response.json();
            
            json = json.data ? json.data : json.result
            
            conn.nekopoi[m.sender] = {
                result: json.map((v) => v.link),
                created_at: new Date() * 1,
            };
            
            let p = `\n> *Query :* _${text}_\n`;
            p += `> *Total Results :* ${json.length}\n\n`;
            p += `> To showing information use client command *${usedPrefix+command} number*\n`;
            p += `> *Example* : ${usedPrefix+command} 1\n\n`;

            json.forEach((v, i) => {
                p += `> ${i + 1}. ${v.title}\n`;
                p += `> - *upload :* ${v.upload}\n`;
                p += `> - *image :* ${v.image}\n`;
                p += `> - *Url :* ${v.link}\n\n`;
            });
            
            m.reply(p);
        } catch (error) {
            console.error(error);
            throw "Error fetching latest data from Nekopoi.";
        }
    } else if (nekoCheck && !isNaN(args[0])) {
        try {
            if (Number(text) > nekoCheck.result.length)
                return m.reply(`Exceed amount of data.`);

            const res = await fetch(`https://api.arifzyn.tech/animanga/nekopoi-detail?url=${nekoCheck.result[Number(text) - 1]}`);
            let json = await res.json();

            if (json.code !== 200) return m.reply(util.format(json));
            
            json = json.data
            
            let dl = '';
            for (const x of json.download) {
                dl += `\n*[ ${x.type} ]*\n`;
                for (const link of x.links) {
                    dl += `${link.name}: ${link.link}\n`;
                }
            }

            let txt = `\`</>  *N E K O P O I* </>\`\n\n`;
            for (const key in json)
                if (!/img|download|sinopsis/i.test(key))
                    txt += `\u2022  *${ucword(key).replace("_", " ")}* : ${json[key]}\n`;
            txt += `\n[  *S I N O P S I S* ] :\n\n`;
            txt += `${json.sinopsis ? json.sinopsis : "*No sinopsis*"}\n\n`;
            txt += `*Download :*\n${dl}`;

            await conn.sendFile(m.chat, json.img, 'nekopoi.jpg', txt, m)
        } catch (error) {
            console.error(error);
            throw "Error fetching detail data from Nekopoi.";
        }
    } else if (text) {
        try {
            const res = await fetch(`https://api.arifzyn.tech/animanga/nekopoi-search?q=${encodeURIComponent(text)}`);
            let json = await res.json();

            if (json.code !== 200) return m.reply(util.format(json));
            if (json.data.length === 0)
                return m.reply(`Query *${text}* not found`);
            
            json = json.data
            
            conn.nekopoi[m.sender] = {
                result: json.map((v) => v.link),
                created_at: new Date() * 1,
            };

            let p = `\n> *Query :* _${text}_\n`;
            p += `> *Total Results :* ${json.length}\n\n`;
            p += `> To showing information use client command *${usedPrefix+command} number*\n`;
            p += `> *Example* : ${usedPrefix+command} 1\n\n`;

            json.forEach((v, i) => {
                p += `> ${i + 1}. ${v.title}\n`;
                p += `> - *Duration :* ${v.duration}\n`;
                p += `> - *Producers :* ${v.producers}\n`;
                p += `> - *Genre :* ${v.genre}\n\n`;
            });

            m.reply(p);
        } catch (error) {
            console.error(error);
            throw "Error fetching search data from Nekopoi.";
        }
    } else {
        let example =
            "`</> Nekopoi Example Use </>`\n\n" +
            `*Get Latest :*\n> _${usedPrefix+command} latest_\n\n` +
            `*Get Search :*\n> _${usedPrefix+command} <query>_\n> _${usedPrefix+command} overflow_\n\n` +
            `*Get Detail :*\n> _${usedPrefix+command} <number>_\n> _${usedPrefix+command} 1_\n\n`;

        m.reply(example);
    }
};

handler.command = ["nekopoi"];
handler.register = true
handler.premium = true 

export default handler;

function ucword(str) {
  return (str + "").replace(/^([a-z])|\s+([a-z])/g, function ($1) {
    return $1.toUpperCase();
  });
}