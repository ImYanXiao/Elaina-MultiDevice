import axios from "axios"
let handler = async (m, { text }) => {
    if (!text) return m.reply(`masukan auth token !

*# Cara Dapet Auth Token :*
1. masuk ke https://tools.tutorialinjectid.my.id/auth-axis/
2. masukan nomor telpon mu (Harus Axis !)
3. masukan code otp yang diberikan
4. lalu klick tombol \"+ Create\"`)
    function bar(p) {
        let titik = "░░░░░░░░░░".split("")
        for (let i = 1; i <= p; i++) {
            if (i%10 == 0) {
                titik[(i/10)-1] = "█";
            }
        }
        return "[ " + titik.join(" ") + " ]";
    }

    let { data } = await axios({
            "headers": {
                "Authorization": text,
                "User-Agent": "okhttp/4.2.2"
            },
            "method": "GET",
            "url": "https://quota.api.axis.co.id/quota"
        })
    let {
        result
    } = JSON.parse(atob(data.data))
    if (!result.detail) return m.reply("Ga ada kuotanya bro :v")
    let sisakuota = ''
    for (let kuota of result.detail) {
        let dateberlaku = new Date(kuota.benefitData.activeUntil)
        let bulan0 = dateberlaku.toLocaleDateString('id', {
            month: 'long'
        })
        let bulan = bulan0[0]+bulan0[1]+bulan0[2]
        sisakuota += `*# ${kuota.name}*
        ${bar(kuota.percentRemaining)}

• Total : ${kuota.total}
• Sisa : ${kuota.remaining}
• Terpakai : ${kuota.usage}

• Sisa Hari : ${kuota.benefitData.sisaHari}
• Expired : s.d. ${dateberlaku.getDate()} ${bulan} ${dateberlaku.getFullYear()} ${dateberlaku.getHours()}:${dateberlaku.getMinutes()}\nミミミミミミミミミミミミミミミミミミミミミミミ\n`
    }
    m.reply(sisakuota)
}
handler.help = ['cekaxis']
handler.tags = ['tools']
handler.command = /^(cek)?axis$/i

export default handler