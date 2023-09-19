let { downloadContentFromMessage, WAMessageStubType } = (await import('@adiwajshing/baileys'));
import { format } from 'util';

export async function all(m) {
    if (!m.message)
        return
    this.spam = this.spam ? this.spam : {}
    let chat = global.db.data.chats[m.chat]
    if (chat.antiSpam) {
        if (m.sender in this.spam) {
            this.spam[m.sender].count++
            if (m.messageTimestamp.toNumber() - this.spam[m.sender].lastspam > 5) {
                if (this.spam[m.sender].count > 5) {
                    global.db.data.users[m.sender].banned = true
                    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
                    let caption = ` Banned *@${who.split("@")[0]}* Jangan spam kak!`
                    this.reply(m.chat, caption, m)
                }
                this.spam[m.sender].count = 0
                this.spam[m.sender].lastspam = m.messageTimestamp.toNumber()
            }
        }
        else
            this.spam[m.sender] = {
                jid: m.sender,
                count: 0,
                lastspam: 0
            }
    }
}

let handler = m => m
let linkRegex = /(chat.whatsapp.com|whatsapp.com|wa.me|xnxx.com|xvideos.com|pornhub.com)\/([0-9A-Za-z]{1,99999})/i
handler.before = async function (m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true
    let chat = global.db.data.chats[m.chat]
    let isGroupLink = linkRegex.exec(m.text)
    if (chat.antiLink && isGroupLink && !isAdmin && !m.isBaileys && m.isGroup) {
        let thisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
        if (m.text.includes(thisGroup)) throw false // jika link grup itu sendiri gak dikick
        if (!isBotAdmin) m.reply(` *「 ANTILINK 」* ${isAdmin ? "Admin mah bebas ygy :'v" : `\n\nlink group terdeteksi dan ${global.namebot} bukan admin jadi tidak bisa ngekick!`}`)
        if (isBotAdmin) {
            m.reply(` *「 ANTILINK 」* \n\nLink Group Terdeteksi, bye Kamu Akan Di Kick!!`.trim())
            await this.delay(500)
            await this.groupParticipantsUpdate(m.chat, [m.sender], "remove")
            await this.sendMessage(m.chat, { delete: { remoteJid: m.chat, id: m.id }}) // Hapus pesan yang mengandung tautan
        }
    }
    return true
}

export async function before(m, { isAdmin, isBotAdmin }) {
    let chat = db.data.chats[m.chat]
    if (/^[.~#/\$,](read)?viewonce/.test(m.text)) return
    if (!chat.viewonce || chat.isBanned) return
    if (m.mtype == 'viewOnceMessageV2') {
        let msg = m.message.viewOnceMessageV2.message
        let type = Object.keys(msg)[0]
        let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
        let buffer = Buffer.from([])
        for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk])
        }
        if (/video/.test(type)) {
            return this.sendFile(m.chat, buffer, 'media.mp4', msg[type].caption || '', m)
        } else if (/image/.test(type)) {
            return this.sendFile(m.chat, buffer, 'media.jpg', msg[type].caption || '', m)
        }
    }
}

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

export async function all(m) {
	if (m.fromMe && m.isBaileys) return !0
	let text;
	let setting = global.db.data.settings[this.user.jid]
	if(!setting.anticall) return 
	
	if (m.messageStubType === (WAMessageStubType.CALL_MISSED_VOICE || WAMessageStubType.CALL_MISSED_VIDEO )) {
	    await delay(1000) 
		await conn.reply(m.chat, `Kamu Diblokir Karena Menelpon Bot!!`, fakes)
		return conn.updateBlockStatus(m.chat, "block") 
	}
}
