import { getDevice } from '@adiwajshing/baileys'

let handler = async (m, { conn }) => {

let p = m.quoted? m.quoted : m

let res = await getDevice(p.id) 

if ((res) == 'android') m.reply('Android') 

else if ((res) == 'ios') m.reply('IOS') 

else if ((res) == 'desktop') m.reply('Desktop') 

else if ((res) == 'web') m.reply('Whatsapp Web') 

else if ((res) == 'unknown') m.reply('Tidak Diketahui')

}

handler.command = ['cekperangkat']

export default handler