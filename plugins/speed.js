import os, { cpus as _cpus, freemem, platform, hostname, totalmem } from "os";
import osu from "node-os-utils";
import fetch from "node-fetch";
import { performance } from "perf_hooks";
import { sizeFormatter } from "human-readable";
import { exec } from "child_process";
import { promisify } from "util";

const format = sizeFormatter({
  std: "JEDEC",
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

const progressBar = (percentage, length = 15) => {
  const filledLength = Math.round(length * (percentage / 100));
  const emptyLength = length - filledLength;
  const filled = "█".repeat(filledLength);
  const empty = "░".repeat(emptyLength);
  return `${filled}${empty} ${percentage.toFixed(1)}%`;
};

const designElements = {
  header: "╭────────────────────────────────────╮",
  footer: "╰────────────────────────────────────╯",
  separator: "┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄",
  bullet: "•",
  diamond: "♦",
  star: "★",
};

const indicators = {
  good: "🟢",
  medium: "🟡",
  bad: "🔴",
  unknown: "⚪",
};

const getSystemUptime = () => {
  const uptime = os.uptime();
  return clockString(uptime * 1000);
};

const execAsync = promisify(exec);

const getAdditionalNetworkInfo = async () => {
  try {
    const { stdout } = await execAsync(
      "cat /etc/resolv.conf | grep nameserver | head -n 1"
    );
    const dns = stdout.split(" ")[1]?.trim() || "Not detected";
    return { dns };
  } catch (e) {
    return { dns: "Not detected" };
  }
};

const getBatteryInfo = async () => {
  if (process.platform !== "darwin" && process.platform !== "linux") {
    return { hasBattery: false };
  }

  try {
    const command =
      process.platform === "darwin"
        ? "pmset -g batt | grep -Eo '\\d+%'"
        : "upower -i $(upower -e | grep BAT) | grep percentage | awk '{print $2}'";

    const { stdout } = await execAsync(command);
    const percentage = stdout.trim();
    return { hasBattery: true, percentage };
  } catch (e) {
    return { hasBattery: false };
  }
};

const getProcessInfo = async () => {
  try {
    const { stdout } = await execAsync(
      "ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head -n 6"
    );
    return stdout
      .trim()
      .split("\n")
      .slice(1)
      .map((line) => {
        const parts = line.trim().split(/\s+/);
        return {
          pid: parts[0],
          ppid: parts[1],
          cmd:
            parts.slice(2, -2).join(" ").substring(0, 20) +
            (parts.slice(2, -2).join(" ").length > 20 ? "..." : ""),
          mem: parts[parts.length - 2],
          cpu: parts[parts.length - 1],
        };
      });
  } catch (e) {
    return [];
  }
};

const handler = async (m, { conn }) => {
  
  const loadingMsg = await conn.reply(
    m.chat,
    `${designElements.star} *SYSTEM MONITOR LOADING* ${
      designElements.star
    }\n\n${"⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏".split("").join(" ")} Please wait...`
  );

  const startTime = performance.now();

  let _muptime = 0;
  if (process.send) {
    process.send("uptime");
    _muptime =
      (await new Promise((resolve) => {
        process.once("message", resolve);
        setTimeout(resolve, 1000);
      })) * 1000;
  }
  const muptime = clockString(_muptime);

  const chats = Object.entries(conn.chats).filter(
    ([id, data]) => id && data.isChats
  );
  const groupsIn = chats.filter(([id]) => id.endsWith("@g.us"));
  const privateChats = chats.length - groupsIn.length;

  const cpus = _cpus().map((cpu) => {
    cpu.total = Object.values(cpu.times).reduce((last, type) => last + type, 0);
    return cpu;
  });

  const cpu = cpus.reduce(
    (last, cpu) => {
      last.total += cpu.total;
      last.speed += cpu.speed / cpus.length;
      last.times.user += cpu.times.user;
      last.times.nice += cpu.times.nice;
      last.times.sys += cpu.times.sys;
      last.times.idle += cpu.times.idle;
      last.times.irq += cpu.times.irq;
      return last;
    },
    {
      speed: 0,
      total: 0,
      times: {
        user: 0,
        nice: 0,
        sys: 0,
        idle: 0,
        irq: 0,
      },
    }
  );

  
  const NotDetect = "Not Detected";
  const cpuCore = osu.cpu.count();
  const mem = osu.mem;
  const netstat = osu.netstat;

  
  const [
    cpuUsage,
    driveInfo,
    memInfo,
    netInfo,
    geoData,
    networkAddInfo,
    batteryInfo,
    topProcesses,
    systemLoadAvg,
  ] = await Promise.all([
    osu.cpu.usage().catch(() => NotDetect),
    osu.drive.info().catch(() => ({
      totalGb: NotDetect,
      usedGb: NotDetect,
      freeGb: NotDetect,
      usedPercentage: NotDetect,
    })),
    mem.info().catch(() => ({
      totalMemMb: NotDetect,
      usedMemMb: NotDetect,
      freeMemMb: NotDetect,
    })),
    netstat.inOut().catch(() => ({
      total: {
        inputMb: NotDetect,
        outputMb: NotDetect,
      },
    })),
    fetch("https://api.myip.com")
      .then((res) => res.json())
      .catch(() => ({
        ip: NotDetect,
        country: NotDetect,
        cc: NotDetect,
      })),
    getAdditionalNetworkInfo(),
    getBatteryInfo(),
    getProcessInfo(),
    osu.cpu.loadavg(),
  ]);

  
  const memPercentage =
    parseFloat(memInfo.usedMemMb) && parseFloat(memInfo.totalMemMb)
      ? Math.round(100 * (memInfo.usedMemMb / memInfo.totalMemMb))
      : NotDetect;

  
  const memIndicator =
    typeof memPercentage === "number"
      ? memPercentage > 85
        ? indicators.bad
        : memPercentage > 60
        ? indicators.medium
        : indicators.good
      : indicators.unknown;

  
  const cpuIndicator =
    typeof cpuUsage === "number"
      ? cpuUsage > 85
        ? indicators.bad
        : cpuUsage > 60
        ? indicators.medium
        : indicators.good
      : indicators.unknown;

  
  const driveTotal =
    driveInfo.totalGb !== NotDetect ? `${driveInfo.totalGb} GB` : NotDetect;
  const driveUsed =
    driveInfo.usedGb !== NotDetect ? `${driveInfo.usedGb} GB` : NotDetect;
  const driveFree =
    driveInfo.freeGb !== NotDetect ? `${driveInfo.freeGb} GB` : NotDetect;
  const drivePer =
    driveInfo.usedPercentage !== NotDetect
      ? `${driveInfo.usedPercentage}%`
      : NotDetect;

  
  const driveIndicator =
    typeof driveInfo.usedPercentage === "number"
      ? driveInfo.usedPercentage > 85
        ? indicators.bad
        : driveInfo.usedPercentage > 70
        ? indicators.medium
        : indicators.good
      : indicators.unknown;

  
  const ramTotal = `${memInfo.totalMemMb} MB`;
  const ramUsed = `${memInfo.usedMemMb} MB`;
  const ramFree = `${memInfo.freeMemMb} MB`;

  
  const netsIn =
    netInfo?.total?.inputMb !== undefined
      ? `${netInfo.total.inputMb} MB`
      : NotDetect;
  const netsOut =
    netInfo?.total?.outputMb !== undefined
      ? `${netInfo.total.outputMb} MB`
      : NotDetect;

  
  const date = new Date(new Date() + 3600000);
  const locale = `${geoData.cc || "en"}`;
  const weekDay = date.toLocaleDateString(locale, { weekday: "long" });
  const dateString = date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeString = date.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  
  const indoWIBDay = date.toLocaleDateString("id-ID", {
    weekday: "long",
    timeZone: "Asia/Jakarta",
  });
  const indoWIBDate = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
  const indoWIBTime = date.toLocaleTimeString("id-ID", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Jakarta",
  });

  
  const indoWITADay = date.toLocaleDateString("id-ID", {
    weekday: "long",
    timeZone: "Asia/Makassar",
  });
  const indoWITADate = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Makassar",
  });
  const indoWITATime = date.toLocaleTimeString("id-ID", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Makassar",
  });

  
  const indoWITDay = date.toLocaleDateString("id-ID", {
    weekday: "long",
    timeZone: "Asia/Jayapura",
  });
  const indoWITDate = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jayapura",
  });
  const indoWITTime = date.toLocaleTimeString("id-ID", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Jayapura",
  });

  
  const responseTime = Math.round(performance.now() - startTime);

  
  const usedMemory = process.memoryUsage();
  const memoryUsageFormatted = Object.keys(usedMemory)
    .map((key) => {
      return `${key.padEnd(12, " ")}: ${format(usedMemory[key])}`;
    })
    .join("\n");

  
  const systemInfo = {
    arch: os.arch(),
    type: os.type(),
    release: os.release(),
    systemUptime: getSystemUptime(),
    loadAverage: systemLoadAvg,
  };

  
  const responseMsg = `
${designElements.header}
${designElements.star} *SYSTEM MONITOR DASHBOARD* ${designElements.star}
${designElements.footer}

${designElements.diamond} *PERFORMANCE*
${indicators.good} *Response Time:* ${responseTime}ms
${indicators.good} *Ping:* ${
    responseTime < 200 ? "Excellent" : responseTime < 500 ? "Good" : "Poor"
  } (${responseTime}ms)

${designElements.diamond} *BOT RUNTIME*
${indicators.good} *Uptime:* ${muptime}

${designElements.diamond} *CHAT STATISTICS*
${designElements.bullet} *Groups:* ${groupsIn.length}
${designElements.bullet} *Private:* ${privateChats}
${designElements.bullet} *Total:* ${chats.length}

${designElements.separator}

${designElements.diamond} *SYSTEM RESOURCES*

${memIndicator} *RAM Usage:*
${progressBar(memPercentage)}
*Used:* ${ramUsed} | *Free:* ${ramFree} | *Total:* ${ramTotal}

${cpuIndicator} *CPU Usage:*
${typeof cpuUsage === "number" ? progressBar(cpuUsage) : "Not available"}
*Cores:* ${cpuCore}
*Model:* ${osu.cpu.model().substring(0, 30)}...
*Load Avg:* ${systemLoadAvg.join(" | ")}

${driveIndicator} *Storage:*
${
  typeof driveInfo.usedPercentage === "number"
    ? progressBar(driveInfo.usedPercentage)
    : "Not available"
}
*Used:* ${driveUsed} | *Free:* ${driveFree} | *Total:* ${driveTotal} | *Percentage:* ${drivePer}

${designElements.separator}

${designElements.diamond} *NETWORK STATUS*
${designElements.bullet} *IP Address:* ${geoData.ip}
${designElements.bullet} *Location:* ${geoData.country} (${geoData.cc})
${designElements.bullet} *DNS Server:* ${networkAddInfo.dns}
${designElements.bullet} *Data In:* ${netsIn}
${designElements.bullet} *Data Out:* ${netsOut}

${designElements.separator}

${designElements.diamond} *SYSTEM INFORMATION*
${designElements.bullet} *Platform:* ${platform()}
${designElements.bullet} *Hostname:* ${hostname()}
${designElements.bullet} *OS:* ${os.type()} ${os.release()}
${designElements.bullet} *Architecture:* ${os.arch()}
${designElements.bullet} *System Uptime:* ${systemInfo.systemUptime}
${
  batteryInfo.hasBattery
    ? `${designElements.bullet} *Battery:* ${batteryInfo.percentage}`
    : ""
}

${designElements.diamond} *DATE & TIME (Server ${geoData.country} (${
    geoData.cc
  }))*
${designElements.bullet} *Day:* ${weekDay}
${designElements.bullet} *Date:* ${dateString}
${designElements.bullet} *Time:* ${timeString}

${designElements.diamond} *DATE & TIME (Indonesia 🇮🇩 WIB / GMT+7)*
${designElements.bullet} *Hari:* ${indoWIBDay}
${designElements.bullet} *Tanggal:* ${indoWIBDate}
${designElements.bullet} *Waktu:* ${indoWIBTime}

${designElements.diamond} *DATE & TIME (Indonesia 🇮🇩 WITA / GMT+8)*
${designElements.bullet} *Hari:* ${indoWITADay}
${designElements.bullet} *Tanggal:* ${indoWITADate}
${designElements.bullet} *Waktu:* ${indoWITATime}

${designElements.diamond} *DATE & TIME (Indonesia 🇮🇩 WIT / GMT+9)*
${designElements.bullet} *Hari:* ${indoWITDay}
${designElements.bullet} *Tanggal:* ${indoWITDate}
${designElements.bullet} *Waktu:* ${indoWITTime}

${designElements.separator}

${designElements.diamond} *TOP PROCESSES*
${
  topProcesses.length > 0
    ? topProcesses
        .map(
          (p) =>
            `${designElements.bullet} [${p.pid}] ${p.cmd} (CPU: ${p.cpu}%, MEM: ${p.mem}%)`
        )
        .join("\n")
    : "No process information available"
}

${designElements.separator}

${designElements.diamond} *NODEJS MEMORY USAGE*
\`\`\`
${memoryUsageFormatted}
\`\`\`

${designElements.header}
${designElements.star} *SYSTEM MONITOR COMPLETE* ${designElements.star}
${designElements.footer}
`;

  const more = String.fromCharCode(8206);
  const readMore = more.repeat(4001);

  conn.sendMessage(m.chat, { delete: loadingMsg.key });
  return conn.reply(m.chat, readMore+responseMsg, m);
};

handler.help = ["ping", "speed", "info", "monitor", "status", "sysinfo"];
handler.tags = ["info", "tools", "system"];
handler.command = /^(ping|speed|info|monitor|status|sysinfo)$/i;

export default handler;

function clockString(ms) {
  if (isNaN(ms))
    return "-- *Days* --, -- *Hours* --, -- *Minutes* --, -- *Seconds* --";

  const d = Math.floor(ms / 86400000);
  const h = Math.floor(ms / 3600000) % 24;
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;

  const days = d > 0 ? `${d} *Days* ` : "";
  const hours = h > 0 ? `${h} *Hours* ` : "";
  const minutes = m > 0 ? `${m} *Minutes* ` : "";
  const seconds = `${s} *Seconds*`;

  return days + hours + minutes + seconds;
}
