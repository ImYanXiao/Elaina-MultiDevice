import fetch from "node-fetch";
import crypto from "crypto";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); 

function makeId(length = 8) {
  let result = "";
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charsLength = chars.length;
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  return result;
}

function jsonFormat(obj) {
  return JSON.stringify(obj, null, 2);
}

const idgcPath = "./database/idgrup.json";

if (!fs.existsSync(idgcPath)) {
  fs.mkdirSync("./database", { recursive: true });
  fs.writeFileSync(idgcPath, JSON.stringify([]));
}

let handler = async (
  m,
  { conn, text, args, command, usedPrefix, isOwner, isGroup, groupMetadata },
) => {
  const domain = process.env.PANEL_DOMAIN;
  const apikey = process.env.PANEL_APIKEY;

  if (!domain || !apikey) {
    return m.reply("❌ Domain atau API Key belum diatur di .env atau global.panel");
  }

  let pler = JSON.parse(fs.readFileSync(idgcPath).toString());
  if (!Array.isArray(pler)) pler = [];

  const jangan = m.isGroup ? pler.includes(m.chat) : false;
  const pp = await conn
    .profilePictureUrl(m.sender, "image")
    .catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");

  switch (command) {
    case "pannel":
      {
        m.reply(`*☁️ LIST PANNEL YANG TERSEDIA*
*• 1GB ✅*
*• 2GB ✅*
*• 3GB ✅*
*• 4GB ✅*
*• 5GB ✅*
*• 6GB ✅*
*• 7GB ✅*
*• 8GB ✅*`);
      }
      break;

    case "addgc":
      if (!isOwner) return m.reply(`Khusus Owner`);
      if (!pler.includes(m.chat)) pler.push(m.chat);
      fs.writeFileSync(idgcPath, JSON.stringify(pler));
      m.reply(`*GROUP ${groupMetadata.subject}*\n_Sukses Addgc✅_`);
      break;

    case "delgc":
      if (!isOwner) return m.reply(`Khusus Owner`);
      var ini = pler.indexOf(m.chat);
      if (ini !== -1) pler.splice(ini, 1);
      fs.writeFileSync(idgcPath, JSON.stringify(pler));
      m.reply(`*GROUP ${groupMetadata.subject}*\n_Sukses Delgc✅_`);
      break;

    case "1gb":
    case "2gb":
    case "3gb":
    case "4gb":
    case "5gb":
    case "6gb":
    case "7gb":
    case "8gb":
      {
        if (!jangan)
          return m.reply(
            "*[ System Notice ]* the group can't access this feature",
          );

        let t = text.split(",");
        if (t.length < 2)
          return m.reply(`*• Example :* ${usedPrefix + command} *[username, number]*`);
        let username = t[0];
        let u = m.quoted
          ? m.quoted.sender
          : t[1]
            ? t[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net"
            : m.mentionedJid[0];
        if (!u) return;

        let name = username;
        let egg = "15";
        let loc = "1";
        let size = parseInt(command);
        let memo = 1024 * size;
        let disk = 1024 * size;
        let cpu = 30 * size;

        let email = username + "@RClouds";
        let d = (await conn.onWhatsApp(u.split`@`[0]))[0] || {};
        let password = d.exists ? makeId(8) : t[3];

        let f = await fetch(domain + "/api/application/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            email: email,
            username: username,
            first_name: username,
            last_name: username,
            language: "en",
            password: password.toString(),
          }),
        });
        let data = await f.json();
        if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;

        let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
        });
        let data2 = await f2.json();
        let startup_cmd = data2.attributes.startup;

        await conn.sendMessage(m.chat, { text: "*[ CREATING SERVER.... ]*" }, { quoted: m });

        let f3 = await fetch(domain + "/api/application/servers", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + apikey,
          },
          body: JSON.stringify({
            name: `🟢 ${name} Server`,
            description: "© Terimakasih telah order di RClouds",
            user: user.id,
            egg: parseInt(egg),
            docker_image: "ghcr.io/parkervcp/yolks:nodejs_22",
            startup: startup_cmd,
            environment: {
              INST: "npm",
              USER_UPLOAD: "0",
              AUTO_UPDATE: "0",
              CMD_RUN: "npm start",
            },
            limits: {
              memory: memo,
              swap: 0,
              disk: disk,
              io: 500,
              cpu: cpu,
            },
            feature_limits: {
              databases: 5,
              backups: 5,
              allocations: 5,
            },
            deploy: {
              locations: [parseInt(loc)],
              dedicated_ip: false,
              port_range: [],
            },
          }),
        });
        let res = await f3.json();
        if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2));

        let server = res.attributes;
        let ctf = `*[ 📦 DATA PANNEL ANDA ]*
*• Username :* ${user.username}
*• Password :* ${password.toString()}
*• Login :* ${domain}

*🔴 Simpan baik-baik data ini untuk garansi server!*`;

        conn.sendMessage(u, { text: ctf }, { quoted: null });

        let p = `*[ SUCCESS CREATING SERVER ${size}GB ]*
*• User ID :* ${user.id}
*• Server ID :* ${server.id}

*• Detail Users :* \`\`\`${jsonFormat(user)}\`\`\`

*• Detail Server :* \`\`\`${jsonFormat(server)}\`\`\`

*© 🇮🇩 RClouds TEAM 2023 - 2024*`;
        await conn.sendMessage(m.chat, { text: p }, { quoted: m });
      }
      break;
  }
};

handler.command = handler.help = [
  "sh",
  "pannel",
  "addgc",
  "delgc",
  "1gb",
  "2gb",
  "3gb",
  "4gb",
  "5gb",
  "6gb",
  "7gb",
  "8gb"
];
handler.tags = ["cpanel"];
export default handler;