import similarity from 'similarity';
const threshold = 0.73;

export async function before(m) {
    let id = m.chat;
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*calo/i.test(m.quoted.text) || /.*(calo|bantuan)/i.test(m.text))
        return !0;
    this.caklontong = this.caklontong ? this.caklontong : {};
    if (!(id in this.caklontong))
        return conn.reply(m.chat, 'Soal itu telah berakhir', m);
    if (m.quoted.id == this.caklontong[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.caklontong[id][1]));
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.caklontong[id][2];
            await conn.reply(m.chat, `*Benar!* +${this.caklontong[id][2]} XP\n${json.deskripsi}`, m);
            clearTimeout(this.caklontong[id][3]);
            delete this.caklontong[id];
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            await conn.reply(m.chat, `*Dikit Lagi!*`, m);
        else
            await conn.reply(m.chat, `*Salah!*`, m);
    }
    return !0;
}

export const exp = 0;
