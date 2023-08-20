import similarity from 'similarity';
const threshold = 0.72;
let handler = m => m;

handler.before = async function (m) {
    let id = m.chat;
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*(who|hint)/i.test(m.quoted.text) || /.*(who|hint)/i.test(m.text)) return !0;
    this.siapakahaku = this.siapakahaku ? this.siapakahaku : {};
    if (!(id in this.siapakahaku)) {
        conn.reply(m.chat, 'Soal itu telah berakhir', this.siapakahaku[id][0]);
        return false;
    }
    if (m.quoted.id == this.siapakahaku[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.siapakahaku[id][1]));
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.siapakahaku[id][2];
            conn.reply(m.chat, `*Benar!*\n+${this.siapakahaku[id][2]} XP`, this.siapakahaku[id][0]);
            clearTimeout(this.siapakahaku[id][3]);
            delete this.siapakahaku[id];
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
            conn.reply(m.chat, `*Dikit Lagi!*`, this.siapakahaku[id][0]);
        } else {
            conn.reply(m.chat, `*Salah!*`, this.siapakahaku[id][0]);
        }
    }
    return true;
};

handler.exp = 50;

export default handler;
