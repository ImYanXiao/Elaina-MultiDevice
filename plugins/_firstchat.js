import fs from 'fs'
import moment from 'moment-timezone'

export async function before(m) {
    if (m.isBaileys || m.fromMe || m.isGroup) return
    if (m.text.startsWith('=>') || m.text.startsWith('>') || m.text.startsWith('.') || m.text.startsWith('#') || m.text.startsWith('!') || m.text.startsWith('/') || m.text.startsWith('\/')) return

    let setting = global.db.data.settings[this.user.jid]
    let user = global.db.data.users[m.sender]
    let thumb = ['thumb-1', 'thumb-2', 'thumb-3', 'thumb-4', 'thumb-5']

    if (!user.registered) {
        if (!user.lastFC) user.lastFC = 0
        if (Date.now() - user.lastFC < 18000000) return
        if (setting.composing) await this.sendPresenceUpdate('composing', m.chat).catch(() => {})
        if (setting.autoread) await this.readMessages([m.key]).catch(() => {})
        
        await this.adReply(m.chat, `Halo Kak ${m.name},

Saya ${this.user.name}, asisten WhatsApp yang siap memudahkan segala urusan Anda!

_Ketik *.menu* untuk melihat apa saja yang dapat saya lakukan!_`, `Halo ${m.name}, ${wish()}`, global.config.watermark, fs.readFileSync(`./media/${thumb.getRandom()}.jpg`), global.config.website, m, false)
        user.lastFC = Date.now()
    }
}

function wish() {
    let wishloc = ''
    const time = moment.tz('Asia/Jakarta').format('HH')
    wishloc = ('Hi')
    if (time >= 0) {
        wishloc = ('Selamat Malam')
    }
    if (time >= 4) {
        wishloc = ('Selamat Pagi')
    }
    if (time >= 11) {
        wishloc = ('Selamat Siang')
    }
    if (time >= 15) {
        wishloc = ('️Selamat Sore')
    }
    if (time >= 18) {
        wishloc = ('Selamat Malam')
    }
    if (time >= 23) {
        wishloc = ('Selamat Malam')
    }
    return wishloc
}