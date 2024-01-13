import cp from 'child_process';
import { promisify } from 'util';

let exec = promisify(cp.exec).bind(cp);

var handler = async (m) => {
    try {        
        let options = '--share --bytes';
        
        let progressMessage = await conn.reply(m.chat, "Pengujian sedang berlangsung...", m);

        let o = await exec(`python3 speed.py ${options}`);
        
        let { stdout, stderr } = o;
        
        if (stdout.trim()) {
            await conn.reply(m.chat, "Uji kecepatan berhasil!", m);
            await conn.reply(m.chat, stdout);
        }
        
        if (stderr.trim()) {
            await conn.reply(m.chat, "Uji kecepatan gagal dengan pesan error:", m);
            await conn.reply(m.chat, stderr);
        }
        
    } catch (e) {
        console.error(e);
        await conn.reply(m.chat, `Terjadi kesalahan tidak terduga selama uji kecepatan.`, m);
    }
};

handler.help = ['testspeed'];
handler.tags = ['info'];
handler.command = /^(speedtest|teskecepatan|testkecepatan|cekkecepatan|checkserver|cekserver|cekinet|checkinet|cekinternet|checkinternet)$/i

export default handler;
