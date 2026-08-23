let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    
                                                                      
    if (!user.lastngojek) user.lastngojek = new Date().getTime();

    let __timers = new Date().getTime() - user.lastngojek;
    let _timers = Math.max(0, 300000 - __timers);                       
    let Nyulikloli = user.ojekk;
    let timers = clockString(_timers);
    let name = conn.getName(m.sender);
    
    if (__timers > 300000) {
        let randomaku1 = Math.floor(Math.random() * 10);
        let randomaku2 = Math.floor(Math.random() * 10);
        let randomaku3 = Math.floor(Math.random() * 10);
        let randomaku4 = Math.floor(Math.random() * 5);
        let randomaku5 = Math.floor(Math.random() * 10);

        let rbrb1 = randomaku1 * 2;
        let rbrb2 = randomaku2 * 10;
        let rbrb3 = randomaku3 * 1;
        let rbrb4 = randomaku4 * 15729;
        let rbrb5 = randomaku5 * 20000;

        let hsl = `
*—[ Hasil Ngewe loli ${name} ]—*
 ➕ 💹 Uang = [ ${rbrb4} ]
 ➕ ✨ Exp = [ ${rbrb5} ]
 ➕ 📛 Warn = +1		 
 ➕ 😍 Nyulik loli Selesai = +1
 ➕ 📥 Total loli Sebelumnya : ${Nyulikloli}
${wm}
`.trim();

        user.warn += 1;
        user.money += rbrb4;
        user.exp += rbrb5;
        user.ojekk += 1;

        setTimeout(() => m.reply(hsl), 27000);
        setTimeout(() => m.reply('🥵💦💦Ahhhhhh😫'), 25000);
        setTimeout(() => m.reply('Korban: 🥵Ahhhh, Sakitttt!! >////<\nPelaku: 💦Crotttt.....'), 20000);
        setTimeout(() => m.reply('🥵 Mulai ewe loli.....'), 15000);
        setTimeout(() => m.reply('✔️ Mendapatkan loli....'), 10000);
        setTimeout(() => m.reply('🔍 Mencari loli.....'), 0);

        user.lastngojek = new Date().getTime();
    } else {
        conn.reply(m.chat, `Sepertinya Anda Sudah Kecapekan Silahkan Istirahat Dulu sekitar\n🕔 *${timers}*`, m);
    }
}

handler.help = ['KhususOwner'];
handler.tags = ['rpg'];
handler.command = /^(eweloli)$/i;
handler.register = true;
handler.owner = true;

export default handler;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
