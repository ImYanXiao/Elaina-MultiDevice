import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import knights from 'knights-canvas'

/**
 * Type import (@rexxhayanasi/elaina-baileys)
 */
import { proto, jidDecode } from '@rexxhayanasi/elaina-baileys'

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))

export async function handler(chatUpdate) {
    this.msgqueque = this.msgqueque || []
    if (!chatUpdate) return

    this.pushMessage(chatUpdate.messages).catch(console.error)
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    if (!m) return

    if (global.db.data == null)
        await global.loadDatabase()

    try {
        m = smsg(this, m) || m
        if (!m) return

        m.exp = 0
        m.limit = false

        let user = global.db.data.users[m.sender] ||= {}
        user.exp ||= 0
        user.limit ||= 25
        user.afk ||= -1
        user.afkReason ||= ''
        user.banned ||= false

        let chat = global.db.data.chats[m.chat] ||= {}
        chat.isBanned ||= false
        chat.welcome ||= false
        chat.detect ||= false
        chat.sWelcome ||= ''
        chat.sBye ||= ''
        chat.sPromote ||= ''
        chat.sDemote ||= ''
        chat.delete ||= false
        chat.antiLink ||= false
        chat.viewonce ||= false
        chat.antiToxic ||= false
        chat.simi ||= false
        chat.autoSticker ||= false
        chat.premium ||= false
        chat.premiumTime ||= false
        chat.premnsfw ||= false
        chat.expired ||= 0

        let settings = global.db.data.settings[this.user.jid] ||= {}
        settings.self ||= false
        settings.autoread ||= false
        settings.restrict ||= false
        settings.anticall ||= true
        settings.restartDB ||= 0

        if (opts['nyimak']) return
        if (opts['pconly'] && m.chat.endsWith('g.us')) return
        if (opts['gconly'] && !m.chat.endsWith('g.us')) return
        if (opts['swonly'] && m.chat !== 'status@broadcast') return

        if (typeof m.text !== 'string') m.text = ''

        const senderJid = jidDecode(m.sender)?.user + '@s.whatsapp.net'
        const botJid = jidDecode(this.user.jid)?.user + '@s.whatsapp.net'

        const isROwner = [botJid, ...global.owner.map(v => v[0] + '@s.whatsapp.net')].includes(senderJid)
        const isOwner = isROwner || m.fromMe
        const isMods = isOwner || global.mods.map(v => v + '@s.whatsapp.net').includes(senderJid)
        const isPrems = isROwner || user.premiumTime > 0

        if (!isOwner && opts['self']) return
        if (m.isBaileys) return

        m.exp += Math.ceil(Math.random() * 10)

        const groupMetadata = m.isGroup ? await this.groupMetadata(m.chat).catch(() => null) : null
        const participants = groupMetadata?.participants || []
        const userGroup = m.isGroup ? participants.find(u => u.id === m.sender) : {}
        const botGroup = m.isGroup ? participants.find(u => u.id === this.user.jid) : {}

        const isAdmin = userGroup?.admin
        const isBotAdmin = botGroup?.admin

        const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')

        for (let name in global.plugins) {
            const plugin = global.plugins[name]
            if (!plugin || plugin.disabled) continue

            const __filename = join(___dirname, name)

            if (plugin.all) {
                try {
                    await plugin.all.call(this, m, { chatUpdate, __dirname: ___dirname, __filename })
                } catch (e) {
                    console.error(e)
                }
            }

            const prefix = plugin.customPrefix || global.prefix
            const match = prefix instanceof RegExp ? prefix.exec(m.text) : m.text.startsWith(prefix) ? [prefix] : null
            if (!match) continue

            let command = m.text.slice(match[0].length).trim().split(/ +/).shift().toLowerCase()
            if (!plugin.command) continue

            const isAccept =
                typeof plugin.command === 'string' ? plugin.command === command :
                Array.isArray(plugin.command) ? plugin.command.includes(command) :
                plugin.command instanceof RegExp ? plugin.command.test(command) :
                false

            if (!isAccept) continue

            m.plugin = name

            if (plugin.owner && !isOwner) return global.dfail('owner', m, this)
            if (plugin.mods && !isMods) return global.dfail('mods', m, this)
            if (plugin.premium && !isPrems) return global.dfail('premium', m, this)
            if (plugin.group && !m.isGroup) return global.dfail('group', m, this)
            if (plugin.admin && !isAdmin) return global.dfail('admin', m, this)
            if (plugin.botAdmin && !isBotAdmin) return global.dfail('botAdmin', m, this)

            try {
                await plugin.call(this, m, {
                    conn: this,
                    command,
                    args: m.text.split(/ +/).slice(1)
                })
            } catch (e) {
                console.error(e)
                m.reply(format(e))
            }

            break
        }

    } finally {
        if (opts['autoread'])
            await this.readMessages([m.key])
    }
}

/**
 * DELETE MESSAGE DETECTOR
 */
export async function deleteUpdate(message) {
    try {
        const msg = this.serializeM(this.loadMessage(message.id))
        if (!msg) return

        const chat = global.db.data.chats[msg.chat] || {}
        if (!chat.delete) return

        this.reply(
            msg.chat,
            `Terdeteksi @${message.participant.split('@')[0]} menghapus pesan`,
            msg
        )

        this.copyNForward(msg.chat, msg)
    } catch (e) {
        console.error(e)
    }
}

/**
 * PERMISSION FAIL RESPONSE
 */
global.dfail = (type, m, conn) => {
    const msg = {
        rowner: '*ONLY DEVELOPER*',
        owner: '*ONLY OWNER*',
        mods: '*ONLY MODS*',
        premium: '*ONLY PREMIUM*',
        group: '*GROUP ONLY*',
        private: '*PRIVATE ONLY*',
        admin: '*ADMIN ONLY*',
        botAdmin: '*BOT MUST BE ADMIN*'
    }[type]

    if (msg) conn.reply(m.chat, msg, m)
}

/**
 * HOT RELOAD
 */
let file = global.__filename(import.meta.url, true)
watchFile(file, async () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'handler.js'"))
    if (global.reloadHandler) console.log(await global.reloadHandler())
})
