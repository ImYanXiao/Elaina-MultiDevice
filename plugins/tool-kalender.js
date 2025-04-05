import { createCanvas } from 'canvas';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let args = text.trim().split(' ');
  let month = args[0] ? parseInt(args[0]) : new Date().getMonth() + 1;
  let year = args[1] ? parseInt(args[1]) : new Date().getFullYear();
  
  if (month < 1 || month > 12) {
    return await conn.sendMessage(m.chat, { text: 'Bulan harus berupa angka antara 1 - 12!' }, { quoted: m });
  }
  
  if (isNaN(year)) {
    return await conn.sendMessage(m.chat, { text: 'Tahun harus berupa angka yang valid!' }, { quoted: m });
  }
  
  try {
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    
    const calendar = [];
    let week = new Array(7).fill(null);
    
    let day = 1;
    for (let i = firstDay; i < 7; i++) {
      week[i] = day++;
    }
    
    calendar.push([...week]);
    
    while (day <= daysInMonth) {
      week = new Array(7).fill(null);
      for (let i = 0; i < 7; i++) {
        if (day <= daysInMonth) {
          week[i] = day++;
        }
      }
      calendar.push([...week]);
    }
    
    const canvas = createCanvas(600, 500);
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#f5f7fa');
    gradient.addColorStop(1, '#e4e8f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 5;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    
    ctx.fillStyle = '#3498db';
    ctx.fillRect(20, 20, canvas.width - 40, 60);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Kalender ${monthNames[month-1]} ${year}`, canvas.width / 2, 50);
    
    const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    let x = 60;
    let y = 110;
    
    ctx.fillStyle = '#2980b9';
    ctx.fillRect(20, 90, canvas.width - 40, 40);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Arial';
    daysOfWeek.forEach((day, index) => {
      if (index === 0) {
        ctx.fillStyle = '#ff6b6b';
      } else {
        ctx.fillStyle = 'white';
      }
      ctx.fillText(day, x, y);
      x += 80;
    });
    
    y = 150;
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    
    calendar.forEach(week => {
      x = 60;
      week.forEach(day => {
        if (day) {
          const isToday = day === currentDay && month === currentMonth && year === currentYear;
          
          if (isToday) {
            ctx.fillStyle = '#e74c3c';
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white';
          } else {
            ctx.fillStyle = '#34495e';
          }
          
          ctx.font = isToday ? 'bold 18px Arial' : '18px Arial';
          ctx.fillText(day, x, y);
        }
        x += 80;
      });
      y += 50;
    });
    
    ctx.fillStyle = '#3498db';
    ctx.fillRect(20, canvas.height - 60, canvas.width - 40, 40);
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    const pengirim = m.sender.split('@')[0];
    const name = await conn.getName(`${pengirim}@s.whatsapp.net`);
    ctx.fillText(`Created with Calendar ${name} • ` + new Date().toLocaleDateString('id-ID'), canvas.width / 2, canvas.height - 45);
    ctx.fillText(`Powered by ${global.namebot} • `, canvas.width / 2, canvas.height - 30);
    
    const buffer = canvas.toBuffer('image/png');
    
    let caption = `✨ *Kalender ${monthNames[month-1]} ${year}* ✨\n\nDibuat dengan Otak Cuy, Coba dengan\n ${usedPrefix+command} 4\n${usedPrefix+command} 4 2025\n${usedPrefix+command} Bulan Tahun\n\n> Powered by Xnuvers007 Brain`;
    await conn.sendMessage(m.chat, { image: buffer, caption: caption }, { quoted: m });
    
  } catch (err) {
    await conn.sendMessage(m.chat, { 
      text: `❌ Error: ${err.message || 'Gagal menghasilkan kalender. Silakan coba lagi.'}`
    }, { quoted: m });
  }
};

handler.help = ['calendar [bulan] [tahun]'];
handler.tags = ['tools', 'internet'];
handler.command = /^(calendar|kalender|cal|kal)$/i;

export default handler;
