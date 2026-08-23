import jikanjs from "@mateoaranda/jikanjs";
import fetch from "node-fetch";

const handler = async (m, { conn, text, args, usedPrefix, isPrems, command }) => {
    const user = global.db.data.users[m.sender].life || {};

    if (!m.text) {
        m.reply(`Gunakan format: *${usedPrefix + command} [set] [id]*`);
        return;
    }

    if (!user.name || !user.gender || !user.age) {
        m.reply(
            `⚠️ Untuk menggunakan fitur ini, kamu harus teregistrasi terlebih dahulu dengan cara:\n\nKetik *${usedPrefix}setlife* dan ikuti contoh`
        );
        return;
    }

    const age = parseInt(user.age, 10);
    if (age >= 6 && age <= 16) {
        m.reply(
            `⚠️ Kamu tidak bisa memilih husbu karena umurmu masih 16 tahun kebawah. Minimal 17 tahun agar bisa memilih husbu.`
        );
        return;
    }

    if (user.gender !== "female") {
        m.reply(
            `⚠️ Fitur ini hanya dapat digunakan oleh pengguna dengan gender perempuan.`
        );
        return;
    }

    if (user.husbu && !isPrems && user.gamepass < 1) {
        m.reply(
            "❗ Husbu pengguna hanya bisa diatur satu kali saja.\n💳 atau gunakan gamepass"
        );
        return;
    }

    if (args[0] === "set" && !isNaN(args[1])) {
        try {
            const { data } = await jikanjs.loadCharacter(args[1], "full");
            const res = await fetch(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(data.name + " anime icons")}&type=image`);
            const json = await res.json();
            const image = json[0]?.image_url || "";

            user.husbu = data.name;
            user.id = data.mal_id;
            user.about = data.about;

            let hdone =
                `✅ Kamu telah memilih *${data.name}* sebagai husbumu\n\nKetik *${usedPrefix}husbume* untuk melihat detail husbu.`.trim();
            conn.reply(m.chat, hdone, m, {
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        title: `Kenapa milih ${data.name}?`,
                        body: "Gambar terkadang tidak muncul",
                        thumbnailUrl: image,
                        sourceUrl: image,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                    },
                },
            });

            if (user.gamepass >= 1 && !isPrems && user.husbu) {
                user.gamepass -= 1;
                m.reply("-1 💳 gamepass");
            }
        } catch (error) {
            console.error(error);
            m.reply("Terjadi kesalahan saat memproses husbu.");
        }
    } else if (text.length > 1) {
        try {
            const { data } = await jikanjs.raw(["characters"], {
                page: 1,
                q: text,
            });

            if (!data.length) {
                m.reply("Tidak ditemukan.");
                return;
            }

            const list = data.map((x, i) => [
                `${usedPrefix + command} set ${x.mal_id}`,
                `set ${i + 1}`
            ]);

            const listText = data.map((x, i) =>
                `${i + 1}. *${x.name}* (${x.name_kanji})\n • ID : *${x.mal_id}*\n • Favorite : *${x.favorites}*`
            ).join('\n\n');

            const messageText = `Berikut adalah hasil pencarian husbu:\n\n${listText}`;

            if (typeof conn.textOptions === "function") {
                await conn.textOptions(m.chat, messageText, null, list, m, {}, { smlcap: true });
            } else {
                await conn.sendMessage(m.chat, { text: messageText });
            }

        } catch (error) {
            console.error(error);
            m.reply("Terjadi kesalahan saat mencari husbu.");
        }
    } else {
        m.reply(
            `Masukan nama\n\n*Example:* ${usedPrefix + command} Elaina`
        );
    }
}

handler.command = handler.help = ["sethusbu"];
handler.tags = ["utility"];
handler.premium = true;

export default handler;