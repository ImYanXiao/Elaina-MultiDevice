let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, text, isOwner }) => {
    let [_, code, expired] = text.match(linkRegex) || []
    if (!code) throw 'Link invalid'
    let res
    try {
        res = await conn.groupAcceptInvite(code)
    } catch (error) {
        if (error && error.message) {
            if (error.message.includes('not-authorized')) {
                return m.reply(`
Tidak dapat bergabung karena sebelumnya terkena kick
Silahkan tunggu max 7 hari
                `)
            } else if (error.message.includes('gone')) {
                return m.reply('Link tidak valid/sudah diatur ulang oleh admin')
            }
        }
        throw error
    }
    expired = Math.floor(Math.min(999, Math.max(1, isOwner ? (isNumber(expired) ? parseInt(expired) : 0) : 3)))
    m.reply(`Berhasil join grup ${res}${expired ? ` selama ${expired} hari

Jika grup menggunakan persetujuan admin, silahkan ACC nomor ini` : ''}`)
    let chats = global.db.data.chats[res]
    if (!chats) chats = global.db.data.chats[res] = {}
    if (expired) chats.expired = +new Date() + expired * 1000 * 60 * 60 * 24
};

handler.help = ['join <chat.whatsapp.com>'];
handler.tags = ['owner'];

handler.command = /^join$/i;
handler.rowner = true;

export default handler;

const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x))
