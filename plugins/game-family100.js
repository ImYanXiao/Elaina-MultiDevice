const winScore = 1000
async function handler(m) {
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (id in this.game) {
        this.reply(m.chat, 'Masih ada kuis yang belum terjawab di chat ini', this.game[id].msg)
        throw false
    }
    const json = await family100()
    let caption = `
*Soal:* ${json.soal}
Terdapat *${json.jawaban.length}* jawaban${json.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
`: ''}
+${winScore} XP tiap jawaban benar
    `.trim()
    this.game[id] = {
        id,
        msg: await this.reply(m.chat, caption, m),
        ...json,
        terjawab: Array.from(json.jawaban, () => false),
        winScore,
    }
}
handler.help = ['family100']
handler.tags = ['game']
handler.command = /^family100$/i

export default handler

import got from 'got';

async function family100() {
    
   let family100json;

  if (!family100json) {

    family100json = await got(

      'https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json'

    ).json();

  }

  

  const randomEntry = family100json[Math.floor(Math.random() * family100json.length)];

  

  // Simple validation to check if the structure of the data is correct

  if (typeof randomEntry.soal !== 'string' || !Array.isArray(randomEntry.jawaban)) {

    throw new Error('Invalid data format');

  }

  return randomEntry;

}