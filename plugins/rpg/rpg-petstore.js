let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
  let type = (args[0] || '').toLowerCase()
  let _type = (args[0] || '').toLowerCase()
  let user = global.db.data.users[m.sender]

  let hdog = 2
  let hcat = 2
  let hhorse = 4
  let hfox = 6
  let hrobo = 10

let logo = `— *P E T   S T O R E* —
▮▧▧▧▧▧▧▧▧▧▧▧▧▮`
let caption = `
🐈 *Cat:* ${hcat} 🔖
🐕 *Dog:* ${hdog} 🔖
🐎 *Horse:* ${hhorse} 🔖
🦊 *Fox:* ${hfox} 🔖
🤖 *Robo:* ${hrobo} 🔖

〉 *ABILITY*
🐈 *Cat:* _Menambah Limit Money Sebanyak 4% Sesuai Dengan Level!_
🐕 *Dog:* _Mengurangi harga item di shop sebanyak 1% Meningkat sesuai level!_

〉 *Example*
${usedPrefix}adopt cat`.trim()

    if (/pet(store|shop)?|adopt/i.test(command)) {
      const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
        switch (type) {
          case 'cat':
          if (user.cat > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hcat) return m.reply(`Pet Token anda kurang`)
            user.pet -= hcat
            user.cat += 1
            m.reply("Selamat anda mempunyai pet Baru ! 🎉")
            break
          case 'dog':
          if (user.dog > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hdog) return m.reply(`Pet Token anda kurang`)
            user.pet -= hdog
            user.dog += 1
            m.reply("Selamat anda mempunyai pet Baru ! 🎉")
            break
          case 'fox':
          if (user.fox > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hfox) return m.reply(`Pet Token anda kurang`)
            user.pet -= hfox
            user.fox += 1
            m.reply("Selamat anda mempunyai pet Baru ! 🎉")
            break
          case 'horse':
          if (user.horse > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hhorse) return m.reply(`Pet Token anda kurang`)
            user.pet -= hhorse
            user.horse += 1
            m.reply("Selamat anda mempunyai pet Baru ! 🎉")
            break
          case 'robo':
          if (user.robo > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hrobo) return m.reply(`Pet Token anda kurang`)
            user.pet -= hrobo
            user.robo += 1
            m.reply("Selamat anda mempunyai pet Baru ! 🎉")
            break
            case 'lion':
          if (user.lion > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hlion) return m.reply(`Pet Token anda kurang`)
            user.pet -= hlion
            user.lion += 1
            m.reply("Selamat anda mempunyai pet Baru ! 🎉")
            break
            case 'rhinoceros':
          if (user.rhinoceros > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hrhinoceros) return m.reply(`Pet Token anda kurang`)
            user.pet -= hrhinoceros
            user.rhinoceros += 1
            m.reply("Selamat anda mempunyai pet Baru ! 🎉")
            break
            case 'dragon':
          if (user.dragon > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hdragon) return m.reply(`Pet Token anda kurang`)
            user.pet -= hdragon
            user.dragon += 1
            m.reply("Selamat anda mempunyai pet Baru ! 🎉")
            break
            case 'centaur':
          if (user.centaur > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hcentaur) return m.reply(`Pet Token anda kurang`)
            user.pet -= hcentaur
            user.centaur += 1
            m.reply("Selamat anda mempunyai pet Baru ! 🎉")
            break
            case 'kyubi':
          if (user.kyubi > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hkyubi) return m.reply(`Pet Token anda kurang`)
            user.pet -= hkyubi
            user.kyubi += 1
            m.reply("Selamat anda mempunyai pet Baru ! 🎉")
            break
            case 'griffin':
          if (user.griffin > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hgriffin) return m.reply(`Pet Token anda kurang`)
            user.pet -= hgriffin
            user.griffin += 1
            m.reply("Selamat anda mempunyai pet Baru ! 🎉")
            break
            case 'phoenix':
          if (user.phonix > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hphonix) return m.reply(`Pet Token anda kurang`)
            user.pet -= hphonix
            user.phonix += 1
            m.reply("Selamat anda mempunyai pet Baru ! 🎉")
            break
            case 'wolf':
          if (user.wolf > 0) return m.reply('Kamu sudah memilik ini')
            if(user.pet < hwolf) return m.reply(`Pet Token anda kurang`)
            user.pet -= hwolf
            user.wolf += 1
            m.reply("Selamat anda mempunyai pet Baru ! 🎉")
            break
            
          default:
              return await m.reply(`${logo}\n${caption}`)
        }
    } 
}

handler.help = ['petshop']
handler.tags = ['rpg']
handler.command = /^(pet(shop|store)?|adopt)/i
handler.register = true
handler.group = true
handler.rpg = true
export default handler