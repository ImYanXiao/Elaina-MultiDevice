/*
Thanks Papah-Chan https://github.com/FahriAdison
Thanks Xnuvers007 https://github.com/Xnuvers007
*/


import { default as makeWASocket } from '@adiwajshing/baileys';
import { performance } from 'perf_hooks';
import fs from 'fs';
import moment from 'moment';
import os from 'os';
import { execSync } from 'child_process';

const formatUptime = (seconds) => {
  const duration = moment.duration(seconds, 'seconds');
  return {
    days: Math.floor(duration.asDays()),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds()
  };
};

let handler = async (m, { conn, usedPrefix: _p }) => {
  const startTime = performance.now();

  try {
    const runtime = process.uptime();
    const uptime = formatUptime(runtime);

    const memoryUsage = process.memoryUsage();
    const systemInfo = {
      memoryUsed: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
      memoryTotal: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
      nodeVersion: process.version,
      platform: process.platform,
      cpuModel: os.cpus()[0].model,
      cpuCores: os.cpus().length,
      systemUptime: formatUptime(os.uptime()),
      diskInfo: getDiskInfo(),
      networkInfo: getNetworkInfo(),
      loadAverage: os.loadavg().map(avg => avg.toFixed(2)).join(', '),
      cpuTemperature: getCpuTemperature(),
      freeMemory: (os.freemem() / 1024 / 1024).toFixed(2) + ' MB',
      hostname: os.hostname(),
      arch: os.arch(),
      userInfo: getUserInfo()
    };

    const now = moment().add(12, 'hours');
    const timeInfo = {
      date: now.format('YYYY-MM-DD'),
      time: now.format('HH:mm:ss'),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    const totalMessagesProcessed = conn.totalMessages || 0;

    const uptimeDisplay = `📊 *BOT UPTIME STATISTICS*
┌─────────────────────
│ ⏱️ Running for: ${uptime.days}d ${uptime.hours}h ${uptime.minutes}m ${uptime.seconds}s
│ 🖥️ Memory: ${systemInfo.memoryUsed}/${systemInfo.memoryTotal}
│ 🔄 Node: ${systemInfo.nodeVersion}
│ 💻 Platform: ${systemInfo.platform}
│ 🧠 CPU: ${systemInfo.cpuModel} (${systemInfo.cpuCores} cores)
│ ⏳ System Uptime: ${systemInfo.systemUptime.days}d ${systemInfo.systemUptime.hours}h ${systemInfo.systemUptime.minutes}m
│ 💾 Disk Usage: ${systemInfo.diskInfo.used}/${systemInfo.diskInfo.total} (${systemInfo.diskInfo.percent}%)
│ 💡 Load Average: ${systemInfo.loadAverage}
│ 🧑‍💻 Free Memory: ${systemInfo.freeMemory}
│ 🖥️ CPU Temperature: ${systemInfo.cpuTemperature}°C
│ 🏠 Hostname: ${systemInfo.hostname}
│ 🖥️ Arch: ${systemInfo.arch}
│ 👤 User: ${systemInfo.userInfo}
└─────────────────────`;

    const statusDisplay = `📈 *SYSTEM STATUS*
┌─────────────────────
│ 📆 Date: ${timeInfo.date}
│ 🕒 Time: ${timeInfo.time}
│ 🌐 Timezone: ${timeInfo.timezone}
│ 📩 Messages Processed: ${totalMessagesProcessed}
│ 🌍 IP Address: ${systemInfo.networkInfo.ip}
│ 🌐 Network Interfaces: ${systemInfo.networkInfo.interfaces.join(', ')}
│ 🤖 Status: Operational
└─────────────────────`;

    const thumbnailPath = './thumbnail.jpg';
    const thumbnailExists = fs.existsSync(thumbnailPath);

    const endTime = performance.now();
    const timeTaken = (endTime - startTime).toFixed(2);
    console.log(`[PERFORMANCE] Status check took ${timeTaken}ms`);

    const messageContent = {
      orderMessage: {
        itemCount: 99999,
        status: 200,
        surface: 999,
        description: '^^',
        token: '9',
        curreyCode: 'IDR',
        totalCurrencyCode: '>〰<',
        totalAmount1000: '1000000',
        message: `${uptimeDisplay}\n\n${statusDisplay}\n\n📉 Performance: ${timeTaken}ms`,
        orderTitle: 'Bot Status Monitor',
        sellerJid: (conn.user && conn.user.id ? conn.user.id : global.nomorbot) + '@s.whatsapp.net',
        thumbnail: fs.readFileSync(thumbnailExists ? thumbnailPath : thumbnailPath)
      }
    };

    const { generateWAMessageFromContent } = makeWASocket;
    const message = await generateWAMessageFromContent(
      m.chat,
      messageContent,
      { quoted: m }
    );
    
    await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });
    
    console.log(`[STATUS] Uptime check performed: ${uptime.days}d ${uptime.hours}h ${uptime.minutes}m ${uptime.seconds}s`);

  } catch (error) {
    console.error('[ERROR] Status monitor error:', error);
    await conn.sendMessage(m.chat, { text: '❌ Error occurred while fetching status' });
  }
};

const getDiskInfo = () => {
  const diskInfo = execSync('df -h /').toString().split('\n')[1].split(/\s+/);
  return {
    total: diskInfo[1],
    used: diskInfo[2],
    percent: diskInfo[4].replace('%', '')
  };
};

const getNetworkInfo = () => {
  const networkInterfaces = os.networkInterfaces();
  const ip = networkInterfaces['eth0'] ? networkInterfaces['eth0'][0].address : 'N/A';
  const interfaces = Object.keys(networkInterfaces);
  return { ip, interfaces };
};

const getCpuTemperature = () => {
  try {
    const temperature = execSync('cat /sys/class/thermal/thermal_zone0/temp').toString().trim();
    return (parseInt(temperature) / 1000).toFixed(2);
  } catch (err) {
    return 'Not Available ';
  }
};

const getUserInfo = () => {
  try {
    return os.userInfo().username;
  } catch (err) {
    return `${global.namebot}`
  }
};

handler.help = ['status', 'uptime', 'runtime', 'monitor'];
handler.tags = ['info', 'tools', 'system'];
handler.command = /^(status|uptime|runtime|monitor|upt|run)$/i;

handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null

export default handler;
