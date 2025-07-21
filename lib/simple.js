// To Simple Function
import path from 'path'
import { toAudio } from './converter.js'
import chalk from 'chalk'
import fetch from 'node-fetch'
import PhoneNumber from 'awesome-phonenumber'
import fs from 'fs'
import os from 'os'
import util from 'util'
import {fileTypeFromBuffer} from 'file-type';
import { format } from 'util'
import { fileURLToPath } from 'url'
import store from './store.js'
import Jimp from 'jimp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * @type {import('@adiwajshing/baileys')}
 */
const {
    default: _makeWaSocket,
    proto,
    areJidsSameUser, 
    downloadContentFromMessage,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    getDevice, 
    WAMessageStubType,
    extractMessageContent,
    jidDecode, 
    jidNormalizedUser, 
    MessageType,
    Mimetype
} = (await import('@rexxhayanasi/elaina-bail')).default

export function makeWASocket(connectionOptions, options = {}) {
    let conn = (_makeWaSocket)(connectionOptions)

    let sock = Object.defineProperties(conn, {
        chats: {
            value: { ...(options.chats || {}) },
            writable: true
        },
        decodeJid: {
            value(jid) {
                if (!jid || typeof jid !== 'string') return (!nullish(jid) && jid) || null
                return jid.decodeJid()
            }
        },
        logger: {
            get() {
                return {
                    info(...args) {
                        console.log(
                            chalk.bold.bgRgb(51, 204, 51)('INFO '),
                            `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                            chalk.cyan(format(...args))
                        )
                    },
                    error(...args) {
                        console.log(
                            chalk.bold.bgRgb(247, 38, 33)('ERROR '),
                            `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                            chalk.rgb(255, 38, 0)(format(...args))
                        )
                    },
                    warn(...args) {
                        console.log(
                            chalk.bold.bgRgb(255, 153, 0)('WARNING '),
                            `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                            chalk.redBright(format(...args))
                        )
                    },
                    trace(...args) {
                        console.log(
                            chalk.grey('TRACE '),
                            `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                            chalk.white(format(...args))
                        )
                    },
                    debug(...args) {
                        console.log(
                            chalk.bold.bgRgb(66, 167, 245)('DEBUG '),
                            `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                            chalk.white(format(...args))
                        )
                    }
                }
            },
            enumerable: true
        },
        getFile: {
    /**
     * getBuffer hehe
     * @param {fs.PathLike | Buffer | string} PATH - The path to the file, or a URL, or a base64 string, or a buffer
     * @param {Boolean} saveToFile - Whether to save the file locally
     * @returns {Promise<Object>} - An object containing file data, type, and utility functions
     */
    async value(PATH, saveToFile = false) {
        try {
            let res, filename;
            let data = Buffer.isBuffer(PATH) 
                ? PATH 
                : PATH instanceof ArrayBuffer 
                    ? Buffer.from(PATH) 
                    : /^data:.*?\/.*?;base64,/i.test(PATH) 
                        ? Buffer.from(PATH.split(',')[1], 'base64') 
                        : /^https?:\/\//.test(PATH) 
                            ? (res = await fetch(PATH), await res.buffer()) 
                            : fs.existsSync(PATH) 
                                ? (filename = PATH, fs.readFileSync(PATH)) 
                                : typeof PATH === 'string' 
                                    ? Buffer.from(PATH) 
                                    : Buffer.alloc(0); // Empty buffer if all checks fail

            if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer');

            const type = await fileTypeFromBuffer(data) || {
                mime: 'application/octet-stream',
                ext: 'bin'
            };

            if (data && saveToFile && !filename) {
                filename = path.join(__dirname, '../tmp/' + Date.now() + '.' + type.ext);
                await fs.promises.writeFile(filename, data);
            }

            return {
                res,               // HTTP response object (if applicable)
                filename,          // Filename if saved to file
                ...type,           // File type (mime and extension)
                data,              // Buffer data
                deleteFile() {     // Utility to delete the file if saved
                    return filename && fs.promises.unlink(filename);
                }
            };
        } catch (err) {
            console.error('Error in getFile:', err);
            throw new Error('Failed to process the file: ' + err.message);
        }
    },
    enumerable: true
},
        waitEvent: {
    /**
     * Wait for a specific event to be emitted
     * @param {String} eventName - The name of the event to wait for
     * @param {Function} is - A function that returns true when the desired condition is met
     * @param {Number} maxTries - The maximum number of attempts to wait for the event (default: 25)
     * @param {Number} timeoutMs - Optional timeout in milliseconds (default: 5000 ms)
     * @returns {Promise<*>} - Resolves with event data if successful, or rejects with an error
     */
    value(eventName, is = () => true, maxTries = 25, timeoutMs = 5000) {
        return new Promise((resolve, reject) => {
            let tries = 0;
            let timeout;

            // Function to handle event emission
            const onEvent = (...args) => {
                tries++;
                if (is(...args)) {  // Check if condition is met
                    clearTimeout(timeout); // Clear timeout when condition is met
                    conn.ev.off(eventName, onEvent); // Unsubscribe from the event
                    resolve(...args); // Resolve the promise with event data
                } else if (tries >= maxTries) {
                    clearTimeout(timeout); // Clear timeout if max tries reached
                    conn.ev.off(eventName, onEvent); // Unsubscribe from the event
                    reject(new Error(`Max tries reached for event: ${eventName}`));
                }
            };

            // Listen for the event
            conn.ev.on(eventName, onEvent);

            // Set a timeout to reject the promise if the event takes too long
            timeout = setTimeout(() => {
                conn.ev.off(eventName, onEvent); // Unsubscribe from the event
                reject(new Error(`Timeout reached for event: ${eventName}`));
            }, timeoutMs);
        });
    },
    enumerable: true
},
        sendFile: {
    /**
     * Send Media/File with Automatic Type Specifier
     * @param {String} jid - WhatsApp JID to send the message to
     * @param {String|Buffer} path - The path to the file or a buffer
     * @param {String} filename - The name of the file (optional)
     * @param {String} caption - The caption for the media (optional)
     * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} quoted - Message to reply to (optional)
     * @param {Boolean} ptt - If the file is a voice note
     * @param {Object} options - Additional options for sending media
     * @returns {Promise<import('@adiwajshing/baileys').proto.WebMessageInfo>}
     */
    async value(jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) {
        try {
            // Get the file details
            let type = await conn.getFile(path, true);
            let { res, data: file, filename: pathFile } = type;

            if (res && res.status !== 200 || file.length <= 65536) {
                try { throw { json: JSON.parse(file.toString()) } }
                catch (e) { if (e.json) throw e.json }
            }

            // Determine the media type
            const getMimeType = function (mime, options) {
                if (/webp/.test(mime) || (options.asSticker && /image/.test(mime))) return 'sticker';
                if (/image/.test(mime) || (options.asImage && /webp/.test(mime))) return 'image';
                if (/video/.test(mime)) return 'video';
                if (/audio/.test(mime)) return 'audio';
                //return options.asDocument ? 'document' : 'file'; // Default to document or file
		return 'document';
            };
            let mtype = getMimeType(type.mime, options);
            let mimetype = options.mimetype || type.mime;

            // Convert audio if needed
            if (/audio/.test(type.mime)) {
                let convert = await toAudio(file, type.ext);
                file = convert.data;
                pathFile = convert.filename;
                mtype = 'audio';
                mimetype = options.mimetype || 'audio/ogg; codecs=opus';
            }

            // Prepare message options
            let message = {
                caption, 
                ptt, 
                [mtype]: { url: pathFile }, 
                mimetype, 
                fileName: filename || pathFile.split('/').pop(),
                ...options
            };

            // Send the message
            let opt = { filename, quoted, ptt, ...options };
            let m = await conn.sendMessage(jid, message, opt);

            return m;
        } catch (err) {
            console.error('Failed to send file:', err);
            throw new Error('Failed to send media file: ' + err.message);
        }
    },
    enumerable: true
}, 
        sendContact: {
    /**
     * Send Contact
     * @param {String} jid - WhatsApp JID to send the message to
     * @param {String[][]|String[]} data - Array of contacts [[number, name], ...] or a single contact [number, name]
     * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} quoted - The message to reply to (optional)
     * @param {Object} options - Additional options for sending the message
     * @returns {Promise<import('@adiwajshing/baileys').proto.WebMessageInfo>}
     */
    async value(jid, data, quoted, options = {}) {
        try {
            // If single contact is provided, wrap it in an array
            if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data];

            // Validate and prepare contacts
            let contacts = [];
            for (let [number, name] of data) {
                number = number.replace(/[^0-9]/g, ''); // Clean the phone number
                if (!number) throw new Error('Invalid phone number provided.');

                let njid = number + '@s.whatsapp.net';
                
                // Optionally fetch business profile if it exists
                let biz = await conn.getBusinessProfile(njid).catch(_ => null) || {};
                let vname = conn.chats[njid]?.vname || conn.getName(njid) || name;
                let bizDescription = biz.description ? `\nX-WA-BIZ-NAME:${vname}\nX-WA-BIZ-DESCRIPTION:${biz.description.replace(/\n/g, '\\n')}` : '';

                // Construct the vCard
                let vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}${bizDescription}
END:VCARD`.trim();

                contacts.push({ vcard, displayName: name });
            }

            // Send the contact message
            return await conn.sendMessage(jid, {
                ...options,
                contacts: {
                    displayName: (contacts.length > 1 ? `${contacts.length} contacts` : contacts[0].displayName) || null,
                    contacts
                }
            }, { quoted, ...options });
        } catch (err) {
            console.error('Error in sendContact:', err);
            throw new Error('Failed to send contact: ' + err.message);
        }
    },
    enumerable: true
}, 
    sendContactArray: {
    /**
     * Send multiple contacts with additional information (vCard format)
     * @param {String} jid - WhatsApp JID to send the message to
     * @param {String[][]} data - Array of contacts [[number, name, org, label, email, address, website, label2], ...]
     * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} quoted - The message to reply to (optional)
     * @param {Object} options - Additional options for sending the message
     * @returns {Promise<import('@adiwajshing/baileys').proto.WebMessageInfo>}
     */
    async value(jid, data, quoted, options = {}) {
        try {
            // Validate and prepare contacts
            let contacts = [];
            for (let [number, name, org, label, email, address, website, label2] of data) {
                number = number.replace(/[^0-9]/g, ''); // Clean the phone number
                if (!number) throw new Error('Invalid phone number provided.');

                let njid = number + '@s.whatsapp.net';
                
                // Optionally fetch business profile if it exists
                let biz = await conn.getBusinessProfile(njid).catch(_ => null) || {};
                let vname = conn.chats[njid]?.vname || conn.getName(njid) || name;
                let bizDescription = biz.description ? `\nX-WA-BIZ-NAME:${vname}\nX-WA-BIZ-DESCRIPTION:${biz.description.replace(/\n/g, '\\n')}` : '';

                // Construct the vCard
                let vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, '\\n')}
ORG:${org || ''}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.EMAIL;type=INTERNET:${email || ''}
item1.X-ABLabel:📧 Email
item2.ADR:;;${address || ''};;;;
item2.X-ABADR:ac
item2.X-ABLabel:📍 Region
item3.URL:${website || ''}
item3.X-ABLabel:Website
item4.X-ABLabel:${label2 || ''}
${bizDescription}
END:VCARD`.trim();

                contacts.push({ vcard, displayName: name });
            }

            // Send the contact message
            return await conn.sendMessage(jid, {
                ...options,
                contacts: {
                    displayName: (contacts.length > 1 ? `${contacts.length} contacts` : contacts[0].displayName) || null,
                    contacts
                }
            }, { quoted, ...options });
        } catch (err) {
            console.error('Error in sendContactArray:', err);
            throw new Error('Failed to send contact array: ' + err.message);
        }
    },
    enumerable: true
}, 
	/** Resize Image
      *
      * @param {Buffer} Buffer (Only Image)
      * @param {Numeric} Width
      * @param {Numeric} Height
      */
      resize: {
      async value(image, width, height) {
       let oyy = await Jimp.read(image)
       let kiyomasa = await oyy.resize(width, height).getBufferAsync(Jimp.MIME_JPEG)
       return kiyomasa
      }
    },
        reply: {
            /**
             * Reply to a message
             * @param {String} jid
             * @param {String|Buffer} text
             * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} quoted
             * @param {Object} options
             */
            value(jid, text = '', quoted, options) {
                let pp = conn.profilePictureUrl(conn.user.jid, 'image')
                return Buffer.isBuffer(text) ? conn.sendFile(jid, text, 'file', '', quoted, false, options) : conn.sendMessage(jid, { ...options,
                text,
                mentions: conn.parseMention(text),
                contextInfo: global.adReply.contextInfo,
                mentions: conn.parseMention(text),
                ...options }, {
                    quoted,
                    ephemeralExpiration: global.ephemeral,
                    ...options
                })
            }
        },
         sendMedia: {
    /**
     * Send Media/File with Automatic Type Specifier
     * @param {String} jid - WhatsApp JID to send the message to
     * @param {String|Buffer} path - The path to the file or a buffer
     * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} quoted - Message to reply to (optional)
     * @param {Object} options - Additional options for sending media
     * @returns {Promise<import('@adiwajshing/baileys').proto.WebMessageInfo>}
     */
    async value(jid, path, quoted, options = {}) {
        try {
            // Get the file details
            let type = await conn.getFile(path, true);
            let { ext, mime, data: file } = type;

            // Validate media type
            if (!mime) throw new Error('File type could not be determined.');
            let messageType = mime.split('/')[0];
            
            /**
     * Helper to determine the media type
     * @param {String} mime - The MIME type of the file
     * @param {Object} options - Options that may affect media type selection
     * @returns {String} - The media type ('image', 'video', 'audio', 'document')
     */
            let getMediaType = function (mime, options) {
        if (options.asDocument) return 'document'; // Force sending as document
        if (/image/.test(mime)) return 'image';
        if (/video/.test(mime)) return 'video';
        if (/audio/.test(mime)) return 'audio';
        return null;
    }

            let mediaType = getMediaType(mime, options);
            if (!mediaType) throw new Error('Unsupported media type.');

            // Prepare message based on the media type
            let message = {
                [mediaType]: file,
                mimetype: mime,
                fileName: options.fileName || path.split('/').pop(),
                ...options
            };

            // Send the media message
            return await conn.sendMessage(jid, message, { quoted });
        } catch (err) {
            console.error('Error in sendMedia:', err);
            throw new Error('Failed to send media: ' + err.message);
        }
    },
    enumerable: true
}, 
        /**
    *status 
    */
    updateProfileStatus: {
    async value(status) {
        return await conn.query({
            tag: 'iq',
            attrs: {
                to: 's.whatsapp.net',
                type: 'set',
                xmlns: 'status',
            },
            content: [
                {
                    tag: 'status',
                    attrs: {},
                    content: Buffer.from(status, 'utf-8')
                }
            ]
        })
        }
    },
        sendButton: {
            /**
             * send Button
             * @param {String} jid
             * @param {String} text
             * @param {String} footer
             * @param {Buffer} buffer
             * @param {String[] | String[][]} buttons
             * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} quoted
             * @param {Object} options
             */
            async value(jid, text = '', footer = '', buffer, buttons, quoted, options) {
                let type
                if (Array.isArray(buffer)) (options = quoted, quoted = buttons, buttons = buffer, buffer = null)
                else if (buffer) try { (type = await conn.getFile(buffer), buffer = type.data) } catch { buffer = null }
                if (!Array.isArray(buttons[0]) && typeof buttons[0] === 'string') buttons = [buttons]
                if (!options) options = {}
                let message = {
                    ...options,
                    [buffer ? 'caption' : 'text']: text || '',
                    footer,
                    buttons: buttons.map(btn => ({
                        buttonId: !nullish(btn[1]) && btn[1] || !nullish(btn[0]) && btn[0] || '',
                        buttonText: {
                            displayText: !nullish(btn[0]) && btn[0] || !nullish(btn[1]) && btn[1] || ''
                        }
                    })),
                    ...(buffer ?
                        options.asLocation && /image/.test(type.mime) ? {
                            location: {
                                ...options,
                                jpegThumbnail: buffer
                            }
                        } : {
                            [/video/.test(type.mime) ? 'video' : /image/.test(type.mime) ? 'image' : 'document']: buffer
                        } : {})
                }

                return await conn.sendMessage(jid, message, {
                    quoted,
                    upload: conn.waUploadToServer,
                    ...options
                })
            },
            enumerable: true
        },
    /**
    * Send Payment
    */
                        sendPayment: {
    async value(jid, amount, currency, text = '', from, image, options) {
	let file = await conn.resize(image, 300, 150)
	let a = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BOV","BRL","BSD","BTN","BWP","BYR","BZD","CAD","CDF","CHE","CHF","CHW","CLF","CLP","CNY","COP","COU","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","INR","IQD","IRR","ISK","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LTL","LVL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRO","MUR","MVR","MWK","MXN","MXV","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","SSP","STD","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","USN","USS","UYI","UYU","UZS","VEF","VND","VUV","WST","XAF","XAG","XAU","XBA","XBB","XBC","XBD","XCD","XDR","XFU","XOF","XPD","XPF","XPT","XTS","XXX","YER","ZAR","ZMW"]
    let b = a[Math.floor(Math.random() * a.length)]
    const requestPaymentMessage = { amount: {
            currencyCode: currency || b,
            offset: 0,
            value: amount || 9.99
        },
        expiryTimestamp: 0,
        amount1000: (amount || 9.99) * 1000,
        currencyCodeIso4217: currency || b,
        requestFrom: from || '0@s.whatsapp.net',
        noteMessage: {
            extendedTextMessage: {
                text: text || 'Example Payment Message'
            }
        },
        background: !!image ? file : undefined
    };
    return await conn.relayMessage(jid, { requestPaymentMessage }, { ...options });
}
},
/**
    * Send Poll
    */
    sendPoll: {
            async value(jid, name = '', optiPoll, options) {
                if (!Array.isArray(optiPoll[0]) && typeof optiPoll[0] === 'string') optiPoll = [optiPoll]
                if (!options) options = {}
                const pollMessage = {
        name: name,
        options: optiPoll.map(btn => ({
                            optionName: !nullish(btn[0]) && btn[0] || ''
                    })),
                    selectableOptionsCount: 1
        }
                return conn.relayMessage(jid, { pollCreationMessage: pollMessage }, { ...options });
                }
        },
        downloadAndSaveMediaMessage: {
    /**
     * Download and save a media message to a file
     * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} message - The message containing media
     * @param {String} filename - The base name of the file to save
     * @param {Boolean} attachExtension - Whether to attach the file extension based on the media type
     * @returns {Promise<String>} - The path to the saved file
     */
    async value(message, filename, attachExtension = true) {
        try {
            // Determine the quoted message from the provided message
            let quoted = message.msg || message;
            let mime = (message.msg || message).mimetype || '';
            let messageType = mime.split('/')[0];

            // Check if the message contains media
            if (!['image', 'video', 'audio', 'document'].includes(messageType)) {
                throw new Error('Message does not contain downloadable media.');
            }

            // Download content from the message
            const stream = await downloadContentFromMessage(quoted, messageType);
            let buffer = Buffer.from([]);

            // Collect chunks of data
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            // Determine the file type and extension
            let fileType = await fileTypeFromBuffer(buffer);
            if (!fileType) {
                fileType = { ext: 'bin', mime: 'application/octet-stream' }; // Fallback if type cannot be determined
            }

            // Construct the final filename
            const trueFileName = attachExtension ? `${filename}.${fileType.ext}` : filename;

            // Save the file
            await fs.promises.writeFile(trueFileName, buffer);

            return trueFileName; // Return the path to the saved file
        } catch (err) {
            console.error('Error downloading and saving media message:', err);
            throw new Error('Failed to download and save media message: ' + err.message);
        }
    },
    enumerable: true
}, 
        sendHydrated: {
            /**
             * 
             * @param {String} jid 
             * @param {String} text 
             * @param {String} footer 
             * @param {fs.PathLike} buffer
             * @param {String|string[]} url
             * @param {String|string[]} urlText
             * @param {String|string[]} call
             * @param {String|string[]} callText
             * @param {String[][]} buttons
             * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} quoted
             * @param {Object} options
             */
            async value(jid, text = '', footer = '', buffer, url, urlText, call, callText, buttons, quoted, options) {
                let type
                if (buffer) try { (type = await conn.getFile(buffer), buffer = type.data) } catch { buffer = buffer }
                if (buffer && !Buffer.isBuffer(buffer) && (typeof buffer === 'string' || Array.isArray(buffer))) (options = quoted, quoted = buttons, buttons = callText, callText = call, call = urlText, urlText = url, url = buffer, buffer = null)
                if (!options) options = {}
                let templateButtons = []
                if (url || urlText) {
                    if (!Array.isArray(url)) url = [url]
                    if (!Array.isArray(urlText)) urlText = [urlText]
                    templateButtons.push(...(
                        url.map((v, i) => [v, urlText[i]])
                            .map(([url, urlText], i) => ({
                                index: templateButtons.length + i + 1,
                                urlButton: {
                                    displayText: !nullish(urlText) && urlText || !nullish(url) && url || '',
                                    url: !nullish(url) && url || !nullish(urlText) && urlText || ''
                                }
                            })) || []
                    ))
                }
                if (call || callText) {
                    if (!Array.isArray(call)) call = [call]
                    if (!Array.isArray(callText)) callText = [callText]
                    templateButtons.push(...(
                        call.map((v, i) => [v, callText[i]])
                            .map(([call, callText], i) => ({
                                index: templateButtons.length + i + 1,
                                callButton: {
                                    displayText: !nullish(callText) && callText || !nullish(call) && call || '',
                                    phoneNumber: !nullish(call) && call || !nullish(callText) && callText || ''
                                }
                            })) || []
                    ))
                }
                if (buttons.length) {
                    if (!Array.isArray(buttons[0])) buttons = [buttons]
                    templateButtons.push(...(
                        buttons.map(([text, id], index) => ({
                            index: templateButtons.length + index + 1,
                            quickReplyButton: {
                                displayText: !nullish(text) && text || !nullish(id) && id || '',
                                id: !nullish(id) && id || !nullish(text) && text || ''
                            }
                        })) || []
                    ))
                }
                let message = {
                    ...options,
                    [buffer ? 'caption' : 'text']: text || '',
                    footer,
                    templateButtons,
                    ...(buffer ?
                        options.asLocation && /image/.test(type.mime) ? {
                            location: {
                                ...options,
                                jpegThumbnail: buffer
                            }
                        } : {
                            [/video/.test(type.mime) ? 'video' : /image/.test(type.mime) ? 'image' : 'document']: buffer
                        } : {})
                }
                return await conn.sendMessage(jid, message, {
                    quoted,
                    upload: conn.waUploadToServer,
                    ...options
                })
            },
            enumerable: true
        },
        sendHydrated2: {
            /**
             * 
             * @param {String} jid 
             * @param {String} text 
             * @param {String} footer 
             * @param {fs.PathLike} buffer
             * @param {String|string[]} url
             * @param {String|string[]} urlText
             * @param {String|string[]} call
             * @param {String|string[]} callText
             * @param {String[][]} buttons
             * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} quoted
             * @param {Object} options
             */
            async value(jid, text = '', footer = '', buffer, url, urlText, url2, urlText2, buttons, quoted, options) {
                let type
                if (buffer) try { (type = await conn.getFile(buffer), buffer = type.data) } catch { buffer = buffer }
                if (buffer && !Buffer.isBuffer(buffer) && (typeof buffer === 'string' || Array.isArray(buffer))) (options = quoted, quoted = buttons, buttons = callText, callText = call, call = urlText, urlText = url, url = buffer, buffer = null)
                if (!options) options = {}
                let templateButtons = []
                if (url || urlText) {
                    if (!Array.isArray(url)) url = [url]
                    if (!Array.isArray(urlText)) urlText = [urlText]
                    templateButtons.push(...(
                        url.map((v, i) => [v, urlText[i]])
                            .map(([url, urlText], i) => ({
                                index: templateButtons.length + i + 1,
                                urlButton: {
                                    displayText: !nullish(urlText) && urlText || !nullish(url) && url || '',
                                    url: !nullish(url) && url || !nullish(urlText) && urlText || ''
                                }
                            })) || []
                    ))
                }
                if (url2 || urlText2) {
                    if (!Array.isArray(url2)) url2 = [url2]
                    if (!Array.isArray(urlText2)) urlText2 = [urlText2]
                    templateButtons.push(...(
                        url2.map((v, i) => [v, urlText2[i]])
                            .map(([url2, urlText2], i) => ({
                                index: templateButtons.length + i + 1,
                                urlButton: {
                                    displayText: !nullish(urlText2) && urlText2 || !nullish(url2) && url2 || '',
                                    url: !nullish(url2) && url2 || !nullish(urlText2) && urlText2 || ''
                                }
                            })) || []
                    ))
                }
                if (buttons.length) {
                    if (!Array.isArray(buttons[0])) buttons = [buttons]
                    templateButtons.push(...(
                        buttons.map(([text, id], index) => ({
                            index: templateButtons.length + index + 1,
                            quickReplyButton: {
                                displayText: !nullish(text) && text || !nullish(id) && id || '',
                                id: !nullish(id) && id || !nullish(text) && text || ''
                            }
                        })) || []
                    ))
                }
                let message = {
                    ...options,
                    [buffer ? 'caption' : 'text']: text || '',
                    footer,
                    templateButtons,
                    ...(buffer ?
                        options.asLocation && /image/.test(type.mime) ? {
                            location: {
                                ...options,
                                jpegThumbnail: buffer
                            }
                        } : {
                            [/video/.test(type.mime) ? 'video' : /image/.test(type.mime) ? 'image' : 'document']: buffer
                        } : {})
                }
                return await conn.sendMessage(jid, message, {
                    quoted,
                    upload: conn.waUploadToServer,
                    ...options
                })
            },
            enumerable: true
        },
        /**
     * ms to date
     * @param {String} ms
     */
msToDate: {
   async value (ms) {
          let days = Math.floor(ms / (24 * 60 * 60 * 1000));
          let daysms = ms % (24 * 60 * 60 * 1000);
          let hours = Math.floor((daysms) / (60 * 60 * 1000));
          let hoursms = ms % (60 * 60 * 1000);
          let minutes = Math.floor((hoursms) / (60 * 1000));
          let minutesms = ms % (60 * 1000);
          let sec = Math.floor((minutesms) / (1000));
          return days + " Hari " + hours + " Jam " + minutes + " Menit";
          // +minutes+":"+sec;
        }
    },
        delay: {
           async value (ms) {
                return new Promise((resolve, reject) => setTimeout(resolve, ms)
     ) }
           },
        cMod: {
            /**
             * cMod
             * @param {String} jid 
             * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} message 
             * @param {String} text 
             * @param {String} sender 
             * @param {*} options 
             * @returns 
             */
            value(jid, message, text = '', sender = conn.user.jid, options = {}) {
                if (options.mentions && !Array.isArray(options.mentions)) options.mentions = [options.mentions]
                let copy = message.toJSON()
                delete copy.message.messageContextInfo
                delete copy.message.senderKeyDistributionMessage
                let mtype = Object.keys(copy.message)[0]
                let msg = copy.message
                let content = msg[mtype]
                if (typeof content === 'string') msg[mtype] = text || content
                else if (content.caption) content.caption = text || content.caption
                else if (content.text) content.text = text || content.text
                if (typeof content !== 'string') {
                    msg[mtype] = { ...content, ...options }
                    msg[mtype].contextInfo = {
                        ...(content.contextInfo || {}),
                        mentionedJid: options.mentions || content.contextInfo?.mentionedJid || []
                    }
                }
                if (copy.participant) sender = copy.participant = sender || copy.participant
                else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
                if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
                else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
                copy.key.remoteJid = jid
                copy.key.fromMe = areJidsSameUser(sender, conn.user.id) || false
                return proto.WebMessageInfo.fromObject(copy)
            },
            enumerable: true
        },
        copyNForward: {
            /**
             * Exact Copy Forward
             * @param {String} jid
             * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} message
             * @param {Boolean|Number} forwardingScore
             * @param {Object} options
             */
            async value(jid, message, forwardingScore = true, options = {}) {
                let vtype
                if (options.readViewOnce && message.message.viewOnceMessage?.message) {
                    vtype = Object.keys(message.message.viewOnceMessage.message)[0]
                    delete message.message.viewOnceMessage.message[vtype].viewOnce
                    message.message = proto.Message.fromObject(
                        JSON.parse(JSON.stringify(message.message.viewOnceMessage.message))
                    )
                    message.message[vtype].contextInfo = message.message.viewOnceMessage.contextInfo
                }
                let mtype = Object.keys(message.message)[0]
                let m = generateForwardMessageContent(message, !!forwardingScore)
                let ctype = Object.keys(m)[0]
                if (forwardingScore && typeof forwardingScore === 'number' && forwardingScore > 1) m[ctype].contextInfo.forwardingScore += forwardingScore
                m[ctype].contextInfo = {
                    ...(message.message[mtype].contextInfo || {}),
                    ...(m[ctype].contextInfo || {})
                }
                m = generateWAMessageFromContent(jid, m, {
                    ...options,
                    userJid: conn.user.jid
                })
                await conn.relayMessage(jid, m.message, { messageId: m.key.id, additionalAttributes: { ...options } })
                return m
            },
            enumerable: true
        },
        fakeReply: {
            /**
             * Fake Replies
             * @param {String} jid
             * @param {String|Object} text
             * @param {String} fakeJid
             * @param {String} fakeText
             * @param {String} fakeGroupJid
             * @param {String} options
             */
            value(jid, text = '', fakeJid = this.user.jid, fakeText = '', fakeGroupJid, options) {
                return conn.reply(jid, text, { key: { fromMe: areJidsSameUser(fakeJid, conn.user.id), participant: fakeJid, ...(fakeGroupJid ? { remoteJid: fakeGroupJid } : {}) }, message: { conversation: fakeText }, ...options })
            }
        },
        downloadM: {
    /**
     * Download media message
     * @param {Object} m - The message object containing media
     * @param {String} type - The type of media to download (e.g., 'image', 'video', 'audio', 'document')
     * @param {fs.PathLike | fs.promises.FileHandle} saveToFile - Path to save the downloaded file (optional)
     * @returns {Promise<fs.PathLike | fs.promises.FileHandle | Buffer>} - Returns path to file or buffer
     */
    async value(m, type, saveToFile) {
        try {
            // Validate input
            if (!m || !(m.url || m.directPath)) {
                throw new Error('Invalid message or media not found.');
            }

            // Download content from message
            const stream = await downloadContentFromMessage(m, type);
            let buffer = Buffer.from([]);

            // Collect data chunks
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            // If saveToFile is provided, save the buffer to file
            if (saveToFile) {
                const fileType = await fileTypeFromBuffer(buffer);
                const filename = saveToFile || `downloaded_media.${fileType?.ext || 'bin'}`;
                await fs.promises.writeFile(filename, buffer);
                return filename; // Return file path
            }

            return buffer; // Return the buffer if not saving to a file
        } catch (err) {
            console.error('Error downloading media message:', err);
            throw new Error('Failed to download media: ' + err.message);
        }
    },
    enumerable: true
}, 
parseMention: {
    /**
     * Parses string into mentionedJid(s)
     * @param {String} text
     * @returns {Array<String>}
     */
    value(text = '') {
        const regex = /@([0-9]{5,16}|0)/g;
        const mentions = [];
        let match;
        
        while ((match = regex.exec(text)) !== null) {
            mentions.push(match[1] + '@s.whatsapp.net');
        }

        return mentions;
    },
    enumerable: true
},
        saveName: {
            async value (id, name = '') {
            if (!id) return
            id = conn.decodeJid(id)
            let isGroup = id.endsWith('@g.us')
            if (id in conn.contacts && conn.contacts[id][isGroup ? 'subject' : 'name'] && id in conn.chats) return
            let metadata = {}
            if (isGroup) metadata = await conn.groupMetadata(id)
            let chat = { ...(conn.contacts[id] || {}), id, ...(isGroup ? { subject: metadata.subject, desc: metadata.desc } : { name }) }
            conn.contacts[id] = chat
            conn.chats[id] = chat
        }
    },
        getName: {
            /**
             * Get name from jid
             * @param {String} jid
             * @param {Boolean} withoutContact
             */
            value(jid = '', withoutContact = false) {
                jid = conn.decodeJid(jid)
                withoutContact = conn.withoutContact || withoutContact
                let v
                if (jid.endsWith('@g.us')) return new Promise(async (resolve) => {
                    v = conn.chats[jid] || {}
                    if (!(v.name || v.subject)) v = await conn.groupMetadata(jid) || {}
                    resolve(v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'))
                })
                else v = jid === '0@s.whatsapp.net' ? {
                    jid,
                    vname: 'WhatsApp'
                } : areJidsSameUser(jid, conn.user.id) ?
                    conn.user :
                    (conn.chats[jid] || {})
                return (withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
            },
            enumerable: true
        },
        loadMessage: {
            /**
             * 
             * @param {String} messageID 
             * @returns {import('@adiwajshing/baileys').proto.WebMessageInfo}
             */
            value(messageID) {
                return Object.entries(conn.chats)
                    .filter(([_, { messages }]) => typeof messages === 'object')
                    .find(([_, { messages }]) => Object.entries(messages)
                        .find(([k, v]) => (k === messageID || v.key?.id === messageID)))
                    ?.[1].messages?.[messageID]
            },
            enumerable: true
        },
        sendGroupV4Invite: {
            /**
             * sendGroupV4Invite
             * @param {String} jid 
             * @param {*} participant 
             * @param {String} inviteCode 
             * @param {Number} inviteExpiration 
             * @param {String} groupName 
             * @param {String} caption 
             * @param {Buffer} jpegThumbnail
             * @param {*} options 
             */
            async value(jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject', caption = 'Invitation to join my WhatsApp group', jpegThumbnail, options = {}) {
                const msg = proto.Message.fromObject({
                    groupInviteMessage: proto.GroupInviteMessage.fromObject({
                        inviteCode,
                        inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
                        groupJid: jid,
                        groupName: (groupName ? groupName : await conn.getName(jid)) || null,
                        jpegThumbnail: Buffer.isBuffer(jpegThumbnail) ? jpegThumbnail : null,
                        caption
                    })
                })
                const message = generateWAMessageFromContent(participant, msg, options)
                await conn.relayMessage(participant, message.message, { messageId: message.key.id, additionalAttributes: { ...options } })
                return message
            },
            enumerable: true
        },
        processMessageStubType: {
            /**
             * to process MessageStubType
             * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} m 
             */
            async value(m) {
                if (!m.messageStubType) return
                const chat = conn.decodeJid(m.key.remoteJid || m.message?.senderKeyDistributionMessage?.groupId || '')
                if (!chat || chat === 'status@broadcast') return
                const emitGroupUpdate = (update) => {
                    conn.ev.emit('groups.update', [{ id: chat, ...update }])
                }
                switch (m.messageStubType) {
                    case WAMessageStubType.REVOKE:
                    case WAMessageStubType.GROUP_CHANGE_INVITE_LINK:
                        emitGroupUpdate({ revoke: m.messageStubParameters[0] })
                        break
                    case WAMessageStubType.GROUP_CHANGE_ICON:
                        emitGroupUpdate({ icon: m.messageStubParameters[0] })
                        break
                    default: {
                        console.log({
                            messageStubType: m.messageStubType,
                            messageStubParameters: m.messageStubParameters,
                            type: WAMessageStubType[m.messageStubType]
                        })
                        break
                    }
                }
                const isGroup = chat.endsWith('@g.us')
                if (!isGroup) return
                let chats = conn.chats[chat]
                if (!chats) chats = conn.chats[chat] = { id: chat }
                chats.isChats = true
                const metadata = await conn.groupMetadata(chat).catch(_ => null)
                if (!metadata) return
                chats.subject = metadata.subject
                chats.metadata = metadata
            }
        },
        relayWAMessage: {
            async value (pesanfull) {
                    if (pesanfull.message.audioMessage) {
                        await conn.sendPresenceUpdate('recording', pesanfull.key.remoteJid)
                    } else {
                        await conn.sendPresenceUpdate('composing', pesanfull.key.remoteJid)
                    }
                    var mekirim = await conn.relayMessage(pesanfull.key.remoteJid, pesanfull.message, { messageId: pesanfull.key.id })
                    conn.ev.emit('messages.upsert', { messages: [pesanfull], type: 'append' });
                    return mekirim
                }
            },
        insertAllGroup: {
            async value() {
                const groups = await conn.groupFetchAllParticipating().catch(_ => null) || {}
                for (const group in groups) conn.chats[group] = { ...(conn.chats[group] || {}), id: group, subject: groups[group].subject, isChats: true, metadata: groups[group] }
                return conn.chats
            },
        },
        pushMessage: {
            /**
             * pushMessage
             * @param {import('@adiwajshing/baileys').proto.WebMessageInfo[]} m 
             */
            async value(m) {
                if (!m) return
                if (!Array.isArray(m)) m = [m]
                for (const message of m) {
                    try {
                        // if (!(message instanceof proto.WebMessageInfo)) continue // https://github.com/adiwajshing/Baileys/pull/696/commits/6a2cb5a4139d8eb0a75c4c4ea7ed52adc0aec20f
                        if (!message) continue
                        if (message.messageStubType && message.messageStubType != WAMessageStubType.CIPHERTEXT) conn.processMessageStubType(message).catch(console.error)
                        const _mtype = Object.keys(message.message || {})
                        const mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(_mtype[0]) && _mtype[0]) ||
                            (_mtype.length >= 3 && _mtype[1] !== 'messageContextInfo' && _mtype[1]) ||
                            _mtype[_mtype.length - 1]
                        const chat = conn.decodeJid(message.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
                        if (message.message?.[mtype]?.contextInfo?.quotedMessage) {
                            /**
                             * @type {import('@adiwajshing/baileys').proto.IContextInfo}
                             */
                            let context = message.message[mtype].contextInfo
                            let participant = conn.decodeJid(context.participant)
                            const remoteJid = conn.decodeJid(context.remoteJid || participant)
                            /**
                             * @type {import('@adiwajshing/baileys').proto.IMessage}
                             * 
                             */
                            let quoted = message.message[mtype].contextInfo.quotedMessage
                            if ((remoteJid && remoteJid !== 'status@broadcast') && quoted) {
                                let qMtype = Object.keys(quoted)[0]
                                if (qMtype == 'conversation') {
                                    quoted.extendedTextMessage = { text: quoted[qMtype] }
                                    delete quoted.conversation
                                    qMtype = 'extendedTextMessage'
                                }
                                if (!quoted[qMtype].contextInfo) quoted[qMtype].contextInfo = {}
                                quoted[qMtype].contextInfo.mentionedJid = context.mentionedJid || quoted[qMtype].contextInfo.mentionedJid || []
                                const isGroup = remoteJid.endsWith('g.us')
                                if (isGroup && !participant) participant = remoteJid
                                const qM = {
                                    key: {
                                        remoteJid,
                                        fromMe: areJidsSameUser(conn.user.jid, remoteJid),
                                        id: context.stanzaId,
                                        participant,
                                    },
                                    message: JSON.parse(JSON.stringify(quoted)),
                                    ...(isGroup ? { participant } : {})
                                }
                                let qChats = conn.chats[participant]
                                if (!qChats) qChats = conn.chats[participant] = { id: participant, isChats: !isGroup }
                                if (!qChats.messages) qChats.messages = {}
                                if (!qChats.messages[context.stanzaId] && !qM.key.fromMe) qChats.messages[context.stanzaId] = qM
                                let qChatsMessages
                                if ((qChatsMessages = Object.entries(qChats.messages)).length > 40) qChats.messages = Object.fromEntries(qChatsMessages.slice(30, qChatsMessages.length)) // maybe avoid memory leak
                            }
                        }
                        if (!chat || chat === 'status@broadcast') continue
                        const isGroup = chat.endsWith('@g.us')
                        let chats = conn.chats[chat]
                        if (!chats) {
                            if (isGroup) await conn.insertAllGroup().catch(console.error)
                            chats = conn.chats[chat] = { id: chat, isChats: true, ...(conn.chats[chat] || {}) }
                        }
                        let metadata, sender
                        if (isGroup) {
                            if (!chats.subject || !chats.metadata) {
                                metadata = await conn.groupMetadata(chat).catch(_ => ({})) || {}
                                if (!chats.subject) chats.subject = metadata.subject || ''
                                if (!chats.metadata) chats.metadata = metadata
                            }
                            sender = conn.decodeJid(message.key?.fromMe && conn.user.id || message.participant || message.key?.participant || chat || '')
                            if (sender !== chat) {
                                let chats = conn.chats[sender]
                                if (!chats) chats = conn.chats[sender] = { id: sender }
                                if (!chats.name) chats.name = message.pushName || chats.name || ''
                            }
                        } else if (!chats.name) chats.name = message.pushName || chats.name || ''
                        if (['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype)) continue
                        chats.isChats = true
                        if (!chats.messages) chats.messages = {}
                        const fromMe = message.key.fromMe || areJidsSameUser(sender || chat, conn.user.id)
                        if (!['protocolMessage'].includes(mtype) && !fromMe && message.messageStubType != WAMessageStubType.CIPHERTEXT && message.message) {
                            delete message.message.messageContextInfo
                            delete message.message.senderKeyDistributionMessage
                            chats.messages[message.key.id] = JSON.parse(JSON.stringify(message, null, 2))
                            let chatsMessages
                            if ((chatsMessages = Object.entries(chats.messages)).length > 40) chats.messages = Object.fromEntries(chatsMessages.slice(30, chatsMessages.length))
                        }
                    } catch (e) {
                        console.error(e)
                    }
                }
            }
        },
        serializeM: {
            /**
             * Serialize Message, so it easier to manipulate
             * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} m
             */
            value(m) {
                return smsg(conn, m)
            }
        },
        ...(typeof conn.chatRead !== 'function' ? {
            chatRead: {
                /**
                 * Read message
                 * @param {String} jid 
                 * @param {String|undefined|null} participant 
                 * @param {String} messageID 
                 */
                value(jid, participant = conn.user.jid, messageID) {
                    return conn.sendReadReceipt(jid, participant, [messageID])
                },
                enumerable: true
            }
        } : {}),
        ...(typeof conn.setStatus !== 'function' ? {
            setStatus: {
                /**
                 * setStatus bot
                 * @param {String} status 
                 */
                value(status) {
                    return conn.query({
                        tag: 'iq',
                        attrs: {
                            to: 's.whatsapp.net',
                            type: 'set',
                            xmlns: 'status',
                        },
                        content: [
                            {
                                tag: 'status',
                                attrs: {},
                                content: Buffer.from(status, 'utf-8')
                            }
                        ]
                    })
                },
                enumerable: true
            }
        } : {})
    })
    if (sock.user?.id) sock.user.jid = sock.decodeJid(sock.user.id)
    store.bind(sock)
    return sock
}
/**
 * Serialize Message
 * @param {ReturnType<typeof makeWASocket>} conn 
 * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} m 
 * @param {Boolean} hasParent 
 */
export function smsg(conn, m, hasParent) {
    if (!m) return m
    /**
     * @type {import('@adiwajshing/baileys').proto.WebMessageInfo}
     */
    let M = proto.WebMessageInfo
    m = M.fromObject(m)
    Object.defineProperty(m, 'conn', { enumerable: false, writable: true, value: conn })
    let protocolMessageKey
    if (m.message) {
        if (m.mtype == 'protocolMessage' && m.msg.key) {
            protocolMessageKey = m.msg.key
            if (protocolMessageKey == 'status@broadcast') protocolMessageKey.remoteJid = m.chat
            if (!protocolMessageKey.participant || protocolMessageKey.participant == 'status_me') protocolMessageKey.participant = m.sender
            protocolMessageKey.fromMe = conn.decodeJid(protocolMessageKey.participant) === conn.decodeJid(conn.user.id)
            if (!protocolMessageKey.fromMe && protocolMessageKey.remoteJid === conn.decodeJid(conn.user.id)) protocolMessageKey.remoteJid = m.sender
        }
        if (m.quoted) if (!m.quoted.mediaMessage) delete m.quoted.download
    }
    if (!m.mediaMessage) delete m.download

    try {
        if (protocolMessageKey && m.mtype == 'protocolMessage') conn.ev.emit('message.delete', protocolMessageKey)
    } catch (e) {
        console.error(e)
    }
    return m
}

// https://github.com/Nurutomo/wabot-aq/issues/490
export function serialize() {
    const MediaType = ['imageMessage', 'videoMessage', 'audioMessage'];
    return Object.defineProperties(proto.WebMessageInfo.prototype, {
        conn: {
            value: undefined,
            enumerable: false,
            writable: true
        },
        id: {
            get() {
                return this.key?.id
            }
        },
        isBaileys: {
            get() {
                return this.id?.length === 16 || this.id?.startsWith('3EB0') && this.id?.length === 22 || false
	    }
        },
        chat: {
            get() {
                const senderKeyDistributionMessage = this.message?.senderKeyDistributionMessage?.groupId
                return (
                    this.key?.remoteJid ||
                    (senderKeyDistributionMessage &&
                        senderKeyDistributionMessage !== 'status@broadcast'
                    ) || ''
                ).decodeJid()
            }
        },
        isGroup: {
            get() {
                return this.chat.endsWith('@g.us') ? true : false;
            },
            enumerable: true
        },
        sender: {
            get() {
                return this.conn?.decodeJid(this.key?.fromMe && this.conn?.user.id || this.participant || this.key.participant || this.chat || '')
            },
            enumerable: true
        },
        fromMe: {
            get() {
                return this.key?.fromMe || areJidsSameUser(this.conn?.user.id, this.sender) || false
            }
        },
        mtype: {
            get() {
                if (!this.message) return ''
                const type = Object.keys(this.message)
                return (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(type[0]) && type[0]) || // Sometimes message in the front
                    (type.length >= 3 && type[1] !== 'messageContextInfo' && type[1]) || // Sometimes message in midle if mtype length is greater than or equal to 3
                    type[type.length - 1] // common case
            },
            enumerable: true
        },
        msg: {
            get() {
                if (!this.message) return null
                return this.message[this.mtype]
            }
        },
        mediaMessage: {
            get() {
                if (!this.message) return null
                const Message = ((this.msg?.url || this.msg?.directPath) ? {
                    ...this.message
                } : extractMessageContent(this.message)) || null
                if (!Message) return null
                const mtype = Object.keys(Message)[0]
                return MediaType.includes(mtype) ? Message : null
            },
            enumerable: true
        },
        messages: {
            get() {
                return this.message ? this.message : null
            },
            enumerable: true
        },
        mediaType: {
            get() {
                let message
                if (!(message = this.mediaMessage)) return null
                return Object.keys(message)[0]
            },
            enumerable: true,
        },
        quoted: {
            get() {
                /**
                 * @type {ReturnType<typeof _makeWaSocket>}
                 */
                const self = this
                const msg = self.msg
                const contextInfo = msg?.contextInfo
                const quoted = contextInfo?.quotedMessage
                if (!msg || !contextInfo || !quoted) return null
                const type = Object.keys(quoted)[0]
                let q = quoted[type]
                const text = typeof q === 'string' ? q : q.text
                return Object.defineProperties(JSON.parse(JSON.stringify(typeof q === 'string' ? {
                    text: q
                } : q)), {
                    mtype: {
                        get() {
                            return type
                        },
                        enumerable: true
                    },
                    mediaMessage: {
                        get() {
                            const Message = ((q.url || q.directPath) ? {
                                ...quoted
                            } : extractMessageContent(quoted)) || null
                            if (!Message) return null
                            const mtype = Object.keys(Message)[0]
                            return MediaType.includes(mtype) ? Message : null
                        },
                        enumerable: true
                    },
                    messages: {
                        get() {
                            return quoted ? quoted : null
                        },
                        enumerable: true
                    },
                    mediaType: {
                        get() {
                            let message
                            if (!(message = this.mediaMessage)) return null
                            return Object.keys(message)[0]
                        },
                        enumerable: true,
                    },
                    id: {
                        get() {
                            return contextInfo.stanzaId
                        },
                        enumerable: true
                    },
                    chat: {
                        get() {
                            return contextInfo.remoteJid || self.chat
                        },
                        enumerable: true
                    },
                    isBaileys: {
                        get() {
                        return this.id?.length === 16 || this.id?.startsWith('3EB0') && this.id.length === 22 || false
			},
                        enumerable: true
                    },
                    sender: {
                        get() {
                            return (contextInfo.participant || this.chat || '').decodeJid()
                        },
                        enumerable: true
                    },
                    fromMe: {
                        get() {
                            return areJidsSameUser(this.sender, self.conn?.user.jid)
                        },
                        enumerable: true,
                    },
                    text: {
                        get() {
                            return text || this.caption || this.contentText || this.selectedDisplayText || ''
                        },
                        enumerable: true
                    },
                    mentionedJid: {
                        get() {
                            return q.contextInfo?.mentionedJid || self.getQuotedObj()?.mentionedJid || []
                        },
                        enumerable: true
                    },
                    name: {
                        get() {
                            const sender = this.sender
                            return sender ? self.conn?.getName(sender) : null
                        },
                        enumerable: true

                    },
                    vM: {
                        get() {
                            return proto.WebMessageInfo.fromObject({
                                key: {
                                    fromMe: this.fromMe,
                                    remoteJid: this.chat,
                                    id: this.id
                                },
                                message: quoted,
                                ...(self.isGroup ? {
                                    participant: this.sender
                                } : {})
                            })
                        }
                    },
                    fakeObj: {
                        get() {
                            return this.vM
                        }
                    },
                    download: {
                        value(saveToFile = false) {
                            const mtype = this.mediaType
                            return self.conn?.downloadM(this.mediaMessage[mtype], mtype.replace(/message/i, ''), saveToFile)
                        },
                        enumerable: true,
                        configurable: true,
                    },
                    reply: {
                        /**
                         * Reply to quoted message
                         * @param {String|Object} text
                         * @param {String|false} chatId
                         * @param {Object} options
                         */
                        value(text, chatId, options) {
                            return self.conn?.reply(chatId ? chatId : this.chat, text, this.vM, options)
                        },
                        enumerable: true,
                    },
                    copy: {
                        /**
                         * Copy quoted message
                         */
                        value() {
                            const M = proto.WebMessageInfo
                            return smsg(conn, M.fromObject(M.toObject(this.vM)))
                        },
                        enumerable: true,
                    },
                    forward: {
                        /**
                         * Forward quoted message
                         * @param {String} jid
                         *  @param {Boolean} forceForward
                         */
                        value(jid, force = false, options) {
                            return self.conn?.sendMessage(jid, {
                                forward: this.vM,
                                force,
                                ...options
                            }, {
                                ...options
                            })
                        },
                        enumerable: true,
                    },
                    copyNForward: {
                        /**
                         * Exact Forward quoted message
                         * @param {String} jid
                         * @param {Boolean|Number} forceForward
                         * @param {Object} options
                         */
                        value(jid, forceForward = false, options) {
                            return self.conn?.copyNForward(jid, this.vM, forceForward, options)
                        },
                        enumerable: true,

                    },
                    cMod: {
                        /**
                         * Modify quoted Message
                         * @param {String} jid
                         * @param {String} text
                         * @param {String} sender
                         * @param {Object} options
                         */
                        value(jid, text = '', sender = this.sender, options = {}) {
                            return self.conn?.cMod(jid, this.vM, text, sender, options)
                        },
                        enumerable: true,

                    },
                    delete: {
                        /**
                         * Delete quoted message
                         */
                        value() {
                            return self.conn?.sendMessage(this.chat, {
                                delete: this.vM.key
                            })
                        },
                        enumerable: true,

                    },
                    react: {
                        value(text) {
                            return self.conn?.sendMessage(this.chat, {
                                react: {
                                    text,
                                    key: this.vM.key
                                }
                            })
                        },
                        enumerable: true,
                    },
                    command: {
                        get() {
                            const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
                            let _prefix = this.prefix ? this.prefix : global.prefix
                            let match = (_prefix instanceof RegExp ? [
                                    [_prefix.exec(text || this.caption || this.contentText || this.selectedDisplayText || ''), _prefix]
                                ] :
                                Array.isArray(_prefix) ?
                                _prefix.map(p => {
                                    let re = p instanceof RegExp ?
                                        p :
                                        new RegExp(str2Regex(p))
                                    return [re.exec(text || this.caption || this.contentText || this.selectedDisplayText || ''), re]
                                }) :
                                typeof _prefix === "string" ? [
                                    [new RegExp(str2Regex(_prefix)).exec(text || this.caption || this.contentText || this.selectedDisplayText || ''), new RegExp(str2Regex(_prefix))]
                                ] : [
                                    [
                                        [], new RegExp
                                    ]
                                ]
                            ).find(p => p[1])
                            let result = ((opts?.['multiprefix'] ?? true) && (match[0] || "")[0]) || ((opts?.['noprefix'] ?? false) ? null : (match[0] || "")[0]);
                            let noPrefix = !result ? (text || this.caption || this.contentText || this.selectedDisplayText || '') : (text || this.caption || this.contentText || this.selectedDisplayText || '').replace(result, "");
                            let args_v2 = noPrefix.trim().split(/ +/);
                            let [command, ...args] = noPrefix.trim().split(" ").filter(v => v);
                            return {
                                command,
                                args,
                                args_v2,
                                noPrefix,
                                match
                            };
                        },
                        enumerable: true
                    },
                    device: {
                        get() {
                            const device = getDevice(this.vM.key?.id);
                            const platform = os.platform();
                            const isUnknownDevice = device === 'unknown' && platform;
                            const res = device ? (isUnknownDevice ? (platform === 'android' ? 'Android' : ['win32', 'darwin', 'linux'].includes(platform) ? 'Desktop' : 'Unknown') : device) : 'Unknown Device';

                            return res;

                        },
                        enumerable: true
                    },
                    isBot: {
                        get() {
                            const idBot = this.vM.key?.id;
                            return ["3EB0"].some(k => idBot.includes(k) && this.sender !== this.conn?.user.jid);
                        },
                        enumerable: true
                    }
                })
            },
            enumerable: true
        },
        _text: {
            value: null,
            writable: true,
        },
        text: {
            get() {
                const msg = this.msg
                const text = (typeof msg === 'string' ? msg : msg?.text) || msg?.caption || msg?.contentText || ''
                return typeof this._text === 'string' ? this._text : '' || (typeof text === 'string' ? text : (
                    text?.selectedDisplayText ||
                    text?.hydratedTemplate?.hydratedContentText ||
                    text
                )) || ''
            },
            set(str) {
                return this._text = str
            },
            enumerable: true
        },
        mentionedJid: {
            get() {
                return this.msg?.contextInfo?.mentionedJid?.length && this.msg.contextInfo.mentionedJid || []
            },
            enumerable: true
        },
        name: {
            get() {
                return !nullish(this.pushName) && this.pushName || this.conn?.getName(this.sender)
            },
            enumerable: true
        },
        download: {
            value(saveToFile = false) {
                const mtype = this.mediaType
                return this.conn?.downloadM(this.mediaMessage[mtype], mtype.replace(/message/i, ''), saveToFile)
            },
            enumerable: true,
            configurable: true
        },
        reply: {
            value(text, chatId, options) {
                return this.conn?.reply(chatId ? chatId : this.chat, text, this, options)
            }
        },
        copy: {
            value() {
                const M = proto.WebMessageInfo
                return smsg(this.conn, M.fromObject(M.toObject(this)))
            },
            enumerable: true
        },
        forward: {
            value(jid, force = false, options = {}) {
                return this.conn?.sendMessage(jid, {
                    forward: this,
                    force,
                    ...options
                }, {
                    ...options
                })
            },
            enumerable: true
        },
        copyNForward: {
            value(jid, forceForward = false, options = {}) {
                return this.conn?.copyNForward(jid, this, forceForward, options)
            },
            enumerable: true
        },
        cMod: {
            value(jid, text = '', sender = this.sender, options = {}) {
                return this.conn?.cMod(jid, this, text, sender, options)
            },
            enumerable: true
        },
        getQuotedObj: {
            value() {
                if (!this.quoted.id) return null
                const q = proto.WebMessageInfo.fromObject(this.conn?.loadMessage(this.quoted.id) || this.quoted.vM)
                return smsg(this.conn, q)
            },
            enumerable: true
        },
        getQuotedMessage: {
            get() {
                return this.getQuotedObj
            }
        },
        delete: {
            value() {
                return this.conn?.sendMessage(this.chat, {
                    delete: this.key
                })
            },
            enumerable: true
        },
        react: {
            value(text) {
                return this.conn?.sendMessage(this.chat, {
                    react: {
                        text,
                        key: this.key
                    }
                })
            },
            enumerable: true
        },
        device: {
            get() {
                const device = getDevice(this.key?.id);
                const platform = os.platform();
                const isUnknownDevice = device === 'unknown' && platform;
                const res = device ? (isUnknownDevice ? (platform === 'android' ? 'Android Device' : ['win32', 'darwin', 'linux'].includes(platform) ? 'Desktop' : 'Unknown Device') : device) : 'Unknown Device';

                return res;

            },
            enumerable: true
        },
        isBot: {
            get() {
                const idBot = this.key?.id;
                return ["3EB0"].some(k => idBot.includes(k) && this.sender !== this.conn?.user.jid);
            },
            enumerable: true
        }
    })
}

export function logic(check, inp, out) {
    if (inp.length !== out.length) throw new Error('Input and Output must have same length')
    for (let i in inp) if (util.isDeepStrictEqual(check, inp[i])) return out[i]
    return null
}

export function protoType() {
    Buffer.prototype.toArrayBuffer = function toArrayBufferV2() {
        const ab = new ArrayBuffer(this.length);
        const view = new Uint8Array(ab);
        for (let i = 0; i < this.length; ++i) {
            view[i] = this[i];
        }
        return ab;
    }
    /**
     * @returns {ArrayBuffer}
     */
    Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
        return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength)
    }
    /**
     * @returns {Buffer}
     */
    ArrayBuffer.prototype.toBuffer = function toBuffer() {
        return Buffer.from(new Uint8Array(this))
    }
    // /**
    //  * @returns {String}
    //  */
    // Buffer.prototype.toUtilFormat = ArrayBuffer.prototype.toUtilFormat = Object.prototype.toUtilFormat = Array.prototype.toUtilFormat = function toUtilFormat() {
    //     return util.format(this)
    // }
    Uint8Array.prototype.getFileType = ArrayBuffer.prototype.getFileType = Buffer.prototype.getFileType = async function getFileType() {
        return await fileTypeFromBuffer(this)
    }
    /**
     * @returns {Boolean}
     */
    String.prototype.isNumber = Number.prototype.isNumber = isNumber
    /**
     * 
     * @returns {String}
     */
    String.prototype.capitalize = function capitalize() {
        return this.charAt(0).toUpperCase() + this.slice(1, this.length)
    }
    /**
     * @returns {String}
     */
    String.prototype.capitalizeV2 = function capitalizeV2() {
        const str = this.split(' ')
        return str.map(v => v.capitalize()).join(' ')
    }
    String.prototype.decodeJid = function decodeJid() {
        if (/:\d+@/gi.test(this)) {
            const decode = jidDecode(this) || {}
            return (decode.user && decode.server && decode.user + '@' + decode.server || this).trim()
        } else return this.trim()
    }
    /**
     * number must be milliseconds
     * @returns {string}
     */
    Number.prototype.toTimeString = function toTimeString() {
        // const milliseconds = this % 1000
        const seconds = Math.floor((this / 1000) % 60)
        const minutes = Math.floor((this / (60 * 1000)) % 60)
        const hours = Math.floor((this / (60 * 60 * 1000)) % 24)
        const days = Math.floor((this / (24 * 60 * 60 * 1000)))
        return (
            (days ? `${days} day(s) ` : '') +
            (hours ? `${hours} hour(s) ` : '') +
            (minutes ? `${minutes} minute(s) ` : '') +
            (seconds ? `${seconds} second(s)` : '')
        ).trim()
    }
    Number.prototype.getRandom = String.prototype.getRandom = Array.prototype.getRandom = getRandom
}
function isNumber() {
    const int = parseInt(this)
    return typeof int === 'number' && !isNaN(int)
}

function getRandom() {
    if (Array.isArray(this) || this instanceof String) return this[Math.floor(Math.random() * this.length)]
    return Math.floor(Math.random() * this)
}


/**
 * ??
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
 * @returns {boolean}
 */
function nullish(args) {
    return !(args !== null && args !== undefined)
}
