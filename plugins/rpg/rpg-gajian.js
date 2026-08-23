let handler = async (m, { conn }) => {
  let LastClaim = global.db.data.users[m.sender].lastclaim
  let cdm = `${MeNit(new Date - LastClaim)}`
  let cds = `${DeTik(new Date - LastClaim)}`
  let cd1 = Math.ceil(44 - cdm)
  let cd2 = Math.ceil(59 - cds)

                                                 
  if (new Date - LastClaim > 2700000) {
    let minGaji = 55000
    let maxGaji = 100000
    let gaji = Math.floor(Math.random() * (maxGaji - minGaji + 1)) + minGaji

    global.db.data.users[m.sender].money += gaji
    global.db.data.users[m.sender].exp += 100
    m.reply(`Nih gaji lu +Rp${gaji.toLocaleString()}`)
    global.db.data.users[m.sender].lastclaim = new Date * 1
  } else {
    return m.reply(`Lu udah ambil jatah hari ini.\n\nTunggu ${cd1} Menit ${cd2} Detik!`)
  }
}
handler.help = ['gajian']
handler.tags = ['rpg']
handler.command = /^(gaji|gajian)$/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler

function JaM(ms) {
  let h = isNaN(ms) ? '60' : Math.floor(ms / 3600000) % 60
  return [h].map(v => v.toString().padStart(2, 0)).join(':')
}

function MeNit(ms) {
  let m = isNaN(ms) ? '60' : Math.floor(ms / 60000) % 60
  return [m].map(v => v.toString().padStart(2, 0)).join(':')
}

function DeTik(ms) {
  let s = isNaN(ms) ? '60' : Math.floor(ms / 1000) % 60
  return [s].map(v => v.toString().padStart(2, 0)).join(':')
}
