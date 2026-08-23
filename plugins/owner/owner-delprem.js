import { resolveJid } from "../../lib/resolvejid.js";

let handler = async (m, { conn }) => {
    const who = await resolveJid(conn, m);
    if (!who)
        return m.reply("Tag atau reply user yang ingin dihapus premium-nya.");

    if (!global.db.data.users[who]) {
        return m.reply("User tidak ditemukan di database.");
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

    if (!user.premium) {
        return m.reply("User tersebut bukan user premium.");
    }

  
    user.premium = false;
    user.premiumTime = 0;

    await conn.sendMessage(
        who,
        {
            text:
`❌ Status Premium Dihapus
📛 *Name:* ${user.name}
📉 *Status:* Free User`
        }
    );

    await delay(2000);

    await conn.reply(
        m.chat,
        `❌ Premium berhasil dihapus
📛 *Name:* ${user.name}
📉 *Status:* Free User`,
        m,
        { mentions: [who] }
    );
};

handler.help = ["delprem"];
handler.tags = ["owner"];
handler.command = /^(del(prem|premium))$/i;
handler.owner = true;

export default handler;

const delay = time => new Promise(r => setTimeout(r, time));