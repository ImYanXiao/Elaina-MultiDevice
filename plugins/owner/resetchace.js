let handler = async (m, { conn, isOwner }) => {
    if (!isOwner) return m.reply("❌ Hanya pemilik bot yang bisa menggunakan perintah ini.");
    
                               
    global.animeUpdateCache = new Set();
    
    m.reply("✅ Cache anime update telah dihapus.");
};

handler.help = ['resetcache'];
handler.tags = ['owner'];
handler.command = /^resetcache$/i;
handler.owner = true;                                                        

export default handler;
