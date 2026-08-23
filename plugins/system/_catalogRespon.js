import moment from 'moment-timezone'
import fs from 'fs'

export async function before(m) {
    if (!/orderMessage/i.test(m.mtype)) return
    let setting = global.db.data.settings[this.user.jid]
    let user = global.db.data.users[m.sender]
    let name = user.registered ? user.name : m.name
    if (/premium/i.test(m.message.orderMessage.orderTitle)) {
        try {
            if (setting.autoread) await this.readMessages([m.key])
            if (setting.composing) await this.sendPresenceUpdate('composing', m.chat)
            await global.loading(m, this)
            let caption = `
❏ *_Harga Premium_*
❃ _15 Hari / 5k_
❃ _30 Hari / 10k_
❃ _45 Hari / 15k_
❃ _60 Hari / 20k_
❃ _Permanen / 30k_

❏ *_Fitur_*
❃ _Unlimited Limit_
❃ _Nsfw_
❃ _Bebas Pakai Bot Di Pc_
❃ _Dan Lain Lain_

Minat? Silahkan Chat Nomor Owner Dibawah 
${global.config.owner.map(([jid, name]) => {
    return `
Name : ${name}
wa.me/${jid}
`.trim()}).join('\n\n')}

Atau Ketik 
#premium 15 hari
`.trim()
            await this.adReply(m.chat, caption, `Halo ${name}, ${wish()}`, global.config.watermark, fs.readFileSync("./media/thumbnail.jpg"), global.config.website, m)
        } finally {
            await global.loading(m, this, true)
        }
    } else if (/sewa|group/i.test(m.message.orderMessage.orderTitle)) {
        try {
            if (setting.autoread) await this.readMessages([m.key])
            if (setting.composing) await this.sendPresenceUpdate('composing', m.chat)
            await global.loading(m, this)
            let teks = `❏ *_Harga Sewa_*
❃ _10 Hari 5k / Group_
❃ _20 Hari 10k / Group_
❃ _30 Hari 15k / Group_
❃ _40 Hari 20k / Group_
❃ _Permanen 50k / Group_

❏ *_Fitur_*
❃ _Antilink_
❃ _Welcome_
❃ _Enable_
❃ _Store List_
❃ _Promote/Demote_
❃ _HideTag_
❃ _Dan Lain Lain_

Minat? Silahkan Chat Nomor Owner Dibawah
${global.config.owner.map(([jid, name]) => {
    return `
Name : ${name}
https://wa.me/${jid}
`}).join('\n\n')}
`.trim()
            await this.adReply(m.chat, teks, `Halo ${name}, ${wish()}`, global.config.watermark, fs.readFileSync('./media/thumbnail.jpg'), global.config.website, m)
        } finally {
            await global.loading(m, this, true)
        }
    }
}

function calculateValue(days) {
    const valuePer15Days = 5000
    const valuePerDay = valuePer15Days / 15
    const totalValue = days * valuePerDay
    return totalValue
}

function wish() {
    let wishloc = ''
    let time = moment.tz('Asia/Jakarta').format('HH')
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

let toRupiah = number => parseInt(number).toLocaleString('id-ID')