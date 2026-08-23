import { pinterest } from "../../lib/scrape.js";

const handler = async (m, { conn }) => {
    try {
        const cooldown = 3600300;
        const user = global.db.data.users[m.sender].life;

        if (new Date() - user.lastkencan < cooldown) {
            m.reply(
                `Kamu sudah berkencan sebelumnya! Tunggu selama *${maToTime(user.lastkencan + cooldown - new Date())}* untuk berkencan lagi!`
            );
            return;                                                                        
        }

        if (user.waifu === "") {
            return m.reply(
                "❌ Kamu belum mempunyai waifu! Ketik *.waifu* dan pilih waifumu"
            );
        }

        async function searchAndPickRandom(query) {
            const searchResult = await pinterest(query);
            return searchResult
        }

        const query = `${user.waifu} anime icons`;
        const res1 = await pinterest(query);
        const res2 = await pinterest(query);
        const res3 = await pinterest(query);
        const res4 = await pinterest(query);
        const res5 = await pinterest(query); 
        const res6 = await pinterest(query);
        const res7 = await pinterest(query);
        
        const tempat = [
            "pantai",
            "taman kota",
            "kebun binatang",
            "taman bermain",
            "kolam renang",
            "teater",
            "pusat seni dan budaya",
            "museum seni",
            "pusat sains",
            "perpustakaan",
            "kafe",
            "restoran",
            "kebun bunga",
            "taman anggur",
            "lapangan golf",
            "lapangan tenis",
            "pusat perbelanjaan",
            "pasar seni",
            "galeri seni",
            "pertunjukan musik",
            "lapangan bola basket",
            "lapangan baseball",
            "lapangan sepak bola",
            "pusat yoga",
            "karaoke",
            "kebun buah",
            "pertunjukan seni",
            "arena balap",
            "pusat bowling",
        ].getRandom();
        const alesan = [
            "belajar bersama tentang cinta",
            "merayakan momen-momen penting bersama",
            "berbagi hobi dan minat bersama",
            "menguatkan hubungan",
            "bersenang-senang bersama",
            "mempererat komunikasi",
            "merayakan hubungan",
            "membangun kenangan",
            "mempererat hubungan",
        ].getRandom();
        const tempat2 = [
            "rumah mertua",
            "pusat seni kuliner",
            "studio musik",
            "pesta seni pertunjukan",
            "pesta seni kreatif",
            "studio perhiasan",
            "pusat seni keramik",
            "pusat seni berkebun",
            "arena konser",
            "studio lukisan",
            "pusat seni film",
            "pusat hiking indoor",
            "pemandian air panas",
            "memancing",
            "kebun apel",
            "pusat mainan",
            "taman bermain air",
            "lapangan futsal",
        ].getRandom();
        const alesan2 = [
            "saling mengenal lebih baik",
            "membangun ikatan emosional yang lebih dalam",
            "bersenang-senang bersama",
            "mempererat komunikasi",
            "merayakan hubungan",
            "membangun kenangan",
            "mempererat hubungan",
        ].getRandom();
        const perasaan = [
            "senang",
            "semakin cinta denganmu",
            "sangat cinta denganmu",
            "biasa saja",
            "sangat senang",
            "bahagia",
            "sangat bahagia",
            "cukup senang",
        ].getRandom();
        const gaun = [
            "blazer & celana pendek yang bergaya",
            "blouse & rok yang anggun",
            "jeans & blus yang kasual",
            "kimono yang indah",
            "yukata yang sangat cantik",
            "gaun pendek yang elegan",
            "gaun panjang yang anggun",
            "kemeja & celana panjang yang rapih",
            "crop top & rok mini",
        ].getRandom();
        const gift = [
            "seikat bunga matahari kuning cerah",
            "sebuah coklat",
            "sebuah kartu ucapan",
        ].getRandom();
        const tempat3 = [
            "taman bermain. Mereka tertawa dan bersenang-senang seperti anak-anak, naik roller coaster, dan bermain permainan karnaval",
            "restoran. Mereka menikmati hidangan yang begitu lezat dan mereka saling menyuap-nyuapi dengan sangat romantis",
            "sebuah kafe yang nyaman. Mereka duduk di sudut yang tenang, berbagi coklat panas dan kue",
        ].getRandom();

        const sendFThumbMessage = async (title, text, imageUrl, body, chat) => {
        	await conn.reply(m.chat, text, m, {
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        title: title,
                        body: body,
                        thumbnailUrl: imageUrl,
                        sourceUrl: imageUrl,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                    },
                },
            });
        };

        setTimeout(() => {
            sendFThumbMessage(
                "Kencan...",
                `*Jam 07:00 Pagi*\nPagi yang cerah menyapa ${user.waifu} dan ${user.name}. Mereka berdua telah merencanakan kencan spesial ini dengan penuh antusiasme. ${user.waifu} bangun lebih awal untuk bersiap-siap. Dia memakai ${gaun} dan tersenyum senang.`,
                res2,
                "",
                m.chat
            );
        }, 0);

        setTimeout(() => {
            sendFThumbMessage(
                "Kencan...",
                `*Jam 07:15 Pagi*\n\nSementara itu, ${user.name} sudah bersiap di luar rumah ${user.waifu}. Dia membawa ${gift} untuk ${user.waifu}. Saat ${user.waifu} melihat ${user.name}, senyum mereka bertemu dan mata mereka bersinar.`,
                res3,
                "",
                m.chat
            );
        }, 15000);

        setTimeout(() => {
            sendFThumbMessage(
                "Kencan...",
                `*Jam 07:30 Pagi*\n\nKeduanya memutuskan untuk pergi ke ${tempat} untuk ${alesan}. Mereka berjalan berdua, berbicara tentang segala hal, dari hobi mereka hingga impian masa depan. Setiap jalanan dipenuhi dengan bunga-bunga yang berwarna-warni, seperti perasaan mereka satu sama lain.`,
                res4,
                "",
                m.chat
            );
        }, 30000);

        setTimeout(() => {
            sendFThumbMessage(
                "Kencan...",
                `*Jam 08:00 Pagi - 15:00 Siang*\n\nSetelah menikmati ${tempat}, ${user.waifu} dan ${user.name} pergi ke ${tempat2} untuk ${alesan2}. Mereka saling memandang dengan penuh kasih sayang, merasakan ikatan mereka semakin kuat.`,
                res5,
                "",
                m.chat
            );
        }, 45000);

        setTimeout(() => {
            sendFThumbMessage(
                "Kencan...",
                `*Jam 15:00 Siang - 22:00 Malam*\n\nKencan mereka berlanjut ke ${tempat3}. Malam datang begitu cepat, dan mereka merencanakan untuk menonton bintang-bintang bersama.`,
                res6,
                "",
                m.chat
            );
        }, 60000);

        setTimeout(() => {
            sendFThumbMessage(
                "Kencan Selesai",
                `*Jam 22:00 Malam*\n\nDi malam yang tenang, mereka berdua duduk di bawah langit yang penuh dengan bintang. ${user.name} merangkul ${user.waifu} dengan lembut, dan mereka saling berbagi cerita dan impian mereka. Waktu berlalu begitu cepat, dan kencan pun telah selesai. Kamu mengantar ${user.waifu} pulang ke rumah dan ${user.waifu} merasa ${perasaan} dari kencan tadi.\n\n[ ! ] Waifumu telah naik level!\n+1 💘 Level Waifu\n+2 ✤ W Money`,
                res7,
                "",
                m.chat
            );
        }, 75000);

        user.exp += 1;
        user.money += 2;
        user.lastkencan = new Date().getTime();
    } catch (error) {
        console.error(error);
        await conn.sendMessage(
            m.chat,
            { text: "Maaf, terjadi kesalahan saat memproses permintaanmu." }                                 
        );
    }
};

handler.command = ["kencan"];
handler.help = ["kencan"];
handler.tags = ["utility"];
handler.premium = true;

export default handler;

function maToTime(ma) {
    if (typeof ma !== 'number') {
        throw new Error('Input harus berupa angka');
    }

    const date = new Date(ma);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}
