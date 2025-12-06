import axios from "axios"
import { Instagram } from "../lib/scrape.js"
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
let instagram = new Instagram()
export async function before(m, { isPrems }) {
    let user = global.db.data.users[m.sender]
    let chat = global.db.data.chats[m.chat]
    let setting = global.db.data.settings[this.user.jid]

    if (!m.text) return
    if (m.isBaileys || m.fromMe) return
    if (m.text.startsWith('=>') || m.text.startsWith('>') || m.text.startsWith('.') || m.text.startsWith('#') || m.text.startsWith('!') || m.text.startsWith('/') || m.text.startsWith('\/')) return
    if (chat.mute || chat.isBanned || user.banned) return

    let text = m.text.replace(/\n+/g, ' ')
    if ((chat.autodownload || user.autodownload) && text.match(regex)) {
        this.autodownload = this.autodownload || {}
        let link = text.match(regex)[0]

        if (/^http(s)?:\/\/(www|v(t|m)).tiktok.com\/[-a-zA-Z0-9@:%._+~#=]/i.test(link)) {
            if (!(m.sender in this.autodownload)) {
                try {
                    this.autodownload[m.sender] = true

                    if (setting.composing)
                        await this.sendPresenceUpdate('composing', m.chat).catch(() => {})

                    if (setting.autoread)
                        await this.readMessages([m.key]).catch(() => {})

                    let { data } = await tiktok(link)
                    if (data.images) {
                        await this.sendFile(m.chat, data.images[0], false, link, m)
                    } else {
                        await this.sendFile(m.chat, data.play, false, link, m)
                    }
                } catch (e){
                    return !0
                } finally {
                    delete this.autodownload[m.sender]
                }
            }
        }

        if (/^http(s)?:\/\/(www)?.instagram.com\/(p|reel|v)\/[-a-zA-Z0-9@:%._+~#=]|https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._%+-]+(\/[A-Za-z0-9._%+-]+)*(\/\?[A-Za-z0-9=&._%+-]*)?/i.test(link)) {
            if (!(m.sender in this.autodownload)) {
                try {
                    this.autodownload[m.sender] = true

                    if (setting.composing)
                        await this.sendPresenceUpdate('composing', m.chat).catch(() => {})

                    if (setting.autoread)
                        await this.readMessages([m.key]).catch(() => {})

                    let media = await instagram.reels(link)
                    if (media.status !== 200) {
                        media = await instagram.post(link)
                    }
                    await this.sendFile(m.chat, media.result[0].url, false, link, m)
                } catch {
                    return !0
                } finally {
                    delete this.autodownload[m.sender]
                }
            }
        }

        if (/^http(s)?:\/\/youtube.com\/shorts\/[-a-zA-Z0-9@:%._+~#=]/i.test(link)) {
            if (!(m.sender in this.autodownload)) {
                try {
                    this.autodownload[m.sender] = true

                    if (setting.composing)
                        await this.sendPresenceUpdate('composing', m.chat).catch(() => {})

                    if (setting.autoread)
                        await this.readMessages([m.key]).catch(() => {})

                    let { video } = await youtubedl(link).catch(async _=> await youtubedlv2(link))
                    await this.sendFile(m.chat, await video['360p'].download(), false, link, m)
                } catch {
                    return !0
                } finally {
                    delete this.autodownload[m.sender]
                }
            }
        }

    }
    return !0
}

async function tiktok(url) {
    let res = await axios.post('https://www.tikwm.com/api', {}, {
        params: {
            url, hd: 1
        }
    })
    return res.data
}

let regex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi
let delay = time => new Promise(res => setTimeout(res, time))