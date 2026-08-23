import fs from 'fs'

const antiTagSWPath = './database.json'                             

if (!fs.existsSync(antiTagSWPath)) {
    fs.writeFileSync(antiTagSWPath, '{}', 'utf-8')
}

const loadAntiTagSW = () => {
    try {
        return JSON.parse(fs.readFileSync(antiTagSWPath, 'utf-8'))
    } catch (e) {
        console.error("❌ Error membaca database.json, menginisialisasi ulang.")
        fs.writeFileSync(antiTagSWPath, '{}', 'utf-8')
        return {}
    }
}

const saveAntiTagSW = (data) => fs.writeFileSync(antiTagSWPath, JSON.stringify(data, null, 4), 'utf-8')

let antiTagSWGroup = loadAntiTagSW()

let handler = async (m, { conn, args, isAdmin, isOwner }) => {
    if (!m.isGroup) return m.reply("❌ Fitur ini hanya bisa digunakan di grup.")
    if (!(isAdmin || isOwner)) return m.reply("❌ Hanya admin yang bisa mengubah pengaturan ini.")
    if (!args[0]) return m.reply("⚠️ Gunakan: *.antitagsw on/off*")

    if (args[0].toLowerCase() === "on") {
        if (antiTagSWGroup[m.chat]) return m.reply("😡 Anti Tag SW sudah aktif!")
        antiTagSWGroup[m.chat] = true
        saveAntiTagSW(antiTagSWGroup)
        return m.reply("✅ *Anti Tag Status WhatsApp* sekarang AKTIF di grup ini!")
    } else if (args[0].toLowerCase() === "off") {
        if (!antiTagSWGroup[m.chat]) return m.reply("😔 Anti Tag SW sudah nonaktif.")
        delete antiTagSWGroup[m.chat]
        saveAntiTagSW(antiTagSWGroup)
        return m.reply("❌ *Anti Tag Status WhatsApp* dimatikan di grup ini!")
    } else {
        return m.reply("⚠️ Pilih: on/off")
    }
}

                                                   
handler.before = async (m, { conn, isBotAdmin }) => {
    if (!m.isGroup || !antiTagSWGroup[m.chat]) return;

                                                     
    let isStatusMention = m.message?.groupStatusMentionMessage?.message?.protocolMessage?.type === "STATUS_MENTION_MESSAGE";
    
    if (!isStatusMention) return;

    let warningMessage = `🚨 *GRUP DITANDAI DI STATUS!* 🤣\n\n` +
                         `😡 *@${m.sender.split("@")[0]}*, kenapa nge-tag grup di status?!` +
                         `\n\n *Jangan nge-tag grup di status!* 🤣`;

    if (!isBotAdmin) {
        return conn.sendMessage(m.chat, { text: warningMessage, mentions: [m.sender] });
    }

    try {
        await conn.sendMessage(m.chat, { delete: m.key });               
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");             
        await conn.sendMessage(m.chat, { text: `❌ *@${m.sender.split("@")[0]}* telah dikeluarkan karena menandai grup di status.`, mentions: [m.sender] });
    } catch (err) {
        console.error("❌ Gagal mengeluarkan anggota:", err);
    }
};
handler.command = handler.help = ['antitagsw']
handler.tags = ["group"]
handler.group = true
handler.admin = true

export default handler
