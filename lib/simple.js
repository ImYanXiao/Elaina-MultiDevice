import { Jimp } from 'jimp'
import path from 'path'
import { toAudio } from './converter.js'
import chalk from 'chalk'
import PhoneNumber from 'awesome-phonenumber'
import fs from 'fs'
import util from 'util'
import { fileTypeFromBuffer } from 'file-type'
import { format } from 'util'
import { fileURLToPath } from 'url'
import store from './store.js'
import crypto from 'crypto'
import _makeWaSocket, {
    proto,
    downloadContentFromMessage,
    jidDecode,
    jidNormalizedUser,
    areJidsSameUser,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    generateWAMessage,
    WAMessageStubType,
    extractMessageContent,
    S_WHATSAPP_NET
} from '@rexxhayanasi/elaina-baileys'
import { normalizeGroupMetadataPn } from './resolvejid.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function toSHA256(str) {
    return crypto.createHash('sha256').update(str).digest('hex')
}

export function makeWASocket(connectionOptions, options = {}) {
    let conn = _makeWaSocket(connectionOptions)
    const rawGroupMetadata = conn.groupMetadata.bind(conn)

    let sock = Object.defineProperties(conn, {
        chats: {
            value: { ...(options.chats || {}) },
            writable: true
        },
        groupMetadataPn: {
            async value(jid) {
                const cached = conn.chats?.[jid]?.metadata
                const metadata = cached || await rawGroupMetadata(jid)
                return normalizeGroupMetadataPn(conn, metadata)
            },
            enumerable: true
        },
        decodeJid: {
            value(jid) {
                if (!jid || typeof jid !== 'string') return (!nullish(jid) && jid) || null
                return jidNormalizedUser(jid) || jid.trim()
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
        smlcap: {
            value (text, except = []) {
                if (!text) return text
                let regex = /(wa.me|https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi
                let link = text.match(regex)
                let smlcap = res => res.replace(/a|A/g, "ᴀ").replace(/b|B/g, "ʙ").replace(/c|C/g, "ᴄ").replace(/d|D/g, "ᴅ").replace(/e|E/g, "ᴇ").replace(/f|F/g, "ꜰ").replace(/g|G/g, "ɢ").replace(/h|H/g, "ʜ").replace(/i|I/g, "ɪ").replace(/j|J/g, "ᴊ").replace(/k|K/g, "ᴋ").replace(/l|L/g, "ʟ").replace(/m|M/g, "ᴍ").replace(/n|N/g, "ɴ").replace(/o|O/g, "ᴏ").replace(/p|P/g, "ᴘ").replace(/q|Q/g, "ǫ").replace(/r|R/g, "ʀ").replace(/s|S/g, "ꜱ").replace(/t|T/g, "ᴛ").replace(/u|U/g, "ᴜ").replace(/v|V/g, "ᴠ").replace(/w|W/g, "ᴡ").replace(/x|X/g, "x").replace(/y|Y/g, "ʏ").replace(/z|Z/g, "ᴢ")
                let result = smlcap(text)
                if (except.length > 0) {
                    for (let i = 0; i < except.length; i++) {
                        result = result.replace(smlcap(except[i]), except[i])
                    }
                    if (link) {
                        for (let i = 0; i < link.length; i++) {
                            result = result.replace(smlcap(link[i]), link[i])
                        }
                        return result
                    } else {
                        return result
                    }
                } else {
                    if (link) {
                        for (let i = 0; i < link.length; i++) {
                            result = result.replace(smlcap(link[i]), link[i])
                        }
                        return result
                    } else {
                        return result
                    }
                }
            },
            enumerable: true,
        },
        getFile: {
               
                             
                                         
                                          
               
            async value(PATH, saveToFile = false) {
                let res, filename
                const data = Buffer.isBuffer(PATH) ? PATH : PATH instanceof ArrayBuffer ? PATH.toBuffer() : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? Buffer.from(await (res = await fetch(PATH)).arrayBuffer()) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
                if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
                const type = await fileTypeFromBuffer(data) || {
                    mime: 'application/octet-stream',
                    ext: '.bin'
                }
                if (data && saveToFile && !filename) (filename = path.join(__dirname, '../tmp/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
                return {
                    res,
                    filename,
                    ...type,
                    data,
                    deleteFile() {
                        return filename && fs.promises.unlink(filename)
                    }
                }
            },
            enumerable: true
        },
        resize: {
               
                                 
                                      
                                          
                                          
                        
               
            value(buffer, uk1, uk2) {
                return new Promise(async(resolve, reject) => {
                    let baper = await jimp.read(buffer);
                    let result = await baper.resize(uk1, uk2).getBufferAsync(jimp.MIME_JPEG)
                    resolve(result)
                })
            },
            enumerable: true
        },
        sendFile: {
               
                                                            
                                  
                                          
                                       
                                      
                                                                                          
                                   
                                      
               
            async value(jid, path, filename = '', text = '', quoted, ptt = false, options = {}, smlcap = { smlcap: true }) {
                let isSmlcap = global.db.data.settings[conn.user.jid].smlcap && smlcap.smlcap
                let ephemeral = conn.chats[jid]?.metadata?.ephemeralDuration || conn.chats[jid]?.ephemeralDuration || false
                
                let caption = isSmlcap ? conn.smlcap(text, smlcap.except ? smlcap.except : false) : text
                let type = await conn.getFile(path, true)
                let { res, data: file, filename: pathFile } = type
                if (res && res.status !== 200 || file.length <= 65536) {
                    try { throw { json: JSON.parse(file.toString()) } }
                    catch (e) { if (e.json) throw e.json }
                }
                const fileSize = fs.statSync(pathFile).size / 1024 / 1024
                let opt = {}
                if (quoted) opt.quoted = quoted
                if (!type) options.asDocument = true
                let mtype = '', mimetype = options.mimetype || type.mime, convert
                if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'
                else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'
                else if (/video/.test(type.mime)) mtype = 'video'
                else if (/audio/.test(type.mime)) (
                    convert = await toAudio(file, type.ext),
                    file = convert.data,
                    pathFile = convert.filename,
                    mtype = 'audio',
                    mimetype = options.mimetype || 'audio/ogg; codecs=opus'
                )
                else mtype = 'document'
                if (options.asDocument) mtype = 'document'

                delete options.asSticker
                delete options.asLocation
                delete options.asVideo
                delete options.asDocument
                delete options.asImage

                let message = {
                    ...options,
                    caption,
                    ptt,
                    [mtype]: { url: pathFile },
                    mimetype,
                    fileName: filename || pathFile.split('/').pop()
                }
                   
                                                                                      
                   
                let m
                try {
                    m = await conn.sendMessage(jid, message, { ...opt, ...options, ephemeralExpiration: ephemeral })
                } catch (e) {
                    console.error(e)
                    m = null
                } finally {
                    if (!m) m = await conn.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options, ephemeralExpiration: ephemeral })
                    file = null                        
                    return m
                }
            },
            enumerable: true
        },
        sendContact: {
               
                           
                                   
                                                
                                                                                           
                                       
               
            async value(jid, data, quoted, options) {
                if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
                let contacts = []
                let ephemeral = conn.chats[jid]?.metadata?.ephemeralDuration || conn.chats[jid]?.ephemeralDuration || false

                for (let [number, name] of data) {
                    number = number.replace(/[^0-9]/g, '')
                    let njid = number + '@s.whatsapp.net'
                    let biz = await conn.getBusinessProfile(njid).catch(_ => null) || {}
                    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name.replace(/\n/g, '\\n')};;;
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}${biz.description ? `
X-WA-BIZ-NAME:${(conn.chats[njid]?.vname || conn.getName(njid) || name).replace(/\n/, '\\n')}
X-WA-BIZ-DESCRIPTION:${biz.description.replace(/\n/g, '\\n')}
`.trim() : ''}
END:VCARD
`.trim()
                    contacts.push({ vcard, displayName: name })
                }
                return await conn.sendMessage(jid, { ...options, contacts: { ...options, displayName: (contacts.length >= 2 ? `${contacts.length} kontak` : contacts[0].displayName) || null, contacts }}, { quoted, ...options, ephemeralExpiration: ephemeral })
            },
            enumerable: true
        },
        reply: {
               
                                 
                                  
                                          
                                                                                          
                                      
               
            value(jid, text = '', quoted, options = {}, smlcap = { smlcap : true }) {
                let isSmlcap = global.db.data.settings[conn.user.jid].smlcap && smlcap.smlcap
                let ephemeral = conn.chats[jid]?.metadata?.ephemeralDuration || conn.chats[jid]?.ephemeralDuration || false

                if (global.db.data.settings[conn.user.jid].adReply) {
                    let thumb = ['thumb-1', 'thumb-2', 'thumb-3', 'thumb-4', 'thumb-5']
                    return Buffer.isBuffer(text) ? conn.sendFile(jid, text, 'file', '', quoted, false, options) : conn.adReply(jid, text, global.config.watermark, "", fs.readFileSync('./media/' + thumb.getRandom() + '.jpg'), false, quoted, false, false, smlcap)
                } else {
                    return Buffer.isBuffer(text) ? conn.sendFile(jid, text, 'file', '', quoted, false, options) : conn.sendMessage(jid, { text: isSmlcap ? conn.smlcap(text, smlcap.except ? smlcap.except : false) : text, ...options }, { quoted, ...options, ephemeralExpiration: ephemeral })
                }
            }
        },
        adReply: {
            async value(jid, text, title = '', body = '', buffer, source = '', quoted, large = true, options = {}, smlcap = { smlcap: true }) {
                const isSmlcap = global.db.data.settings[conn.user.jid].smlcap && smlcap.smlcap
                const ephemeral = conn.chats[jid]?.metadata?.ephemeralDuration || conn.chats[jid]?.ephemeralDuration || false
                const { data } = await conn.getFile(buffer, true)
                const hwaifu = JSON.parse(fs.readFileSync('./json/hwaifu.json', 'utf-8'))
                const url = source || global.config.website || hwaifu.getRandom()
                const contentOptions = { ...options }
                delete contentOptions.contextInfo
                return conn.sendMessage(jid, {
                    text: isSmlcap ? conn.smlcap(text, smlcap.except ? smlcap.except : false) : text,
                    ...contentOptions,
                    contextInfo: {
                        ...(options.contextInfo || {}),
                        mentionedJid: options.contextInfo?.mentionedJid || await conn.parseMention(text),
                        externalAdReply: {
                            showAdAttribution: false,
                            mediaType: 1,
                            title,
                            body,
                            thumbnail: data,
                            renderLargerThumbnail: Boolean(large),
                            mediaUrl: url,
                            sourceUrl: url
                        }
                    }
                }, { quoted, ephemeralExpiration: ephemeral })
            },
            enumerable: true
        },
        textList: {
            async value(jid, text, image, list = [], m, options = {}, smlcap = { smlcap: true }) {
                if (!Array.isArray(list)) {
                    list = []
                }
                let caption = `
${text}

Silahkan Reply/Balas pesan ini dengan Angka ${list[0][1]} - ${list.length} 
${options.noList || list.length == 0 ? "" : `
${list.map((item, index) => {
    let [command, number, title] = item
    return `*${number}.* ${title}`.trim()
}).join("\n\n")}`}
`.trim()
                let metadata = toSHA256(caption)
                if (image) {
                    await conn.sendFile(jid, image, null, caption, m, false, options, smlcap)
                } else {
                    await conn.reply(jid, caption, m, options, smlcap)
                }
                global.db.data.bots.replyText[metadata] = {
                    text: caption,
                    list: list,
                    command: false
                }
            },
            enumerable: true
        },
        textOptions: {
            async value(jid, text, image, list = [], m, options = {}, smlcap = { smlcap: true }) {
                if (!Array.isArray(list)) {
                    list = []
                }
                let caption = `
${text}

Silahkan Reply/Balas pesan ini dengan *${list.length > 0 ? list[0][1] : ""}*${list.length > 1 ? ` atau *${list[1][1]}*` : ""}
`.trim()
                let metadata = toSHA256(caption)
                if (image) {
                    await conn.sendFile(jid, image, null, caption, m, false, options, smlcap)
                } else {
                    await conn.reply(jid, caption, m, options, smlcap)
                }
                global.db.data.bots.replyText[metadata] = {
                    text: caption,
                    list: list,
                    command: false
                }
            },
            enumerable: true
        },
        textInput: {
            async value(jid, text, image, input, m, options = {}, smlcap = { smlcap: true }) {
                let caption = `
${text}
`.trim()
                let metadata = toSHA256(caption)
                if (image) {
                    await conn.sendFile(jid, image, null, caption, m, false, options, smlcap)
                } else {
                    await conn.reply(jid, caption, m, options, smlcap)
                }
                global.db.data.bots.replyText[metadata] = {
                    text: caption,
                    list: false,
                    command: input
                }
            },
            enumerable: true
        },
        preSudo: {
            async value(text, who, m, chatupdate) {
                let messages = await generateWAMessage( m.chat, { text, mentions: await conn.parseMention(text) }, { userJid: who, quoted: m.quoted && m.quoted.fakeObj })
                messages.key.fromMe = areJidsSameUser(who, conn.user.id)
                messages.key.id = m.key.id
                messages.pushName = m.name
                if (m.isGroup) messages.key.participant = messages.participant = who
                    let msg = { ...chatupdate, messages: [proto.WebMessageInfo.fromObject(messages)].map((v) => ((v.conn = this), v)), type: "append" }
                return msg
            }
        },
        sendReact: {
            async value(jid, text, key) {
                return conn.sendMessage(jid, { react: { text: text, key: key } });
            }
        },
        cMod: {
               
                   
                                   
                                                                                            
                                    
                                      
                                  
                        
               
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
               
                           
                                  
                                          
                                      
                                       
                                           
                                      
               
            value(jid, text = '', fakeJid = this.user.jid, fakeText = '', fakeGroupJid, options) {
                return conn.reply(jid, text, { key: { fromMe: areJidsSameUser(fakeJid, conn.user.id), participant: fakeJid, ...(fakeGroupJid ? { remoteJid: fakeGroupJid } : {}) }, message: { conversation: fakeText }, ...options })
            }
        },
        downloadM: {
               
                                     
                                
                                   
                                                                       
                                                                                
               
            async value(m, type, saveToFile) {
                let filename
                if (!m || !(m.url || m.directPath)) return Buffer.alloc(0)
                const stream = await downloadContentFromMessage(m, type)
                let buffer = Buffer.from([])
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk])
                }
                if (saveToFile) ({ filename } = await conn.getFile(buffer, true))
                return saveToFile && fs.existsSync(filename) ? filename : buffer
            },
            enumerable: true
        },
        parseMention: {
               
                                                 
                                   
                                       
               
            value(text = '') {
                return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
            },
            enumerable: true
        },
        getName: {
               
                                
                                  
                                              
               
            value(jid = '', withoutContact = false) {
                jid = conn.decodeJid(jid)
                withoutContact = conn.withoutContact || withoutContact
                let v
                if (jid?.endsWith('@g.us')) return new Promise(async (resolve) => {
                    v = conn.chats[jid] || {}
                    if (!(v.name || v.subject)) v = await conn.groupMetadataPn(jid) || {}
                    resolve(v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'))
                })
                else v = jid === '0@s.whatsapp.net' ? {
                    jid,
                    vname: 'WhatsApp'
                } : areJidsSameUser(jid, conn.user.id) ?
                    conn.user :
                    (conn.chats[jid] || {})
                return (withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || v.verifiedName || PhoneNumber('+' + ("" || jid)?.replace('@s.whatsapp.net', '')).getNumber('international') || ""
            },
            enumerable: true
        },
        loadMessage: {
               
               
                                         
                                                                                     
               
            value(messageID) {
                return Object.entries(conn.chats)
                    .filter(([_, { messages }]) => typeof messages === 'object')
                    .find(([_, { messages }]) => Object.entries(messages)
                        .find(([k, v]) => (k === messageID || v.key?.id === messageID)))
                    ?.[1].messages?.[messageID]
            },
            enumerable: true
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
        processMessageStubType: {
               
                                         
                                                                                      
               
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
                        emitGroupUpdate({ revoke: m.messageStubParameters?.[0] })
                        break
                    case WAMessageStubType.GROUP_CHANGE_ICON:
                        emitGroupUpdate({ icon: m.messageStubParameters?.[0] })
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
                const metadata = await conn.groupMetadataPn(chat).catch(_ => null)
                if (!metadata) return
                chats.subject = metadata.subject
                chats.metadata = metadata
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
               
                          
                                                                                        
               
            async value(m) {
                if (!m) return
                if (!Array.isArray(m)) m = [m]
                for (const message of m) {
                    try {
                                                                                                                                                                                       
                        if (!message) continue
                        if (message.messageStubType && message.messageStubType != WAMessageStubType.CIPHERTEXT) conn.processMessageStubType(message).catch(console.error)
                        const _mtype = Object.keys(message.message || {})
                        const mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(_mtype[0]) && _mtype[0]) ||
                            (_mtype.length >= 3 && _mtype[1] !== 'messageContextInfo' && _mtype[1]) ||
                            _mtype[_mtype.length - 1]
                        const chat = conn.decodeJid(message.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
                        if (message.message?.[mtype]?.contextInfo?.quotedMessage) {
                               
                                                                                                
                               
                            let context = message.message[mtype].contextInfo
                            let participant = conn.decodeJid(context.participant)
                            const remoteJid = conn.decodeJid(context.remoteJid || participant)
                               
                                                                                            
                               
                               
                            let quoted = message.message[mtype].contextInfo.quotedMessage
                            if ((remoteJid && remoteJid !== 'status@broadcast') && quoted) {
                                let qMtype = Object.keys(quoted)[0]
                                if (qMtype == 'conversation') {
                                    quoted.extendedTextMessage = { text: quoted[qMtype] }
                                    delete quoted.conversation
                                    qMtype = 'extendedTextMessage'
                                }
                                if (!quoted?.[qMtype]?.contextInfo) quoted[qMtype].contextInfo = {}
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
                                if ((qChatsMessages = Object.entries(qChats.messages)).length > 40) qChats.messages = Object.fromEntries(qChatsMessages.slice(30, qChatsMessages.length))                           
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
                                metadata = await conn.groupMetadataPn(chat).catch(_ => ({})) || {}
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
               
                                                            
                                                                                     
               
            value(m) {
                return smsg(conn, m)
            }
        },
        ...(typeof conn.chatRead !== 'function' ? {
            chatRead: {
                   
                               
                                       
                                                              
                                             
                   
                value(jid, participant = conn.user.jid, messageID) {
                    return conn.sendReadReceipt(jid, participant, [messageID])
                },
                enumerable: true
            }
        } : {}),
        ...(typeof conn.setStatus !== 'function' ? {
            setStatus: {
                   
                                
                                          
                   
                value(status) {
                    return conn.query({
                        tag: 'iq',
                        attrs: {
                            to: S_WHATSAPP_NET,
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
   
                    
                                                 
                                                                          
                              
   
export function smsg(conn, m, hasParent) {
    if (!m) return m
       
                                                                          
       
    let M = proto.WebMessageInfo
    m = M.fromObject(m)
    m.conn = conn
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

                                                  
export function serialize() {
    const MediaType = ['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage']
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
                return this.id?.length === 16 || this.id?.startsWith('3EB0') && this.id?.length === 12 || false
            }
        },
        chat: {
            get() {
                const senderKeyDistributionMessage = this.message?.senderKeyDistributionMessage?.groupId
                const remote = this.key?.remoteJidAlt?.endsWith('@s.whatsapp.net')
                    ? this.key.remoteJidAlt
                    : this.key?.remoteJid
                return this.conn?.decodeJid(remote || (senderKeyDistributionMessage && senderKeyDistributionMessage !== 'status@broadcast') || '') || ''
            }
        },
        isGroup: {
            get() {
                return this.chat.endsWith('@g.us')
            },
            enumerable: true
        },
        sender: {
            get() {
                const current = this.key?.fromMe
                    ? this.conn?.user?.jid || this.conn?.user?.id
                    : this.participantAlt || this.key?.participantAlt || this.participant || this.key?.participant || this.key?.remoteJidAlt || this.chat
                return this.conn?.decodeJid(current || '') || ''
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
                return (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(type[0]) && type[0]) ||                                  
                    (type.length >= 3 && type[1] !== 'messageContextInfo' && type[1]) ||                                                                            
                    type[type.length - 1]               
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
                const Message = ((this.msg?.url || this.msg?.directPath) ? { ...this.message } : extractMessageContent(this.message)) || null
                if (!Message) return null
                const mtype = Object.keys(Message)[0]
                return MediaType.includes(mtype) ? Message : null
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
                   
                                                          
                   
                const self = this
                const msg = self.msg
                const contextInfo = msg?.contextInfo
                const quoted = contextInfo?.quotedMessage
                if (!msg || !contextInfo || !quoted) return null
                const type = Object.keys(quoted)[0]
                let q = quoted[type]
                const text = typeof q === 'string' ? q : q.text
                return Object.defineProperties(JSON.parse(JSON.stringify(typeof q === 'string' ? { text: q } : q)), {
                    mtype: {
                        get() {
                            return type
                        },
                        enumerable: true
                    },
                    mediaMessage: {
                        get() {
                            const Message = ((q.url || q.directPath) ? { ...quoted } : extractMessageContent(quoted)) || null
                            if (!Message) return null
                            const mtype = Object.keys(Message)[0]
                            return MediaType.includes(mtype) ? Message : null
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
                            return this.id?.length === 16 || this.id?.startsWith('3EB0') && this.id.length === 12 || false
                        },
                        enumerable: true
                    },
                    sender: {
                        get() {
                            const current = contextInfo.participantAlt || contextInfo.participant || contextInfo.remoteJidAlt || this.chat || ''
                            return self.conn?.decodeJid(current) || ''
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
                                ...(self.isGroup ? { participant: this.sender } : {})
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
                           
                                                  
                                                      
                                                       
                                                  
                           
                        value(text, chatId, options = {}, smlcap = { smlcap: true }) {
                            return self.conn?.reply(chatId ? chatId : this.chat, text, this.vM, options, smlcap)
                        },
                        enumerable: true,
                    },
                    copy: {
                           
                                              
                           
                        value() {
                            const M = proto.WebMessageInfo
                            return smsg(conn, M.fromObject(M.toObject(this.vM)))
                        },
                        enumerable: true,
                    },
                    forward: {
                           
                                                 
                                              
                                                         
                           
                        value(jid, force = false, options) {
                            return self.conn?.sendMessage(jid, {
                                forward: this.vM, force, ...options
                            }, { ...options })
                        },
                        enumerable: true,
                    },
                    copyNForward: {
                           
                                                       
                                              
                                                               
                                                  
                           
                        value(jid, forceForward = false, options) {
                            return self.conn?.copyNForward(jid, this.vM, forceForward, options)
                        },
                        enumerable: true,

                    },
                    cMod: {
                           
                                                
                                              
                                               
                                                 
                                                  
                           
                        value(jid, text = '', sender = this.sender, options = {}) {
                            return self.conn?.cMod(jid, this.vM, text, sender, options)
                        },
                        enumerable: true,

                    },
                    delete: {
                           
                                                
                           
                        value() {
                            return self.conn?.sendMessage(this.chat, { delete: this.vM.key })
                        },
                        enumerable: true,

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
                const text = (typeof msg === 'string' ? msg : msg?.text) || msg?.caption || msg?.contentText || msg?.selectedId || msg?.nativeFlowResponseMessage || ''
                return typeof this._text === 'string' ? this._text : '' || (typeof text === 'string' ? text : (
                    text?.selectedDisplayText ||
                    text?.hydratedTemplate?.hydratedContentText ||
                    JSON.parse(text?.paramsJson)?.id ||
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
            value(text, chatId, options = {}, smlcap = { smlcap: true}) {
                return this.conn?.reply(chatId ? chatId : this.chat, text, this, options, smlcap)
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
                    forward: this, force, ...options
                }, { ...options })
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
                return this.conn?.sendMessage(this.chat, { delete: this.key })
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
       
                             
       
    Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
        return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength)
    }
       
                        
       
    ArrayBuffer.prototype.toBuffer = function toBuffer() {
        return Buffer.from(new Uint8Array(this))
    }
          
                           
          
                                                                                                                                                                    
                                   
        
    Uint8Array.prototype.getFileType = ArrayBuffer.prototype.getFileType = Buffer.prototype.getFileType = async function getFileType() {
        return await fileTypeFromBuffer(this)
    }
       
                         
       
    String.prototype.isNumber = Number.prototype.isNumber = isNumber
       
       
                        
       
    String.prototype.capitalize = function capitalize() {
        return this.charAt(0).toUpperCase() + this.slice(1, this.length)
    }
       
                        
       
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
       
                                  
                        
       
    Number.prototype.toTimeString = function toTimeString() {
                                           
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


   
     
                                                                                                                
                     
   
function nullish(args) {
    return !(args !== null && args !== undefined)
}


                                                             
                                                                                           
                                                                    
                                                                                       
                                                
                                                                                                     
                                                                                              
