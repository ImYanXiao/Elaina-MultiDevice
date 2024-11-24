// Inventor : Aguz Familia/@FokusDotId (Fokus ID)
// Edited : ImYanXiao

import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())];
}

function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH');
    if (time >= 18) return "Selamat malam🌃";
    if (time >= 15) return "Selamat sore🌇";
    if (time >= 10) return "Selamat siang🌅";
    if (time >= 4) return "Selamat pagi⛅";
    return "Selamat Dini hari🌌";
}

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
        return Buffer.from(res.data);
    } catch (e) {
        console.error(`Error: ${e}`);
        return null;
    }
};

let handler = m => m;

handler.all = async function (m) {
    const name = await conn.getName(m.sender) 
	let pp;
	try {
		pp = await this.profilePictureUrl(m.sender, 'image')
	} catch (e) {
	    pp = 'https://artikel.rumah123.com/wp-content/uploads/sites/41/2023/09/12160753/gambar-foto-profil-whatsapp-kosong.jpg'
	}
		
		// Module 
        global.fs = await import('fs');
        global.fetch = (await import('node-fetch')).default;
        global.bochil = require('@bochilteam/scraper');

    
		global.ucapan = ucapan()
		global.ephemeral = '86400' // 86400 = 24jam, kalo ingin di hilangkan ganti '86400' jadi 'null' atau ''
         
 try {
    global.adReply = {
        contextInfo: {
            forwardingScore: 9999,
            externalAdReply: {
                showAdAttribution: true,
                title: global.ucapan,
                body: wm,
                mediaUrl: sgc,
                description: wm3,
                previewType: "PHOTO",
                thumbnail: await (await fetch(pp)).buffer(),
                sourceUrl: "https://github.com/ImYanXiao"
            }
        }
    };
} catch (e) {
    console.error(`Error setting adReply: ${e}`);
    global.adReply = {};
}
        
        
   try { 
        global.doc = pickRandom(["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/pdf", "application/vnd.android.package-archive", "application/zip"])
		
        global.social = pickRandom([global.sgh, global.sig, global.snh, global.sgc]) 
        try {
    global.flaa = JSON.parse(fs.readFileSync('./lib/flaming.json'));
    global.waifu = JSON.parse(fs.readFileSync('./lib/waifu.json'));
    global.pic = pickRandom(global.waifu); // pastikan waifu didefinisikan
    global.flaaa = pickRandom(global.flaa); // pastikan flaas didefinisikan
} catch (e) {
    console.error(`Error initializing global variables: ${e}`);
}


		
		global.fakeig = {
         contextInfo: { externalAdReply: { showAdAttribution: true,
            mediaUrl: global.sig,
            mediaType: "VIDEO",
            description: global.sig, 
            title: wm3,
            body: wm,
            thumbnailUrl: pp,
            sourceUrl: sig
    }
    } }
global.fakefb = {
         contextInfo: { externalAdReply: { showAdAttribution: true,
            mediaUrl: "https://Facebook.com/zuck",
            mediaType: "VIDEO",
            description: "https://www.Facebook.com/zuck", 
            title: wm3,
            body: wm,
            thumbnailUrl: pp,
            sourceUrl: sgc
    }
    } }
		// Fake Reply/Quoted
		
		global.flocation = {
	key : {
           participant : '0@s.whatsapp.net'
                        },
       message: {
                    locationMessage: {
                    name: 'Japan`s',
                    jpegThumbnail: fs.readFileSync('./thumbnail.jpg')
                          }
                        }
                      }
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
						"requestFrom": "0@s.whatsapp.net",
						"noteMessage": {
							"extendedTextMessage": {
								"text": "Hai Kak " + name
							}
						},
						"expiryTimestamp": fsizedoc,
						"amount": {
							"value": fsizedoc,
							"offset": fsizedoc,
							"currencyCode": wm
						}
					}
				}
			}
		global.ftroli = { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net' }, message: { orderMessage: { itemCount: 2023, status: 1, thumbnail: await conn.resize(thumb,300,150), surface: 1, message: wm, orderTitle: wm, sellerJid: '0@s.whatsapp.net' } } }
		global.fkontak = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': wm, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${wm},;;;\nFN:${wm},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./thumbnail.jpg'), thumbnail: fs.readFileSync('./thumbnail.jpg'),sendEphemeral: true}}}
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
                 participant: `0@s.whatsapp.net`, ...(m.chat ? 
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
            message: { "liveLocationMessage": { "caption":"Made By: " + global.nameown ,"h": `${wm}`, 'jpegThumbnail': fs.readFileSync('./thumbnail.jpg')}}
           }
               
                  global.fliveLoc2 = {
            key:
            { fromMe: false,
            participant: `0@s.whatsapp.net`, ...(m.chat ? 
            { remoteJid: "status@broadcast" } : {}) },
            message: { "liveLocationMessage": { "title": "ImYanXiao","h": wm, 'jpegThumbnail': fs.readFileSync('./thumbnail.jpg')}}
           }
               
                   global.ftoko = {
       key: {
                   fromMe: false,
                   participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "17608914335@s.whatsapp.net" } : {})
               },
               message: {
                   "productMessage": {
                       "product": {
                           "productImage":{
                               "mimetype": "image/jpeg",
                               "jpegThumbnail": fs.readFileSync('./thumbnail.jpg') //Gambarnye
                           },
                           "title": wm, //Terserah Di Isi apa
                           "description": wm3, 
                           "currencyCode": "USD",
                           "priceAmount1000": "20000000",
                           "retailerId": "Ghost",
                           "productImageCount": 1
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
                           "title": wm, 
                           "jpegThumbnail": fs.readFileSync('./thumbnail.jpg')
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
                   "caption": wm, 
                   'jpegThumbnail': fs.readFileSync('./thumbnail.jpg')
               }
           }
       }
       global.fimg = {
			key: {
				participant: '0@s.whatsapp.net'
			},
			message: {
				imageMessage: {
					url: pic,
					mimetype: 'image/jpeg',
					fileLength: fsizedoc,
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
						url: pic,
						mimetype: 'image/jpeg',
						fileLength: fsizedoc,
						height: 306,
						width: 366,
						jpegThumbnail: fs.readFileSync('./thumbnail.jpg'),
						viewOnce: true
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
                        "title": wm,
                        "h": `Hmm`,
                        'seconds': '999999999', 
                        'gifPlayback': 'true', 
                        'caption': wm,
                        'jpegThumbnail': fs.readFileSync('./thumbnail.jpg')
                               }
                              }
                             }
                                      // Random Pick Fake
                             let pft = [global.fimg, global.flocation, global.fimgv, global.fpayment, global.ftroli, global.fkontak, global.fvn, global.fvid, global.ftextt, global.fliveLoc, global.fliveLoc2, global.ftoko, global.fdocs, global.fgclink, global.fgif]
			                   // Get Random
		                     global.fakes = pft.getRandom()
		        
	} catch (e) {
        console.error(`Error in handler.all: ${e}`);
    }
};

export default handler;
