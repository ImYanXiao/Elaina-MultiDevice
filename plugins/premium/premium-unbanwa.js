import nodemailer from 'nodemailer'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    let user = global.db.data.users[m.sender]
    let __timers = (new Date - user.unbanwa)
    let _timers = (3600000 - __timers)
    let timers = clockString(_timers)
    if (!text) return m.reply(`Masukan nomor WhatsApp \n\nContoh : \n${usedPrefix + command} ${m.sender.split('@')[0]}`)
    if (new Date - user.unbanwa < 3600000) return m.reply(`Silahkan menunggu selama ${timers}, untuk bisa menggunakan fitur ini kembali`)

    const login = email.getRandom()
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: login.user,
            pass: login.pass
        }
    })

    const mailOptions = {
        from: login.user,
        to: 'smb_web@support.whatsapp.com',
        subject: 'My Whatsapp Got Banned',
        text: textUnban.getRandom().replace('@', text)
    }

    transport.sendMail(mailOptions, async function(err, data) {
        if (err) return m.reply(`❌ SMTP Error !! \n\n${err}`)
        else {
            await m.reply(`✅ Email Terkirim !! \n\n${data.response}`, false, false, { smlcap: true, except: [data.response] })
        }
    })

    user.unbanwa = new Date * 1
}
handler.help = ['unbanwa']
handler.tags = ['premium', 'tools']
handler.command = /unban(wa|whatsapp)/i
handler.premium = true
export default handler

const email = [
    {
        user: 'botryhar@gmail.com',
        pass: 'ocmx chuf ueub eskf'
    },
    {
        user: 'ryharacc01@gmail.com',
        pass: 'axra qshp dfyg wjuz'
    },
    {
        user: 'ryharakun1@gmail.com',
        pass: 'anhx semb cnos bbho'
    }
]

const textUnban = [
    `HALLO WHATSAPP-ENTWICKLER, BITTE STELLEN SIE MEIN WHATSAPP-KONTO SOFORT WIEDER HER, ICH VERWENDE WHATSAPP, UM MIT WICHTIGEN MENSCHEN IN MEINEM LEBEN ZU KOMMUNIZIEREN, OHNE DIE WHATSAPP-APP WIRD MEIN LEBEN EIN PROBLEM, MEIN WHATSAPP-KONTO IST @`,
    `Il mio numero è nuovo, e con quello ho appena aperto il settore e in questo gruppo ho davvero bisogno del mio account, non violo alcuna regola dell'informativa sulla privacy, quindi chiedo al team di supporto di whatsapp di agire il prima possibile in modo che Posso avere accesso al materiale dal mio gruppo è @`,
    `Hallo pihak WhatsApp dukungan yang terhormat, saya adalah pengguna whatsapp dengan nomor @, akun saya terblokir karena tanpa alasan yang jelas saya tidak melakukan apapun tetapi saya terblokir awal nya spam saya belum melakukan tinjauan apapun dan WhatsApp langsung mengganti secara permanen saya seharian tidak menggunakan aplikasi WhatsApp dan tidak melakukan peninjauan terhadap akun saya karena baru malam ini saya mengecek akun saya terblokir tolong segera pulihkan akun saya terimakasih`,
    `Olá WhatsApp, amanhã é dia de formatura do meu filho. Eu uso o WhatApp para me comunicar com meu filho que está prestes a se formar fora da cidade. Mas meu número foi bloqueado permanentemente esta tarde, apesar de eu ter enviado apenas uma mensagem de feliz formatura para meu filho. @ por favor desbloqueie o número, obrigado.`
]

const delay = time => new Promise(res => setTimeout(res, time))

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}