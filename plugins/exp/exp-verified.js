import nodemailer from 'nodemailer'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!conn.verif) conn.verif = {}
    if (!text) {
        return m.reply(`Masukkan Gmail! \n\nContoh: \n${usedPrefix + command} contoh@gmail.com`)
    }

    let user = global.db.data.users
    let bot = global.db.data.bots.users
    let dataUser = Object.keys(user).find(v => user[v].email == text && user[v].verif)
    let dataBot = Object.keys(bot).find(v => bot[text])

    if (user[m.sender].verif) {
        return m.reply("Kamu sudah terdaftar!")
    }

    if (dataUser || dataBot) {
        return m.reply(`Email tersebut sudah digunakan!`)
    }

    if (m.sender in conn.verif && Date.now() - conn.verif[m.sender].lastCode < 60000) {
        return m.reply(`Silahkan tunggu 1 menit untuk meminta kode lagi`)
    }

    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'archavecommunityid@gmail.com',
            pass: 'dlue zqit finp iqgc'
        }
    })

    let code = generateVerificationCode()
    let mailOptions = createMailOptions(text, conn.user.name, code, conn.user.jid.split("@")[0])

    try {
        await transport.sendMail(mailOptions)
        await m.reply(`Email terkirim! \nKode akan expired dalam 3 menit \n\n_jika email tidak ada, silahkan cek ke folder spam atau cek kembali email yang kamu kirim!_`)
        user.email = text
        conn.verif[m.sender] = {
            codeEmail: code,
            login: false,
            lastCode: Date.now()
        }
    } catch (err) {
        m.reply("Error! \n_Cek kembali email yang kamu masukkan_")
    }
}

handler.help = ["verif"]
handler.tags = ["xp"]
handler.command = /^(verif)$/i
handler.register = true
export default handler

function generateVerificationCode(length = 6) {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let verificationCode = ''
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length)
        verificationCode += characters[randomIndex]
    }
    return verificationCode
}

function createMailOptions(email, botName, code, waLink) {
    return {
        from: 'ElainaAI@gmail.com',
        to: email,
        subject: `${botName} Email Verification Code!`,
        text: '',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 30px;
            max-width: 400px;
            text-align: center;
        }
        #heading {
            font-size: 24px;
            margin-bottom: 20px;
            color: #2c3e50;
        }
        #verification-code {
            background-color: #3498db;
            color: #ffffff;
            padding: 20px;
            font-size: 32px;
            margin: 20px 0;
            border-radius: 8px;
            letter-spacing: 2px;
        }
        #link a {
            color: #3498db;
            text-decoration: none;
            font-weight: bold;
        }
        #link a:hover {
            text-decoration: underline;
        }
        #note {
            margin-top: 20px;
            font-size: 14px;
            color: #e74c3c;
        }
    </style>
</head>
<body>
    <div class="container">
        <div id="heading">
            Here is Your Email Verification Code
        </div>
        <div id="verification-code">
            <strong>${code}</strong>
        </div>
        <div id="link">
            Or <a href="https://wa.me/${waLink}?text=${code}">Click Here</a>
        </div>
        <div id="note">
            Note: Code will expire in 3 minutes!
        </div>
    </div>
</body>
</html>`
    }
}