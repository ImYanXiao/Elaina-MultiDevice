import { translate } from '@vitalets/google-translate-api'

var handler = async (m, { args, usedPrefix, command }) => {
	let lang, text
	if (args.length >= 2) {
		lang = args[0] ? args[0] : 'id', text = args.slice(1).join(' ')
	} else if (m.quoted && m.quoted.text) {
		lang = args[0] ? args[0] : 'id', text = m.quoted.text
	} else throw `Ex: ${usedPrefix + command} id hello i am robot`
	let res = await translate(text, { to: lang }).catch(_ => null)
	if (!res) throw `Error : Bahasa"${lang}" Tidak Support`
	m.reply(`*Terdeteksi Bahasa:* ${res.raw.src}\n*Ke Bahasa:* ${lang}\n\n*Original Text:* ${res.raw.sentences[0].orig}\n*Terjemahan:* ${res.raw.sentences[0].trans}`.trim())
}
handler.help = ['translate'].map(v => v + ' <bahasa> <teks>')
handler.tags = ['tools']
handler.command = /^(tr(anslate)?)$/i

export default handler

///////////////////// ATAS BUAT BACKUP AJA //////////////////////////

// fix by Xnuvers007, penggunaan .tr dari|ke teksnya apa

/*import fetch from 'node-fetch';

let handler = async (m, { args, usedPrefix, command }) => {
  let lang, text;
  if (args.length >= 2) {
    lang = args[0];
    text = args.slice(1).join(' ');
  } else {
    throw `Ex: ${usedPrefix + command} dariBahasa|keBahasa Apa kabar?`;
  }

  let [from_lang, to_lang] = lang.split('|');
  let url = `https://tr.deployers.repl.co/translate?from=${from_lang}&to=${to_lang}&text=${encodeURIComponent(text)}`;
  let response = await fetch(url);
  let result = await response.json();

  if (response.status !== 200) {
    url = `https://tr-xnuvers007.vercel.app/translate?from=${from_lang}&to=${to_lang}&text=${encodeURIComponent(text)}`;
    response = await fetch(url);
    result = await response.json();

    if (response.status !== 200) {
      throw `Terjadi kesalahan saat melakukan request: ${response.statusText}`;
    }
  }

  let { "code/status": status, credits, from, text: original_text, to, translated_text } = result;
  m.reply(`*Terdeteksi Bahasa:* ${from}\n*Ke Bahasa:* ${to}\n\n*Original Text:* ${original_text}\n*Terjemahan:* ${translated_text}\n\n*Kredit:* ${credits}`);
};

handler.help = ['translate'].map(v => v + ' <from_lang>|<to_lang> <teks>');
handler.tags = ['tools'];
handler.command = /^(translate|tr|terjemahan|terjemah|trjmh)$/i;

export default handler;*/
