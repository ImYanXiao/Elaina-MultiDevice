import os, { cpus as _cpus, freemem, platform, hostname } from 'os';
import osu from 'node-os-utils';
import fetch from 'node-fetch';
import { performance } from 'perf_hooks';
import { sizeFormatter } from 'human-readable';

const format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

const handler = async (m, { conn }) => {
  let _muptime = 0;

  if (process.send) {
    process.send('uptime');
    _muptime = await new Promise(resolve => {
      process.once('message', resolve);
      setTimeout(resolve, 1000);
    }) * 1000;
  }

  const muptime = clockString(_muptime);
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'));
  const usedMemory = process.memoryUsage();

  const cpus = _cpus().map(cpu => {
    cpu.total = Object.values(cpu.times).reduce((last, type) => last + type, 0);
    return cpu;
  });

  const cpu = cpus.reduce((last, cpu) => {
    last.total += cpu.total;
    last.speed += cpu.speed / cpus.length;
    last.times.user += cpu.times.user;
    last.times.nice += cpu.times.nice;
    last.times.sys += cpu.times.sys;
    last.times.idle += cpu.times.idle;
    last.times.irq += cpu.times.irq;
    return last;
  }, {
    speed: 0,
    total: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  });

  const NotDetect = 'Not Detect';
  const cpuCore = osu.cpu.count();
  const mem = osu.mem;
  const netstat = osu.netstat;

  const [cpuUsage, driveInfo, memInfo, netInfo] = await Promise.all([
    osu.cpu.usage().catch(() => NotDetect),
    osu.drive.info().catch(() => ({
      totalGb: NotDetect,
      usedGb: NotDetect,
      usedPercentage: NotDetect,
    })),
    mem.info().catch(() => ({
      totalMemMb: NotDetect,
      usedMemMb: NotDetect,
    })),
    netstat.inOut().catch(() => ({
      total: {
        inputMb: NotDetect,
        outputMb: NotDetect
      }
    }))
  ]);

  const driveTotal = driveInfo.totalGb !== NotDetect ? `${driveInfo.totalGb} GB` : NotDetect;
  const driveUsed = driveInfo.usedGb !== NotDetect ? driveInfo.usedGb : NotDetect;
  const drivePer = driveInfo.usedPercentage !== NotDetect ? `${driveInfo.usedPercentage}%` : NotDetect;
  const ramTotal = `${memInfo.totalMemMb} MB`;
  const ramUsed = `${memInfo.usedMemMb} MB`;
  const netsIn = netInfo?.total?.inputMb !== undefined ? `${netInfo.total.inputMb} MB` : NotDetect;
  const netsOut = netInfo?.total?.outputMb !== undefined ? `${netInfo.total.outputMb} MB` : NotDetect;

  const { ip, country, cc } = await (await fetch("https://api.myip.com")).json();
  const date = new Date(new Date() + 3600000);
  const locale = `${cc}`;
  const weekDay = date.toLocaleDateString(locale, { weekday: 'long' });
  const dateString = date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const timeString = date.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  const old = performance.now();
  await m.reply(`*ᴛ ᴇ s ᴛ ɪ ɴ ɢ . . .*`);
  const neww = performance.now();
  const speed = neww - old;

  await conn.reply(m.chat, `
- *ᴘ ɪ ɴ ɢ* -
${Math.round(speed)}ms

- *ʀ ᴜ ɴ ᴛ ɪ ᴍ ᴇ* -
${muptime}

- *ᴄ ʜ ᴀ ᴛ s* -
• *${groupsIn.length}* Group Chats
• *${groupsIn.length}* Groups Joined
• *0* Groups Left
• *${chats.length - groupsIn.length}* Personal Chats
• *${chats.length}* Total Chats

- *s ᴇ ʀ ᴠ ᴇ ʀ* -
*🛑 Rᴀᴍ:* ${ramUsed} / ${ramTotal} (${(parseFloat(memInfo.usedMemMb) && parseFloat(memInfo.totalMemMb)) ? Math.round(100 * (memInfo.usedMemMb / memInfo.totalMemMb)) + '%' : NotDetect})
*🔵 FʀᴇᴇRᴀᴍ:* ${format(freemem())}
*🔭 ᴘʟᴀᴛғᴏʀᴍ:* ${platform()}
*🧿 sᴇʀᴠᴇʀ:* ${hostname()}
*💻 ᴏs:* ${osu.os.platform()}
*📍 ɪᴘ:* ${ip}
*🌎 ᴄᴏᴜɴᴛʀʏ:* ${country}
*💬 ᴄᴏᴜɴᴛʀʏ ᴄᴏᴅᴇ:* ${cc}
*📡 ᴄᴘᴜ ᴍᴏᴅᴇʟ:* ${osu.cpu.model()}
*🔮 ᴄᴘᴜ ᴄᴏʀᴇ:* ${cpuCore} Core
*🎛️ ᴄᴘᴜ:* ${cpuUsage}%
*⏰ ᴛɪᴍᴇ sᴇʀᴠᴇʀ:* ${timeString}

*${htjava} ɴᴏᴅᴇJS ᴍᴇᴍᴏʀʏ ᴜsᴀɢᴇ*
${'```' + Object.keys(usedMemory).map((key) => `${key.padEnd(15, ' ')}: ${format(usedMemory[key])}`).join('\n') + '```'}
`, m);
};

handler.help = ['ping', 'speed'];
handler.tags = ['info', 'tools'];
handler.command = /^(ping|speed|info)$/i;

export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  if (isNaN(ms)) return '-- *Days* --, -- *Hours* --, -- *Minutes* --, -- *Seconds* --';
  const d = Math.floor(ms / 86400000);
  const h = Math.floor(ms / 3600000) % 24;
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return `${d} *Days* ${h} *Hours* ${m} *Minutes* ${s} *Seconds*`;
}
