import FormData from "form-data";
import Jimp from "jimp";

let handler = async (m, {
    conn,
    usedPrefix,
    command
}) => {
    conn.hdr = conn.hdr ? conn.hdr : {};
    const sender = m.sender.split(`@`)[0];

    if (m.sender in conn.hdr)
        throw "Masih Ada Proses Yang Belum Selesai Kak, Silahkan Tunggu Sampai Selesai Yah >//<";

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || "";

    if (!mime)
        throw `Fotonya Mana Kak?\nEx: ${usedPrefix + command} reply foto atau kasih caption di foto\n\nNote: Menggunakan 1 limit`;

    if (!/image\/(jpe?g|png)/.test(mime))
        throw `Mime ${mime} tidak support`;
    else conn.hdr[m.sender] = true;

    m.reply("Proses Kak...\nGambar sedang di download");

    let img = await q.download?.();

    m.reply("gambar selesai di download\nMulai menjernihkan");

    let error;

    try {
        const This = await processing(img, "enhance");
        // conn.sendFile(m.chat, This, "hd.jpg", `Sudah Jadi Kak @${sender} >//<`, m);
        await conn.sendMessage(
            m.chat, {
                document: This,
                mimetype: "image/jpg",
                fileName: `hd.jpg`,
                caption: `versi jpg Document, Sudah Jadi Kak @${sender} >//<`,
                mentions: [m.sender],
            }, {
                quoted: m
            }
        );
        await conn.sendMessage(
            m.chat, {
                document: This,
                mimetype: "image/png",
                fileName: `hd.png`,
                caption: `Sudah Jadi Kak @${sender} >//<`,
                mentions: [m.sender],
            }, {
                quoted: m
            }
        );
        await conn.sendMessage(
            m.chat, {
                image: This,
                mimetype: "image/jpg",
                fileName: `hd.jpg`,
                caption: `Sudah Jadi Kak @${sender} TIPE: JPG/JPEG >//<`,
                mentions: [m.sender],
            }, {
                quoted: m
            }
        );
        await conn.sendMessage(
            m.chat, {
                image: This,
                mimetype: "image/png",
                fileName: `hd.png`,
                caption: `Sudah Jadi Kak @${sender} TIPE: PNG>//<`,
                mentions: [m.sender],
            }, {
                quoted: m
            }
        );
    } catch (er) {
        error = true;
    } finally {
        if (error) {
            m.reply("Proses Gagal :(" + error);
        }
        delete conn.hdr[m.sender];
    }
};

handler.help = ['remini', 'hd2', 'jernih2'];
handler.tags = ['ai'];
handler.command = /^(remini|hd2|jernih2)$/i;
handler.register = false;
handler.limit = true;
handler.disable = false;

export default handler;

async function processing(urlPath, method) {
    return new Promise(async (resolve, reject) => {
        let Methods = ["enhance"];
        Methods.includes(method) ? (method = method) : (method = Methods[0]);

        let buffer,
            Form = new FormData(),
            scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;

        Form.append("model_version", 1);

        Form.append("image", Buffer.from(urlPath), {
            filename: "enhance_image_body.jpg",
            contentType: "image/jpeg",
        });

        Form.submit({
                url: scheme,
                host: "inferenceengine" + ".vyro" + ".ai",
                path: "/" + method,
                protocol: "https:",
                headers: {
                    "User-Agent": "okhttp/4.9.3",
                    Connection: "Keep-Alive",
                    "Accept-Encoding": "gzip",
                },
            },
            function(err, res) {
                if (err) reject(err);
                let data = [];
                res
                    .on("data", function(chunk) {
                        data.push(chunk);
                    })
                    .on("end", () => {
                        resolve(Buffer.concat(data));
                    });
                res.on("error", (e) => {
                    reject(e);
                });
            }
        );
    });
}
