import { resolveJid } from "../../lib/resolvejid.js";

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const who = await resolveJid(conn, m);
    if (!who)
        return m.reply("Tag atau reply user yang ingin diberi premium.");

    let txt = args[args.length - 1];
    if (!txt || isNaN(txt)) {
        return m.reply(
            `Masukan jumlah hari\n\nContoh:\n${usedPrefix + command} @${m.sender.split("@")[0]} 7`
        );
    }

    if (!global.db.data.users[who]) {
        global.db.data.users[who] = {
            premium: false,
            premiumTime: 0,
            name: who.split("@")[0],
        };
    }

    let user = global.db.data.users[who];

    let contact =
        conn.store?.contacts?.[who];

    if (contact) {
        user.name =
            contact.notify ||
            contact.name ||
            contact.vname ||
            user.name;
    } else if (!user.name || /^\d+$/.test(user.name)) {
        user.name = who.split("@")[0];
    }

    let jumlahHari = 86400000 * parseInt(txt);
    let now = Date.now();

    if (now < user.premiumTime)
        user.premiumTime += jumlahHari;
    else
        user.premiumTime = now + jumlahHari;

    user.premium = true;

    let timers = user.premiumTime - now;

    const msToTime = d => {
        let s = Math.floor((d / 1000) % 60);
        let m = Math.floor((d / 60000) % 60);
        let h = Math.floor((d / 3600000) % 24);
        let dy = Math.floor(d / 86400000);
        return `${dy} hari ${h} jam ${m} menit ${s} detik`;
    };

    await conn.sendMessage(
        who,
        {
            text:
`✔️ Success! Kamu sekarang user Premium!
📛 *Name:* ${user.name}
📆 *Days:* ${txt} hari
📉 *Countdown:* ${msToTime(timers)}`
        }
    );

    await delay(2000);

    await conn.reply(
        m.chat,
        `✔️ Success
📛 *Name:* ${user.name}
📆 *Days:* ${txt} hari
📉 *Countdown:* ${msToTime(timers)}`,
        m,
        { mentions: [who] }
    );
};

handler.help = ["addprem"];
handler.tags = ["owner"];
handler.command = /^(add(prem|premium))$/i;
handler.owner = true;

export default handler;

const delay = time => new Promise(r => setTimeout(r, time));