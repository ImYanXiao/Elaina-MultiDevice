[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)
<p align="center">
    <img src="https://telegra.ph/file/37df69a78afb6e010282d.jpg" width="100%" style="margin-left: auto;margin-right: auto;display: block;">
</p>

## PENTING

> **Warning**: Jangan Memperjual Belikan Script Ini.


<h1 align="center">ElainaBOT - MD</h1>

<p align="center">
 <a href="#"><img title="ElainaBOT" src="https://img.shields.io/badge/Whatshapp BOT-green?colorA=%23ff0000&colorB=%23017e40&style=for-the-badge"></a>
</p>
<p align="center">
<a href="https://github.com/ImYanXiao"><img title="Author" src="https://img.shields.io/badge/AUTHOR-ImYanXiao-green.svg?style=for-the-badge&logo=github"></a>

---------

### a little about this bot
- ✔️ | Simple
- ✔️ | Menfess
- ✔️ | AntiCall
- ✔️ | Nsfw 
- ✔️ | Sticker 
- ✔️ | Kerang Ajaib 
- ✔️ | Quotes
- ✔️ | Anime 
- ✔️ | Premium 
- ✔️ | Tools 
---------
 
## ```USER RAILWAY```

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app)

## ```USER REPLIT```
[![Run on Repl.it](https://repl.it/badge/github/ImYanXiao/Elaina-MultiDevice)](https://repl.it/github/ImYanXiao/Elaina-MultiDevice)

---------
## FOR WINDOWS/RDP USER 💻

Install this tool first before running the script

* Download And Install Git [`Click Here`](https://git-scm.com/downloads)
* Download And Install NodeJS [`Click Here`](https://nodejs.org/en/download)
* Download And Install FFmpeg [`Click Here`](https://ffmpeg.org/download.html) (**Don't Forget Add FFmpeg to PATH enviroment variables**)
* Download And Install ImageMagick [`Click Here`](https://imagemagick.org/script/download.php)

----------

## FOR VPS USER

* apt update && apt upgrade -y
* apt install nodejs imagemagick ffmpeg -y
* node -v 
* if the version is still under 17, use this step
* curl -s https://deb.nodesource.com/setup_19.x | sudo bash
* apt-get install -y nodejs

----------

```bash
git clone https://github.com/ImYanXiao/Elaina-MultiDevice
cd Elaina-MultiDevice
npm install
npm update
```

---------

## Run ⏳

```bash
node .
```

---------

## ```Arguments node . [--options] [<session name>]```

## `--pconly`
* If that chat not from private bot, bot will ignore

## `--gconly`
* If that chat not from group, bot will ignore

## `--swonly`
* If that chat not from status, bot will ignore

## `--prefix <prefixes>`
* `prefixes` are seperated by each character
Set prefix

### `--db <your mongodb url>`

Open the package.json file and fill in your mongodb url in the `mongodb: --db mongodb url` section!

## `--server`
* Used for [heroku](https://heroku.com/) or scan through website

## `--restrict`
* Enables restricted plugins (which can lead your number to be **banned** if used too often)
* Group Administration `add, kick`

## `--img`
* Enable image inspector through terminal

## `--autoread`
* If enabled, all incoming messages will be marked as read

## `--nyimak`
* No bot, just print received messages and add users to database

## `--test`
* **Development** Testing Mode 

## `--self`
* **Only Owner & Bot** 

---------

## ```How To Customise Message Display```
```js
// Syntax
Gunakan import generateWAMessageFromContent / proto

> let { proto, generateWAMessageFromContent } = require('@adiwajshing/baileys')

let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: "test"
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "test"
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: "test",
            subtitle: "test",
            hasMediaAttachment: false
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "single_select",
                "buttonParamsJson": "{\"title\":\"title\",\"sections\":[{\"title\":\"title\",\"highlight_label\":\"label\",\"rows\":[{\"header\":\"header\",\"title\":\"title\",\"description\":\"description\",\"id\":\".play\"},{\"header\":\"header\",\"title\":\"title\",\"description\":\"description\",\"id\":\".play\"}]}]}"
              },
              {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"quick_reply\",\"id\":\".play dj tor monitor ketua\"}"
              },
              {
                 "name": "cta_url",
                 "buttonParamsJson": "{\"display_text\":\"url\",\"url\":\"https://majotabi.jp\",\"merchant_url\":\"https://www.google.com\"}"
              },
              {
                 "name": "cta_call",
                 "buttonParamsJson": "{\"display_text\":\"call\",\"id\":\"085921655444\"}"
              },
              {
                 "name": "cta_copy",
                 "buttonParamsJson": "{\"display_text\":\"copy\",\"id\":\"123456789\",\"copy_code\":\"message\"}"
              },
              {
                 "name": "cta_reminder",
                 "buttonParamsJson": "{\"display_text\":\"cta_reminder\",\"id\":\"message\"}"
              },
              {
                 "name": "cta_cancel_reminder",
                 "buttonParamsJson": "{\"display_text\":\"cta_cancel_reminder\",\"id\":\"message\"}"
              },
              {
                 "name": "address_message",
                 "buttonParamsJson": "{\"display_text\":\"address_message\",\"id\":\"indonesia\"}"
              },
              {
                 "name": "send_location",
                 "buttonParamsJson": ""
              }
           ],
          })
        })
    }
  }
}, {})

await conn.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
})
```
---------

### 📮 S&K
1. Not For Sale
2. Don't forget give star this repo
3. Don't use this repository wrong!
4. If you have problem chat me in owner number

---------

### SC ERROR / GABISA KONEK
1. pada folder plugins ini diubah menjadi nama folder yang berbeda/baru, contoh: plugins => pluginslama
2. buatlah folder plugins baru (catatan, ini adalah folder kosong) contoh : plugins
3. lalu restart server / cpanel yang dimana folder plugins ini kosong.
4. masukan nomor, dll. seperti biasa
5. setelah konek/tersambung, cek bagian perangkat tertaut, apakah ada tulisan menyinkronkan, jika ada, maka tunggu. (catatan, ini hal penting bahwa perangkat tertaut harus ada 1 yang kosong, max 5)
6. setelah sudah, hapus folder plugins dan rename folder pluginslama menjadi plugins

---------

## ```Thanks to ✨```
* [`Allah SWT`]
* [`My parents`]
* [`All Friends`]
* [`All Contributors`]
* [`All Creator Bot`]
* [`@rexxhayanasi/elaina-baileys`](https://npmjs.com/package/@rexxhayanasi/elaina-baileys)
* [`Nurutomo`](https://github.com/Nurutomo)
* [`BochilGaming`](https://github.com/bochilgaming)
* [`Fokus ID`](https://github.com/Fokusdotid) 
