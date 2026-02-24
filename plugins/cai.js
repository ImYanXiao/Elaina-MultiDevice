import { webp2png } from '../lib/webp2mp4.js';
import axios from "axios";
import { uploadToPomf2 } from "../lib/uploadImage.js";

let handler = async (m, { conn, usedPrefix, text, command }) => {
    let [tipe, teks] = text.split(' ');
    let type = (tipe || '').toLowerCase();

    conn.characterai = conn.characterai || {};

    try {
        switch (type) {
            case 'search':
                if (!teks) return m.reply("Masukan Nama Karakter nya!!");
                if (m.sender in conn.characterai) return m.reply("Kamu Sudah Memilih Karakter!!");

                let res = (await axios.get(`https://komtol-api.hf.space/api/chara/search?name=${teks}`)).data;
                if (!res.result || res.result.length === 0) return m.reply("Karakter tidak ditemukan.");

                let array = res.result.map((v, i) => {
                    return `*${i + 1}*\n*Character name:* ${v.participant__name}\n*Character id:* ${v.external_id}\n*Document id:* ${v.document_id}\n*User Author:* ${v.user__username}\n*Character Number Interaction:* ${v.participant__num_interactions}\n*Search Score:* ${v.search_score}`;
                }).join("\n\n=================\n");
                
                conn.reply(m.chat, `Silahkan Salin Bagian character_id dan Ketik ${usedPrefix}cai setup <character_id>\n\n${array}`, m);
                break;

            case 'setup':
                if (!teks) return m.reply("Masukan Character Id Nya!!!");
                if (m.sender in conn.characterai) return m.reply("Kamu Sudah Memilih Karakter!!");

                let res1 = (await axios.get(`https://komtol-api.hf.space/api/chara/info?characterId=${teks}`)).data;
                if (!res1.result) return m.reply("Karakter tidak ditemukan.");

                let buffer = (await axios.get("https://characterai.io/i/80/static/avatars/" + res1.result.avatar_file_name, { responseType: "arraybuffer" })).data;
                let image = await webp2png(buffer);
                
let pngBuffer = Buffer.from(buffer);
                let uploadResult = await uploadToPomf2(pngBuffer) 
                if (!uploadResult || !uploadResult.url) {
                    console.log("Gagal mengupload gambar.");
                }

                let pesan = `Berhasil Mensetting Data Character, Berikut adalah data character yang anda pilih\n\n*Character name:* ${res1.result.name}\n*Character Id:* ${res1.result.external_id}\n*Visibility:* ${res1.result.visibility}\n*Greeting:* ${res1.result.greeting}\n*Description:* ${res1.result.description}`;
                
                conn.sendFile(m.chat, image, 'image.png', pesan, m);
                conn.characterai[m.sender] = {
                    sender: m.sender,
                    characterId: teks, 
                    charThumb: uploadResult
                };
                break;

            case 'start':
                if (!(m.sender in conn.characterai)) return m.reply(`Kamu Belum Memilih Karakter Kamu!!\nSilahkan Pilih Karaktermu, Dengan Cara Ketik ${usedPrefix + command} setup <character id>`);
                db.data.users[m.sender].characterai = true;
                conn.reply(m.chat, "Berhasil Mengaktifkan Chat CharacterAi, Silahkan Mulai Chat Dengan Karakter Pilihan Mu!!", m);
                break;

            case 'stop':
            case 'mute':
                if (!(m.sender in conn.characterai)) return m.reply(`Kamu Belum Memiliki Session!!`);
                if (!(db.data.users[m.sender].characterai)) return m.reply("Kamu Sudah Mematikan Sesi Chat CharacterAi!!");
                
                db.data.users[m.sender].characterai = false;
                conn.reply(m.chat, "Berhasil Menutup Sesi Chat CharacterAi!!", m);
                break;

            case 'delete':
            case 'deletesession':
                if (!(m.sender in conn.characterai)) return m.reply(`Kamu Belum Memiliki Session CharacterAi!!\nSilahkan Untuk Pilih Karakter CharacterAi Yang Kamu Inginkan Dengan Cara Ketik\n${usedPrefix + command} search <character> // Untuk Mencari Sebuah Karakter\n${usedPrefix + command} setup <character id> // Untuk Memilih Karakter\n${usedPrefix + command} start // Untuk Memulai Sesi Chat Dengan Karakter Pilihan Mu`);
                
                delete conn.characterai[m.sender];
                conn.reply(m.chat, "Berhasil Untuk Menghapus Session CharacterAi", m);
                break;

            default:
                if (!/[01]/.test(command)) return m.reply(`Cara Menggunakan CharacterAi, Kalian Bisa Ketik:\n\n${usedPrefix + command} search <character> (untuk mencari karakter yang mau dipilih)\n\n${usedPrefix + command} setup <character id> (untuk memilih karakter)\n\n${usedPrefix + command} start (untuk memulai sesi chat CharacterAi)\n\n${usedPrefix + command} stop (untuk berhenti dari sesi CharacterAi)\n\n${usedPrefix + command} deletesession (untuk menghapus sesi chat anda dan karakter yang ada pilih)`);
                throw false;
        }
    } catch (error) {
        console.error(error);
        m.reply("Terjadi kesalahan: " + (error.response ? error.response.data : error.message));
    }
}

handler.command = /^(cai)$/i;

export default handler;