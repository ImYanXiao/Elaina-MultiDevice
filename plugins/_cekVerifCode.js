export async function before(m) {
    if (!this.verif) this.verif = {}
    if (m.isBaileys || m.fromMe) return
    if (!(m.sender in this.verif)) return

    let user = global.db.data.users
    let bot = global.db.data.bots.users
    let setting = global.db.data.settings[this.user.jid]

    if (this.verif[m.sender].codeEmail && m.text === this.verif[m.sender].codeEmail) {
        if (setting.autoread) await this.readMessages([m.key])
        if (setting.composing) await this.sendPresenceUpdate('composing', m.chat)

        if (Date.now() - this.verif[m.sender].lastCode > 180000) {
            return m.reply("Kode verifikasi telah Expired!")
        }

        if (this.verif[m.sender].login) {
            let dataUser = Object.keys(user).find(v => user[v].email == this.verif[m.sender].login && user[v].verif)
            let dataBot = Object.keys(bot).find(v => bot[this.verif[m.sender].login])

            if (dataUser) {
                user[m.sender] = user[dataUser]
                delete user[dataUser]
            } else if (dataBot) {
                user[m.sender] = bot[dataBot]
                delete bot[dataBot]
            }
            m.reply("Login berhasil! Email terverifikasi dan akun berhasil dipindahkan.")
            delete this.verif[m.sender]
        } else {
            m.reply(`Email telah terverifikasi!\nLimit chat kamu telah menjadi 1000`)
            user[m.sender].commandLimit = 1000
            user[m.sender].verif = true
        }
        delete this.verif[m.sender]
    }
}