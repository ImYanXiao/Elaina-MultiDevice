import fetch from 'node-fetch';
import { proto, generateWAMessageFromContent, prepareWAMessageMedia } from '@rexxhayanasi/elaina-baileys'
import { googleImage } from '@bochilteam/scraper';

                                          
const wm = global.config.watermark;

var handler = async (m, { conn, usedPrefix, command }) => {
    if (!command) throw 'menu';
    try {
                                    
        await global.loading(m, conn);

                           
        let msgs = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: "ʜᴀɪ ɴᴀᴍᴀ ꜱᴀʏᴀ ᴀᴅᴀʟᴀʜ *ᴇʟᴀɪɴᴀ-ᴀɪ*\n\nʙᴏᴛ ɪɴɪ ᴅᴀᴘᴀᴛ ᴅɪɢᴜɴᴀᴋᴀɴ sᴇʙᴀɢᴀɪ *ᴇᴅᴜᴋᴀsɪ ᴘᴇʟᴀᴊᴀʀᴀɴ*, *ᴜɴᴅᴜʜᴀɴ ᴍᴇᴅɪᴀ*, *ɢᴀᴍᴇ*, *ᴘᴇɴᴊᴀɢᴀ ɢʀᴜᴘ*, *ᴅᴀɴ ʟᴀɪɴɴʏᴀ* ʏᴀɴɢ ᴅᴀᴘᴀᴛ ᴍᴇᴍʙᴜᴀᴛ ᴋᴀᴍᴜ ʟᴇʙɪʜ ᴍᴜᴅᴀʜ ᴜɴᴛᴜᴋ ᴍᴇɴᴊᴀʟᴀɴɪ ʜᴀʀɪ-ʜᴀʀɪ"
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: wm
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: false,
                            ...await prepareWAMessageMedia({ image: { url: "https://telegra.ph/file/e5f6b989aad1333e5887b.jpg" } }, { upload: conn.waUploadToServer })
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: [
                                {
                                    "name": "single_select",
                                    "buttonParamsJson": JSON.stringify({
                                        title: "MENU OPTION",
                                        sections: [
                                            {
                                                title: "ELAINA AI",
                                                rows: [
                                                    { header: "📓 Menujukan Rules", title: "• Agar Tidak Di Banned", description: "Highlight Label: 📑 Rules", id: ".rules" }
                                                ]
                                            },
                                            {
                                                title: "ELAINA AI",
                                                rows: [
                                                    { header: "✏️ Menunjukan Tentang Elaina", title: "• About Elaina", description: "Highlight Label: ✏️ About", id: ".about" }
                                                ]
                                            },
                                            {
                                                title: "ELAINA AI",
                                                rows: [
                                                    { header: "👑 Elaina Owner", title: "• Pemilik Bot Elaina AI", description: "Highlight Label: 👑 Owner", id: ".owner" }
                                                ]
                                            },
                                            {
                                                title: "ELAINA AI",
                                                rows: [
                                                    { header: "🍂 Menujukan Semua Menu", title: "• Menuall Elaina", description: "Highlight Label: 🍂 Menuall", id: ".rexx" }
                                                ]
                                            },
                                            {
                                                title: "ELAINA AI",
                                                rows: [
                                                    { header: "📜 Menunjukan Versi Elaina", title: "• Version", description: "Highlight Label: 📜 Version", id: ".versi" }
                                                ]
                                            },
                                            {
                                                title: "ELAINA AI",
                                                rows: [
                                                    { header: "👤 Menunjukan Credit Elaina", title: "• Spesial Thanks", description: "Highlight Label: 👤 Credit", id: ".tqto" }
                                                ]
                                            },
                                            {
                                                title: "ELAINA AI",
                                                rows: [
                                                    { header: "🕹️ Menulist Elaina", title: "• Menulist", description: "Highlight Label: 🕹️ Menulist", id: ".menulist" }
                                                ]
                                            },
                                            {
                                                title: "ELAINA AI",
                                                rows: [
                                                    { header: "🛠️ CH Bot Elaina", title: "• CH Bot Elaina", description: "Highlight Label: 🛠️ CH Bot", id: ".chbot" }
                                                ]
                                            }
                                        ]
                                    })
                                }
                            ]
                        })
                    })
                }
            }
        }, { quoted: m });

                                                    
        await conn.relayMessage(m.chat, msgs.message, {});
    } catch (e) {
        console.error(e);
        conn.sendMessage(m.chat, 'Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.', 'conversation', { quoted: m });
    } finally {
                                      
        await global.loading(m, conn, true);
    }
};

handler.help = ['kontol'];
handler.tags = ['menu'];
handler.command = /^(kontol)$/i;
handler.limit = false;
handler.register = true;

export default handler;
