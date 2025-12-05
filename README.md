<div align="center">

<img src="https://telegra.ph/file/37df69a78afb6e010282d.jpg" width="100%"/>

<h1>Elaina - Multi Device</h1>
<p>Elegant • Powerful • Stable WhatsApp Bot</p>

![Stars](https://img.shields.io/github/stars/ImYanXiao/Elaina-MultiDevice?style=flat-square)
![Forks](https://img.shields.io/github/forks/ImYanXiao/Elaina-MultiDevice?style=flat-square)
![Issues](https://img.shields.io/github/issues/ImYanXiao/Elaina-MultiDevice?style=flat-square)
![License](https://img.shields.io/github/license/ImYanXiao/Elaina-MultiDevice?style=flat-square)
![Node](https://img.shields.io/badge/NodeJS-v18+-brightgreen?style=flat-square)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Linux-blue?style=flat-square)

<a href="https://github.com/ImYanXiao">
  <img src="https://img.shields.io/badge/Creator-ImYanXiao-black?style=for-the-badge&logo=github">
</a>

</div>

---

## ⚠️ PERINGATAN KERAS

> Script ini **100% GRATIS**  
> **DILARANG KERAS DIPERJUALBELIKAN** dalam bentuk apa pun.

---

## ✨ Tentang Elaina - MultiDevice

Elaina MultiDevice adalah WhatsApp Bot Multi Device berbasis **Baileys** dengan tampilan modern, stabil, dan modular. Cocok untuk personal maupun komunitas.

---

## 🚀 Fitur Unggulan

| Core System | Entertainment | Utility |
|------------|---------------|---------|
| ✅ Anti Call | ✅ Anime | ✅ Tools |
| ✅ Menfess | ✅ Quotes | ✅ Premium |
| ✅ Multi Device | ✅ Sticker | ✅ Kerang Ajaib |
| ✅ Auto AI | ✅ NSFW | ✅ Downloader |

---

## 🧠 Information Script

- NodeJS v20+
- Baileys MD
- FFmpeg
- ImageMagick
- JSON Database

---

## 💻 Instalasi (Windows / RDP)

Install dulu tools berikut:

- Git → https://git-scm.com
- NodeJS → https://nodejs.org
- FFmpeg → https://ffmpeg.org
- ImageMagick → https://imagemagick.org

Pastikan FFmpeg masuk ke PATH.

---

## 🖥️ Instalasi (VPS Linux)

```bash
apt update && apt upgrade -y
apt install nodejs ffmpeg imagemagick -y
node -v
```

Jika NodeJS di bawah v17:

```bash
curl -s https://deb.nodesource.com/setup_21.x | sudo bash
apt install -y nodejs
```

---

📦 Install Bot

```bash
git clone https://github.com/ImYanXiao/Elaina-MultiDevice
cd Elaina-MultiDevice
npm install
npm update
```

---

▶️ Menjalankan Bot

```bash
node start
```

Scan QR dan bot siap digunakan.


---

⚙️ Custom Message Display (Interactive UI)
```javascript
let { proto, generateWAMessageFromContent } = require('@rexxhayanasi/elaina-baileys')

let msg = generateWAMessageFromContent(m.chat, {
 viewOnceMessage: {
  message: {
   interactiveMessage: proto.Message.InteractiveMessage.create({
    body: proto.Message.InteractiveMessage.Body.create({
     text: "Modern Button"
    }),
    footer: proto.Message.InteractiveMessage.Footer.create({
     text: "ElainaBOT MD"
    }),
    header: proto.Message.InteractiveMessage.Header.create({
     title: "Welcome",
     subtitle: "Interactive UI",
     hasMediaAttachment: false
    }),
    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
     buttons: [
      { name: "quick_reply", buttonParamsJson: "{\"display_text\":\"Menu\",\"id\":\".menu\"}" },
      { name: "cta_url", buttonParamsJson: "{\"display_text\":\"Website\",\"url\":\"https://google.com\"}" }
     ]
    })
   })
  }
 }
}, {})

await conn.relayMessage(msg.key.remoteJid, msg.message, {
 messageId: msg.key.id
})
```

---
## ❌ Bot Tidak Bisa Konek?

Ikuti langkah berikut secara berurutan:

1. Rename folder `plugins` menjadi `pluginslama`
2. Buat folder baru bernama `plugins` (dalam keadaan kosong)
3. Restart server / VPS / cPanel
4. Login ulang bot seperti biasa
5. Setelah bot berhasil tersambung:
   - Hapus folder `plugins`
   - Rename kembali `pluginslama` menjadi `plugins`

> Pastikan jumlah **Perangkat Tertaut tidak melebihi batas maksimal** agar proses sinkronisasi berjalan dengan normal.

---

## 📜 Syarat & Ketentuan

- ❌ Dilarang memperjualbelikan script dalam bentuk apa pun
- ✅ Wajib memberikan ⭐ sebagai bentuk dukungan pada repository ini
- ❌ Dilarang menggunakan script untuk aktivitas yang melanggar hukum


---

## 💖 Support & Credits

Terima kasih kepada semua pihak yang telah berkontribusi dan mendukung pengembangan project ini:

- Allah SWT  
- Orang Tua  
- All Contributors  
- Nurutomo  
- BochilGaming  
- Fokus ID  
- @rexxhayanasi/elaina-baileys  

---

### ✨ ElainaBOT — Modern WhatsApp Automation  
**Made with ❤️ by contributors and developers**
</div>
