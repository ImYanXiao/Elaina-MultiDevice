import fs from 'fs';
import fetch from 'node-fetch';
import moment from 'moment-timezone';
import axios from 'axios';
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

// Definisi fungsi utilitas
function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())];
}

function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [d, ' *Days ☀️*\n ', h, ' *Hours 🕐*\n ', m, ' *Minutes ⏰*\n ', s, ' *Seconds ⏱️* ']
        .map(v => v.toString().padStart(2, '0')).join('');
}

function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH');
    if (time >= 18) return "Selamat malam🌃";
    if (time >= 15) return "Selamat sore🌇";
    if (time >= 10) return "Selamat siang🌅";
    if (time >= 4) return "Selamat pagi⛅";
    return "Selamat Dini hari🌌";
}

// Definisi fungsi global
global.pickRandom = pickRandom;

global.getBuffer = async function getBuffer(url, options = {}) {
    try {
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'User-Agent': 'GoogleBot',
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        });
        return res.data;
    } catch (e) {
        console.error(`Error: ${e}`);
        return null;
    }
};

// Handler utama
let handler = m => m;

handler.all = async function (m) {
    global.name = await conn.getName(m.sender);

    let pp;
    try {
        pp = await this.profilePictureUrl(m.sender, 'image');
    } catch (e) {
        pp = global.hwaifu; // Pastikan global.hwaifu sudah didefinisikan
    }

        global.baileys = await import('@adiwajshing/baileys');
        global.fetch = (await import('node-fetch')).default;
        global.bochil = require('@bochilteam/scraper');
        
    // Variabel global
    try {
        global.doc = pickRandom([
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "application/msword",
            "application/pdf",
            "application/vnd.android.package-archive",
            "application/zip"
        ]);

        global.img = await hwaifu.getRandom(); // Pastikan hwaifu sudah didefinisikan
        global.fla = await flaaa.getRandom(); // Pastikan flaaa sudah didefinisikan
        global.social = pickRandom([
            global.sgh, global.sch, global.sig, global.snh, global.sneko, global.sgc]);

        // Uptime
        const _uptime = process.uptime() * 1000;
        global.runtime = '⏰ ʀᴜɴᴛɪᴍᴇ\n ' + clockString(_uptime);

        // Ucapan
        global.ucapan = ucapan();

        // Penanganan error untuk thumbnail
        let thumbnailBuffer;
        try {
            thumbnailBuffer = await (await fetch(global.minel)).buffer();
        } catch (e) {
            console.error(`Error fetching thumbnail: ${e}`);
            thumbnailBuffer = null;
        }

        // Penanganan error untuk adReply
        try {
            global.adReply = {
                contextInfo: {
                    externalAdReply: {
                    showAdAttribution : true, 
                        title: global.ucapan,
                        body: 'The Journey of Elaina',
                        mediaUrl: global.sch, // Pastikan sgc sudah didefinisikan
                        description: 'Elaina-MultiDevice',
                        previewType: 'PHOTO',
                        thumbnail: thumbnailBuffer,
                        sourceUrl: global.social
                    }
                }
            };
        } catch (e) {
            console.error(`Error setting adReply: ${e}`);
            global.adReply = {};
        }

        // Variabel global lainnya
        global.ephemeral = '86400'; // 86400 = 24 jam
        global.minel = pickRandom([
            'https://telegra.ph/file/7e074dc8df5b6530a6bad.jpg',
            'https://telegra.ph/file/e0e37b64fea581dde72a6.jpg',
            'https://telegra.ph/file/d563116b77bbe287c094c.jpg',
            'https://telegra.ph/file/69c21e06df7ecfa3f7098.jpg',
            'https://telegra.ph/file/7ab782cde947ab94d69f9.jpg',
            'https://telegra.ph/file/e5007a6cb2a6184a953c9.jpg',
            'https://telegra.ph/file/2c76b5df151735ea0222c.jpg',
            'https://telegra.ph/file/b48f6e28f1be55f205823.jpg',
            'https://telegra.ph/file/86c5f23ffb0b246a6e4b3.jpg',
            'https://telegra.ph/file/92a02875904ce005ff703.jpg'
        ]);
        global.urls = pickRandom([
            'https://telegra.ph/file/d56cdc13a2a9ceaf0ba63.jpg',
            'https://telegra.ph/file/99bd91e62d02e25240972.jpg',
            'https://telegra.ph/file/fb6c05184b9cea4999dd9.jpg',
            'https://telegra.ph/file/600964723da4b8bd109e6.jpg',
            'https://telegra.ph/file/aae5c3d61a36d2f7660cc.jpg',
            'https://telegra.ph/file/9be7abad4e4f96ce22ed6.jpg',
            'https://telegra.ph/file/e9f3ee7a3dd040319f8ce.jpg',
            'https://telegra.ph/file/2c1bf2653c6c97fc96d13.jpg'
        ]);

        let ente = await conn.resize(hwaifu.getRandom(), 300, 150); // Pastikan conn dan hwaifu sudah didefinisikan
        global.terkadang = ente;
        global.ctx = pickRandom([global.adForward, global.adReply]);

        // Penanganan error untuk adForward
        try {
            global.adForward = {
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    externalAdReply: {
                        title: global.ucapan,
                        body: 'The Journey of Elaina',
                        mediaUrl: global.sgc, // Pastikan sgc sudah didefinisikan
                        description: 'Elaina-MultiDevice',
                        previewType: 'PHOTO',
                        thumbnail: thumbnailBuffer,
                        sourceUrl: global.sig // Pastikan sig sudah didefinisikan
                    }
                }
            };
        } catch (e) {
            console.error(`Error setting adForward: ${e}`);
            global.adForward = {};
        }

        // Variabel global lainnya
        global.fpayment = {
            "key": {
                "remoteJid": "0@s.whatsapp.net",
                "fromMe": false,
                "id": "BAE595C600522C9C",
                "participant": "0@s.whatsapp.net"
            },
            "message": {
                "requestPaymentMessage": {
                    "currencyCodeIso4217": wm,
                    "amount1000": fsizedoc,
                    "requestMessage": {
                        "key": {
                            "remoteJid": "0@s.whatsapp.net",
                            "fromMe": false,
                            "id": "00000000000000000000",
                            "participant": "0@s.whatsapp.net"
                        },
                        "message": {
                            "requestPaymentMessage": {
                                "currencyCodeIso4217": wm,
                                "amount1000": fsizedoc,
                                "requestMessage": {
                                    "key": {
                                        "remoteJid": "0@s.whatsapp.net",
                                        "fromMe": false,
                                        "id": "00000000000000000000",
                                        "participant": "0@s.whatsapp.net"
                                    },
                                    "message": {
                                        "requestPaymentMessage": {
                                            "currencyCodeIso4217": wm,
                                            "amount1000": fsizedoc
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

		global.fakeig = {
         contextInfo: { externalAdReply: { showAdAttribution: true,
            mediaUrl: "https://Instagram.com/Xiao_yan_21",
            mediaType: "VIDEO",
            description: "https://Instagram.com/Xiao_yan_21", 
            title: 'Elaina-MultiDevice',
            body: wm,
            thumbnailUrl: pp,
            sourceUrl: sig
    }
    } }
global.fakefb = {
         contextInfo: { externalAdReply: { showAdAttribution: true,
            mediaUrl: "https://Facebook.com/Fay.cats.Kun",
            mediaType: "VIDEO",
            description: "https://www.Facebook.com/Fay.cats.kun", 
            title: 'Elaina-MultiDevice',
            body: wm,
            thumbnailUrl: pp,
            sourceUrl: sgc
    }
    } }
	global.fakestatus = {key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {})},message: { "imageMessage": {"url": sgc,"mimetype": "image/jpeg","caption": 'Hello World!', "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=","fileLength": "28777","height": 1080,"width": 1079,"mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=","fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=","directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69","mediaKeyTimestamp": "1610993486","jpegThumbnail": fs.readFileSync('./elaina.jpg'),"scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="}}}
	// Fake ðŸ¤¥
		global.ftroli = { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net' }, message: { orderMessage: { itemCount: 2023, status: 1, thumbnail: await conn.resize(thumb2,300, 300), surface: 1, message: 'ᴊᴜsᴛ ᴛʀᴏʟɪ', orderTitle: wm, sellerJid: '0@s.whatsapp.net' } } }
		global.fkontak = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': 'ᴇℓαιηα вσтѕ мα∂є ву ᴄʟᴀɪʀᴇ ❤', 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${wm},;;;\nFN:${wm},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./thumbnail.jpg'), thumbnail: fs.readFileSync('./thumbnail.jpg'),sendEphemeral: true}}}
        global.fvn = {
            key: { 
                 fromMe: false,
                 participant: `0@s.whatsapp.net`, ...(m.chat ? 
            { remoteJid: "6285736178354-1625305606@g.us" } : {}) 
                       },
            message: { 
               "audioMessage": {
                        "mimetype":"audio/ogg; codecs=opus",
                        "seconds": "999999999999",
                        "ptt": "true"
                               }
                             } 
                            }
               
                global.ftextt = {
            key: { 
                 fromMe: false,
                 participant:`0@s.whatsapp.net`, ...(m.chat ? 
            { remoteJid: "6285736178354-1625305606@g.us" } : {}) 
                       },
            message: { 
               "extendedTextMessage": {
                        "text":wm,
                        "title": wm,
                        'jpegThumbnail': fs.readFileSync('./thumbnail.jpg')
                               }
                             } 
                            }
               
                  global.fliveLoc = {
            key:
            { fromMe: false,
            participant: `0@s.whatsapp.net`, ...(m.chat  ? 
            { remoteJid: "status@broadcast" } : {}) },
            message: { "liveLocationMessage": { "caption":"мα∂є ву єℓαιηα вσтѕ","h": `${wm}`, 'jpegThumbnail': fs.readFileSync('./thumbnail.jpg')}}
           }
               
                  global.fliveLoc2 = {
            key:
            { fromMe: false,
            participant: `0@s.whatsapp.net`, ...(m.chat ? 
            { remoteJid: "status@broadcast" } : {}) },
            message: { "liveLocationMessage": { "title": "ImYanXiao","h": wm, 'jpegThumbnail': fs.readFileSync('./thumbnail.jpg')}}
           }
           
           global.fpoll = {
			key: {
				participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast'
			},
			message: {
				pollCreationMessage: {
					name: 'Hai kak ' + name
				}
			}
		}
               
                   global.ftoko = {
		key: {
			fromMe: false,
			participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {})
		},
		message: {
			"productMessage": {
				"product": {
					"productImage":{
						"mimetype": "image/jpeg",
						"jpegThumbnail": await conn.resize(thumb, 300,150) 
					},
					"title": 'Elaina (イレイナ)',
					"description": "",
					"currencyCode": "IDR",
					"priceAmount1000": `999999999`,
					"retailerId": "Self Bot",
					"productImageCount": 999
				},
				"businessOwnerJid": `0@s.whatsapp.net`
		}
	}
									 }
                     global.fdocs = {
           key : {
                  participant : '0@s.whatsapp.net'
                               },
              message: {
                           "documentMessage": {
                           "title": 'Elaina.pptx', 
                           "jpegThumbnail": await conn.resize(urls, 300,150) 
                                 }
                               }
                             }
               
                    global.fgclink = {
           "key": {
               "fromMe": false,
               "participant": "0@s.whatsapp.net",
               "remoteJid": "0@s.whatsapp.net"
           },
           "message": {
               "groupInviteMessage": {
                   "groupJid": "6285736178354-1625305606@g.us",
                   "inviteCode": "null",
                   "groupName": "Kawan Elaina", 
                   "caption": 'Err 404', 
                   'jpegThumbnail': await conn.resize(img, 300,150) 
               }
           }
       }
       global.fimg = {
		key: {
			participant: '0@s.whatsapp.net'
		},
		message: {
			imageMessage: {
				url: pp,
				mimetype: 'image/jpeg',
				fileLength: global.fsizedoc,
				height: 306,
				width: 366,
				jpegThumbnail: fs.readFileSync('./thumbnail.jpg')
			}
		}
	}
		global.fimgv = {
		key: {
			participant: '0@s.whatsapp.net'
		},
		message: {
			imageMessage: {
				url: pp,
				mimetype: 'image/jpeg',
				fileLength: global.fsizedoc,
				height: 306,
				width: 366,
				jpegThumbnail: fs.readFileSync('./thumbnail.jpg'),
				viewOnce: true
			}
		}
	}
			
			global.flokasi = {
	key : {
           participant : '0@s.whatsapp.net'
                        },
       message: {
                    locationMessage: {
                    name: 'Japan`s',
                    jpegThumbnail: await conn.resize(urls, 300,150) 
                          }
                        }
                      }
       
                    global.fgif = {
            key: { 
                 fromMe: false,
                 participant: `0@s.whatsapp.net`, ...(m.chat ? 
            { remoteJid: "6285736178354-1625305606@g.us" } : {}) 
                       },
            message: { 
                        "videoMessage": { 
                        "title": '© єℓαιηα',
                        "h": `Hmm`,
                        'seconds': '999999999', 
                        'gifPlayback': 'true', 
                        'caption': 'Amv - Elaina.mp4',
                        'jpegThumbnail': fs.readFileSync ('./thumbnail.jpg')                             }
                              }
                             }
                            // Random Pick Fake
                             let pft = [global.fakestatus, global.fpoll, global.fimg, global.fimgv, global.fpayment, global.ftroli, global.fkontak, global.fvn, global.fvid, global.ftextt, global.fliveLoc, global.fliveLoc2, global.ftoko, global.fdocs, global.fgclink, global.fgif,global.flokasi]
			               
		                   // Pick Random
		                     global.fakes = pft.getRandom()

    } catch (e) {
        console.error(`Error in handler.all: ${e}`);
    }

    return handler;
};

export default handler;