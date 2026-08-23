import fetch from 'node-fetch'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text) return m.reply(`Masukan Nama Character!\n\nExample\n${usedPrefix + command} Hu Tao`)
        await global.loading(m, conn)
        let api = await fetch(`https://genshin-db-api.vercel.app/api/characters?query=${text}&matchCategories=true&dumpResult=true&queryLanguages=English&resultLanguage=Indonesian`)
        let { match } = await api.json()
        let footer = '\n\n_*Note :* Build Bisa Berubah Kapan Saja Sesuai Dengan Patch_'
        if (/build(gi|genshin)/i.test(command)) {
            switch (match) {
                case 'Amber':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Amber.jpg', `${match}.jpg`, `Here Build Support For ${match} ${footer}`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Amber.jpg', `${match}.jpg`, `Here Another Build Main Dps For ${match} ${footer}`, m)
                    break
                case 'Barbara':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Barbara.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Beidou':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Sub%20DPS/Character_Beidou.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Bennett':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Bennett.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Chongyun':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Chongyun.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Diluc':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Diluc.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Fischl':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Sub%20DPS/Character_Fischl.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Jean':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Jean.jpg', `${match}.jpg`, `Here Build Healer For ${match} ${footer}`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Jean.jpg', `${match}.jpg`, `Here Another Burst Dps Build For ${match} ${footer}`, m)
                    break
                case 'Kaeya':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Sub%20DPS/Character_Kaeya.jpg', `${match}.jpg`, `Here Build Sub Dps For ${match} ${footer}`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Kaeya.jpg', `${match}.jpg`, `Here Another Support Build For ${match} ${footer}`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Kaeya.jpg', `${match}.jpg`, `Here Another Build Main Dps For ${match} ${footer}`, m)
                    break
                case 'Keqing':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Keqing_Electro.jpg', `${match}.jpg`, `Here Build Electro For ${match} ${footer}`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Keqing_Physical.jpg', `${match}.jpg`, `Here Another Build Physical For ${match} ${footer}`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Aggravate/Character_Keqing_Quicken.jpg', `${match}.jpg`, `Here Another Build Quicken For ${match} ${footer}`, m)
                    break
                case 'Klee':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Klee.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Lisa':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Sub%20DPS/Character_Lisa.jpg', `${match}.jpg`, `Here Build Sub Dps For ${match} ${footer}`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Lisa.jpg', `${match}.jpg`, `Here Another Build Support For ${match} ${footer}`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Lisa.jpg', `${match}.jpg`, `Here Another Build Main Dps For ${match} ${footer}`, m)
                    break
                case 'Mona':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Mona.jpg', `${match}.jpg`, `Here Build Burst Dps For ${match} ${footer}`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Mona_Nuke.jpg', `${match}.jpg`, `Here Another Build Mona Nuke For ${match} ${footer}`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Mona_Freeze.jpg', `${match}.jpg`, `Here Another Build Mona Freeze For ${match} ${footer}`, m)
                    break
                case 'Ningguang':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Ningguang.jpg', `${match}.jpg`, `Here Build Main Dps For ${match} ${footer}`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Ningguang.jpg', `${match}.jpg`, `Here Another Build Burst Dps For ${match} ${footer}`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'saya', `${match}.jpg`, `Here Another Build For ${match} ${footer}`, m)
                    break
                case 'Noelle':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Noelle.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Qiqi':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Qiqi.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Razor':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Razor.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Sucrose':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Sucrose.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Traveler':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Traveler_Geo.jpg', `${match}.jpg`, `Here Build For ${match} Geo`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Traveler_Anemo.jpg', `${match}.jpg`, `Here Build For ${match} Anemo`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Traveler_Dendro.jpg', `${match}.jpg`, `Here Build For ${match} Dendro`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Traveler_Electro.jpg', `${match}.jpg`, `Here Build For ${match} Electro`, m)
                    break
                case 'Venti':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Venti.jpg', `${match}.jpg`, `Here Build Support For ${match} ${footer}`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Venti.jpg', `${match}.jpg`, `Here Another Build Burst Dps For ${match} ${footer}`, m)
                    break
                case 'Xiangling':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Xiangling.jpg', `${match}.jpg`, `Here Build Support For ${match} ${footer}`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Xiangling.jpg', `${match}.jpg`, `Here Another Build  Main DpsFor ${match} ${footer}`, m)
                    await delay(2000)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Xiangling.jpg', `${match}.jpg`, `Here Another Build Burst Dps For ${match} ${footer}`, m)
                    break
                case 'Xingqiu':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Xingqiu.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Diona':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Diona.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Tartaglia':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Tartaglia.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Xinyan':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Xinyan.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Zhongli':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Zhongli.jpg', `${match}.jpg`, `Here Build Support For ${match} ${footer}`, m)
                    await delay(1500)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Zhongli.jpg', `${match}.jpg`, `Here Another Build Burst Dps For ${match} ${footer}`, m)
                    break
                case 'Albedo':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Albedo.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Ganyu':
                    conn.sendFile(m.chat, 'https://telegra.ph/file/1a51adbe37e63a7afea6a.jpg', `${match}.jpg`, `Here Build Main Dps Melt For ${match} ${footer}`, m)
                    await delay(1500)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Ganyu_Freeze.jpg', `${match}.jpg`, `Here Another Build Main Dps For ${match} ${footer}`, m)
                    break
                case 'Hu Tao':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_HuTao.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Xiao':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Xiao.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Rosaria':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Rosaria.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Eula':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Eula.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Yanfei':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Yanfei.jpg', `${match}.jpg`, `Here Build Main Dps For ${match} ${footer}`, m)
                    await delay(1500)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Yanfei.jpg', `${match}.jpg`, `Here Another Build Support For ${match} ${footer}`, m)
                    await delay(1500)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Sub%20DPS/Character_Yanfei.jpg', `${match}.jpg`, `Here Another Build Sub Dps For ${match} ${footer}`, m)
                    break
                case 'Kaedehara Kazuha':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Kazuha.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Kamisato Ayaka':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Ayaka.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Sayu':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Sayu.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Yoimiya':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Yoimiya.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Aloy':
                    conn.sendFile(m.chat, 'https://telegra.ph/file/33809d8ab39eff34c8ab3.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Kujou Sara':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Sara.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Raiden Shogun':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Raiden.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Sangonomiya Kokomi':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Kokomi.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Thoma':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Thoma.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Arataki Itto':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Itto.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Gorou':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Gorou.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Shenhe':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Shenhe.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Yun Jin':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_YunJin.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Yae Miko':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Burst%20DPS/Character_Yae.jpg', `${match}.jpg`, `Here Build Burst Dps For ${match} ${footer}`, m)
                    await delay(1500)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Aggravate/Character_Yae.jpg', `${match}.jpg`, `Here Build Aggravate For ${match} ${footer}`, m)
                    break
                case 'Kamisato Ayato':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Sub%20DPS/Character_Ayato.jpg', `${match}.jpg`, `Here Build Sub Dps For ${match} ${footer}`, m)
                    break
                case 'Yelan':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Sub%20DPS/Character_Yelan.jpg', `${match}.jpg`, `Here Build Sub Dps For ${match} ${footer}`, m)
                    break
                case 'Kuki Shinobu':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Shinobu.jpg', `${match}.jpg`, `Here Build Healer For ${match} ${footer}`, m)
                    await delay(1500)
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Shinobu.jpg', `${match}.jpg`, `Here Build Support For ${match} ${footer}`, m)
                    break
                case 'Shikanoin Heizou':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Heizou.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Tighnari':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Driver/Character_Tighnari.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Collei':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Collei.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Dori':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Dori.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Nilou':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Nilou.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Cyno':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Cyno.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Candace':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Candace.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Nahida':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Nahida.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Layla':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Layla.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Wanderer':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Wanderer.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Faruzan':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Faruzan.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Alhaitham':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Alhaitham.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Yaoyao':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Yaoyao.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Dehya':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Main%20DPS/Character_Dehya.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Mika':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Mika.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Baizhu':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Healer/Character_Baizhu.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Kaveh':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Driver/Character_Kaveh.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Kirara':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/Characters/en-US/Support/Character_Kirara.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Lyney':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/sheets/Lyney_Main%20DPS.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Lynette':
                    conn.sendFile(m.chat, 'https://raw.githubusercontent.com/FortOfFans/FortOfFans.github.io/main/sheets/Lynette_Support.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Neuvillette':
                    conn.sendFile(m.chat, 'https://pomf2.lain.la/f/nz4220i5.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Wriothesley':
                    conn.sendFile(m.chat, 'https://pomf2.lain.la/f/itnhj3e2.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Furina':
                    conn.sendFile(m.chat, 'https://pomf2.lain.la/f/55t5ys5i.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Navia':
                    conn.sendFile(m.chat, 'https://pomf2.lain.la/f/qrqdp5wy.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Arlecchino':
                    conn.sendFile(m.chat, 'https://pomf2.lain.la/f/6dogyklb.jpg', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                case 'Chevreuse':
                    conn.sendFile(m.chat, 'https://pbs.twimg.com/media/GA6auyiWEAACXrc?format=jpg&name=large', `${match}.jpg`, `Here Build For ${match} ${footer}`, m)
                    break
                default:
                    return m.reply(`Character ${text} Tidak Ditemukan!`)
            }
        }
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['buildgi']
handler.tags = ['genshin']
handler.command = /^(build(gi|genshin))$/i
handler.onlyprem = true
handler.limit = true
export default handler

const delay = time => new Promise(res => setTimeout(res, time))