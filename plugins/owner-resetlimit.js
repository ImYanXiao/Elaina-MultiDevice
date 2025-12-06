import moment from 'moment-timezone';
import fs from 'fs';

let resetHandler = async (m, { conn }) => {
    let limVerified = 1000; // Set limit untuk verified user
    let limUnverified = 500; // Set limit untuk unverified user

    // Reset limit, command, dan commandlimit untuk semua pengguna
    let users = Object.entries(global.db.data.users); // Ambil data pengguna
    let resetCount = 0;

    for (let [who, user] of users) {
        // Pastikan user adalah objek, jika tidak, inisialisasi sebagai objek kosong
        if (typeof user !== 'object') {
            global.db.data.users[who] = {}; // Inisialisasi data user
            user = global.db.data.users[who]; // Referensi ulang ke user yang baru dibuat
        }

        // Set limit berdasarkan verifikasi user
        user.limit = user.verif ? limVerified : limUnverified;
        user.command = 0; // Reset jumlah perintah
        user.commandlimit = 0; // Reset batas perintah
        resetCount++;
    }

    // Kirim pesan konfirmasi ke chat
    conn.reply(
        chatId,
        `*Berhasil direset limit menjadi ${limVerified} untuk verified user dan ${limUnverified} untuk unverified user, command dan commandlimit menjadi 0 untuk ${resetCount} pengguna*`,
        m
    );

    // Pemberitahuan ke owner menggunakan nomor dari global.config.owner
    let owner = global.config.owner;
    let currentTime = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    conn.sendMessage(owner, `✅ Reset limit selesai pada ${currentTime}. Total ${resetCount} pengguna telah direset.`, { quoted: m });
};

resetHandler.help = ['resetlimit'].map(v => 'reset' + v); // Bantuan untuk command
resetHandler.tags = ['owner']; // Tag untuk command
resetHandler.command = /^(resetlimit)$/i; // Regex untuk memicu command
resetHandler.owner = true; // Hanya bisa digunakan oleh owner

// Fungsi validasi angka
function isNumber(x = 0) {
    x = parseInt(x);
    return !isNaN(x) && typeof x === 'number';
}

// Setiap jam 12 malam, reset limit
setInterval(async () => {
    let currentTime = moment().tz('Asia/Jakarta').format('HH');
    if (currentTime === '00') {
        let owner = global.config.owner;
        let resetCount = 0;
        let users = Object.entries(global.db.data.users);

        for (let [who, user] of users) {
            if (typeof user !== 'object') {
                global.db.data.users[who] = {};
                user = global.db.data.users[who];
            }
            user.limit = user.verif ? 1000 : 500;
            user.command = 0;
            user.commandlimit = 0;
            resetCount++;
        }

        // Pemberitahuan ke owner setelah reset
        conn.sendMessage(owner, `✅ Reset limit selesai pada ${moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')}. Total ${resetCount} pengguna telah direset.`, { quoted: m });
    }
}, 3600000); // Setiap jam (3600000 ms)

export default resetHandler;